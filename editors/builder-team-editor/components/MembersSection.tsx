import { Button, Form, PHIDField } from "@powerhousedao/document-engineering";
import { useState } from "react";
import { GraphQLClient } from "graphql-request";
import type { BuilderTeamDocument } from "../../../document-models/builder-team/index.js";
import { config } from "../config.js";

const graphqlClient = new GraphQLClient(config.renownGraphqlEndpoint);

const SEARCH_PROFILES_QUERY = `
  query ($input: GetProfilesInput!) {
    getProfiles(input: $input) {
      documentId
      ethAddress
      updatedAt
      userImage
      username
    }
  }
`;

interface MemberProfileData {
  phid: string;
  ethAddress: string;
  name: string;
  profileImage?: string;
}

interface MembersSectionProps {
  members: BuilderTeamDocument["state"]["global"]["members"];
  onAddMember: (profileData: MemberProfileData) => boolean;
  onRemoveMember: (id: string) => void;
}

export function MembersSection({
  members,
  onAddMember,
  onRemoveMember,
}: MembersSectionProps) {
  const [selectedProfile, setSelectedProfile] = useState<{
    documentId: string;
    ethAddress: string;
    username: string;
    userImage?: string;
  } | null>(null);

  // Cache of profiles from the last search to avoid refetching on select
  const [profilesCache, setProfilesCache] = useState<
    Map<
      string,
      {
        documentId: string;
        ethAddress: string;
        username: string;
        userImage?: string;
      }
    >
  >(new Map());

  const handleAddMember = () => {
    if (selectedProfile) {
      const success = onAddMember({
        phid: selectedProfile.documentId,
        ethAddress: selectedProfile.ethAddress,
        name: selectedProfile.username,
        profileImage: selectedProfile.userImage,
      });
      if (success) {
        setSelectedProfile(null);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
        <p className="text-sm text-gray-500">Manage team access</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <Form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
            <div className="space-y-3">
              <PHIDField
                name="memberProfile"
                label="Search for team member"
                value={selectedProfile?.documentId ?? undefined}
                initialOptions={
                  selectedProfile
                    ? [
                        {
                          value: selectedProfile.documentId,
                          title: selectedProfile.username,
                          description: selectedProfile.ethAddress,
                          path: {
                            text: `${config.renownProfileBasePath}/${selectedProfile.username}`,
                            url: `${config.renownProfileBasePath}/${selectedProfile.username}`,
                          },
                        },
                      ]
                    : []
                }
                allowUris={false}
                autoComplete={true}
                fetchOptionsCallback={async (userInput) => {
                  const data = await graphqlClient.request<{
                    getProfiles: {
                      documentId: string;
                      ethAddress: string;
                      username: string;
                      userImage?: string;
                      updatedAt: string;
                    }[];
                  }>(SEARCH_PROFILES_QUERY, {
                    input: {
                      driveId: "renown-profiles",
                      searchString: userInput,
                    },
                  });

                  // Update the cache with the search results
                  const newCache = new Map(profilesCache);
                  data.getProfiles.forEach((profile) => {
                    newCache.set(profile.documentId, {
                      documentId: profile.documentId,
                      ethAddress: profile.ethAddress,
                      username: profile.username,
                      userImage: profile.userImage,
                    });
                  });
                  setProfilesCache(newCache);

                  return data.getProfiles.map((profile) => ({
                    id: profile.documentId,
                    title: profile.username,
                    value: profile.documentId,
                    description: profile.ethAddress,
                    path: {
                      text: `${config.renownProfileBasePath}/${profile.username}`,
                      url: `${config.renownProfileBasePath}/${profile.username}`,
                    },
                  }));
                }}
                fetchSelectedOptionCallback={async (value) => {
                  // First check cache
                  const cachedProfile = profilesCache.get(value);
                  if (cachedProfile) {
                    setSelectedProfile(cachedProfile);
                    return {
                      title: cachedProfile.username,
                      value: cachedProfile.documentId,
                      description: cachedProfile.ethAddress,
                      path: {
                        text: `${config.renownProfileBasePath}/${cachedProfile.username}`,
                        url: `${config.renownProfileBasePath}/${cachedProfile.username}`,
                      },
                    };
                  }

                  // If not in cache, fetch by searching for the documentId
                  // Note: This is a fallback that may not work perfectly
                  // Ideally the API would support querying by documentId directly
                  const data = await graphqlClient.request<{
                    getProfiles: {
                      documentId: string;
                      ethAddress: string;
                      username: string;
                      userImage?: string;
                      updatedAt: string;
                    }[];
                  }>(SEARCH_PROFILES_QUERY, {
                    input: {
                      driveId: "renown-profiles",
                      searchString: value,
                    },
                  });

                  const profile =
                    data.getProfiles.find((p) => p.documentId === value) ||
                    data.getProfiles[0];
                  if (!profile) {
                    return;
                  }

                  const profileData = {
                    documentId: profile.documentId,
                    ethAddress: profile.ethAddress,
                    username: profile.username,
                    userImage: profile.userImage,
                  };

                  setSelectedProfile(profileData);

                  // Update cache
                  const newCache = new Map(profilesCache);
                  newCache.set(profile.documentId, profileData);
                  setProfilesCache(newCache);

                  return {
                    title: profile.username,
                    value: profile.documentId,
                    description: profile.ethAddress,
                    path: {
                      text: `${config.renownProfileBasePath}/${profile.username}`,
                      url: `${config.renownProfileBasePath}/${profile.username}`,
                    },
                  };
                }}
                onChange={(value) => {
                  if (!value) {
                    setSelectedProfile(null);
                    return;
                  }

                  // Use cached profile data if available
                  const profile = profilesCache.get(value);
                  if (profile) {
                    setSelectedProfile(profile);
                  }
                }}
                variant="withValueTitleAndDescription"
                required={false}
                viewMode="edition"
                placeholder="Enter username or ENS name"
              />
              <div className="flex justify-end">
                <Button onClick={handleAddMember} disabled={!selectedProfile}>
                  Add Member
                </Button>
              </div>
            </div>
          </Form>

          <div className="space-y-2">
            {members.length > 0 ? (
              members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded border hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => {
                    if (member.phid) {
                      const profile = {
                        documentId: member.phid,
                        ethAddress: member.ethAddress || "",
                        username: member.name || member.ethAddress || "",
                        userImage: member.profileImage ?? undefined,
                      };
                      setSelectedProfile(profile);

                      // Update cache
                      const newCache = new Map(profilesCache);
                      newCache.set(member.phid, profile);
                      setProfilesCache(newCache);
                    }
                  }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {member.profileImage ? (
                      <img
                        src={member.profileImage}
                        alt={member.name || "Profile"}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 text-sm font-medium">
                          {(member.name || member.ethAddress || "?")[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">
                        {member.name || "Unknown"}
                      </div>
                      <div className="text-xs font-mono text-gray-500 truncate">
                        {member.ethAddress}
                      </div>
                      {member.phid && member.name && (
                        <a
                          href={`${config.renownProfileBasePath}/${member.name}`}
                          className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {config.renownProfileBasePath}/{member.name}
                        </a>
                      )}
                    </div>
                  </div>
                  <Button
                    color="red"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveMember(member.id);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No team members added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
