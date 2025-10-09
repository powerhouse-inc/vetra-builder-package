import type { PHDocument } from "document-model";
import type { BuilderTeamAction } from "./actions.js";
import type { BuilderTeamPHState } from "./ph-factories.js";
import type { BuilderTeamState } from "./schema/types.js";

export { z } from "./schema/index.js";
export type * from "./schema/types.js";
type BuilderTeamLocalState = Record<PropertyKey, never>;
export type BuilderTeamDocument = PHDocument<BuilderTeamPHState>;
export type { BuilderTeamState, BuilderTeamLocalState, BuilderTeamAction };
