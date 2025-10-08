import { Button, Form, StringField, UrlField, PHIDField } from "@powerhousedao/document-engineering";
import type { PHIDOption } from "@powerhousedao/document-engineering";
import { useSelectedDocument } from "@powerhousedao/reactor-browser";
import type { EditorProps } from "document-model";
import { useCallback, useState } from "react";
import {
  type BuilderAccountDocument,
  actions,
} from "../../document-models/builder-account/index.js";

export type IProps = EditorProps;

export default function Editor(props: IProps) {
  const [document, dispatch] = useSelectedDocument()
  const typedDocument = document as BuilderAccountDocument;
  
  // Local form state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingSpace, setIsAddingSpace] = useState(false);
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [editingSpaceId, setEditingSpaceId] = useState<string | null>(null);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  
  // Form states
  const [newSpaceTitle, setNewSpaceTitle] = useState("");
  const [newSpaceDescription, setNewSpaceDescription] = useState("");
  const [newPackageName, setNewPackageName] = useState("");
  const [newPackageDescription, setNewPackageDescription] = useState("");
  const [newPackageCategory, setNewPackageCategory] = useState("");
  const [newPackageGithub, setNewPackageGithub] = useState("");
  const [newPackageNpm, setNewPackageNpm] = useState("");
  const [newPackageVetraDrive, setNewPackageVetraDrive] = useState("");
  const [newMemberAddress, setNewMemberAddress] = useState("");
  const [selectedSpaceForPackage, setSelectedSpaceForPackage] = useState<string>("");
  
  // Editing form states
  const [editingSpaceTitle, setEditingSpaceTitle] = useState("");
  const [editingSpaceDescription, setEditingSpaceDescription] = useState("");
  const [editingPackageName, setEditingPackageName] = useState("");
  const [editingPackageDescription, setEditingPackageDescription] = useState("");
  const [editingPackageCategory, setEditingPackageCategory] = useState("");
  const [editingPackageGithub, setEditingPackageGithub] = useState("");
  const [editingPackageNpm, setEditingPackageNpm] = useState("");
  const [editingPackageVetraDrive, setEditingPackageVetraDrive] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState("");

  const { state: { global } } = typedDocument;
  const { profile, spaces, members } = global;

  const SWITCHBOARD_URL = process.env.SWITCHBOARD_URL || 'http://switchboard.staging.vetra.io/graphql';
  // Fetch packages from GraphQL endpoint
  const fetchPackages = useCallback(async (searchText: string): Promise<PHIDOption[]> => {
    try {
      const response = await fetch('http://localhost:4001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query($search: String) {
            vetraPackages(search: $search) {
              authorName
              authorWebsite
              category
              description
              documentId
              githubUrl
              name
              npmUrl
            }
          }`,
          variables: {
            search: searchText || null
          }
        }),
      });

      const result = await response.json() as {
        data?: {
          vetraPackages?: Array<{
            authorName: string | null;
            authorWebsite: string | null;
            category: string | null;
            description: string | null;
            documentId: string;
            githubUrl: string | null;
            name: string;
            npmUrl: string | null;
          }>;
        };
      };
      
      if (result.data?.vetraPackages) {
        const packages = result.data.vetraPackages;
        
        return packages.map(pkg => ({
          value: `phd://switchboard.staging.vetra.io/${pkg.documentId}`,
          title: pkg.name,
          description: pkg.description || `Category: ${pkg.category || 'Uncategorized'}`,
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching packages:', error);
      return [];
    }
  }, []);


  // Profile handlers
  const handleSetProfileName = useCallback((name: string) => {
    if (name.trim() && name !== profile.name) {
      dispatch(actions.setProfileName({ name: name.trim() }));
    }
  }, [profile.name, dispatch]);

  const handleSetSlug = useCallback((slug: string) => {
    if (slug.trim() && slug !== profile.slug) {
      dispatch(actions.setSlug({ slug: slug.trim() }));
    }
  }, [profile.slug, dispatch]);

  const handleSetProfileDescription = useCallback((description: string) => {
    if (description !== profile.description) {
      dispatch(actions.setProfileDescription({ description: description.trim() || null }));
    }
  }, [profile.description, dispatch]);

  const handleSetLogo = useCallback((logoUrl: string) => {
    if (logoUrl.trim() && logoUrl !== profile.logo) {
      dispatch(actions.setLogo({ logoUrl: logoUrl.trim() }));
    }
  }, [profile.logo, dispatch]);

  const handleUpdateSocials = useCallback((socials: { github?: string | null; website?: string | null; x?: string | null }) => {
    dispatch(actions.updateSocials({
      github: socials.github?.trim() || null,
      website: socials.website?.trim() || null,
      x: socials.x?.trim() || null,
    }));
  }, [dispatch]);

  // Space handlers
  const handleAddSpace = useCallback(() => {
    if (newSpaceTitle.trim()) {
      dispatch(actions.addSpace({
        title: newSpaceTitle.trim(),
        description: newSpaceDescription.trim() || null,
      }));
      setNewSpaceTitle("");
      setNewSpaceDescription("");
      setIsAddingSpace(false);
    }
  }, [newSpaceTitle, newSpaceDescription, dispatch]);

  const handleDeleteSpace = useCallback((spaceId: string) => {
    dispatch(actions.deleteSpace({ id: spaceId }));
  }, [dispatch]);

  const handleSetSpaceTitle = useCallback((spaceId: string, newTitle: string) => {
    if (newTitle.trim()) {
      dispatch(actions.setSpaceTitle({ id: spaceId, newTitle: newTitle.trim() }));
    }
  }, [dispatch]);

  const handleSetSpaceDescription = useCallback((spaceId: string, description: string) => {
    dispatch(actions.setSpaceDescription({ id: spaceId, description: description.trim() }));
  }, [dispatch]);

  const handleStartEditingSpace = useCallback((spaceId: string) => {
    const space = spaces.find(s => s.id === spaceId);
    if (space) {
      setEditingSpaceId(spaceId);
      setEditingSpaceTitle(space.title);
      setEditingSpaceDescription(space.description || "");
    }
  }, [spaces]);

  const handleSaveSpaceEdit = useCallback(() => {
    if (editingSpaceId && editingSpaceTitle.trim()) {
      handleSetSpaceTitle(editingSpaceId, editingSpaceTitle);
      handleSetSpaceDescription(editingSpaceId, editingSpaceDescription);
      setEditingSpaceId(null);
      setEditingSpaceTitle("");
      setEditingSpaceDescription("");
    }
  }, [editingSpaceId, editingSpaceTitle, editingSpaceDescription, handleSetSpaceTitle, handleSetSpaceDescription]);

  const handleCancelSpaceEdit = useCallback(() => {
    setEditingSpaceId(null);
    setEditingSpaceTitle("");
    setEditingSpaceDescription("");
  }, []);

  // Package handlers
  const handleAddPackage = useCallback(() => {
    console.log("handleAddPackage", selectedPackageId);
    // if (newPackageName.trim() && selectedSpaceForPackage) {
    //   // dispatch(actions.addPackage({
    //   //   name: newPackageName.trim(),
    //   //   description: newPackageDescription.trim() || null,
    //   //   category: newPackageCategory.trim() || null,
    //   //   github: newPackageGithub.trim() || null,
    //   //   npm: newPackageNpm.trim() || null,
    //   //   vetraDriveUrl: newPackageVetraDrive.trim() || null,
    //   //   spaceId: selectedSpaceForPackage,
    //   //   author: {
    //   //     name: profile.name,
    //   //     website: profile.socials.website || null,
    //   //   },
    //   // }));
    //   // setNewPackageName("");
    //   // setNewPackageDescription("");
    //   // setNewPackageCategory("");
    //   // setNewPackageGithub("");
    //   // setNewPackageNpm("");
    //   // setNewPackageVetraDrive("");
    //   // setSelectedSpaceForPackage("");
    //   // setIsAddingPackage(false);
    // }
  }, [selectedPackageId, dispatch]);

  const handleDeletePackage = useCallback((packageId: string) => {
    dispatch(actions.deletePackage({ id: packageId }));
  }, [dispatch]);

  const handleStartEditingPackage = useCallback((packageId: string) => {
    // Find the package across all spaces
    for (const space of spaces) {
      const pkg = space.packages.find(p => p.id === packageId);
      if (pkg) {
        setEditingPackageId(packageId);
        setEditingPackageName(pkg.name);
        setEditingPackageDescription(pkg.description || "");
        setEditingPackageCategory(pkg.category || "");
        setEditingPackageGithub(pkg.github || "");
        setEditingPackageNpm(pkg.npm || "");
        setEditingPackageVetraDrive(pkg.vetraDriveUrl || "");
        break;
      }
    }
  }, [spaces]);

  const handleSavePackageEdit = useCallback(() => {
    if (editingPackageId && editingPackageName.trim()) {
      // Use the proper updatePackage action
      dispatch(actions.updatePackage({
        id: editingPackageId,
        title: editingPackageName.trim(),
        description: editingPackageDescription.trim() || null,
      }));
      setEditingPackageId(null);
      setEditingPackageName("");
      setEditingPackageDescription("");
      setEditingPackageCategory("");
      setEditingPackageGithub("");
      setEditingPackageNpm("");
      setEditingPackageVetraDrive("");
    }
  }, [editingPackageId, editingPackageName, editingPackageDescription, dispatch]);

  const handleCancelPackageEdit = useCallback(() => {
    setEditingPackageId(null);
    setEditingPackageName("");
    setEditingPackageDescription("");
    setEditingPackageCategory("");
    setEditingPackageGithub("");
    setEditingPackageNpm("");
    setEditingPackageVetraDrive("");
  }, []);

  // Member handlers
  const handleAddMember = useCallback(() => {
    if (newMemberAddress.trim()) {
      dispatch(actions.addMember({ ethAddress: newMemberAddress.trim() }));
      setNewMemberAddress("");
    }
  }, [newMemberAddress, dispatch]);

  const handleRemoveMember = useCallback((ethAddress: string) => {
    dispatch(actions.removeMember({ ethAddress }));
  }, [dispatch]);

  return (
    <div className="html-defaults-container min-h-screen bg-gray-50">
      {/* Header */}
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
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                >
                  {isEditingProfile ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Profile Section */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                <p className="text-sm text-gray-500">Manage your builder profile details</p>
              </div>
              <div className="p-6">
                {isEditingProfile ? (
                  <Form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
                    <div className="space-y-6">
                      <StringField
                        name="profileName"
                        label="Profile Name"
                        value={profile.name}
                        onChange={(e) => handleSetProfileName(e.target.value)}
                        placeholder="Enter your profile name"
                        description="Your public display name"
                      />
                      
                      <StringField
                        name="slug"
                        label="Slug"
                        value={profile.slug}
                        onChange={(e) => handleSetSlug(e.target.value)}
                        placeholder="your-slug"
                        description="Unique identifier for your profile (used in URLs)"
                      />

                      <StringField
                        name="description"
                        label="Description"
                        value={profile.description || ""}
                        onChange={(e) => handleSetProfileDescription(e.target.value)}
                        placeholder="Tell us about yourself and your work"
                        description="Brief description of your work and interests"
                      />

                      <UrlField
                        name="logo"
                        label="Logo URL"
                        value={profile.logo || ""}
                        onChange={(e) => handleSetLogo(e.target.value)}
                        placeholder="https://example.com/logo.png"
                        description="URL to your profile logo image"
                      />

                      <div className="space-y-4">
                        <h3 className="text-md font-medium text-gray-900">Social Links</h3>
                        
                        <UrlField
                          name="github"
                          label="GitHub"
                          value={profile.socials.github || ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateSocials({ ...profile.socials, github: e.target.value })}
                          placeholder="https://github.com/username"
                        />

                        <UrlField
                          name="website"
                          label="Website"
                          value={profile.socials.website || ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateSocials({ ...profile.socials, website: e.target.value })}
                          placeholder="https://your-website.com"
                        />

                        <UrlField
                          name="x"
                          label="X (Twitter)"
                          value={profile.socials.xProfile || ""}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateSocials({ ...profile.socials, x: e.target.value })}
                          placeholder="https://x.com/username"
                        />
                      </div>

                      <div className="flex justify-end space-x-3">
                        <Button color="light" onClick={() => setIsEditingProfile(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => setIsEditingProfile(false)}>
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

            {/* Spaces Section */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Spaces</h2>
                    <p className="text-sm text-gray-500">Organize your packages into spaces</p>
                  </div>
                  <Button onClick={() => setIsAddingSpace(true)}>
                    Add Space
                  </Button>
                </div>
              </div>
              <div className="p-6">
                {isAddingSpace ? (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
                      <div className="space-y-4">
                        <StringField
                          name="spaceTitle"
                          label="Space Title"
                          value={newSpaceTitle}
                          onChange={(e) => setNewSpaceTitle(e.target.value)}
                          placeholder="Enter space title"
                        />
                        
                        <StringField
                          name="spaceDescription"
                          label="Description (optional)"
                          value={newSpaceDescription}
                          onChange={(e) => setNewSpaceDescription(e.target.value)}
                          placeholder="Enter space description"
                        />

                        <div className="flex justify-end space-x-3">
                          <Button color="light" onClick={() => setIsAddingSpace(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddSpace} disabled={!newSpaceTitle.trim()}>
                            Add Space
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </div>
                ) : null}

                <div className="space-y-4">
                  {spaces.length > 0 ? (
                    spaces.map((space) => (
                      <div key={space.id} className="border border-gray-200 rounded-lg p-4">
                        {editingSpaceId === space.id ? (
                          <Form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
                            <div className="space-y-4">
                              <StringField
                                name="editingSpaceTitle"
                                label="Space Title"
                                value={editingSpaceTitle}
                                onChange={(e) => setEditingSpaceTitle(e.target.value)}
                                placeholder="Enter space title"
                              />
                              
                              <StringField
                                name="editingSpaceDescription"
                                label="Description (optional)"
                                value={editingSpaceDescription}
                                onChange={(e) => setEditingSpaceDescription(e.target.value)}
                                placeholder="Enter space description"
                              />

                              <div className="flex justify-end space-x-3">
                                <Button color="light" onClick={handleCancelSpaceEdit}>
                                  Cancel
                                </Button>
                                <Button onClick={handleSaveSpaceEdit} disabled={!editingSpaceTitle.trim()}>
                                  Save Changes
                                </Button>
                              </div>
                            </div>
                          </Form>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-md font-medium text-gray-900">{space.title}</h3>
                              {space.description && (
                                <p className="text-sm text-gray-500 mt-1">{space.description}</p>
                              )}
                              <p className="text-xs text-gray-400 mt-1">
                                {space.packages.length} package{space.packages.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                color="light" 
                                size="sm"
                                onClick={() => handleStartEditingSpace(space.id)}
                              >
                                Edit
                              </Button>
                              <Button 
                                color="light" 
                                size="sm"
                                onClick={() => {
                                  setSelectedSpaceForPackage(space.id);
                                  setIsAddingPackage(true);
                                }}
                              >
                                Add Package
                              </Button>
                              <Button 
                                color="red" 
                                size="sm"
                                onClick={() => handleDeleteSpace(space.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        {/* Packages in this space */}
                        {space.packages.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {space.packages.map((pkg) => (
                              <div key={pkg.id} className="p-3 bg-gray-50 rounded border">
                                {editingPackageId === pkg.id ? (
                                  <Form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
                                    <div className="space-y-3">
                                      <StringField
                                        name="editingPackageName"
                                        label="Package Name"
                                        value={editingPackageName}
                                        onChange={(e) => setEditingPackageName(e.target.value)}
                                        placeholder="Enter package name"
                                      />
                                      
                                      <StringField
                                        name="editingPackageDescription"
                                        label="Description"
                                        value={editingPackageDescription}
                                        onChange={(e) => setEditingPackageDescription(e.target.value)}
                                        placeholder="Enter package description"
                                      />

                                      <StringField
                                        name="editingPackageCategory"
                                        label="Category"
                                        value={editingPackageCategory}
                                        onChange={(e) => setEditingPackageCategory(e.target.value)}
                                        placeholder="Enter package category"
                                      />

                                      <UrlField
                                        name="editingPackageGithub"
                                        label="GitHub URL"
                                        value={editingPackageGithub}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingPackageGithub(e.target.value)}
                                        placeholder="https://github.com/username/repo"
                                      />

                                      <UrlField
                                        name="editingPackageNpm"
                                        label="NPM URL"
                                        value={editingPackageNpm}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingPackageNpm(e.target.value)}
                                        placeholder="https://www.npmjs.com/package/package-name"
                                      />

                                      <UrlField
                                        name="editingPackageVetraDrive"
                                        label="Vetra Drive URL"
                                        value={editingPackageVetraDrive}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingPackageVetraDrive(e.target.value)}
                                        placeholder="https://vetra.to/drive/..."
                                      />

                                      <div className="flex justify-end space-x-3">
                                        <Button color="light" onClick={handleCancelPackageEdit}>
                                          Cancel
                                        </Button>
                                        <Button onClick={handleSavePackageEdit} disabled={!editingPackageName.trim()}>
                                          Save Changes
                                        </Button>
                                      </div>
                                    </div>
                                  </Form>
                                ) : (
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <span className="font-medium text-gray-900">{pkg.name}</span>
                                      {pkg.description && (
                                        <p className="text-sm text-gray-500">{pkg.description}</p>
                                      )}
                                      {pkg.category && (
                                        <p className="text-xs text-gray-400">Category: {pkg.category}</p>
                                      )}
                                      {pkg.vetraDriveUrl && (
                                        <p className="text-xs text-blue-600">
                                          <a href={pkg.vetraDriveUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            Vetra Drive
                                          </a>
                                        </p>
                                      )}
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button 
                                        color="light" 
                                        size="sm"
                                        onClick={() => handleStartEditingPackage(pkg.id!)}
                                      >
                                        Edit
                                      </Button>
                                      <Button 
                                        color="red" 
                                        size="sm"
                                        onClick={() => handleDeletePackage(pkg.id!)}
                                      >
                                        Remove
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No spaces created yet. Create a space to organize your packages.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Add Package Modal */}
            {isAddingPackage && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Add Package</h2>
                </div>
                <div className="p-6">
                  <Form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
                    <div className="space-y-4">
                      <PHIDField
                        name="packageId"
                        label="Select Package"
                        value={selectedPackageId}
                        onChange={(value) => setSelectedPackageId(value)}
                        autoComplete={true}
                        fetchOptionsCallback={fetchPackages}
                        
                        placeholder="Search for a package..."
                        description="Select a package from available Vetra packages"
                      />

                      <div className="flex justify-end space-x-3">
                        <Button color="light" onClick={() => setIsAddingPackage(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddPackage} disabled={!selectedSpaceForPackage}>
                          Add Package
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Members Section */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                <p className="text-sm text-gray-500">Manage team access</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMemberAddress}
                      onChange={(e) => setNewMemberAddress(e.target.value)}
                      placeholder="0x..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Button 
                      onClick={handleAddMember}
                      disabled={!newMemberAddress.trim()}
                    >
                      Add
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {members.length > 0 ? (
                      members.map((address, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                          <span className="text-sm font-mono text-gray-700 truncate">
                            {address}
                          </span>
                          <Button 
                            color="red" 
                            size="sm"
                            onClick={() => handleRemoveMember(address)}
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

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Spaces</span>
                    <span className="text-sm font-medium text-gray-900">{spaces.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Packages</span>
                    <span className="text-sm font-medium text-gray-900">
                      {spaces.reduce((total, space) => total + space.packages.length, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Team Members</span>
                    <span className="text-sm font-medium text-gray-900">{members.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
