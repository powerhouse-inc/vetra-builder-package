import type { PHDocument } from "document-model";
import type { BuilderAccountAction } from "./actions.js";
import type { BuilderAccountPHState } from "./ph-factories.js";
import type { BuilderAccountState } from "./schema/types.js";

export { z } from "./schema/index.js";
export type * from "./schema/types.js";
type BuilderAccountLocalState = Record<PropertyKey, never>;
export type BuilderAccountDocument = PHDocument<BuilderAccountPHState>;
export type {
  BuilderAccountState,
  BuilderAccountLocalState,
  BuilderAccountAction,
};
