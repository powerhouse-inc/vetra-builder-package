import { Button } from "@powerhousedao/document-engineering";
import { useState } from "react";
import type { BuilderTeamDocument } from "../../../document-models/builder-team/index.js";
import { SpaceForm } from "./SpaceForm.js";
import { SpaceItem } from "./SpaceItem.js";

interface SpacesSectionProps {
  spaces: BuilderTeamDocument['state']['global']['spaces'];
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
  onSavePackage: (packageId: string, name: string, description: string) => void;
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
        {isAddingSpace && (
          <SpaceForm
            onSave={handleAddSpace}
            onCancel={() => setIsAddingSpace(false)}
          />
        )}

        <div className="space-y-4">
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
            <div className="text-center py-8 text-gray-500">
              <p>No spaces created yet. Create a space to organize your packages.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

