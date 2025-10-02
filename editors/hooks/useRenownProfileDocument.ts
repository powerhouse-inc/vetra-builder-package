import {
  useDocumentOfType,
  useSelectedDocumentId,
} from "@powerhousedao/reactor-browser";
import type {
  RenownProfileAction,
  RenownProfileDocument,
} from "../../document-models/renown-profile/index.js";

export function useRenownProfileDocument(
  documentId: string | null | undefined,
) {
  return useDocumentOfType<RenownProfileDocument, RenownProfileAction>(
    documentId,
    "powerhouse/renown-profile",
  );
}

export function useSelectedRenownProfileDocument() {
  const selectedDocumentId = useSelectedDocumentId();
  return useRenownProfileDocument(selectedDocumentId);
}
