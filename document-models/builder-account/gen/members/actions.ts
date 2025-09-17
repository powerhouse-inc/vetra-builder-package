import { type Action } from "document-model";
import type { AddMemberInput, RemoveMemberInput } from "../types.js";

export type AddMemberAction = Action & {
  type: "ADD_MEMBER";
  input: AddMemberInput;
};
export type RemoveMemberAction = Action & {
  type: "REMOVE_MEMBER";
  input: RemoveMemberInput;
};

export type BuilderAccountMembersAction = AddMemberAction | RemoveMemberAction;
