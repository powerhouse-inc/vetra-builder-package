import { BaseDocumentClass } from "document-model";
import { RenownProfilePHState } from "../ph-factories.js";
import {
  type AddAuthorizationInput,
  type RevokeAuthorizationInput,
} from "../types.js";
import { addAuthorization, revokeAuthorization } from "./creators.js";
import { type RenownProfileAction } from "../actions.js";

export default class RenownProfile_Authorization extends BaseDocumentClass<RenownProfilePHState> {
  public addAuthorization(input: AddAuthorizationInput) {
    return this.dispatch(addAuthorization(input));
  }

  public revokeAuthorization(input: RevokeAuthorizationInput) {
    return this.dispatch(revokeAuthorization(input));
  }
}
