import { type Subgraph } from "@powerhousedao/reactor-api";
import { addFile } from "document-drive";
import {
  actions,
  type SetLogoInput,
  type SetProfileNameInput,
  type SetSlugInput,
  type SetProfileDescriptionInput,
  type SetSocialsInput,
  type AddMemberInput,
  type RemoveMemberInput,
  type AddSpaceInput,
  type RemoveSpaceInput,
  type AddPackageToSpaceInput,
  type RemovePackageFromSpaceInput,
  type BuilderAccountDocument,
} from "../../document-models/builder-account/index.js";
import { setName } from "document-model";

export const getResolvers = (subgraph: Subgraph): Record<string, unknown> => {
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

      BuilderAccount_setSocials: async (
        _: unknown,
        args: { docId: string; input: SetSocialsInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setSocials(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setSocials");
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

      BuilderAccount_removeSpace: async (
        _: unknown,
        args: { docId: string; input: RemoveSpaceInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeSpace(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to removeSpace");
        }

        return true;
      },

      BuilderAccount_addPackageToSpace: async (
        _: unknown,
        args: { docId: string; input: AddPackageToSpaceInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addPackageToSpace(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to addPackageToSpace",
          );
        }

        return true;
      },

      BuilderAccount_removePackageFromSpace: async (
        _: unknown,
        args: { docId: string; input: RemovePackageFromSpaceInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<BuilderAccountDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removePackageFromSpace(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to removePackageFromSpace",
          );
        }

        return true;
      },
    },
  };
};
