import { BaseDocumentClass } from "document-model";
import { type BuilderTeamPHState } from "../ph-factories.js";
import {
  type SetLogoInput,
  type SetTeamNameInput,
  type SetSlugInput,
  type SetDescriptionInput,
  type SetSocialsInput,
} from "../types.js";
import {
  setLogo,
  setTeamName,
  setSlug,
  setDescription,
  setSocials,
} from "./creators.js";
import { type BuilderTeamAction } from "../actions.js";

export default class BuilderTeam_Profile extends BaseDocumentClass<BuilderTeamPHState> {
  public setLogo(input: SetLogoInput) {
    return this.dispatch(setLogo(input));
  }

  public setTeamName(input: SetTeamNameInput) {
    return this.dispatch(setTeamName(input));
  }

  public setSlug(input: SetSlugInput) {
    return this.dispatch(setSlug(input));
  }

  public setDescription(input: SetDescriptionInput) {
    return this.dispatch(setDescription(input));
  }

  public setSocials(input: SetSocialsInput) {
    return this.dispatch(setSocials(input));
  }
}
