import { BaseDocumentClass } from "document-model";
import { BuilderAccountPHState } from "../ph-factories.js";
import {
  type AddSpaceInput,
  type DeleteSpaceInput,
  type SetSpaceTitleInput,
  type SetSpaceDescriptionInput,
  type ReorderSpacesInput,
} from "../types.js";
import {
  addSpace,
  deleteSpace,
  setSpaceTitle,
  setSpaceDescription,
  reorderSpaces,
} from "./creators.js";
import { type BuilderAccountAction } from "../actions.js";

export default class BuilderAccount_Spaces extends BaseDocumentClass<BuilderAccountPHState> {
  public addSpace(input: AddSpaceInput) {
    return this.dispatch(addSpace(input));
  }

  public deleteSpace(input: DeleteSpaceInput) {
    return this.dispatch(deleteSpace(input));
  }

  public setSpaceTitle(input: SetSpaceTitleInput) {
    return this.dispatch(setSpaceTitle(input));
  }

  public setSpaceDescription(input: SetSpaceDescriptionInput) {
    return this.dispatch(setSpaceDescription(input));
  }

  public reorderSpaces(input: ReorderSpacesInput) {
    return this.dispatch(reorderSpaces(input));
  }
}
