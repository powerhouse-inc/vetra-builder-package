import { PHDocumentController } from "document-model/core";
import { BuilderTeam } from "../module.js";
import type { BuilderTeamAction, BuilderTeamPHState } from "./types.js";

export const BuilderTeamController = PHDocumentController.forDocumentModel<
  BuilderTeamPHState,
  BuilderTeamAction
>(BuilderTeam);
