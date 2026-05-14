import type { BuilderAccountProfileOperations } from "document-models/builder-account/v1";

export const builderAccountProfileOperations: BuilderAccountProfileOperations =
  {
    setLogoOperation(state, action) {
      const { logoUrl } = action.input;
      state.profile.logo = logoUrl;
    },
    setProfileNameOperation(state, action) {
      const { name } = action.input;
      state.profile.name = name;
    },
    setSlugOperation(state, action) {
      const { slug } = action.input;
      state.profile.slug = slug;
    },
    setProfileDescriptionOperation(state, action) {
      const { description } = action.input;
      state.profile.description = description ?? null;
    },
    updateSocialsOperation(state, action) {
      const { x, github, website } = action.input;
      state.profile.socials = {
        xProfile: x ?? state.profile.socials.xProfile,
        github: github ?? state.profile.socials.github,
        website: website ?? state.profile.socials.website,
      };
    },
  };
