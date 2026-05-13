/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { BuilderTeamGlobalState } from "../types.js";
import type {
  AddPackageAction,
  RemovePackageAction,
  ReorderPackagesAction,
  UpdatePackageInfoAction,
} from "./actions.js";

export interface BuilderTeamPackagesOperations {
  addPackageOperation: (
    state: BuilderTeamGlobalState,
    action: AddPackageAction,
    dispatch?: SignalDispatch,
  ) => void;
  updatePackageInfoOperation: (
    state: BuilderTeamGlobalState,
    action: UpdatePackageInfoAction,
    dispatch?: SignalDispatch,
  ) => void;
  removePackageOperation: (
    state: BuilderTeamGlobalState,
    action: RemovePackageAction,
    dispatch?: SignalDispatch,
  ) => void;
  reorderPackagesOperation: (
    state: BuilderTeamGlobalState,
    action: ReorderPackagesAction,
    dispatch?: SignalDispatch,
  ) => void;
}
