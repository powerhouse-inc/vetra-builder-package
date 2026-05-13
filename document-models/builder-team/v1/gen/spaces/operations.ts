/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { BuilderTeamGlobalState } from "../types.js";
import type {
  AddSpaceAction,
  RemoveSpaceAction,
  ReorderSpacesAction,
  UpdateSpaceInfoAction,
} from "./actions.js";

export interface BuilderTeamSpacesOperations {
  addSpaceOperation: (
    state: BuilderTeamGlobalState,
    action: AddSpaceAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateSpaceInfoOperation: (
    state: BuilderTeamGlobalState,
    action: UpdateSpaceInfoAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeSpaceOperation: (
    state: BuilderTeamGlobalState,
    action: RemoveSpaceAction,
    dispatch?: SignalDispatch,
  ) => void;
  reorderSpacesOperation: (
    state: BuilderTeamGlobalState,
    action: ReorderSpacesAction,
    dispatch?: SignalDispatch,
  ) => void;
}
