import type { BuilderTeamProfileOperations } from "@powerhousedao/vetra-builder-package/document-models/builder-team";

export const builderTeamProfileOperations: BuilderTeamProfileOperations = {
  setLogoOperation(state, action) {
    const { logo } = action.input;
    state.profile.logo = logo ?? state.profile.logo;
  },
  setTeamNameOperation(state, action) {
    const { name } = action.input;
    state.profile.name = name ?? state.profile.name;
  },
  setSlugOperation(state, action) {
    const { slug } = action.input;
    state.profile.slug = slug;
  },
  setDescriptionOperation(state, action) {
    const { description } = action.input;
    state.profile.description = description ?? state.profile.description;
  },
  setSocialsOperation(state, action) {
    const { github, website, xProfile } = action.input;
    state.profile.socials = {
      github: github ?? state.profile.socials.github,
      website: website ?? state.profile.socials.website,
      xProfile: xProfile ?? state.profile.socials.xProfile,
    };
  },
};
