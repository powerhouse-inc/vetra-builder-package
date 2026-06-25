import { type BaseSubgraph } from "@powerhousedao/reactor-api";
import {
  actions,
  type SetLogoInput,
  type SetTeamNameInput,
  type SetSlugInput,
  type SetDescriptionInput,
  type SetSocialsInput,
  type AddMemberInput,
  type UpdateMemberInfoInput,
  type RemoveMemberInput,
  type AddSpaceInput,
  type UpdateSpaceInfoInput,
  type RemoveSpaceInput,
  type ReorderSpacesInput,
  type AddPackageInput,
  type UpdatePackageInfoInput,
  type RemovePackageInput,
  type ReorderPackagesInput,
  type BuilderTeamDocument,
  type VetraBuilderSpace,
  type VetraPackageInfo,
} from "document-models/builder-team";
import { setName } from "document-model";

// Extended types that include sortOrder for internal sorting
type SpaceWithSortOrder = VetraBuilderSpace & { sortOrder: number };
type PackageWithSortOrder = VetraPackageInfo & { sortOrder: number };

const sortDocumentState = (doc: BuilderTeamDocument, driveId: string) => {
  const sortedState = {
    ...doc.state.global,
    spaces: [...doc.state.global.spaces]
      .sort(
        (a, b) =>
          (a as SpaceWithSortOrder).sortOrder -
          (b as SpaceWithSortOrder).sortOrder,
      )
      .map((space) => ({
        ...space,
        packages: [...space.packages].sort(
          (a, b) =>
            (a as PackageWithSortOrder).sortOrder -
            (b as PackageWithSortOrder).sortOrder,
        ),
      })),
  };
  return {
    driveId,
    ...doc,
    ...doc.header,
    created: doc.header.createdAtUtcIso,
    lastModified: doc.header.lastModifiedAtUtcIso,
    state: sortedState,
    stateJSON: sortedState,
    revision: doc.header?.revision?.global ?? 0,
  };
};

export const getResolvers = (
  subgraph: BaseSubgraph,
): Record<string, unknown> => {
  const { reactorClient } = subgraph;

  return {
    Query: {
      BuilderTeam: async () => {
        return {
          getDocument: async (args: { docId: string; driveId: string }) => {
            const { docId, driveId } = args;

            if (!docId) {
              throw new Error("Document id is required");
            }

            if (driveId) {
              const docsInDrive = await reactorClient.find({
                type: "powerhouse/builder-team",
                parentId: driveId,
              });
              if (!docsInDrive.results.some((doc) => doc.header.id === docId)) {
                throw new Error(
                  `Document with id ${docId} is not part of ${driveId}`,
                );
              }
            }

            const doc = await reactorClient.get<BuilderTeamDocument>(docId);
            return sortDocumentState(doc, driveId);
          },
          getDocuments: async (args: { driveId: string }) => {
            const { driveId } = args;
            const docsInDrive = await reactorClient.find({
              type: "powerhouse/builder-team",
              parentId: driveId,
            });
            const docs = await Promise.all(
              docsInDrive.results.map(async (result) => {
                const doc = await reactorClient.get<BuilderTeamDocument>(
                  result.header.id,
                );
                return sortDocumentState(doc, driveId);
              }),
            );

            return docs.filter(
              (doc) => doc.header.documentType === "powerhouse/builder-team",
            );
          },
        };
      },
    },
    Mutation: {
      BuilderTeam_createDocument: async (
        _: unknown,
        args: { name: string; driveId?: string },
      ) => {
        const { driveId, name } = args;
        const document = await reactorClient.createEmpty<BuilderTeamDocument>(
          "powerhouse/builder-team",
          driveId ? { parentIdentifier: driveId } : undefined,
        );

        if (name) {
          await reactorClient.execute(document.header.id, "main", [
            setName(name),
          ]);
        }

        return document.header.id;
      },

      BuilderTeam_setLogo: async (
        _: unknown,
        args: { docId: string; input: SetLogoInput },
      ) => {
        const { docId, input } = args;
        await reactorClient.execute(docId, "main", [actions.setLogo(input)]);
        return true;
      },

      BuilderTeam_setTeamName: async (
        _: unknown,
        args: { docId: string; input: SetTeamNameInput },
      ) => {
        const { docId, input } = args;
        await reactorClient.execute(docId, "main", [
          actions.setTeamName(input),
        ]);
        return true;
      },

      BuilderTeam_setSlug: async (
        _: unknown,
        args: { docId: string; input: SetSlugInput },
      ) => {
        const { docId, input } = args;
        await reactorClient.execute(docId, "main", [actions.setSlug(input)]);
        return true;
      },

      BuilderTeam_setDescription: async (
        _: unknown,
        args: { docId: string; input: SetDescriptionInput },
      ) => {
        const { docId, input } = args;
        await reactorClient.execute(docId, "main", [
          actions.setDescription(input),
        ]);
        return true;
      },

      BuilderTeam_setSocials: async (
        _: unknown,
        args: { docId: string; input: SetSocialsInput },
      ) => {
        const { docId, input } = args;
        await reactorClient.execute(docId, "main", [actions.setSocials(input)]);
        return true;
      },

      BuilderTeam_addMember: async (
        _: unknown,
        args: { docId: string; input: AddMemberInput },
      ) => {
        const { docId, input } = args;
        await reactorClient.execute(docId, "main", [actions.addMember(input)]);
        return true;
      },

      BuilderTeam_updateMemberInfo: async (
        _: unknown,
        args: { docId: string; input: UpdateMemberInfoInput },
      ) => {
        const { docId, input } = args;
        await reactorClient.execute(docId, "main", [
          actions.updateMemberInfo(input),
        ]);
        return true;
      },

      BuilderTeam_removeMember: async (
        _: unknown,
        args: { docId: string; input: RemoveMemberInput },
      ) => {
        const { docId, input } = args;
        await reactorClient.execute(docId, "main", [
          actions.removeMember(input),
        ]);
        return true;
      },

      BuilderTeam_addSpace: async (
        _: unknown,
        args: { docId: string; input: AddSpaceInput },
      ) => {
        const { docId, input } = args;
        await reactorClient.execute(docId, "main", [actions.addSpace(input)]);
        return true;
      },

      BuilderTeam_updateSpaceInfo: async (
        _: unknown,
        args: { docId: string; input: UpdateSpaceInfoInput },
      ) => {
        const { docId, input } = args;
        await reactorClient.execute(docId, "main", [
          actions.updateSpaceInfo(input),
        ]);
        return true;
      },

      BuilderTeam_removeSpace: async (
        _: unknown,
        args: { docId: string; input: RemoveSpaceInput },
      ) => {
        const { docId, input } = args;
        await reactorClient.execute(docId, "main", [
          actions.removeSpace(input),
        ]);
        return true;
      },

      BuilderTeam_reorderSpaces: async (
        _: unknown,
        args: { docId: string; input: ReorderSpacesInput },
      ) => {
        const { docId, input } = args;
        await reactorClient.execute(docId, "main", [
          actions.reorderSpaces(input),
        ]);
        return true;
      },

      BuilderTeam_addPackage: async (
        _: unknown,
        args: { docId: string; input: AddPackageInput },
      ) => {
        const { docId, input } = args;
        await reactorClient.execute(docId, "main", [actions.addPackage(input)]);
        return true;
      },

      BuilderTeam_updatePackageInfo: async (
        _: unknown,
        args: { docId: string; input: UpdatePackageInfoInput },
      ) => {
        const { docId, input } = args;
        await reactorClient.execute(docId, "main", [
          actions.updatePackageInfo(input),
        ]);
        return true;
      },

      BuilderTeam_removePackage: async (
        _: unknown,
        args: { docId: string; input: RemovePackageInput },
      ) => {
        const { docId, input } = args;
        await reactorClient.execute(docId, "main", [
          actions.removePackage(input),
        ]);
        return true;
      },

      BuilderTeam_reorderPackages: async (
        _: unknown,
        args: { docId: string; input: ReorderPackagesInput },
      ) => {
        const { docId, input } = args;
        await reactorClient.execute(docId, "main", [
          actions.reorderPackages(input),
        ]);
        return true;
      },
    },
  };
};
