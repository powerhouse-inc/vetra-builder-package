import type { PHDocument, PHBaseState } from "document-model";
import type { BuilderTeamAction } from "./actions.js";
import type { BuilderTeamState as BuilderTeamGlobalState } from "./schema/types.js";

type BuilderTeamLocalState = Record<PropertyKey, never>;
type BuilderTeamPHState = PHBaseState & {
  global: BuilderTeamGlobalState;
  local: BuilderTeamLocalState;
};
type BuilderTeamDocument = PHDocument<BuilderTeamPHState>;

export * from "./schema/types.js";

export type {
  BuilderTeamGlobalState,
  BuilderTeamLocalState,
  BuilderTeamPHState,
  BuilderTeamAction,
  BuilderTeamDocument,
};
