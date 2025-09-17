import { type SignalDispatch } from "document-model";
import { type AddMemberAction, type RemoveMemberAction } from "./actions.js";
import { type BuilderAccountState } from "../types.js";

export interface BuilderAccountMembersOperations {
  addMemberOperation: (
    state: BuilderAccountState,
    action: AddMemberAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeMemberOperation: (
    state: BuilderAccountState,
    action: RemoveMemberAction,
    dispatch?: SignalDispatch,
  ) => void;
}
