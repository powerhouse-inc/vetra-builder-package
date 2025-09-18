import { type Action } from "document-model";
import type {
  SetLogoInput,
  SetProfileNameInput,
  SetSlugInput,
  SetProfileDescriptionInput,
  UpdateSocialsInput,
} from "../types.js";

export type SetLogoAction = Action & { type: "SET_LOGO"; input: SetLogoInput };
export type SetProfileNameAction = Action & {
  type: "SET_PROFILE_NAME";
  input: SetProfileNameInput;
};
export type SetSlugAction = Action & { type: "SET_SLUG"; input: SetSlugInput };
export type SetProfileDescriptionAction = Action & {
  type: "SET_PROFILE_DESCRIPTION";
  input: SetProfileDescriptionInput;
};
export type UpdateSocialsAction = Action & {
  type: "UPDATE_SOCIALS";
  input: UpdateSocialsInput;
};

export type BuilderAccountProfileAction =
  | SetLogoAction
  | SetProfileNameAction
  | SetSlugAction
  | SetProfileDescriptionAction
  | UpdateSocialsAction;
