import { type SignalDispatch } from "document-model";
import {
  type SetUsernameAction,
  type SetEthAddressAction,
  type SetUserImageAction,
} from "./actions.js";
import { type RenownProfileState } from "../types.js";

export interface RenownProfileProfileOperations {
  setUsernameOperation: (
    state: RenownProfileState,
    action: SetUsernameAction,
    dispatch?: SignalDispatch,
  ) => void;
  setEthAddressOperation: (
    state: RenownProfileState,
    action: SetEthAddressAction,
    dispatch?: SignalDispatch,
  ) => void;
  setUserImageOperation: (
    state: RenownProfileState,
    action: SetUserImageAction,
    dispatch?: SignalDispatch,
  ) => void;
}
