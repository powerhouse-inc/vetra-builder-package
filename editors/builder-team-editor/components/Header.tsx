import { Button } from "@powerhousedao/document-engineering";
import type { BuilderTeamDocument } from "../../../document-models/builder-team/index.js";

interface HeaderProps {
  profile: BuilderTeamDocument['state']['global']['profile'];
  isEditingProfile: boolean;
  onToggleEdit: () => void;
}

export function Header({ profile, isEditingProfile, onToggleEdit }: HeaderProps) {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                {profile.logo ? (
                  <img className="w-20 h-20 rounded-xl object-cover ring-2 ring-gray-200 shadow-sm" src={profile.logo} alt="Logo" />
                ) : (
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center ring-2 ring-gray-200 shadow-sm">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile.name || "Builder Team"}
                </h1>
                <p className="text-gray-600 mt-1 text-sm">
                  {profile.slug ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="font-medium">@{profile.slug}</span>
                      <span className="text-gray-400">•</span>
                      <span>Builder Team Profile</span>
                    </span>
                  ) : (
                    "Manage your builder profile and packages"
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                color="light"
                onClick={onToggleEdit}
              >
                <span className="inline-flex items-center gap-2">
                  {isEditingProfile ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Profile
                    </>
                  )}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

