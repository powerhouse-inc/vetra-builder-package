import { BaseDocumentClass } from "document-model";
import { type BuilderTeamPHState } from "../ph-factories.js";
import {
  type AddMemberInput,
  type UpdateMemberInfoInput,
  type RemoveMemberInput,
} from "../types.js";
import { addMember, updateMemberInfo, removeMember } from "./creators.js";
import { type BuilderTeamAction } from "../actions.js";

export default class BuilderTeam_Member extends BaseDocumentClass<BuilderTeamPHState> {
  public addMember(input: AddMemberInput) {
    return this.dispatch(addMember(input));
  }

  public updateMemberInfo(input: UpdateMemberInfoInput) {
    return this.dispatch(updateMemberInfo(input));
  }

  public removeMember(input: RemoveMemberInput) {
    return this.dispatch(removeMember(input));
  }
}
