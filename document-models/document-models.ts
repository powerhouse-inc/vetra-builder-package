import type { DocumentModelModule } from "document-model";
import { BuilderTeam } from "./builder-team/module.js";

export const documentModels: DocumentModelModule<any>[] = [
  BuilderTeam,
];
