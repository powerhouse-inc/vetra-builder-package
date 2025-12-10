import { useSelectedDocument } from "@powerhousedao/reactor-browser";
import type { EditorProps } from "document-model";
import { useState } from "react";
import type {
  BuilderTeamDocument,
  VetraPackageInfo,
} from "../../document-models/builder-team/index.js";
import { actions } from "../../document-models/builder-team/index.js";
import { Header } from "./components/Header.js";
import { ProfileSection } from "./components/ProfileSection.js";
import { SpacesSection } from "./components/SpacesSection.js";
import { PackageForm } from "./components/PackageForm.js";
import { MembersSection } from "./components/MembersSection.js";
import { QuickStats } from "./components/QuickStats.js";
import { useSpaceHandlers } from "./hooks/useSpaceHandlers.js";
import { usePackageHandlers } from "./hooks/usePackageHandlers.js";
import { useMemberHandlers } from "./hooks/useMemberHandlers.js";
import { generateNanoId } from "../../utils/nano-id.js";

export type IProps = EditorProps;

export default function Editor() {
  const [document, dispatch] = useSelectedDocument();
  const typedDocument = document as BuilderTeamDocument;

  // Local UI state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [selectedSpaceForPackage, setSelectedSpaceForPackage] =
    useState<string>("");

  const {
    state: { global },
  } = typedDocument;
  const { profile, spaces, members } = global;

  // Custom hooks for handlers
  const spaceHandlers = useSpaceHandlers(spaces, dispatch);
  const packageHandlers = usePackageHandlers(dispatch);
  const memberHandlers = useMemberHandlers(dispatch);

  // Wrapper handlers for components
  const handleAddPackageToSpace = (spaceId: string) => {
    setSelectedSpaceForPackage(spaceId);
    setIsAddingPackage(true);
  };

  const handleSavePackage = (
    spaceId: string,
    packageInfo: VetraPackageInfo | null
  ) => {
    if (!packageInfo) {
      return false;
    }

    // Create the package first with a generated ID
    const id = generateNanoId();
    dispatch(actions.addPackage({ id, spaceId }));

    // Update the package with full info from the PHID selection
    dispatch(
      actions.updatePackageInfo({
        id,
        phid: packageInfo.phid,
        title: packageInfo.title,
        description: packageInfo.description,
        github: packageInfo.github,
        npm: packageInfo.npm,
        vetraDriveUrl: packageInfo.vetraDriveUrl,
      })
    );

    setIsAddingPackage(false);
    setSelectedSpaceForPackage("");
    return true;
  };

  const handleCancelAddPackage = () => {
    setIsAddingPackage(false);
    setSelectedSpaceForPackage("");
  };

  const handleReorderSpaces = (spaceIds: string[], targetIndex: number) => {
    dispatch(actions.reorderSpaces({ spaceIds, targetIndex }));
  };

  const handleReorderPackages = (spaceId: string, packageIds: string[], targetIndex: number) => {
    dispatch(actions.reorderPackages({ spaceId, packageIds, targetIndex }));
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
              dispatch={dispatch}
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
              onSetEditingSpaceDescription={
                spaceHandlers.setEditingSpaceDescription
              }
              onAddPackageToSpace={handleAddPackageToSpace}
              onEditPackage={packageHandlers.handleStartEditingPackage}
              onDeletePackage={packageHandlers.handleDeletePackage}
              onSavePackage={(packageInfo: VetraPackageInfo) => {
                // Update the package with info
                dispatch(
                  actions.updatePackageInfo({
                    id: packageInfo.id,
                    phid: packageInfo.phid,
                    title: packageInfo.title,
                    description: packageInfo.description,
                    github: packageInfo.github,
                    npm: packageInfo.npm,
                    vetraDriveUrl: packageInfo.vetraDriveUrl,
                  })
                );
                packageHandlers.handleCancelPackageEdit();
              }}
              onCancelPackageEdit={packageHandlers.handleCancelPackageEdit}
              onReorderSpaces={handleReorderSpaces}
              onReorderPackages={handleReorderPackages}
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
              onUpdateMember={memberHandlers.handleUpdateMember}
            />

            {/* Quick Stats */}
            <QuickStats spaces={spaces} members={members} />
          </div>
        </div>
      </div>
    </div>
  );
}
