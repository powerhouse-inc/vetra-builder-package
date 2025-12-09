import type { DocumentModelModule } from "document-model";
import { BuilderAccount } from "./builder-account/module.js";

export const documentModels: DocumentModelModule<any>[] = [
  BuilderAccount,
];
