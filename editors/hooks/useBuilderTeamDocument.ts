import {
  useDocumentOfType,
  useSelectedDocumentId,
} from "@powerhousedao/reactor-browser";
import type {
  BuilderTeamAction,
  BuilderTeamDocument,
} from "../../document-models/builder-team/index.js";

export function useBuilderTeamDocument(documentId: string | null | undefined) {
  return useDocumentOfType<BuilderTeamDocument, BuilderTeamAction>(
    documentId,
    "powerhouse/builder-team",
  );
}

export function useSelectedBuilderTeamDocument() {
  const selectedDocumentId = useSelectedDocumentId();
  return useBuilderTeamDocument(selectedDocumentId);
}
