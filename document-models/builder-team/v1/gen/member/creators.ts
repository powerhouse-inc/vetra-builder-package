import { createAction } from "document-model/core";
import {
  AddMemberInputSchema,
  UpdateMemberInfoInputSchema,
  RemoveMemberInputSchema,
} from "../schema/zod.js";
import type {
  AddMemberInput,
  UpdateMemberInfoInput,
  RemoveMemberInput,
} from "../types.js";
import type {
  AddMemberAction,
  UpdateMemberInfoAction,
  RemoveMemberAction,
} from "./actions.js";

export const addMember = (input: AddMemberInput) =>
  createAction<AddMemberAction>(
    "ADD_MEMBER",
    { ...input },
    undefined,
    AddMemberInputSchema,
    "global",
  );

export const updateMemberInfo = (input: UpdateMemberInfoInput) =>
  createAction<UpdateMemberInfoAction>(
    "UPDATE_MEMBER_INFO",
    { ...input },
    undefined,
    UpdateMemberInfoInputSchema,
    "global",
  );

export const removeMember = (input: RemoveMemberInput) =>
  createAction<RemoveMemberAction>(
    "REMOVE_MEMBER",
    { ...input },
    undefined,
    RemoveMemberInputSchema,
    "global",
  );
