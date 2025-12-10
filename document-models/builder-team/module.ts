import type { DocumentModelModule } from "document-model";
import { createState } from "document-model";
import { defaultBaseState } from "document-model/core";
import type { BuilderTeamPHState } from "@powerhousedao/vetra-builder-package/document-models/builder-team";
import {
  actions,
  documentModel,
  reducer,
  utils,
} from "@powerhousedao/vetra-builder-package/document-models/builder-team";

/** Document model module for the Todo List document type */
export const BuilderTeam: DocumentModelModule<BuilderTeamPHState> = {
  reducer,
  actions,
  utils,
  documentModel: createState(defaultBaseState(), documentModel),
};
