import { useCallback } from "react";
import {
  type BuilderTeamDocument,
  actions,
} from "../../../document-models/builder-team/index.js";
import { type Action } from "document-model";
import { type DocumentDispatch } from "@powerhousedao/reactor-browser";

export function useProfileHandlers(
  profile: BuilderTeamDocument["state"]["global"]["profile"],
  dispatch: DocumentDispatch<Action>
) {
  const handleSetProfileName = useCallback(
    (name: string) => {
      if (name.trim() && name !== profile.name) {
        dispatch(actions.setTeamName({ name: name.trim() }));
      }
    },
    [profile.name, dispatch]
  );

  const handleSetSlug = useCallback(
    (slug: string) => {
      if (slug.trim() && slug !== profile.slug) {
        dispatch(actions.setSlug({ slug: slug.trim() }));
      }
    },
    [profile.slug, dispatch]
  );

  const handleSetProfileDescription = useCallback(
    (description: string) => {
      if (description !== profile.description) {
        dispatch(
          actions.setDescription({ description: description.trim() || null })
        );
      }
    },
    [profile.description, dispatch]
  );

  const handleSetLogo = useCallback(
    (logoUrl: string) => {
      if (logoUrl.trim() && logoUrl !== profile.logo) {
        dispatch(actions.setLogo({ logo: logoUrl.trim() }));
      }
    },
    [profile.logo, dispatch]
  );

  const handleUpdateSocials = useCallback(
    (socials: {
      github?: string | null;
      website?: string | null;
      x?: string | null;
    }) => {
      dispatch(
        actions.setSocials({
          github: socials.github?.trim() || null,
          website: socials.website?.trim() || null,
          xProfile: socials.x?.trim() || null,
        })
      );
    },
    [dispatch]
  );

  return {
    handleSetProfileName,
    handleSetSlug,
    handleSetProfileDescription,
    handleSetLogo,
    handleUpdateSocials,
  };
}
