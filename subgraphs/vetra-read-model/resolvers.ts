import { type Subgraph } from "@powerhousedao/reactor-api";
import { VetraReadModelProcessor } from "processors";
import { type DB } from "processors/vetra-read-model/schema";

export const getResolvers = (subgraph: Subgraph): Record<string, unknown> => {
  const reactor = subgraph.reactor;
  const db = subgraph.relationalDb;

  return {
    Query: {
      fetchAllBuilderAccounts: async (
        parent: unknown,
        args: unknown,
        context: { driveId?: string }
      ) => {
        const driveId = context.driveId || "default";
        const accounts = await VetraReadModelProcessor.query<DB>(driveId, db)
          .selectFrom("builder_accounts")
          .selectAll()
          .execute();

        return accounts.map((account) => ({
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
          spaces: [], // Will be resolved by field resolver
          members: [], // Will be resolved by field resolver
        }));
      },

      fetchBuilderAccount: async (
        parent: unknown,
        args: { id: string },
        context: { driveId?: string }
      ) => {
        const driveId = context.driveId || "default";
        const account = await VetraReadModelProcessor.query<DB>(driveId, db)
          .selectFrom("builder_accounts")
          .selectAll()
          .where("id", "=", args.id)
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
          spaces: [], // Will be resolved by field resolver
          members: [], // Will be resolved by field resolver
        };
      },
    },

    BuilderAccount: {
      spaces: async (
        parent: { id: string },
        args: unknown,
        context: { driveId?: string }
      ) => {
        const driveId = context.driveId || "default";
        const spaces = await VetraReadModelProcessor.query<DB>(driveId, db)
          .selectFrom("builder_spaces")
          .selectAll()
          .where("builder_account_id", "=", parent.id)
          .orderBy("sort_order", "asc")
          .execute();

        return spaces.map((space) => ({
          id: space.id,
          builderAccountId: space.builder_account_id,
          title: space.title,
          description: space.description,
          sortOrder: space.sort_order,
          createdAt: space.created_at.toISOString(),
          updatedAt: space.updated_at.toISOString(),
          packages: [], // Will be resolved by field resolver
        }));
      },

      members: async (
        parent: { id: string },
        args: unknown,
        context: { driveId?: string }
      ) => {
        const driveId = context.driveId || "default";
        const members = await VetraReadModelProcessor.query<DB>(driveId, db)
          .selectFrom("builder_account_members")
          .selectAll()
          .where("builder_account_id", "=", parent.id)
          .execute();

        return members.map((member) => ({
          id: member.id,
          builderAccountId: member.builder_account_id,
          ethAddress: member.eth_address,
          createdAt: member.created_at.toISOString(),
        }));
      },
    },

    BuilderSpace: {
      packages: async (
        parent: { id: string },
        args: unknown,
        context: { driveId?: string }
      ) => {
        const driveId = context.driveId || "default";
        const packages = await VetraReadModelProcessor.query<DB>(driveId, db)
          .selectFrom("builder_packages")
          .selectAll()
          .where("space_id", "=", parent.id)
          .orderBy("sort_order", "asc")
          .execute();

        return packages.map((pkg) => ({
          id: pkg.id,
          spaceId: pkg.space_id,
          name: pkg.name,
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

    BuilderPackage: {
      keywords: async (
        parent: { id: string },
        args: unknown,
        context: { driveId?: string }
      ) => {
        const driveId = context.driveId || "default";
        const keywords = await VetraReadModelProcessor.query<DB>(driveId, db)
          .selectFrom("builder_package_keywords")
          .selectAll()
          .where("package_id", "=", parent.id)
          .execute();

        return keywords.map((keyword) => ({
          id: keyword.id,
          packageId: keyword.package_id,
          label: keyword.label,
          createdAt: keyword.created_at.toISOString(),
        }));
      },
    },
  };
};
