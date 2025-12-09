import type { PHDocument, PHBaseState } from "document-model";
import type { BuilderAccountAction } from "./actions.js";
import type { BuilderAccountState as BuilderAccountGlobalState } from "./schema/types.js";

type BuilderAccountLocalState = Record<PropertyKey, never>;
type BuilderAccountPHState = PHBaseState & {
  global: BuilderAccountGlobalState;
  local: BuilderAccountLocalState;
};
type BuilderAccountDocument = PHDocument<BuilderAccountPHState>;

export * from "./schema/types.js";

export type {
  BuilderAccountGlobalState,
  BuilderAccountLocalState,
  BuilderAccountPHState,
  BuilderAccountAction,
  BuilderAccountDocument,
};
