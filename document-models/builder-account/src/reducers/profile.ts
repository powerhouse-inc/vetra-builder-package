import type { BuilderAccountProfileOperations } from "../../gen/profile/operations.js";

export const reducer: BuilderAccountProfileOperations = {
  setLogoOperation(state, action, dispatch) {
    state.profile.logo = action.input.logoUrl;
  },
  setProfileNameOperation(state, action, dispatch) {
    state.profile.name = action.input.name;
  },
  setSlugOperation(state, action, dispatch) {
    state.profile.slug = action.input.slug;
  },
  setProfileDescriptionOperation(state, action, dispatch) {
    const { description } = action.input;
    if (description) {
      state.profile.description = description;
    }
  },
  setSocialsOperation(state, action, dispatch) {
    const { x, github, website } = action.input;
    if (x) {
      state.profile.socials.xProfile = x;
    }
    if (github) {
      state.profile.socials.github = github;
    }
    if (website) {
      state.profile.socials.website = website;
    }
  },
};
