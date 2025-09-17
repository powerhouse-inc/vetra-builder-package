import { type Action } from "document-model";
import type {
  AddSpaceInput,
  RemoveSpaceInput,
  AddPackageToSpaceInput,
  RemovePackageFromSpaceInput,
} from "../types.js";

export type AddSpaceAction = Action & {
  type: "ADD_SPACE";
  input: AddSpaceInput;
};
export type RemoveSpaceAction = Action & {
  type: "REMOVE_SPACE";
  input: RemoveSpaceInput;
};
export type AddPackageToSpaceAction = Action & {
  type: "ADD_PACKAGE_TO_SPACE";
  input: AddPackageToSpaceInput;
};
export type RemovePackageFromSpaceAction = Action & {
  type: "REMOVE_PACKAGE_FROM_SPACE";
  input: RemovePackageFromSpaceInput;
};

export type BuilderAccountSpacesAction =
  | AddSpaceAction
  | RemoveSpaceAction
  | AddPackageToSpaceAction
  | RemovePackageFromSpaceAction;
