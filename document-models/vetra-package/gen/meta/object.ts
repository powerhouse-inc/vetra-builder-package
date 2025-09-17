import { BaseDocumentClass } from "document-model";
import { VetraPackagePHState } from "../ph-factories.js";
import {
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
  setPackageName,
  setPackageDescription,
  setPackageCategory,
  setPackageGithub,
  setPackageNpm,
  setAuthor,
  addKeywords,
  removeKeywords,
} from "./creators.js";
import { type VetraPackageAction } from "../actions.js";

export default class VetraPackage_Meta extends BaseDocumentClass<VetraPackagePHState> {
  public setPackageName(input: SetPackageNameInput) {
    return this.dispatch(setPackageName(input));
  }

  public setPackageDescription(input: SetPackageDescriptionInput) {
    return this.dispatch(setPackageDescription(input));
  }

  public setPackageCategory(input: SetPackageCategoryInput) {
    return this.dispatch(setPackageCategory(input));
  }

  public setPackageGithub(input: SetPackageGithubInput) {
    return this.dispatch(setPackageGithub(input));
  }

  public setPackageNpm(input: SetPackageNpmInput) {
    return this.dispatch(setPackageNpm(input));
  }

  public setAuthor(input: SetAuthorInput) {
    return this.dispatch(setAuthor(input));
  }

  public addKeywords(input: AddKeywordsInput) {
    return this.dispatch(addKeywords(input));
  }

  public removeKeywords(input: RemoveKeywordsInput) {
    return this.dispatch(removeKeywords(input));
  }
}
