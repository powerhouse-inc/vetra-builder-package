import { type ISubgraph } from "@powerhousedao/reactor-api";
import { sql } from "kysely";
import { type DB } from "../../processors/vetra-builder-relational-db-processor/schema.js";
import { VetraBuilderRelationalDbProcessor } from "../../processors/vetra-builder-relational-db-processor/index.js";

// All processor instances share the "powerhouse" namespace. Rows from
// different document-drives coexist in the same tables and are
// distinguished by `source_drive_id`. The optional `driveId` accepted in
// resolver arguments / context is kept for backward compatibility but is
// no longer used to pick a namespace.
const SHARED_NAMESPACE_KEY = "powerhouse";

export const getResolvers = (subgraph: ISubgraph): Record<string, unknown> => {
  const db = subgraph.relationalDb;

  return {
    BuilderTeamType: {
      // NB: previously the spaces/members subresolvers LEFT JOINed
      // `deleted_files` to hide rows belonging to soft-deleted teams. After
      // Phase 1 moved every drive into the shared "powerhouse" namespace,
      // those joins hit a `deleted_files` table the read role cannot SELECT
      // (`permission denied for table deleted_files`), which crashed the
      // whole field resolver and returned `data: null` to the caller — so
      // teams stopped rendering on /builders and on the profile page even
      // though the team rows exist. Removed for parity with the equivalent
      // fix on fetchBuilderTeam (commit a648533); re-add once the
      // deleted_files convention is provisioned across drives with usable
      // permissions.
      spaces: async (parent: { id: string }) => {
        const spaces = await VetraBuilderRelationalDbProcessor.query<DB>(
          SHARED_NAMESPACE_KEY,
          db
        )
          .selectFrom("builder_team_spaces")
          .select([
            "builder_team_spaces.id",
            "builder_team_spaces.builder_team_id",
            "builder_team_spaces.title",
            "builder_team_spaces.description",
            "builder_team_spaces.sort_order",
            "builder_team_spaces.created_at",
            "builder_team_spaces.updated_at",
          ])
          .where("builder_team_id", "=", parent.id)
          .orderBy("sort_order", "asc")
          .execute();

        return spaces.map((space) => ({
          id: space.id,
          builderAccountId: space.builder_team_id,
          title: space.title,
          description: space.description,
          createdAt: space.created_at.toISOString(),
          updatedAt: space.updated_at.toISOString(),
          packages: [], // Will be resolved by field resolver
        }));
      },

      members: async (parent: { id: string }) => {
        const members = await VetraBuilderRelationalDbProcessor.query<DB>(
          SHARED_NAMESPACE_KEY,
          db
        )
          .selectFrom("builder_team_members")
          .select([
            "builder_team_members.id",
            "builder_team_members.builder_team_id",
            "builder_team_members.phid",
            "builder_team_members.name",
            "builder_team_members.profile_image",
            "builder_team_members.eth_address",
            "builder_team_members.created_at",
          ])
          .where("builder_team_id", "=", parent.id)
          .execute();

        return members.map((member) => ({
          id: member.id,
          builderAccountId: member.builder_team_id,
          phid: member.phid,
          name: member.name,
          profileImage: member.profile_image,
          ethAddress: member.eth_address,
          createdAt: member.created_at.toISOString(),
        }));
      },
    },

    BuilderTeamSpace: {
      packages: async (parent: { id: string }) => {
        const packages = await VetraBuilderRelationalDbProcessor.query<DB>(
          SHARED_NAMESPACE_KEY,
          db
        )
          .selectFrom("builder_team_packages")
          .select([
            "builder_team_packages.id",
            "builder_team_packages.space_id",
            "builder_team_packages.title",
            "builder_team_packages.description",
            "builder_team_packages.category",
            "builder_team_packages.author_name",
            "builder_team_packages.author_website",
            "builder_team_packages.github_url",
            "builder_team_packages.npm_url",
            "builder_team_packages.vetra_drive_url",
            "builder_team_packages.drive_id",
            "builder_team_packages.sort_order",
            "builder_team_packages.created_at",
            "builder_team_packages.updated_at",
          ])
          .leftJoin("builder_team_spaces", (join) =>
            join.onRef(
              "builder_team_spaces.id",
              "=",
              "builder_team_packages.space_id"
            )
          )
          .where("builder_team_packages.space_id", "=", parent.id)
          .orderBy("sort_order", "asc")
          .execute();

        return packages.map((pkg) => ({
          id: pkg.id,
          spaceId: pkg.space_id,
          name: pkg.title,
          description: pkg.description,
          github: pkg.github_url,
          npm: pkg.npm_url,
          vetraDriveUrl: pkg.vetra_drive_url,
          driveId: pkg.drive_id,
          sortOrder: pkg.sort_order,
          createdAt: pkg.created_at.toISOString(),
          updatedAt: pkg.updated_at.toISOString(),
        }));
      },
    },
    Query: {
      fetchAllBuilderTeams: async (
        _parent: unknown,
        args: {
          driveId?: string;
          search?: string;
          sortOrder?: "asc" | "desc";
        }
      ) => {
        const search = args.search;
        const sortOrder = args.sortOrder || "asc";

        let accounts = VetraBuilderRelationalDbProcessor.query<DB>(
          SHARED_NAMESPACE_KEY,
          db
        )
          .selectFrom("builder_teams")
          .selectAll();

        if (search) {
          accounts = accounts.where((eb) => {
            return eb("profile_name", "ilike", `%${search}%`)
              .or("profile_slug", "ilike", `%${search}%`)
              .or("profile_description", "ilike", `%${search}%`);
          });
        }

        // Add sorting by profile_name
        accounts = accounts.orderBy("profile_name", sortOrder);

        const results = await accounts.execute();

        return results.map((account) => ({
          id: account.id,
          profileName: account.profile_name,
          profileSlug: account.profile_slug,
          profileLogo: account.profile_logo,
          profileDescription: account.profile_description,
          profileSocialsX: account.profile_socials_x,
          profileSocialsGithub: account.profile_socials_github,
          profileSocialsWebsite: account.profile_socials_website,
          sourceDriveId: account.source_drive_id,
          createdAt: account.created_at.toISOString(),
          updatedAt: account.updated_at.toISOString(),
          spaces: [], // Will be resolved by field resolver
          members: [], // Will be resolved by field resolver
        }));
      },

      fetchBuilderTeam: async (
        _parent: unknown,
        args: { driveId?: string; id?: string; slug?: string }
      ) => {
        // Require either id or slug
        if (!args.id && !args.slug) {
          throw new Error("Either id or slug parameter is required");
        }

        // NB: previously this query did a LEFT JOIN against `deleted_files` to
        // hide soft-deleted teams. That table doesn't exist in the live
        // drive's relational schema, so every call errored with
        // `relation "<schema>.deleted_files" does not exist`. Removed for
        // parity with `fetchBuilderTeamsByMember`; re-add once the
        // deleted_files convention is provisioned across drives.
        let query = VetraBuilderRelationalDbProcessor.query<DB>(
          SHARED_NAMESPACE_KEY,
          db
        )
          .selectFrom("builder_teams")
          .select([
            "builder_teams.id",
            "builder_teams.profile_name",
            "builder_teams.profile_slug",
            "builder_teams.profile_logo",
            "builder_teams.profile_description",
            "builder_teams.profile_socials_x",
            "builder_teams.profile_socials_github",
            "builder_teams.profile_socials_website",
            "builder_teams.source_drive_id",
            "builder_teams.created_at",
            "builder_teams.updated_at",
          ]);

        // Query by id or slug
        if (args.id) {
          query = query.where("builder_teams.id", "=", args.id);
        } else if (args.slug) {
          query = query.where("builder_teams.profile_slug", "=", args.slug);
        }

        const account = await query.executeTakeFirst();

        if (!account) {
          return null;
        }

        return {
          id: account.id,
          profileName: account.profile_name,
          profileSlug: account.profile_slug,
          profileLogo: account.profile_logo,
          profileDescription: account.profile_description,
          profileSocialsX: account.profile_socials_x,
          profileSocialsGithub: account.profile_socials_github,
          profileSocialsWebsite: account.profile_socials_website,
          sourceDriveId: account.source_drive_id,
          createdAt: account.created_at.toISOString(),
          updatedAt: account.updated_at.toISOString(),
          spaces: [], // Will be resolved by field resolver
          members: [], // Will be resolved by field resolver
        };
      },

      fetchBuilderAccount: async (
        _parent: unknown,
        args: { ethAddress: string }
      ) => {
        // BuilderAccount documents live in `user:<eth-lowercase>` drives.
        // Match against source_drive_id rather than a column-on-the-row
        // because the eth address is the drive identifier; the account doc
        // itself doesn't store it directly.
        const sourceDriveId = `user:${args.ethAddress.toLowerCase()}`;
        const row = await VetraBuilderRelationalDbProcessor.query<DB>(
          SHARED_NAMESPACE_KEY,
          db
        )
          .selectFrom("builder_accounts")
          .selectAll()
          .where("source_drive_id", "=", sourceDriveId)
          .executeTakeFirst();
        if (!row) return null;
        return {
          id: row.id,
          sourceDriveId: row.source_drive_id,
          profileName: row.profile_name,
          profileSlug: row.profile_slug,
          profileLogo: row.profile_logo,
          profileDescription: row.profile_description,
          profileSocialsX: row.profile_socials_x,
          profileSocialsGithub: row.profile_socials_github,
          profileSocialsWebsite: row.profile_socials_website,
          createdAt: row.created_at.toISOString(),
          updatedAt: row.updated_at.toISOString(),
        };
      },

      fetchBuilderTeamsByMember: async (
        _parent: unknown,
        args: { driveId?: string; ethAddress: string }
      ) => {
        const address = args.ethAddress.toLowerCase();

        const rows = await VetraBuilderRelationalDbProcessor.query<DB>(
          SHARED_NAMESPACE_KEY,
          db
        )
          .selectFrom("builder_teams")
          .innerJoin(
            "builder_team_members",
            "builder_team_members.builder_team_id",
            "builder_teams.id"
          )
          .where(
            sql<boolean>`LOWER(builder_team_members.eth_address) = ${address}`
          )
          .select([
            "builder_teams.id",
            "builder_teams.profile_name",
            "builder_teams.profile_slug",
            "builder_teams.profile_logo",
            "builder_teams.profile_description",
            "builder_teams.profile_socials_x",
            "builder_teams.profile_socials_github",
            "builder_teams.profile_socials_website",
            "builder_teams.source_drive_id",
            "builder_teams.created_at",
            "builder_teams.updated_at",
          ])
          .distinct()
          .orderBy("profile_name", "asc")
          .execute();

        return rows.map((account) => ({
          id: account.id,
          profileName: account.profile_name,
          profileSlug: account.profile_slug,
          profileLogo: account.profile_logo,
          profileDescription: account.profile_description,
          profileSocialsX: account.profile_socials_x,
          profileSocialsGithub: account.profile_socials_github,
          profileSocialsWebsite: account.profile_socials_website,
          sourceDriveId: account.source_drive_id,
          createdAt: account.created_at.toISOString(),
          updatedAt: account.updated_at.toISOString(),
          spaces: [],
          members: [],
        }));
      },
    },
  };
};
