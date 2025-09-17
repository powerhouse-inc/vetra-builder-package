import { type Action } from "document-model";
import type {
  SetPackageNameInput,
  SetPackageDescriptionInput,
  SetPackageCategoryInput,
  SetPackageGithubInput,
  SetPackageNpmInput,
  SetAuthorInput,
  AddKeywordsInput,
  RemoveKeywordsInput,
} from "../types.js";

export type SetPackageNameAction = Action & {
  type: "SET_PACKAGE_NAME";
  input: SetPackageNameInput;
};
export type SetPackageDescriptionAction = Action & {
  type: "SET_PACKAGE_DESCRIPTION";
  input: SetPackageDescriptionInput;
};
export type SetPackageCategoryAction = Action & {
  type: "SET_PACKAGE_CATEGORY";
  input: SetPackageCategoryInput;
};
export type SetPackageGithubAction = Action & {
  type: "SET_PACKAGE_GITHUB";
  input: SetPackageGithubInput;
};
export type SetPackageNpmAction = Action & {
  type: "SET_PACKAGE_NPM";
  input: SetPackageNpmInput;
};
export type SetAuthorAction = Action & {
  type: "SET_AUTHOR";
  input: SetAuthorInput;
};
export type AddKeywordsAction = Action & {
  type: "ADD_KEYWORDS";
  input: AddKeywordsInput;
};
export type RemoveKeywordsAction = Action & {
  type: "REMOVE_KEYWORDS";
  input: RemoveKeywordsInput;
};

export type VetraPackageMetaAction =
  | SetPackageNameAction
  | SetPackageDescriptionAction
  | SetPackageCategoryAction
  | SetPackageGithubAction
  | SetPackageNpmAction
  | SetAuthorAction
  | AddKeywordsAction
  | RemoveKeywordsAction;
