import { BaseDocumentClass } from "document-model";
import { BuilderAccountPHState } from "../ph-factories.js";
import { type AddMemberInput, type RemoveMemberInput } from "../types.js";
import { addMember, removeMember } from "./creators.js";
import { type BuilderAccountAction } from "../actions.js";

export default class BuilderAccount_Members extends BaseDocumentClass<BuilderAccountPHState> {
  public addMember(input: AddMemberInput) {
    return this.dispatch(addMember(input));
  }

  public removeMember(input: RemoveMemberInput) {
    return this.dispatch(removeMember(input));
  }
}
