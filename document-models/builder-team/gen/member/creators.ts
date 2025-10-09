import { createAction } from "document-model";
import {
  z,
  type AddMemberInput,
  type UpdateMemberInfoInput,
  type RemoveMemberInput,
} from "../types.js";
import {
  type AddMemberAction,
  type UpdateMemberInfoAction,
  type RemoveMemberAction,
} from "./actions.js";

export const addMember = (input: AddMemberInput) =>
  createAction<AddMemberAction>(
    "ADD_MEMBER",
    { ...input },
    undefined,
    z.AddMemberInputSchema,
    "global",
  );

export const updateMemberInfo = (input: UpdateMemberInfoInput) =>
  createAction<UpdateMemberInfoAction>(
    "UPDATE_MEMBER_INFO",
    { ...input },
    undefined,
    z.UpdateMemberInfoInputSchema,
    "global",
  );

export const removeMember = (input: RemoveMemberInput) =>
  createAction<RemoveMemberAction>(
    "REMOVE_MEMBER",
    { ...input },
    undefined,
    z.RemoveMemberInputSchema,
    "global",
  );
