import { type Subgraph } from "@powerhousedao/reactor-api";
import { type DB } from "../../processors/vetra-builder-relational-db-processor/schema.js";
import { VetraBuilderRelationalDbProcessor } from "../../processors/vetra-builder-relational-db-processor/index.js";

export const getResolvers = (subgraph: Subgraph): Record<string, unknown> => {
  const reactor = subgraph.reactor;
  const db = subgraph.relationalDb;
  const DEFAULT_DRIVE_ID = process.env.VETRA_BUILDER_DRIVE_ID || "powerhouse";

  return {
    BuilderTeamType: {
      spaces: async (
        parent: { id: string },
        args: unknown,
        context: { driveId?: string }
      ) => {
        const driveId = context.driveId || DEFAULT_DRIVE_ID;
        const spaces = await VetraBuilderRelationalDbProcessor.query<DB>(
          driveId,
          db
        )
          .selectFrom("builder_team_spaces")
          .selectAll()
          .leftJoin("deleted_files", (join) =>
            join
              .onRef(
                "deleted_files.document_id",
                "=",
                "builder_team_spaces.builder_team_id"
              )
              .on("deleted_files.drive_id", "=", driveId)
          )
          .where("builder_team_id", "=", parent.id)
          .where("deleted_files.id", "is", null) // Exclude spaces from deleted accounts
          .orderBy("sort_order", "asc")
          .execute();

        return spaces.map((space) => ({
          id: space.id,
          builderAccountId: space.builder_team_id,
          title: space.title,
          description: space.description,
          sortOrder: space.sort_order,
          createdAt: space.created_at.toISOString(),
          updatedAt: space.updated_at.toISOString(),
          driveId: driveId, // Pass driveId to field resolvers
          packages: [], // Will be resolved by field resolver
        }));
      },

      members: async (
        parent: { id: string },
        args: unknown,
        context: { driveId?: string }
      ) => {
        const driveId = context.driveId || DEFAULT_DRIVE_ID;
        const members = await VetraBuilderRelationalDbProcessor.query<DB>(
          driveId,
          db
        )
          .selectFrom("builder_team_members")
          .selectAll()
          .leftJoin("deleted_files", (join) =>
            join
              .onRef(
                "deleted_files.document_id",
                "=",
                "builder_team_members.builder_team_id"
              )
              .on("deleted_files.drive_id", "=", driveId)
          )
          .where("builder_team_id", "=", parent.id)
          .where("deleted_files.id", "is", null) // Exclude members from deleted accounts
          .execute();

        return members.map((member) => ({
          id: member.id,
          builderAccountId: member.builder_team_id,
          ethAddress: member.eth_address,
          createdAt: member.created_at.toISOString(),
        }));
      },
    },

    BuilderTeamSpace: {
      packages: async (
        parent: { id: string; driveId?: string },
        args: unknown,
        context: { driveId?: string }
      ) => {
        const driveId = parent.driveId || context.driveId || DEFAULT_DRIVE_ID;
        const packages = await VetraBuilderRelationalDbProcessor.query<DB>(
          driveId,
          db
        )
          .selectFrom("builder_team_packages")
          .selectAll()
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
          title: pkg.title,
          description: pkg.description,
          category: pkg.category,
          authorName: pkg.author_name,
          authorWebsite: pkg.author_website,
          githubUrl: pkg.github_url,
          npmUrl: pkg.npm_url,
          vetraDriveUrl: pkg.vetra_drive_url,
          driveId: pkg.drive_id,
          sortOrder: pkg.sort_order,
          createdAt: pkg.created_at.toISOString(),
          updatedAt: pkg.updated_at.toISOString(),
          keywords: [], // Will be resolved by field resolver
        }));
      },
    },
    Query: {
      fetchAllBuilderTeams: async (
        parent: unknown,
        args: {
          driveId?: string;
          search?: string;
          sortOrder?: "asc" | "desc";
        }
      ) => {
        const driveId = args.driveId || DEFAULT_DRIVE_ID;
        const search = args.search;
        const sortOrder = args.sortOrder || "asc";

        let accounts = VetraBuilderRelationalDbProcessor.query<DB>(driveId, db)
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
          createdAt: account.created_at.toISOString(),
          updatedAt: account.updated_at.toISOString(),
          driveId: driveId, // Pass driveId to field resolvers
          spaces: [], // Will be resolved by field resolver
          members: [], // Will be resolved by field resolver
        }));
      },

      fetchBuilderTeam: async (
        parent: unknown,
        args: { driveId?: string; id: string }
      ) => {
        const driveId = args.driveId || DEFAULT_DRIVE_ID;
        const account = await VetraBuilderRelationalDbProcessor.query<DB>(
          driveId,
          db
        )
          .selectFrom("builder_teams")
          .selectAll()
          .leftJoin("deleted_files", (join) =>
            join
              .onRef("deleted_files.document_id", "=", "builder_teams.id")
              .on("deleted_files.drive_id", "=", driveId)
          )
          .where("builder_teams.id", "=", args.id)
          .where("deleted_files.id", "is", null) // Exclude deleted documents
          .executeTakeFirst();

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
          createdAt: account.created_at.toISOString(),
          updatedAt: account.updated_at.toISOString(),
          driveId: driveId, // Pass driveId to field resolvers
        };
      },
    },
  };
};
