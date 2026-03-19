import { type SignalDispatch } from "document-model";
import type {
  AddPackageAction,
  SetPackageDriveIdAction,
  UpdatePackageAction,
  ReorderPackagesAction,
  DeletePackageAction,
} from "./actions.js";
import type { BuilderAccountState } from "../types.js";

export interface BuilderAccountPackagesOperations {
  addPackageOperation: (
    state: BuilderAccountState,
    action: AddPackageAction,
    dispatch?: SignalDispatch,
  ) => void;
  setPackageDriveIdOperation: (
    state: BuilderAccountState,
    action: SetPackageDriveIdAction,
    dispatch?: SignalDispatch,
  ) => void;
  updatePackageOperation: (
    state: BuilderAccountState,
    action: UpdatePackageAction,
    dispatch?: SignalDispatch,
  ) => void;
  reorderPackagesOperation: (
    state: BuilderAccountState,
    action: ReorderPackagesAction,
    dispatch?: SignalDispatch,
  ) => void;
  deletePackageOperation: (
    state: BuilderAccountState,
    action: DeletePackageAction,
    dispatch?: SignalDispatch,
  ) => void;
}
