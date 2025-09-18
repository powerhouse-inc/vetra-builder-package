import { type Action } from "document-model";
import type {
  AddPackageInput,
  SetPackageDriveIdInput,
  UpdatePackageInput,
  ReorderPackagesInput,
  DeletePackageInput,
} from "../types.js";

export type AddPackageAction = Action & {
  type: "ADD_PACKAGE";
  input: AddPackageInput;
};
export type SetPackageDriveIdAction = Action & {
  type: "SET_PACKAGE_DRIVE_ID";
  input: SetPackageDriveIdInput;
};
export type UpdatePackageAction = Action & {
  type: "UPDATE_PACKAGE";
  input: UpdatePackageInput;
};
export type ReorderPackagesAction = Action & {
  type: "REORDER_PACKAGES";
  input: ReorderPackagesInput;
};
export type DeletePackageAction = Action & {
  type: "DELETE_PACKAGE";
  input: DeletePackageInput;
};

export type BuilderAccountPackagesAction =
  | AddPackageAction
  | SetPackageDriveIdAction
  | UpdatePackageAction
  | ReorderPackagesAction
  | DeletePackageAction;
