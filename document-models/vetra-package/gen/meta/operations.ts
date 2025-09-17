import { type SignalDispatch } from "document-model";
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
import { type VetraPackageState } from "../types.js";

export interface VetraPackageMetaOperations {
  setPackageNameOperation: (
    state: VetraPackageState,
    action: SetPackageNameAction,
    dispatch?: SignalDispatch,
  ) => void;
  setPackageDescriptionOperation: (
    state: VetraPackageState,
    action: SetPackageDescriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  setPackageCategoryOperation: (
    state: VetraPackageState,
    action: SetPackageCategoryAction,
    dispatch?: SignalDispatch,
  ) => void;
  setPackageGithubOperation: (
    state: VetraPackageState,
    action: SetPackageGithubAction,
    dispatch?: SignalDispatch,
  ) => void;
  setPackageNpmOperation: (
    state: VetraPackageState,
    action: SetPackageNpmAction,
    dispatch?: SignalDispatch,
  ) => void;
  setAuthorOperation: (
    state: VetraPackageState,
    action: SetAuthorAction,
    dispatch?: SignalDispatch,
  ) => void;
  addKeywordsOperation: (
    state: VetraPackageState,
    action: AddKeywordsAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeKeywordsOperation: (
    state: VetraPackageState,
    action: RemoveKeywordsAction,
    dispatch?: SignalDispatch,
  ) => void;
}
