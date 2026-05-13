/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddMemberInput,
  RemoveMemberInput,
  UpdateMemberInfoInput,
} from "../types.js";

export type AddMemberAction = Action & {
  type: "ADD_MEMBER";
  input: AddMemberInput;
};
export type UpdateMemberInfoAction = Action & {
  type: "UPDATE_MEMBER_INFO";
  input: UpdateMemberInfoInput;
};
export type RemoveMemberAction = Action & {
  type: "REMOVE_MEMBER";
  input: RemoveMemberInput;
};

export type BuilderTeamMemberAction =
  | AddMemberAction
  | UpdateMemberInfoAction
  | RemoveMemberAction;
