import { BaseDocumentClass } from "document-model";
import { BuilderAccountPHState } from "../ph-factories.js";
import {
  type AddPackageInput,
  type SetPackageDriveIdInput,
  type UpdatePackageInput,
  type ReorderPackagesInput,
  type DeletePackageInput,
} from "../types.js";
import {
  addPackage,
  setPackageDriveId,
  updatePackage,
  reorderPackages,
  deletePackage,
} from "./creators.js";
import { type BuilderAccountAction } from "../actions.js";

export default class BuilderAccount_Packages extends BaseDocumentClass<BuilderAccountPHState> {
  public addPackage(input: AddPackageInput) {
    return this.dispatch(addPackage(input));
  }

  public setPackageDriveId(input: SetPackageDriveIdInput) {
    return this.dispatch(setPackageDriveId(input));
  }

  public updatePackage(input: UpdatePackageInput) {
    return this.dispatch(updatePackage(input));
  }

  public reorderPackages(input: ReorderPackagesInput) {
    return this.dispatch(reorderPackages(input));
  }

  public deletePackage(input: DeletePackageInput) {
    return this.dispatch(deletePackage(input));
  }
}
