import { type SignalDispatch } from "document-model";
import {
  type AddAuthorizationAction,
  type RevokeAuthorizationAction,
} from "./actions.js";
import { type RenownProfileState } from "../types.js";

export interface RenownProfileAuthorizationOperations {
  addAuthorizationOperation: (
    state: RenownProfileState,
    action: AddAuthorizationAction,
    dispatch?: SignalDispatch,
  ) => void;
  revokeAuthorizationOperation: (
    state: RenownProfileState,
    action: RevokeAuthorizationAction,
    dispatch?: SignalDispatch,
  ) => void;
}
