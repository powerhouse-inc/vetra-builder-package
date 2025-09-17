import { BaseDocumentClass } from "document-model";
import { BuilderAccountPHState } from "../ph-factories.js";
import {
  type AddSpaceInput,
  type RemoveSpaceInput,
  type AddPackageToSpaceInput,
  type RemovePackageFromSpaceInput,
} from "../types.js";
import {
  addSpace,
  removeSpace,
  addPackageToSpace,
  removePackageFromSpace,
} from "./creators.js";
import { type BuilderAccountAction } from "../actions.js";

export default class BuilderAccount_Spaces extends BaseDocumentClass<BuilderAccountPHState> {
  public addSpace(input: AddSpaceInput) {
    return this.dispatch(addSpace(input));
  }

  public removeSpace(input: RemoveSpaceInput) {
    return this.dispatch(removeSpace(input));
  }

  public addPackageToSpace(input: AddPackageToSpaceInput) {
    return this.dispatch(addPackageToSpace(input));
  }

  public removePackageFromSpace(input: RemovePackageFromSpaceInput) {
    return this.dispatch(removePackageFromSpace(input));
  }
}
