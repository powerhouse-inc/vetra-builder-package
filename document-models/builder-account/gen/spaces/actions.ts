import { type Action } from "document-model";
import type {
  AddSpaceInput,
  DeleteSpaceInput,
  SetSpaceTitleInput,
  SetSpaceDescriptionInput,
  ReorderSpacesInput,
} from "../types.js";

export type AddSpaceAction = Action & {
  type: "ADD_SPACE";
  input: AddSpaceInput;
};
export type DeleteSpaceAction = Action & {
  type: "DELETE_SPACE";
  input: DeleteSpaceInput;
};
export type SetSpaceTitleAction = Action & {
  type: "SET_SPACE_TITLE";
  input: SetSpaceTitleInput;
};
export type SetSpaceDescriptionAction = Action & {
  type: "SET_SPACE_DESCRIPTION";
  input: SetSpaceDescriptionInput;
};
export type ReorderSpacesAction = Action & {
  type: "REORDER_SPACES";
  input: ReorderSpacesInput;
};

export type BuilderAccountSpacesAction =
  | AddSpaceAction
  | DeleteSpaceAction
  | SetSpaceTitleAction
  | SetSpaceDescriptionAction
  | ReorderSpacesAction;
