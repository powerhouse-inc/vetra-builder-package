import { useSelectedDocument } from "@powerhousedao/reactor-browser";
import type { EditorProps } from "document-model";
import { useState } from "react";
import type { BuilderTeamDocument } from "../../document-models/builder-team/index.js";
import { Header } from "./components/Header.js";
import { ProfileSection } from "./components/ProfileSection.js";
import { SpacesSection } from "./components/SpacesSection.js";
import { PackageForm } from "./components/PackageForm.js";
import { MembersSection } from "./components/MembersSection.js";
import { QuickStats } from "./components/QuickStats.js";
import { useProfileHandlers } from "./hooks/useProfileHandlers.js";
import { useSpaceHandlers } from "./hooks/useSpaceHandlers.js";
import { usePackageHandlers } from "./hooks/usePackageHandlers.js";
import { useMemberHandlers } from "./hooks/useMemberHandlers.js";

export type IProps = EditorProps;

export function Editor(props: IProps) {
  const [document, dispatch] = useSelectedDocument();
  const typedDocument = document as BuilderTeamDocument;
  
  // Local UI state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [selectedSpaceForPackage, setSelectedSpaceForPackage] = useState<string>("");

  const { state: { global } } = typedDocument;
  const { profile, spaces, members } = global;

  // Custom hooks for handlers
  const profileHandlers = useProfileHandlers(profile, dispatch);
  const spaceHandlers = useSpaceHandlers(spaces, dispatch);
  const packageHandlers = usePackageHandlers(spaces, dispatch);
  const memberHandlers = useMemberHandlers(dispatch);

  // Wrapper handlers for components
  const handleAddPackageToSpace = (spaceId: string) => {
    setSelectedSpaceForPackage(spaceId);
    setIsAddingPackage(true);
  };

  const handleSavePackage = (spaceId: string, name: string, description: string) => {
    const success = packageHandlers.handleAddPackage(spaceId, name, description);
    if (success) {
      setIsAddingPackage(false);
      setSelectedSpaceForPackage("");
    }
    return success;
  };

  const handleCancelAddPackage = () => {
    setIsAddingPackage(false);
    setSelectedSpaceForPackage("");
  };

  return (
    <div className="html-defaults-container min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        profile={profile}
        isEditingProfile={isEditingProfile}
        onToggleEdit={() => setIsEditingProfile(!isEditingProfile)}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Profile Section */}
            <ProfileSection
              profile={profile}
              isEditing={isEditingProfile}
              onSetProfileName={profileHandlers.handleSetProfileName}
              onSetSlug={profileHandlers.handleSetSlug}
              onSetDescription={profileHandlers.handleSetProfileDescription}
              onSetLogo={profileHandlers.handleSetLogo}
              onUpdateSocials={profileHandlers.handleUpdateSocials}
              onClose={() => setIsEditingProfile(false)}
            />

            {/* Spaces Section */}
            <SpacesSection
              spaces={spaces}
              editingSpaceId={spaceHandlers.editingSpaceId}
              editingSpaceTitle={spaceHandlers.editingSpaceTitle}
              editingSpaceDescription={spaceHandlers.editingSpaceDescription}
              editingPackageId={packageHandlers.editingPackageId}
              onAddSpace={spaceHandlers.handleAddSpace}
              onDeleteSpace={spaceHandlers.handleDeleteSpace}
              onStartEditingSpace={spaceHandlers.handleStartEditingSpace}
              onSaveSpaceEdit={spaceHandlers.handleSaveSpaceEdit}
              onCancelSpaceEdit={spaceHandlers.handleCancelSpaceEdit}
              onSetEditingSpaceTitle={spaceHandlers.setEditingSpaceTitle}
              onSetEditingSpaceDescription={spaceHandlers.setEditingSpaceDescription}
              onAddPackageToSpace={handleAddPackageToSpace}
              onEditPackage={packageHandlers.handleStartEditingPackage}
              onDeletePackage={packageHandlers.handleDeletePackage}
              onSavePackage={(packageId, name, description) => {
                packageHandlers.handleSavePackageEdit(packageId, name, description);
              }}
              onCancelPackageEdit={packageHandlers.handleCancelPackageEdit}
            />

            {/* Add Package Modal */}
            {isAddingPackage && (
              <PackageForm
                spaceId={selectedSpaceForPackage}
                onSave={handleSavePackage}
                onCancel={handleCancelAddPackage}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Members Section */}
            <MembersSection
              members={members}
              onAddMember={memberHandlers.handleAddMember}
              onRemoveMember={memberHandlers.handleRemoveMember}
            />

            {/* Quick Stats */}
            <QuickStats
              spaces={spaces}
              members={members}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
