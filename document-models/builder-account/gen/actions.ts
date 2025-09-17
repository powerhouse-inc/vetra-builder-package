import type { BuilderAccountProfileAction } from "./profile/actions.js";
import type { BuilderAccountMembersAction } from "./members/actions.js";
import type { BuilderAccountSpacesAction } from "./spaces/actions.js";

export * from "./profile/actions.js";
export * from "./members/actions.js";
export * from "./spaces/actions.js";

export type BuilderAccountAction =
  | BuilderAccountProfileAction
  | BuilderAccountMembersAction
  | BuilderAccountSpacesAction;
