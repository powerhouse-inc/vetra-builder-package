/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import {
  useDocumentById,
  useDocumentsInSelectedDrive,
  useDocumentsInSelectedFolder,
  useSelectedDocument,
} from "@powerhousedao/reactor-browser";
import type {
  BuilderTeamAction,
  BuilderTeamDocument,
} from "document-models/builder-team/v1";
import {
  assertIsBuilderTeamDocument,
  isBuilderTeamDocument,
} from "./gen/document-schema.js";

/** Hook to get a BuilderTeam document by its id */
export function useBuilderTeamDocumentById(
  documentId: string | null | undefined,
):
  | [BuilderTeamDocument, DocumentDispatch<BuilderTeamAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isBuilderTeamDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected BuilderTeam document */
export function useSelectedBuilderTeamDocument(): [
  BuilderTeamDocument,
  DocumentDispatch<BuilderTeamAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsBuilderTeamDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all BuilderTeam documents in the selected drive */
export function useBuilderTeamDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isBuilderTeamDocument);
}

/** Hook to get all BuilderTeam documents in the selected folder */
export function useBuilderTeamDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isBuilderTeamDocument);
}
