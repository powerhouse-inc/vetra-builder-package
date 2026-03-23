import type { DocumentModelModule } from "document-model";
import { BuilderAccount as BuilderAccountV1 } from "./builder-account/v1/module.js";
import { BuilderTeam } from "./builder-team/module.js";
import { BuilderTeam as BuilderTeamV1 } from "./builder-team/v1/module.js";

export const documentModels: DocumentModelModule<any>[] = [
  BuilderAccountV1,
  BuilderTeam,
  BuilderTeamV1,
];
