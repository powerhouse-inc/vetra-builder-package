import { Button } from "@powerhousedao/document-engineering";
import { useState } from "react";
import type {
  BuilderTeamDocument,
  VetraPackageInfo,
} from "../../../document-models/builder-team/index.js";
import { SpaceForm } from "./SpaceForm.js";
import { SpaceItem } from "./SpaceItem.js";
import { SpacesTable } from "./SpacesTable.js";

interface SpacesSectionProps {
  spaces: BuilderTeamDocument["state"]["global"]["spaces"];
  editingSpaceId: string | null;
  editingSpaceTitle: string;
  editingSpaceDescription: string;
  editingPackageId: string | null;
  onAddSpace: (title: string, description: string) => boolean;
  onDeleteSpace: (spaceId: string) => void;
  onStartEditingSpace: (spaceId: string) => void;
  onSaveSpaceEdit: () => boolean;
  onCancelSpaceEdit: () => void;
  onSetEditingSpaceTitle: (title: string) => void;
  onSetEditingSpaceDescription: (description: string) => void;
  onAddPackageToSpace: (spaceId: string) => void;
  onEditPackage: (packageId: string) => void;
  onDeletePackage: (packageId: string) => void;
  onSavePackage: (packageInfo: VetraPackageInfo) => void;
  onCancelPackageEdit: () => void;
  onReorderSpaces: (spaceIds: string[], targetIndex: number) => void;
  onReorderPackages: (spaceId: string, packageIds: string[], targetIndex: number) => void;
}

export function SpacesSection({
  spaces,
  editingSpaceId,
  editingSpaceTitle,
  editingSpaceDescription,
  editingPackageId,
  onAddSpace,
  onDeleteSpace,
  onStartEditingSpace,
  onSaveSpaceEdit,
  onCancelSpaceEdit,
  onSetEditingSpaceTitle,
  onSetEditingSpaceDescription,
  onAddPackageToSpace,
  onEditPackage,
  onDeletePackage,
  onSavePackage,
  onCancelPackageEdit,
  onReorderSpaces,
  onReorderPackages,
}: SpacesSectionProps) {
  const [isAddingSpace, setIsAddingSpace] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);

  const handleAddSpace = (title: string, description: string) => {
    if (onAddSpace(title, description)) {
      setIsAddingSpace(false);
    }
  };

  const handleEditSpace = (spaceId: string) => {
    // When editing in table view, make the space visible by selecting it
    if (viewMode === "table") {
      setSelectedSpaceId(spaceId);
    }
    onStartEditingSpace(spaceId);
  };

  const selectedSpace = selectedSpaceId
    ? spaces.find((s) => s.id === selectedSpaceId)
    : null;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Spaces</h2>
            <p className="text-sm text-gray-600 mt-1">
              Organize your packages into logical workspaces
            </p>
          </div>
          <Button onClick={() => setIsAddingSpace(true)}>
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Space
            </span>
          </Button>
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="px-6 py-3 border-b border-gray-200 bg-gray-50 flex justify-end">
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value as "table" | "cards")}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="table">Table View</option>
          <option value="cards">Cards View</option>
        </select>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {isAddingSpace && (
          <div className="mb-6">
            <SpaceForm
              onSave={handleAddSpace}
              onCancel={() => setIsAddingSpace(false)}
            />
          </div>
        )}

        {spaces.length > 0 ? (
          <>
            {viewMode === "table" ? (
              <SpacesTable
                spaces={spaces}
                onEdit={handleEditSpace}
                onDelete={onDeleteSpace}
                onAddPackage={onAddPackageToSpace}
                onViewPackages={(spaceId) => setSelectedSpaceId(spaceId)}
                onReorder={onReorderSpaces}
              />
            ) : (
              <div className="space-y-5">
                {spaces.map((space) => (
                  <SpaceItem
                    key={space.id}
                    space={space}
                    isEditing={editingSpaceId === space.id}
                    editingSpaceTitle={editingSpaceTitle}
                    editingSpaceDescription={editingSpaceDescription}
                    editingPackageId={editingPackageId}
                    onEdit={() => onStartEditingSpace(space.id)}
                    onDelete={() => onDeleteSpace(space.id)}
                    onSaveEdit={onSaveSpaceEdit}
                    onCancelEdit={onCancelSpaceEdit}
                    onSetEditingTitle={onSetEditingSpaceTitle}
                    onSetEditingDescription={onSetEditingSpaceDescription}
                    onAddPackage={onAddPackageToSpace}
                    onEditPackage={onEditPackage}
                    onDeletePackage={onDeletePackage}
                    onSavePackage={onSavePackage}
                    onCancelPackageEdit={onCancelPackageEdit}
                    onReorderPackages={(packageIds, targetIndex) => onReorderPackages(space.id, packageIds, targetIndex)}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No spaces yet</h3>
            <p className="text-gray-600 mb-4">
              Create a space to organize your packages
            </p>
            <Button onClick={() => setIsAddingSpace(true)}>Create your first space</Button>
          </div>
        )}

        {/* Selected Space Packages View */}
        {selectedSpace && viewMode === "table" && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedSpace.title} - Packages
                </h3>
                {selectedSpace.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedSpace.description}
                  </p>
                )}
              </div>
              <Button
                color="light"
                size="sm"
                onClick={() => setSelectedSpaceId(null)}
              >
                Close
              </Button>
            </div>
            <SpaceItem
              space={selectedSpace}
              isEditing={editingSpaceId === selectedSpace.id}
              editingSpaceTitle={editingSpaceTitle}
              editingSpaceDescription={editingSpaceDescription}
              editingPackageId={editingPackageId}
              onEdit={() => onStartEditingSpace(selectedSpace.id)}
              onDelete={() => {
                onDeleteSpace(selectedSpace.id);
                setSelectedSpaceId(null);
              }}
              onSaveEdit={onSaveSpaceEdit}
              onCancelEdit={onCancelSpaceEdit}
              onSetEditingTitle={onSetEditingSpaceTitle}
              onSetEditingDescription={onSetEditingSpaceDescription}
              onAddPackage={onAddPackageToSpace}
              onEditPackage={onEditPackage}
              onDeletePackage={onDeletePackage}
              onSavePackage={onSavePackage}
              onCancelPackageEdit={onCancelPackageEdit}
              onReorderPackages={(packageIds, targetIndex) => onReorderPackages(selectedSpace.id, packageIds, targetIndex)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
