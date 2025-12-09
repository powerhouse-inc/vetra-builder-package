import type { BuilderAccountProfileOperations } from "@powerhousedao/vetra-builder-package/document-models/builder-account";

export const builderAccountProfileOperations: BuilderAccountProfileOperations = {
  setLogoOperation(state, action, dispatch) {
    const { logoUrl } = action.input;
    state.profile.logo = logoUrl ?? state.profile.logo;
  },
  setProfileNameOperation(state, action, dispatch) {
    const { name } = action.input;
    state.profile.name = name ?? state.profile.name;
  },
  setSlugOperation(state, action, dispatch) {
    const { slug } = action.input;
    state.profile.slug = slug;
  },
  setProfileDescriptionOperation(state, action, dispatch) {
    const { description } = action.input;
    state.profile.description = description ?? state.profile.description;
  },
  updateSocialsOperation(state, action, dispatch) {
    const { github, website, x } = action.input;
    state.profile.socials = {
      github: github ?? state.profile.socials.github,
      website: website ?? state.profile.socials.website,
      xProfile: x ?? state.profile.socials.xProfile,
    };
  },
};
