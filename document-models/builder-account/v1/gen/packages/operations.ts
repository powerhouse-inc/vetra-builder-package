/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { BuilderAccountGlobalState } from "../types.js";
import type {
  AddPackageAction,
  DeletePackageAction,
  ReorderPackagesAction,
  SetPackageDriveIdAction,
  UpdatePackageAction,
} from "./actions.js";

export interface BuilderAccountPackagesOperations {
  addPackageOperation: (
    state: BuilderAccountGlobalState,
    action: AddPackageAction,
    dispatch?: SignalDispatch,
  ) => void;
  setPackageDriveIdOperation: (
    state: BuilderAccountGlobalState,
    action: SetPackageDriveIdAction,
    dispatch?: SignalDispatch,
  ) => void;
  updatePackageOperation: (
    state: BuilderAccountGlobalState,
    action: UpdatePackageAction,
    dispatch?: SignalDispatch,
  ) => void;
  reorderPackagesOperation: (
    state: BuilderAccountGlobalState,
    action: ReorderPackagesAction,
    dispatch?: SignalDispatch,
  ) => void;
  deletePackageOperation: (
    state: BuilderAccountGlobalState,
    action: DeletePackageAction,
    dispatch?: SignalDispatch,
  ) => void;
}
