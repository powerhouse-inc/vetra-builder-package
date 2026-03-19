import type { DocumentModelModule } from "document-model";
import { createState } from "document-model";
import { defaultBaseState } from "document-model/core";
import type { BuilderAccountPHState } from "@powerhousedao/vetra-builder-package/document-models/builder-account/v1";
import {
  actions,
  documentModel,
  reducer,
  utils,
} from "@powerhousedao/vetra-builder-package/document-models/builder-account/v1";

/** Document model module for the BuilderAccount document type */
export const BuilderAccount: DocumentModelModule<BuilderAccountPHState> = {
  version: 1,
  reducer,
  actions,
  utils,
  documentModel: createState(defaultBaseState(), documentModel),
};
