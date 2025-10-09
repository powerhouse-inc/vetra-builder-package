import { type SignalDispatch } from "document-model";
import {
  type SetLogoAction,
  type SetTeamNameAction,
  type SetSlugAction,
  type SetDescriptionAction,
  type SetSocialsAction,
} from "./actions.js";
import { type BuilderTeamState } from "../types.js";

export interface BuilderTeamProfileOperations {
  setLogoOperation: (
    state: BuilderTeamState,
    action: SetLogoAction,
    dispatch?: SignalDispatch,
  ) => void;
  setTeamNameOperation: (
    state: BuilderTeamState,
    action: SetTeamNameAction,
    dispatch?: SignalDispatch,
  ) => void;
  setSlugOperation: (
    state: BuilderTeamState,
    action: SetSlugAction,
    dispatch?: SignalDispatch,
  ) => void;
  setDescriptionOperation: (
    state: BuilderTeamState,
    action: SetDescriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  setSocialsOperation: (
    state: BuilderTeamState,
    action: SetSocialsAction,
    dispatch?: SignalDispatch,
  ) => void;
}
