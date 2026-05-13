/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddMemberInputSchema,
  RemoveMemberInputSchema,
  UpdateMemberInfoInputSchema,
} from "../schema/zod.js";
import type {
  AddMemberInput,
  RemoveMemberInput,
  UpdateMemberInfoInput,
} from "../types.js";
import type {
  AddMemberAction,
  RemoveMemberAction,
  UpdateMemberInfoAction,
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
