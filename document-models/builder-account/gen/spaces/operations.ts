import { type SignalDispatch } from "document-model";
import {
  type AddSpaceAction,
  type RemoveSpaceAction,
  type AddPackageToSpaceAction,
  type RemovePackageFromSpaceAction,
} from "./actions.js";
import { type BuilderAccountState } from "../types.js";

export interface BuilderAccountSpacesOperations {
  addSpaceOperation: (
    state: BuilderAccountState,
    action: AddSpaceAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeSpaceOperation: (
    state: BuilderAccountState,
    action: RemoveSpaceAction,
    dispatch?: SignalDispatch,
  ) => void;
  addPackageToSpaceOperation: (
    state: BuilderAccountState,
    action: AddPackageToSpaceAction,
    dispatch?: SignalDispatch,
  ) => void;
  removePackageFromSpaceOperation: (
    state: BuilderAccountState,
    action: RemovePackageFromSpaceAction,
    dispatch?: SignalDispatch,
  ) => void;
}
