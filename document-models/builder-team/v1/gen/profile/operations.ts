/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { BuilderTeamGlobalState } from "../types.js";
import type {
  SetDescriptionAction,
  SetLogoAction,
  SetSlugAction,
  SetSocialsAction,
  SetTeamNameAction,
} from "./actions.js";

export interface BuilderTeamProfileOperations {
  setLogoOperation: (
    state: BuilderTeamGlobalState,
    action: SetLogoAction,
    dispatch?: SignalDispatch,
  ) => void;
  setTeamNameOperation: (
    state: BuilderTeamGlobalState,
    action: SetTeamNameAction,
    dispatch?: SignalDispatch,
  ) => void;
  setSlugOperation: (
    state: BuilderTeamGlobalState,
    action: SetSlugAction,
    dispatch?: SignalDispatch,
  ) => void;
  setDescriptionOperation: (
    state: BuilderTeamGlobalState,
    action: SetDescriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  setSocialsOperation: (
    state: BuilderTeamGlobalState,
    action: SetSocialsAction,
    dispatch?: SignalDispatch,
  ) => void;
}
