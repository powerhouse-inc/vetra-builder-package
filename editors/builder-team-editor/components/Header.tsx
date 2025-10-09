import { Button } from "@powerhousedao/document-engineering";
import type { BuilderTeamDocument } from "../../../document-models/builder-team/index.js";

interface HeaderProps {
  profile: BuilderTeamDocument['state']['global']['profile'];
  isEditingProfile: boolean;
  onToggleEdit: () => void;
}

export function Header({ profile, isEditingProfile, onToggleEdit }: HeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {profile.logo ? (
                  <img className="w-12 h-12 rounded-lg object-cover" src={profile.logo} alt="Logo" />
                ) : (
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.name || "Builder Account"}
                </h1>
                <p className="text-sm text-gray-500">
                  {profile.slug ? `@${profile.slug}` : "Manage your builder profile and packages"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                color="light" 
                onClick={onToggleEdit}
              >
                {isEditingProfile ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

