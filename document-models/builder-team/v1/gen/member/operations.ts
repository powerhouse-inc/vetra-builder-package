/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { BuilderTeamGlobalState } from "../types.js";
import type {
  AddMemberAction,
  RemoveMemberAction,
  UpdateMemberInfoAction,
} from "./actions.js";

export interface BuilderTeamMemberOperations {
  addMemberOperation: (
    state: BuilderTeamGlobalState,
    action: AddMemberAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateMemberInfoOperation: (
    state: BuilderTeamGlobalState,
    action: UpdateMemberInfoAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeMemberOperation: (
    state: BuilderTeamGlobalState,
    action: RemoveMemberAction,
    dispatch?: SignalDispatch,
  ) => void;
}
