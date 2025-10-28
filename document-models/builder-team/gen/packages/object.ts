import { BaseDocumentClass } from "document-model";
import { BuilderTeamPHState } from "../ph-factories.js";
import {
  type AddPackageInput,
  type UpdatePackageInfoInput,
  type RemovePackageInput,
  type ReorderPackagesInput,
} from "../types.js";
import {
  addPackage,
  updatePackageInfo,
  removePackage,
  reorderPackages,
} from "./creators.js";
import { type BuilderTeamAction } from "../actions.js";

export default class BuilderTeam_Packages extends BaseDocumentClass<BuilderTeamPHState> {
  public addPackage(input: AddPackageInput) {
    return this.dispatch(addPackage(input));
  }

  public updatePackageInfo(input: UpdatePackageInfoInput) {
    return this.dispatch(updatePackageInfo(input));
  }

  public removePackage(input: RemovePackageInput) {
    return this.dispatch(removePackage(input));
  }

  public reorderPackages(input: ReorderPackagesInput) {
    return this.dispatch(reorderPackages(input));
  }
}
