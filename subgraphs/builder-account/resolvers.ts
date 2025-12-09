import type { BaseSubgraph } from "@powerhousedao/reactor-api";
import { addFile } from "document-drive";
import {
  actions,
  type SetLogoInput,
  type SetProfileNameInput,
  type SetSlugInput,
  type SetProfileDescriptionInput,
  type UpdateSocialsInput,
  type AddMemberInput,
  type RemoveMemberInput,
  type AddSpaceInput,
  type DeleteSpaceInput,
  type SetSpaceTitleInput,
  type SetSpaceDescriptionInput,
  type ReorderSpacesInput,
  type AddPackageInput,
  type SetPackageDriveIdInput,
  type UpdatePackageInput,
  type ReorderPackagesInput,
  type DeletePackageInput,
  type BuilderAccountDocument,
} from "../../document-models/builder-account/index.js";
import { setName } from "document-model";

export const getResolvers = (subgraph: BaseSubgraph): Record<string, unknown> => {
  const reactor = subgraph.reactor;

  return {
    Query: {
      BuilderAccount: async () => {
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
                  `Document with id ${docId} is not part of ${driveId}`,
                );
              }
            }

            const doc =
              await reactor.getDocument<BuilderAccountDocument>(docId);
            return {
              driveId: driveId,
              ...doc,
              ...doc.header,
              created: doc.header.createdAtUtcIso,
              lastModified: doc.header.lastModifiedAtUtcIso,
              state: doc.state.global,
              stateJSON: doc.state.global,
              revision: doc.header?.revision?.global ?? 0,
            };
          },
          getDocuments: async (args: { driveId: string }) => {
            const { driveId } = args;
            const docsIds = await reactor.getDocuments(driveId);
            const docs = await Promise.all(
              docsIds.map(async (docId) => {
                const doc =
                  await reactor.getDocument<BuilderAccountDocument>(docId);
                return {
                  driveId: driveId,
                  ...doc,
                  ...doc.header,
                  created: doc.header.createdAtUtcIso,
                  lastModified: doc.header.lastModifiedAtUtcIso,
                  state: doc.state.global,
                  stateJSON: doc.state.global,
                  revision: doc.header?.revision?.global ?? 0,
                };
              }),
            );

            return docs.filter(
              (doc) =>
                doc.header.documentType === "powerhouse/vetra/builder-account",
            );
          },
        };
      },
    },
    Mutation: {
      BuilderAccount_createDocument: async (
        _: unknown,
        args: { name: string; driveId?: string },
      ) => {
        const { driveId, name } = args;
        const document = await reactor.addDocument(
          "powerhouse/vetra/builder-account",
        );

        if (driveId) {
          await reactor.addAction(
            driveId,
            addFile({
              name,
              id: document.header.id,
              documentType: "powerhouse/vetra/builder-account",
            }),
          );
        }

        if (name) {
          await reactor.addAction(document.header.id, setName(name));
        }

        return document.header.id;
      },

      BuilderAccount_setLogo: async (
        _: unknown,
        args: { docId: string; input: SetLogoInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(docId, actions.setLogo(input));

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setLogo");
        }

        return true;
      },

      BuilderAccount_setProfileName: async (
        _: unknown,
        args: { docId: string; input: SetProfileNameInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setProfileName(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setProfileName");
        }

        return true;
      },

      BuilderAccount_setSlug: async (
        _: unknown,
        args: { docId: string; input: SetSlugInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(docId, actions.setSlug(input));

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setSlug");
        }

        return true;
      },

      BuilderAccount_setProfileDescription: async (
        _: unknown,
        args: { docId: string; input: SetProfileDescriptionInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setProfileDescription(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setProfileDescription",
          );
        }

        return true;
      },

      BuilderAccount_updateSocials: async (
        _: unknown,
        args: { docId: string; input: UpdateSocialsInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateSocials(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to updateSocials");
        }

        return true;
      },

      BuilderAccount_addMember: async (
        _: unknown,
        args: { docId: string; input: AddMemberInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(docId, actions.addMember(input));

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addMember");
        }

        return true;
      },

      BuilderAccount_removeMember: async (
        _: unknown,
        args: { docId: string; input: RemoveMemberInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeMember(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to removeMember");
        }

        return true;
      },

      BuilderAccount_addSpace: async (
        _: unknown,
        args: { docId: string; input: AddSpaceInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(docId, actions.addSpace(input));

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addSpace");
        }

        return true;
      },

      BuilderAccount_deleteSpace: async (
        _: unknown,
        args: { docId: string; input: DeleteSpaceInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.deleteSpace(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to deleteSpace");
        }

        return true;
      },

      BuilderAccount_setSpaceTitle: async (
        _: unknown,
        args: { docId: string; input: SetSpaceTitleInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setSpaceTitle(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setSpaceTitle");
        }

        return true;
      },

      BuilderAccount_setSpaceDescription: async (
        _: unknown,
        args: { docId: string; input: SetSpaceDescriptionInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setSpaceDescription(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setSpaceDescription",
          );
        }

        return true;
      },

      BuilderAccount_reorderSpaces: async (
        _: unknown,
        args: { docId: string; input: ReorderSpacesInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.reorderSpaces(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to reorderSpaces");
        }

        return true;
      },

      BuilderAccount_addPackage: async (
        _: unknown,
        args: { docId: string; input: AddPackageInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addPackage(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addPackage");
        }

        return true;
      },

      BuilderAccount_setPackageDriveId: async (
        _: unknown,
        args: { docId: string; input: SetPackageDriveIdInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setPackageDriveId(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setPackageDriveId",
          );
        }

        return true;
      },

      BuilderAccount_updatePackage: async (
        _: unknown,
        args: { docId: string; input: UpdatePackageInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updatePackage(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to updatePackage");
        }

        return true;
      },

      BuilderAccount_reorderPackages: async (
        _: unknown,
        args: { docId: string; input: ReorderPackagesInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.reorderPackages(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to reorderPackages");
        }

        return true;
      },

      BuilderAccount_deletePackage: async (
        _: unknown,
        args: { docId: string; input: DeletePackageInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.deletePackage(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to deletePackage");
        }

        return true;
      },
    },
  };
};
