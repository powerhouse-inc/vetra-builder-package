import { type SignalDispatch } from "document-model";
import type {
  AddSpaceAction,
  DeleteSpaceAction,
  SetSpaceTitleAction,
  SetSpaceDescriptionAction,
  ReorderSpacesAction,
} from "./actions.js";
import type { BuilderAccountState } from "../types.js";

export interface BuilderAccountSpacesOperations {
  addSpaceOperation: (
    state: BuilderAccountState,
    action: AddSpaceAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteSpaceOperation: (
    state: BuilderAccountState,
    action: DeleteSpaceAction,
    dispatch?: SignalDispatch,
  ) => void;
  setSpaceTitleOperation: (
    state: BuilderAccountState,
    action: SetSpaceTitleAction,
    dispatch?: SignalDispatch,
  ) => void;
  setSpaceDescriptionOperation: (
    state: BuilderAccountState,
    action: SetSpaceDescriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  reorderSpacesOperation: (
    state: BuilderAccountState,
    action: ReorderSpacesAction,
    dispatch?: SignalDispatch,
  ) => void;
}
