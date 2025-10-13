import { Button } from "@powerhousedao/document-engineering";
import { useState } from "react";
import type {
  BuilderTeamDocument,
  VetraPackageInfo,
} from "../../../document-models/builder-team/index.js";
import { SpaceForm } from "./SpaceForm.js";
import { SpaceItem } from "./SpaceItem.js";

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
}: SpacesSectionProps) {
  const [isAddingSpace, setIsAddingSpace] = useState(false);

  const handleAddSpace = (title: string, description: string) => {
    if (onAddSpace(title, description)) {
      setIsAddingSpace(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
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
      <div className="p-6">
        {isAddingSpace && (
          <SpaceForm
            onSave={handleAddSpace}
            onCancel={() => setIsAddingSpace(false)}
          />
        )}

        <div className="space-y-5">
          {spaces.length > 0 ? (
            spaces.map((space) => (
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
              />
            ))
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
        </div>
      </div>
    </div>
  );
}
