import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import {
  useDocumentsInSelectedDrive,
  useDocumentsInSelectedFolder,
  useDocumentById,
  useSelectedDocument,
} from "@powerhousedao/reactor-browser";
import type {
  BuilderAccountDocument,
  BuilderAccountAction,
} from "@powerhousedao/vetra-builder-package/document-models/builder-account";
import { isBuilderAccountDocument } from "./gen/document-schema.js";

/** Hook to get a BuilderAccount document by its id */
export function useBuilderAccountDocumentById(
  documentId: string | null | undefined,
):
  | [BuilderAccountDocument, DocumentDispatch<BuilderAccountAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isBuilderAccountDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected BuilderAccount document */
export function useSelectedBuilderAccountDocument():
  | [BuilderAccountDocument, DocumentDispatch<BuilderAccountAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useSelectedDocument();
  if (!isBuilderAccountDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get all BuilderAccount documents in the selected drive */
export function useBuilderAccountDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isBuilderAccountDocument);
}

/** Hook to get all BuilderAccount documents in the selected folder */
export function useBuilderAccountDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isBuilderAccountDocument);
}
