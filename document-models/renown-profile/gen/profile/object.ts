import { BaseDocumentClass } from "document-model";
import { RenownProfilePHState } from "../ph-factories.js";
import {
  type SetUsernameInput,
  type SetEthAddressInput,
  type SetUserImageInput,
} from "../types.js";
import { setUsername, setEthAddress, setUserImage } from "./creators.js";
import { type RenownProfileAction } from "../actions.js";

export default class RenownProfile_Profile extends BaseDocumentClass<RenownProfilePHState> {
  public setUsername(input: SetUsernameInput) {
    return this.dispatch(setUsername(input));
  }

  public setEthAddress(input: SetEthAddressInput) {
    return this.dispatch(setEthAddress(input));
  }

  public setUserImage(input: SetUserImageInput) {
    return this.dispatch(setUserImage(input));
  }
}
