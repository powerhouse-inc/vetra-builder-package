import { PHDocumentController } from "document-model/core";
import { BuilderAccount } from "../module.js";
import type { BuilderAccountAction, BuilderAccountPHState } from "./types.js";

export const BuilderAccountController = PHDocumentController.forDocumentModel<
  BuilderAccountPHState,
  BuilderAccountAction
>(BuilderAccount);
