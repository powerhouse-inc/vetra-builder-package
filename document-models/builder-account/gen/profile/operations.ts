import { type SignalDispatch } from "document-model";
import {
  type SetLogoAction,
  type SetProfileNameAction,
  type SetSlugAction,
  type SetProfileDescriptionAction,
  type UpdateSocialsAction,
} from "./actions.js";
import { type BuilderAccountState } from "../types.js";

export interface BuilderAccountProfileOperations {
  setLogoOperation: (
    state: BuilderAccountState,
    action: SetLogoAction,
    dispatch?: SignalDispatch,
  ) => void;
  setProfileNameOperation: (
    state: BuilderAccountState,
    action: SetProfileNameAction,
    dispatch?: SignalDispatch,
  ) => void;
  setSlugOperation: (
    state: BuilderAccountState,
    action: SetSlugAction,
    dispatch?: SignalDispatch,
  ) => void;
  setProfileDescriptionOperation: (
    state: BuilderAccountState,
    action: SetProfileDescriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateSocialsOperation: (
    state: BuilderAccountState,
    action: UpdateSocialsAction,
    dispatch?: SignalDispatch,
  ) => void;
}
