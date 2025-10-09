import { Button, Form, StringField, UrlField } from "@powerhousedao/document-engineering";
import type { BuilderTeamDocument } from "../../../document-models/builder-team/index.js";

interface ProfileSectionProps {
  profile: BuilderTeamDocument['state']['global']['profile'];
  isEditing: boolean;
  onSetProfileName: (name: string) => void;
  onSetSlug: (slug: string) => void;
  onSetDescription: (description: string) => void;
  onSetLogo: (logoUrl: string) => void;
  onUpdateSocials: (socials: { github?: string | null; website?: string | null; x?: string | null }) => void;
  onClose: () => void;
}

export function ProfileSection({
  profile,
  isEditing,
  onSetProfileName,
  onSetSlug,
  onSetDescription,
  onSetLogo,
  onUpdateSocials,
  onClose,
}: ProfileSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
        <p className="text-sm text-gray-500">Manage your builder profile details</p>
      </div>
      <div className="p-6">
        {isEditing ? (
          <Form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
            <div className="space-y-6">
              <StringField
                name="profileName"
                label="Profile Name"
                value={profile.name}
                onChange={(e) => onSetProfileName(e.target.value)}
                placeholder="Enter your profile name"
                description="Your public display name"
              />
              
              <StringField
                name="slug"
                label="Slug"
                value={profile.slug}
                onChange={(e) => onSetSlug(e.target.value)}
                placeholder="your-slug"
                description="Unique identifier for your profile (used in URLs)"
              />

              <StringField
                name="description"
                label="Description"
                value={profile.description || ""}
                onChange={(e) => onSetDescription(e.target.value)}
                placeholder="Tell us about yourself and your work"
                description="Brief description of your work and interests"
              />

              <UrlField
                name="logo"
                label="Logo URL"
                value={profile.logo || ""}
                onChange={(e) => onSetLogo(e.target.value)}
                placeholder="https://example.com/logo.png"
                description="URL to your profile logo image"
              />

              <div className="space-y-4">
                <h3 className="text-md font-medium text-gray-900">Social Links</h3>
                
                <UrlField
                  name="github"
                  label="GitHub"
                  value={profile.socials.github || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateSocials({ ...profile.socials, github: e.target.value })}
                  placeholder="https://github.com/username"
                />

                <UrlField
                  name="website"
                  label="Website"
                  value={profile.socials.website || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateSocials({ ...profile.socials, website: e.target.value })}
                  placeholder="https://your-website.com"
                />

                <UrlField
                  name="x"
                  label="X (Twitter)"
                  value={profile.socials.xProfile || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateSocials({ ...profile.socials, x: e.target.value })}
                  placeholder="https://x.com/username"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button color="light" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={onClose}>
                  Save Changes
                </Button>
              </div>
            </div>
          </Form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-sm text-gray-900">{profile.name || "Not set"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Slug</label>
                <p className="mt-1 text-sm text-gray-900">{profile.slug ? `@${profile.slug}` : "Not set"}</p>
              </div>
            </div>
            
            {profile.description && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="mt-1 text-sm text-gray-900">{profile.description}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Social Links</label>
              <div className="mt-2 flex space-x-4">
                {profile.socials.github && (
                  <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    GitHub
                  </a>
                )}
                {profile.socials.website && (
                  <a href={profile.socials.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    Website
                  </a>
                )}
                {profile.socials.xProfile && (
                  <a href={profile.socials.xProfile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    X (Twitter)
                  </a>
                )}
                {!profile.socials.github && !profile.socials.website && !profile.socials.xProfile && (
                  <span className="text-gray-500 text-sm">No social links added</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

