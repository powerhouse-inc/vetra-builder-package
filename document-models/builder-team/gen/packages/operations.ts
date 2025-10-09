import { type SignalDispatch } from "document-model";
import {
  type AddPackageAction,
  type UpdatePackageInfoAction,
  type RemovePackageAction,
} from "./actions.js";
import { type BuilderTeamState } from "../types.js";

export interface BuilderTeamPackagesOperations {
  addPackageOperation: (
    state: BuilderTeamState,
    action: AddPackageAction,
    dispatch?: SignalDispatch,
  ) => void;
  updatePackageInfoOperation: (
    state: BuilderTeamState,
    action: UpdatePackageInfoAction,
    dispatch?: SignalDispatch,
  ) => void;
  removePackageOperation: (
    state: BuilderTeamState,
    action: RemovePackageAction,
    dispatch?: SignalDispatch,
  ) => void;
}
