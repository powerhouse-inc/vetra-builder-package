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

const GET_PROFILE_QUERY = `
  query ($input: GetProfileInput!) {
    getProfile(input: $input) {
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

  // Check if the selected profile is already a member
  const existingMember = selectedProfile
    ? members.find((m) => m.phid === selectedProfile.documentId)
    : null;

  const handleUpdateMember = () => {
    if (selectedProfile && existingMember) {
      // Remove the old member and add the updated one
      onRemoveMember(existingMember.id);
      onAddMember({
        phid: selectedProfile.documentId,
        ethAddress: selectedProfile.ethAddress,
        name: selectedProfile.username,
        profileImage: selectedProfile.userImage,
      });
      setSelectedProfile(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
        <h3 className="text-xl font-bold text-gray-900">Team Members</h3>
        <p className="text-sm text-gray-600 mt-1">Manage team access and permissions</p>
      </div>
      <div className="p-6">
        <div className="space-y-5">
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
                  try {
                    const data = await graphqlClient.request<{
                      getProfile: {
                        documentId: string;
                        ethAddress: string;
                        username: string;
                        userImage?: string;
                        updatedAt: string;
                      };
                    }>(GET_PROFILE_QUERY, {
                      input: {
                        id: value,
                        driveId: "renown-profiles",
                      },
                    });

                    const profile = data.getProfile;
                    if (!profile) {
                      return;
                    }

                    const profileData = {
                      documentId: profile.documentId,
                      ethAddress: profile.ethAddress,
                      username: profile.username,
                      userImage: profile.userImage,
                    };

                    // Update the selected profile state with fresh data
                    setSelectedProfile(profileData);

                    return {
                      title: profile.username,
                      value: profile.documentId,
                      description: profile.ethAddress,
                      path: {
                        text: `${config.renownProfileBasePath}/${profile.username}`,
                        url: `${config.renownProfileBasePath}/${profile.username}`,
                      },
                    };
                  } catch (error) {
                    console.error("Failed to fetch selected profile:", error);
                    return undefined;
                  }
                }}
                onChange={(value) => {
                  if (!value) {
                    setSelectedProfile(null);
                    return;
                  }
                  // Note: The profile data is already set by fetchSelectedOptionCallback
                  // or fetchOptionsCallback, so we don't need to fetch again here
                }}
                variant="withValueTitleAndDescription"
                required={false}
                viewMode="edition"
                placeholder="Enter username or ENS name"
              />
              <div className="flex justify-end">
                {existingMember ? (
                  <Button onClick={handleUpdateMember} disabled={!selectedProfile}>
                    Update Member
                  </Button>
                ) : (
                  <Button onClick={handleAddMember} disabled={!selectedProfile}>
                    Add Member
                  </Button>
                )}
              </div>
            </div>
          </Form>

          <div className="space-y-3">
            {members.length > 0 ? (
              members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group"
                  onClick={() => {
                    if (member.phid) {
                      setSelectedProfile({
                        documentId: member.phid,
                        ethAddress: member.ethAddress || "",
                        username: member.name || member.ethAddress || "",
                        userImage: member.profileImage ?? undefined,
                      });
                    }
                  }}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {member.profileImage ? (
                      <img
                        src={member.profileImage}
                        alt={member.name || "Profile"}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0 ring-2 ring-gray-200 group-hover:ring-gray-300 transition-all"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 ring-2 ring-gray-200 group-hover:ring-gray-300 transition-all">
                        <span className="text-gray-700 text-base font-bold">
                          {(member.name || member.ethAddress || "?")[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-semibold text-gray-900 mb-0.5">
                        {member.name || "Unknown"}
                      </div>
                      <div className="text-xs font-mono text-gray-600 truncate mb-1">
                        {member.ethAddress}
                      </div>
                      {member.phid && member.name && (
                        <a
                          href={`${config.renownProfileBasePath}/${member.name}`}
                          className="text-xs text-gray-600 hover:text-gray-900 hover:underline inline-flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          View Profile
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
