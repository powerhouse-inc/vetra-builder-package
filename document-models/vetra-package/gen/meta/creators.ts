import { createAction } from "document-model";
import {
  z,
  type SetPackageNameInput,
  type SetPackageDescriptionInput,
  type SetPackageCategoryInput,
  type SetPackageGithubInput,
  type SetPackageNpmInput,
  type SetAuthorInput,
  type AddKeywordsInput,
  type RemoveKeywordsInput,
} from "../types.js";
import {
  type SetPackageNameAction,
  type SetPackageDescriptionAction,
  type SetPackageCategoryAction,
  type SetPackageGithubAction,
  type SetPackageNpmAction,
  type SetAuthorAction,
  type AddKeywordsAction,
  type RemoveKeywordsAction,
} from "./actions.js";

export const setPackageName = (input: SetPackageNameInput) =>
  createAction<SetPackageNameAction>(
    "SET_PACKAGE_NAME",
    { ...input },
    undefined,
    z.SetPackageNameInputSchema,
    "global",
  );

export const setPackageDescription = (input: SetPackageDescriptionInput) =>
  createAction<SetPackageDescriptionAction>(
    "SET_PACKAGE_DESCRIPTION",
    { ...input },
    undefined,
    z.SetPackageDescriptionInputSchema,
    "global",
  );

export const setPackageCategory = (input: SetPackageCategoryInput) =>
  createAction<SetPackageCategoryAction>(
    "SET_PACKAGE_CATEGORY",
    { ...input },
    undefined,
    z.SetPackageCategoryInputSchema,
    "global",
  );

export const setPackageGithub = (input: SetPackageGithubInput) =>
  createAction<SetPackageGithubAction>(
    "SET_PACKAGE_GITHUB",
    { ...input },
    undefined,
    z.SetPackageGithubInputSchema,
    "global",
  );

export const setPackageNpm = (input: SetPackageNpmInput) =>
  createAction<SetPackageNpmAction>(
    "SET_PACKAGE_NPM",
    { ...input },
    undefined,
    z.SetPackageNpmInputSchema,
    "global",
  );

export const setAuthor = (input: SetAuthorInput) =>
  createAction<SetAuthorAction>(
    "SET_AUTHOR",
    { ...input },
    undefined,
    z.SetAuthorInputSchema,
    "global",
  );

export const addKeywords = (input: AddKeywordsInput) =>
  createAction<AddKeywordsAction>(
    "ADD_KEYWORDS",
    { ...input },
    undefined,
    z.AddKeywordsInputSchema,
    "global",
  );

export const removeKeywords = (input: RemoveKeywordsInput) =>
  createAction<RemoveKeywordsAction>(
    "REMOVE_KEYWORDS",
    { ...input },
    undefined,
    z.RemoveKeywordsInputSchema,
    "global",
  );
