import type { PHDocument } from "document-model";
import type { RenownProfileAction } from "./actions.js";
import type { RenownProfilePHState } from "./ph-factories.js";
import type { RenownProfileState } from "./schema/types.js";

export { z } from "./schema/index.js";
export type * from "./schema/types.js";
type RenownProfileLocalState = Record<PropertyKey, never>;
export type RenownProfileDocument = PHDocument<RenownProfilePHState>;
export type {
  RenownProfileState,
  RenownProfileLocalState,
  RenownProfileAction,
};
