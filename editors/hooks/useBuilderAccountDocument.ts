import {
    useDocumentOfType,
    useSelectedDocumentId,
    useSelectedDocumentOfType,
    useSelectedDrive,
  } from "@powerhousedao/reactor-browser";

  import type {
    BuilderAccountDocument,
    BuilderAccountAction,
  } from "../../document-models/builder-account/index.js";

  const BUILDER_ACCOUNT_DOCUMENT_TYPE = "powerhouse/vetra/builder-account";

export function useSelectedBuilderAccountDocument() {
    return useSelectedDocumentOfType<BuilderAccountDocument, BuilderAccountAction>(
        BUILDER_ACCOUNT_DOCUMENT_TYPE,
    );
  }