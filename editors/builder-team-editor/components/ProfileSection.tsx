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
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
            <p className="text-sm text-gray-600 mt-0.5">Manage your builder profile details</p>
          </div>
        </div>
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

              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>
                </div>

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

              <div className="flex justify-end space-x-3 pt-4">
                <Button color="light" onClick={onClose}>
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </span>
                </Button>
                <Button onClick={onClose}>
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </span>
                </Button>
              </div>
            </div>
          </Form>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Name</label>
                <p className="text-base font-medium text-gray-900">{profile.name || "Not set"}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Slug</label>
                <p className="text-base font-medium text-gray-900">{profile.slug ? `@${profile.slug}` : "Not set"}</p>
              </div>
            </div>

            {profile.description && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                <p className="text-base text-gray-900 leading-relaxed">{profile.description}</p>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Social Links</label>
              <div className="flex flex-wrap gap-3">
                {profile.socials.github && (
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                )}
                {profile.socials.website && (
                  <a
                    href={profile.socials.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Website
                  </a>
                )}
                {profile.socials.xProfile && (
                  <a
                    href={profile.socials.xProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    X (Twitter)
                  </a>
                )}
                {!profile.socials.github && !profile.socials.website && !profile.socials.xProfile && (
                  <span className="text-gray-500 text-sm italic">No social links added</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

