import { Button, Form, PHIDField } from "@powerhousedao/document-engineering";
import { useState } from "react";
import type { BuilderTeamDocument } from "../../../document-models/builder-team/index.js";
import { config } from "../config.js";
import {
  getProfile,
  searchProfileOptions,
  getProfileOption,
} from "../services/renown-api.js";
import type { MemberProfileData, RenownProfile } from "../types/index.js";
import { truncateAddress } from "../utils/format.js";

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
  const [selectedProfile, setSelectedProfile] = useState<RenownProfile | null>(
    null
  );

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
        <p className="text-sm text-gray-600 mt-1">
          Manage team access and permissions
        </p>
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
                          description: truncateAddress(selectedProfile.ethAddress),
                          path: {
                            text: `${config.renownProfileBasePath}/${selectedProfile.documentId}`,
                            url: `${config.renownProfileBasePath}/${selectedProfile.documentId}`,
                          },
                          icon: "Person",
                        },
                      ]
                    : []
                }
                allowUris={false}
                autoComplete={true}
                fetchOptionsCallback={searchProfileOptions}
                fetchSelectedOptionCallback={async (value) => {
                  const profile = await getProfile(value);
                  if (profile) {
                    setSelectedProfile(profile);
                  }
                  return getProfileOption(value);
                }}
                onChange={async (value) => {
                  if (!value) {
                    setSelectedProfile(null);
                    return;
                  }
                  const profile = await getProfile(value);
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
                {existingMember ? (
                  <Button
                    onClick={handleUpdateMember}
                    disabled={!selectedProfile}
                  >
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
                  onClick={async () => {
                    if (member.phid) {
                      const profile = await getProfile(member.phid);
                      if (profile) {
                        setSelectedProfile(profile);
                      }
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
                          {(member.name ||
                            member.ethAddress ||
                            "?")[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-semibold text-gray-900 mb-0.5">
                        {member.name || "Unknown"}
                      </div>
                      <div className="text-xs font-mono text-gray-600 truncate mb-1">
                        {truncateAddress(member.ethAddress || "")}
                      </div>
                      {member.phid && (
                        <a
                          href={`${config.renownProfileBasePath}/${member.phid}`}
                          className="text-xs text-gray-600 hover:text-gray-900 hover:underline inline-flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
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
