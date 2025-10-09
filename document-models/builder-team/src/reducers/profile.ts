import type { BuilderTeamProfileOperations } from "../../gen/profile/operations.js";

export const reducer: BuilderTeamProfileOperations = {
  setLogoOperation(state, action, dispatch) {
    const { logo } = action.input;
    state.profile.logo = logo ?? state.profile.logo;
  },
  setTeamNameOperation(state, action, dispatch) {
    const { name } = action.input;
    state.profile.name = name ?? state.profile.name;
  },
  setSlugOperation(state, action, dispatch) {
    const { slug } = action.input;
    state.profile.slug = slug;
  },
  setDescriptionOperation(state, action, dispatch) {
    const { description } = action.input;
    state.profile.description = description ?? state.profile.description;
  },
  setSocialsOperation(state, action, dispatch) {
    const { github, website, xProfile } = action.input;
    state.profile.socials = {
      github: github ?? state.profile.socials.github,
      website: website ?? state.profile.socials.website,
      xProfile: xProfile ?? state.profile.socials.xProfile,
    };
  },
};
