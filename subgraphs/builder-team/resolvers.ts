import { type ISubgraph } from "@powerhousedao/reactor-api";
import { addFile } from "document-drive";
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
} from "../../document-models/builder-team/index.js";
import { setName } from "document-model";

// Extended types that include sortOrder for internal sorting
type SpaceWithSortOrder = VetraBuilderSpace & { sortOrder: number };
type PackageWithSortOrder = VetraPackageInfo & { sortOrder: number };

export const getResolvers = (subgraph: ISubgraph): Record<string, unknown> => {
  const reactor = subgraph.reactor;

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
              const docIds = await reactor.getDocuments(driveId);
              if (!docIds.includes(docId)) {
                throw new Error(
                  `Document with id ${docId} is not part of ${driveId}`
                );
              }
            }

            const doc = await reactor.getDocument<BuilderTeamDocument>(docId);
            // Sort spaces and packages by sortOrder
            const sortedState = {
              ...doc.state.global,
              spaces: [...doc.state.global.spaces]
                .sort(
                  (a, b) =>
                    (a as SpaceWithSortOrder).sortOrder -
                    (b as SpaceWithSortOrder).sortOrder
                )
                .map((space) => ({
                  ...space,
                  packages: [...space.packages].sort(
                    (a, b) =>
                      (a as PackageWithSortOrder).sortOrder -
                      (b as PackageWithSortOrder).sortOrder
                  ),
                })),
            };
            return {
              driveId: driveId,
              ...doc,
              ...doc.header,
              created: doc.header.createdAtUtcIso,
              lastModified: doc.header.lastModifiedAtUtcIso,
              state: sortedState,
              stateJSON: sortedState,
              revision: doc.header?.revision?.global ?? 0,
            };
          },
          getDocuments: async (args: { driveId: string }) => {
            const { driveId } = args;
            const docsIds = await reactor.getDocuments(driveId);
            const docs = await Promise.all(
              docsIds.map(async (docId) => {
                const doc = await reactor.getDocument<BuilderTeamDocument>(
                  docId
                );
                // Sort spaces and packages by sortOrder
                const sortedState = {
                  ...doc.state.global,
                  spaces: [...doc.state.global.spaces]
                    .sort(
                      (a, b) =>
                        (a as SpaceWithSortOrder).sortOrder -
                        (b as SpaceWithSortOrder).sortOrder
                    )
                    .map((space) => ({
                      ...space,
                      packages: [...space.packages].sort(
                        (a, b) =>
                          (a as PackageWithSortOrder).sortOrder -
                          (b as PackageWithSortOrder).sortOrder
                      ),
                    })),
                };
                return {
                  driveId: driveId,
                  ...doc,
                  ...doc.header,
                  created: doc.header.createdAtUtcIso,
                  lastModified: doc.header.lastModifiedAtUtcIso,
                  state: sortedState,
                  stateJSON: sortedState,
                  revision: doc.header?.revision?.global ?? 0,
                };
              })
            );

            return docs.filter(
              (doc) => doc.header.documentType === "powerhouse/builder-team"
            );
          },
        };
      },
    },
    Mutation: {
      BuilderTeam_createDocument: async (
        _: unknown,
        args: { name: string; driveId?: string }
      ) => {
        const { driveId, name } = args;
        const document = await reactor.addDocument("powerhouse/builder-team");

        if (driveId) {
          await reactor.addAction(
            driveId,
            addFile({
              name,
              id: document.header.id,
              documentType: "powerhouse/builder-team",
            })
          );
        }

        if (name) {
          await reactor.addAction(document.header.id, setName(name));
        }

        return document.header.id;
      },

      BuilderTeam_setLogo: async (
        _: unknown,
        args: { docId: string; input: SetLogoInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderTeamDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(docId, actions.setLogo(input));

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setLogo");
        }

        return true;
      },

      BuilderTeam_setTeamName: async (
        _: unknown,
        args: { docId: string; input: SetTeamNameInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderTeamDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setTeamName(input)
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setTeamName");
        }

        return true;
      },

      BuilderTeam_setSlug: async (
        _: unknown,
        args: { docId: string; input: SetSlugInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderTeamDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(docId, actions.setSlug(input));

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setSlug");
        }

        return true;
      },

      BuilderTeam_setDescription: async (
        _: unknown,
        args: { docId: string; input: SetDescriptionInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderTeamDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setDescription(input)
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setDescription");
        }

        return true;
      },

      BuilderTeam_setSocials: async (
        _: unknown,
        args: { docId: string; input: SetSocialsInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderTeamDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setSocials(input)
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setSocials");
        }

        return true;
      },

      BuilderTeam_addMember: async (
        _: unknown,
        args: { docId: string; input: AddMemberInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderTeamDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(docId, actions.addMember(input));

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addMember");
        }

        return true;
      },

      BuilderTeam_updateMemberInfo: async (
        _: unknown,
        args: { docId: string; input: UpdateMemberInfoInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderTeamDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateMemberInfo(input)
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to updateMemberInfo"
          );
        }

        return true;
      },

      BuilderTeam_removeMember: async (
        _: unknown,
        args: { docId: string; input: RemoveMemberInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderTeamDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeMember(input)
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to removeMember");
        }

        return true;
      },

      BuilderTeam_addSpace: async (
        _: unknown,
        args: { docId: string; input: AddSpaceInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderTeamDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(docId, actions.addSpace(input));

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addSpace");
        }

        return true;
      },

      BuilderTeam_updateSpaceInfo: async (
        _: unknown,
        args: { docId: string; input: UpdateSpaceInfoInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderTeamDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateSpaceInfo(input)
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to updateSpaceInfo");
        }

        return true;
      },

      BuilderTeam_removeSpace: async (
        _: unknown,
        args: { docId: string; input: RemoveSpaceInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderTeamDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeSpace(input)
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to removeSpace");
        }

        return true;
      },

      BuilderTeam_reorderSpaces: async (
        _: unknown,
        args: { docId: string; input: ReorderSpacesInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderTeamDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.reorderSpaces(input)
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to reorderSpaces");
        }

        return true;
      },

      BuilderTeam_addPackage: async (
        _: unknown,
        args: { docId: string; input: AddPackageInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderTeamDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addPackage(input)
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addPackage");
        }

        return true;
      },

      BuilderTeam_updatePackageInfo: async (
        _: unknown,
        args: { docId: string; input: UpdatePackageInfoInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderTeamDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updatePackageInfo(input)
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to updatePackageInfo"
          );
        }

        return true;
      },

      BuilderTeam_removePackage: async (
        _: unknown,
        args: { docId: string; input: RemovePackageInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderTeamDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removePackage(input)
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to removePackage");
        }

        return true;
      },

      BuilderTeam_reorderPackages: async (
        _: unknown,
        args: { docId: string; input: ReorderPackagesInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderTeamDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.reorderPackages(input)
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to reorderPackages");
        }

        return true;
      },
    },
  };
};
