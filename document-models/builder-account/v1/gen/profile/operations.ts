/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { BuilderAccountGlobalState } from "../types.js";
import type {
  SetLogoAction,
  SetProfileDescriptionAction,
  SetProfileNameAction,
  SetSlugAction,
  UpdateSocialsAction,
} from "./actions.js";

export interface BuilderAccountProfileOperations {
  setLogoOperation: (
    state: BuilderAccountGlobalState,
    action: SetLogoAction,
    dispatch?: SignalDispatch,
  ) => void;
  setProfileNameOperation: (
    state: BuilderAccountGlobalState,
    action: SetProfileNameAction,
    dispatch?: SignalDispatch,
  ) => void;
  setSlugOperation: (
    state: BuilderAccountGlobalState,
    action: SetSlugAction,
    dispatch?: SignalDispatch,
  ) => void;
  setProfileDescriptionOperation: (
    state: BuilderAccountGlobalState,
    action: SetProfileDescriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateSocialsOperation: (
    state: BuilderAccountGlobalState,
    action: UpdateSocialsAction,
    dispatch?: SignalDispatch,
  ) => void;
}
