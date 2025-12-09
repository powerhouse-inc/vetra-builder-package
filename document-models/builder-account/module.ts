import type { DocumentModelModule } from "document-model";
import { createState } from "document-model";
import { defaultBaseState } from "document-model/core";
import type { BuilderAccountPHState } from "@powerhousedao/vetra-builder-package/document-models/builder-account";
import {
  actions,
  documentModel,
  reducer,
  utils,
} from "@powerhousedao/vetra-builder-package/document-models/builder-account";

/** Document model module for the Todo List document type */
export const BuilderAccount: DocumentModelModule<BuilderAccountPHState> = {
  reducer,
  actions,
  utils,
  documentModel: createState(defaultBaseState(), documentModel),
};
