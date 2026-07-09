/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { BuilderAccountGlobalState } from "../types.js";
import type {
  AddSpaceAction,
  DeleteSpaceAction,
  ReorderSpacesAction,
  SetSpaceDescriptionAction,
  SetSpaceTitleAction,
} from "./actions.js";

export interface BuilderAccountSpacesOperations {
  addSpaceOperation: (
    state: BuilderAccountGlobalState,
    action: AddSpaceAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteSpaceOperation: (
    state: BuilderAccountGlobalState,
    action: DeleteSpaceAction,
    dispatch?: SignalDispatch,
  ) => void;
  setSpaceTitleOperation: (
    state: BuilderAccountGlobalState,
    action: SetSpaceTitleAction,
    dispatch?: SignalDispatch,
  ) => void;
  setSpaceDescriptionOperation: (
    state: BuilderAccountGlobalState,
    action: SetSpaceDescriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  reorderSpacesOperation: (
    state: BuilderAccountGlobalState,
    action: ReorderSpacesAction,
    dispatch?: SignalDispatch,
  ) => void;
}
