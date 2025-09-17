import { type Subgraph } from "@powerhousedao/reactor-api";
import { addFile } from "document-drive";
import {
  actions,
  type SetPackageNameInput,
  type SetPackageDescriptionInput,
  type SetPackageCategoryInput,
  type SetPackageGithubInput,
  type SetPackageNpmInput,
  type SetAuthorInput,
  type AddKeywordsInput,
  type RemoveKeywordsInput,
  type VetraPackageDocument,
} from "../../document-models/vetra-package/index.js";
import { setName } from "document-model";

export const getResolvers = (subgraph: Subgraph): Record<string, unknown> => {
  const reactor = subgraph.reactor;

  return {
    Query: {
      VetraPackage: async () => {
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

            const doc = await reactor.getDocument<VetraPackageDocument>(docId);
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
                  await reactor.getDocument<VetraPackageDocument>(docId);
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
              (doc) => doc.header.documentType === "powerhouse/vetra/package",
            );
          },
        };
      },
    },
    Mutation: {
      VetraPackage_createDocument: async (
        _: unknown,
        args: { name: string; driveId?: string },
      ) => {
        const { driveId, name } = args;
        const document = await reactor.addDocument("powerhouse/vetra/package");

        if (driveId) {
          await reactor.addAction(
            driveId,
            addFile({
              name,
              id: document.header.id,
              documentType: "powerhouse/vetra/package",
            }),
          );
        }

        if (name) {
          await reactor.addAction(document.header.id, setName(name));
        }

        return document.header.id;
      },

      VetraPackage_setPackageName: async (
        _: unknown,
        args: { docId: string; input: SetPackageNameInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<VetraPackageDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setPackageName(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setPackageName");
        }

        return true;
      },

      VetraPackage_setPackageDescription: async (
        _: unknown,
        args: { docId: string; input: SetPackageDescriptionInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<VetraPackageDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setPackageDescription(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setPackageDescription",
          );
        }

        return true;
      },

      VetraPackage_setPackageCategory: async (
        _: unknown,
        args: { docId: string; input: SetPackageCategoryInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<VetraPackageDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setPackageCategory(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setPackageCategory",
          );
        }

        return true;
      },

      VetraPackage_setPackageGithub: async (
        _: unknown,
        args: { docId: string; input: SetPackageGithubInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<VetraPackageDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setPackageGithub(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to setPackageGithub",
          );
        }

        return true;
      },

      VetraPackage_setPackageNpm: async (
        _: unknown,
        args: { docId: string; input: SetPackageNpmInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<VetraPackageDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setPackageNpm(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setPackageNpm");
        }

        return true;
      },

      VetraPackage_setAuthor: async (
        _: unknown,
        args: { docId: string; input: SetAuthorInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<VetraPackageDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(docId, actions.setAuthor(input));

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setAuthor");
        }

        return true;
      },

      VetraPackage_addKeywords: async (
        _: unknown,
        args: { docId: string; input: AddKeywordsInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<VetraPackageDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addKeywords(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addKeywords");
        }

        return true;
      },

      VetraPackage_removeKeywords: async (
        _: unknown,
        args: { docId: string; input: RemoveKeywordsInput },
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<VetraPackageDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.removeKeywords(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to removeKeywords");
        }

        return true;
      },
    },
  };
};
