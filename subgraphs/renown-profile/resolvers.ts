import { type Subgraph } from "@powerhousedao/reactor-api";
import { addFile } from "document-drive";
import { setName } from "document-model";
import { RenownProfileProcessor } from "../../processors/renown-profile/index.js";
import type { DB } from "../../processors/renown-profile/schema.js";
import {
  actions,
  type AddAuthorizationInput,
  type RenownProfileDocument,
  type RevokeAuthorizationInput,
  type SetEthAddressInput,
  type SetUserImageInput,
  type SetUsernameInput,
} from "../../document-models/renown-profile/index.js";

export const getResolvers = (subgraph: Subgraph): Record<string, unknown> => {
  const reactor = subgraph.reactor;
  const db = subgraph.relationalDb;
  return {
    Query: {
      Renown: async () => {
        return {
          getProfile: async (args: { ethAddress: string; driveId: string }) => {
            const { ethAddress, driveId } = args;
            const profile = await RenownProfileProcessor.query<DB>(driveId, db)
              .selectFrom("renown_profile")
              .selectAll()
              .where("eth_address", "=", ethAddress)
              .executeTakeFirst();

            return {
              ...profile,
              documentId: profile?.document_id,
              ethAddress: profile?.eth_address,
              username: profile?.username,
              userImage: profile?.user_image,
              createdAt: profile?.created_at,
              updatedAt: profile?.updated_at,
            };
          },
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

            const doc = await reactor.getDocument<RenownProfileDocument>(docId);
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
                const doc = await reactor.getDocument<RenownProfileDocument>(
                  docId
                );
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
              })
            );

            return docs.filter(
              (doc) => doc.header.documentType === "powerhouse/renown-profile"
            );
          },
        };
      },
    },
    Mutation: {
      RenownProfile_createDocument: async (
        _: unknown,
        args: { name: string; driveId?: string }
      ) => {
        const { driveId, name } = args;
        const document = await reactor.addDocument("powerhouse/renown-profile");

        if (driveId) {
          await reactor.addAction(
            driveId,
            addFile({
              name,
              id: document.header.id,
              documentType: "powerhouse/renown-profile",
            })
          );
        }

        if (name) {
          await reactor.addAction(document.header.id, setName(name));
        }

        return document.header.id;
      },

      RenownProfile_setUsername: async (
        _: unknown,
        args: { docId: string; input: SetUsernameInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<RenownProfileDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setUsername(input)
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setUsername");
        }

        return true;
      },

      RenownProfile_setEthAddress: async (
        _: unknown,
        args: { docId: string; input: SetEthAddressInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<RenownProfileDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setEthAddress(input)
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setEthAddress");
        }

        return true;
      },

      RenownProfile_setUserImage: async (
        _: unknown,
        args: { docId: string; input: SetUserImageInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<RenownProfileDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.setUserImage(input)
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to setUserImage");
        }

        return true;
      },

      RenownProfile_addAuthorization: async (
        _: unknown,
        args: { docId: string; input: AddAuthorizationInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<RenownProfileDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addAuthorization(input)
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to addAuthorization"
          );
        }

        return true;
      },

      RenownProfile_revokeAuthorization: async (
        _: unknown,
        args: { docId: string; input: RevokeAuthorizationInput }
      ) => {
        const { docId, input } = args;
        const doc = await reactor.getDocument<RenownProfileDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.revokeAuthorization(input)
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to revokeAuthorization"
          );
        }

        return true;
      },
    },
  };
};
