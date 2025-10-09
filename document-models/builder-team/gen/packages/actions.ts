import { type Action } from "document-model";
import type {
  AddPackageInput,
  UpdatePackageInfoInput,
  RemovePackageInput,
} from "../types.js";

export type AddPackageAction = Action & {
  type: "ADD_PACKAGE";
  input: AddPackageInput;
};
export type UpdatePackageInfoAction = Action & {
  type: "UPDATE_PACKAGE_INFO";
  input: UpdatePackageInfoInput;
};
export type RemovePackageAction = Action & {
  type: "REMOVE_PACKAGE";
  input: RemovePackageInput;
};

export type BuilderTeamPackagesAction =
  | AddPackageAction
  | UpdatePackageInfoAction
  | RemovePackageAction;
