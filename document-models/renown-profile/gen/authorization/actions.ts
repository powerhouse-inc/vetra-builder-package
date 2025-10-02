import { type Action } from "document-model";
import type {
  AddAuthorizationInput,
  RevokeAuthorizationInput,
} from "../types.js";

export type AddAuthorizationAction = Action & {
  type: "ADD_AUTHORIZATION";
  input: AddAuthorizationInput;
};
export type RevokeAuthorizationAction = Action & {
  type: "REVOKE_AUTHORIZATION";
  input: RevokeAuthorizationInput;
};

export type RenownProfileAuthorizationAction =
  | AddAuthorizationAction
  | RevokeAuthorizationAction;
