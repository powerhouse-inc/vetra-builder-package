import { renownClient, SEARCH_PROFILES_QUERY, GET_PROFILE_QUERY } from "../utils/graphql.js";
import { config } from "../config.js";
import type { RenownProfile, PHIDOption } from "../types/index.js";
import { truncateAddress } from "../utils/format.js";

interface GetProfilesResponse {
  getProfiles: RenownProfile[];
}

interface GetProfileResponse {
  getProfile: RenownProfile;
}

/**
 * Search for profiles by username or ENS name
 */
export async function searchProfiles(searchString: string): Promise<RenownProfile[]> {
  const data = await renownClient.request<GetProfilesResponse>(SEARCH_PROFILES_QUERY, {
    input: {
      driveId: "renown-profiles",
      searchString,
    },
  });
  return data.getProfiles;
}

/**
 * Get a single profile by document ID
 */
export async function getProfile(documentId: string): Promise<RenownProfile | null> {
  try {
    const data = await renownClient.request<GetProfileResponse>(GET_PROFILE_QUERY, {
      input: {
        id: documentId,
        driveId: "renown-profiles",
      },
    });
    return data.getProfile;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
}

/**
 * Convert a profile to a PHID option for the PHIDField component
 */
export function profileToOption(profile: RenownProfile): PHIDOption {
  return {
    id: profile.documentId,
    title: profile.username,
    value: profile.documentId,
    description: truncateAddress(profile.ethAddress),
    path: {
      text: `${config.renownProfileBasePath}/${profile.documentId}`,
      url: `${config.renownProfileBasePath}/${profile.documentId}`,
    },
    icon: "Person",
  };
}

/**
 * Search for profiles and convert to PHID options
 */
export async function searchProfileOptions(searchString: string): Promise<PHIDOption[]> {
  const profiles = await searchProfiles(searchString);
  return profiles.map(profileToOption);
}

/**
 * Get a profile and convert to PHID option
 */
export async function getProfileOption(documentId: string): Promise<PHIDOption | undefined> {
  const profile = await getProfile(documentId);
  return profile ? profileToOption(profile) : undefined;
}
