import { createAction } from "document-model/core";
import {
  AddMemberInputSchema,
  RemoveMemberInputSchema,
} from "../schema/zod.js";
import type { AddMemberInput, RemoveMemberInput } from "../types.js";
import type { AddMemberAction, RemoveMemberAction } from "./actions.js";

export const addMember = (input: AddMemberInput) =>
  createAction<AddMemberAction>(
    "ADD_MEMBER",
    { ...input },
    undefined,
    AddMemberInputSchema,
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
