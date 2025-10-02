import type { RenownProfileProfileAction } from "./profile/actions.js";
import type { RenownProfileAuthorizationAction } from "./authorization/actions.js";

export * from "./profile/actions.js";
export * from "./authorization/actions.js";

export type RenownProfileAction =
  | RenownProfileProfileAction
  | RenownProfileAuthorizationAction;
