import { Button, Form, StringField } from "@powerhousedao/document-engineering";
import { PackageItem } from "./PackageItem.js";
import { type VetraBuilderSpace } from "document-models/builder-team/index.js";

interface EditSpaceFormProps {
  title: string;
  description: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

function EditSpaceForm({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSave,
  onCancel,
}: EditSpaceFormProps) {
  return (
    <Form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
      <div className="space-y-4">
        <StringField
          name="editingSpaceTitle"
          label="Space Title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter space title"
        />
        
        <StringField
          name="editingSpaceDescription"
          label="Description (optional)"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Enter space description"
        />

        <div className="flex justify-end space-x-3">
          <Button color="light" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave} disabled={!title.trim()}>
            Save Changes
          </Button>
        </div>
      </div>
    </Form>
  );
}


interface SpaceItemProps {
  space: VetraBuilderSpace;
  isEditing: boolean;
  editingSpaceTitle: string;
  editingSpaceDescription: string;
  editingPackageId: string | null;
  onEdit: () => void;
  onDelete: () => void;
  onSaveEdit: () => boolean;
  onCancelEdit: () => void;
  onSetEditingTitle: (title: string) => void;
  onSetEditingDescription: (description: string) => void;
  onAddPackage: (spaceId: string) => void;
  onEditPackage: (packageId: string) => void;
  onDeletePackage: (packageId: string) => void;
  onSavePackage: (packageId: string, name: string, description: string) => void;
  onCancelPackageEdit: () => void;
}

export function SpaceItem({
  space,
  isEditing,
  editingSpaceTitle,
  editingSpaceDescription,
  editingPackageId,
  onEdit,
  onDelete,
  onSaveEdit,
  onCancelEdit,
  onSetEditingTitle,
  onSetEditingDescription,
  onAddPackage,
  onEditPackage,
  onDeletePackage,
  onSavePackage,
  onCancelPackageEdit,
}: SpaceItemProps) {
  if (isEditing) {
    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <EditSpaceForm
          title={editingSpaceTitle}
          description={editingSpaceDescription}
          onTitleChange={onSetEditingTitle}
          onDescriptionChange={onSetEditingDescription}
          onSave={onSaveEdit}
          onCancel={onCancelEdit}
        />
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4">
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
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button 
            color="light" 
            size="sm"
            onClick={() => onAddPackage(space.id)}
          >
            Add Package
          </Button>
          <Button 
            color="red" 
            size="sm"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
      
      {/* Packages in this space */}
      {space.packages.length > 0 && (
        <div className="mt-4 space-y-2">
          {space.packages.map((pkg) => (
            <PackageItem
              key={pkg.id}
              pkg={pkg}
              isEditing={editingPackageId === pkg.id}
              onEdit={() => onEditPackage(pkg.id)}
              onDelete={() => onDeletePackage(pkg.id)}
              onSave={(name, description) => onSavePackage(pkg.id, name, description)}
              onCancel={onCancelPackageEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

