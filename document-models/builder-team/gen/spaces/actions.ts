import { type Action } from "document-model";
import type {
  AddSpaceInput,
  UpdateSpaceInfoInput,
  RemoveSpaceInput,
  ReorderSpacesInput,
} from "../types.js";

export type AddSpaceAction = Action & {
  type: "ADD_SPACE";
  input: AddSpaceInput;
};
export type UpdateSpaceInfoAction = Action & {
  type: "UPDATE_SPACE_INFO";
  input: UpdateSpaceInfoInput;
};
export type RemoveSpaceAction = Action & {
  type: "REMOVE_SPACE";
  input: RemoveSpaceInput;
};
export type ReorderSpacesAction = Action & {
  type: "REORDER_SPACES";
  input: ReorderSpacesInput;
};

export type BuilderTeamSpacesAction =
  | AddSpaceAction
  | UpdateSpaceInfoAction
  | RemoveSpaceAction
  | ReorderSpacesAction;
