import { createAction } from "document-model";
import {
  z,
  type AddAuthorizationInput,
  type RevokeAuthorizationInput,
} from "../types.js";
import {
  type AddAuthorizationAction,
  type RevokeAuthorizationAction,
} from "./actions.js";

export const addAuthorization = (input: AddAuthorizationInput) =>
  createAction<AddAuthorizationAction>(
    "ADD_AUTHORIZATION",
    { ...input },
    undefined,
    z.AddAuthorizationInputSchema,
    "global",
  );

export const revokeAuthorization = (input: RevokeAuthorizationInput) =>
  createAction<RevokeAuthorizationAction>(
    "REVOKE_AUTHORIZATION",
    { ...input },
    undefined,
    z.RevokeAuthorizationInputSchema,
    "global",
  );
