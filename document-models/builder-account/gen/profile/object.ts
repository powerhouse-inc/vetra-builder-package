import { BaseDocumentClass } from "document-model";
import { BuilderAccountPHState } from "../ph-factories.js";
import {
  type SetLogoInput,
  type SetProfileNameInput,
  type SetSlugInput,
  type SetProfileDescriptionInput,
  type UpdateSocialsInput,
} from "../types.js";
import {
  setLogo,
  setProfileName,
  setSlug,
  setProfileDescription,
  updateSocials,
} from "./creators.js";
import { type BuilderAccountAction } from "../actions.js";

export default class BuilderAccount_Profile extends BaseDocumentClass<BuilderAccountPHState> {
  public setLogo(input: SetLogoInput) {
    return this.dispatch(setLogo(input));
  }

  public setProfileName(input: SetProfileNameInput) {
    return this.dispatch(setProfileName(input));
  }

  public setSlug(input: SetSlugInput) {
    return this.dispatch(setSlug(input));
  }

  public setProfileDescription(input: SetProfileDescriptionInput) {
    return this.dispatch(setProfileDescription(input));
  }

  public updateSocials(input: UpdateSocialsInput) {
    return this.dispatch(updateSocials(input));
  }
}
