import { BaseDocumentClass } from "document-model";
import { type BuilderTeamPHState } from "../ph-factories.js";
import {
  type AddSpaceInput,
  type UpdateSpaceInfoInput,
  type RemoveSpaceInput,
  type ReorderSpacesInput,
} from "../types.js";
import {
  addSpace,
  updateSpaceInfo,
  removeSpace,
  reorderSpaces,
} from "./creators.js";
import { type BuilderTeamAction } from "../actions.js";

export default class BuilderTeam_Spaces extends BaseDocumentClass<BuilderTeamPHState> {
  public addSpace(input: AddSpaceInput) {
    return this.dispatch(addSpace(input));
  }

  public updateSpaceInfo(input: UpdateSpaceInfoInput) {
    return this.dispatch(updateSpaceInfo(input));
  }

  public removeSpace(input: RemoveSpaceInput) {
    return this.dispatch(removeSpace(input));
  }

  public reorderSpaces(input: ReorderSpacesInput) {
    return this.dispatch(reorderSpaces(input));
  }
}
