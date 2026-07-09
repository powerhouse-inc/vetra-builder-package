/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { BuilderAccountGlobalState } from "../types.js";
import type { AddMemberAction, RemoveMemberAction } from "./actions.js";

export interface BuilderAccountMembersOperations {
  addMemberOperation: (
    state: BuilderAccountGlobalState,
    action: AddMemberAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeMemberOperation: (
    state: BuilderAccountGlobalState,
    action: RemoveMemberAction,
    dispatch?: SignalDispatch,
  ) => void;
}
