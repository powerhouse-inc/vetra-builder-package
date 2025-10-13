import { Button, Form, StringField } from "@powerhousedao/document-engineering";
import { PackageItem } from "./PackageItem.js";
import {
  type VetraBuilderSpace,
  type VetraPackageInfo,
} from "document-models/builder-team/index.js";

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
  onSavePackage: (packageInfo: VetraPackageInfo) => void;
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
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-5 shadow-sm">
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
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 truncate">{space.title}</h3>
          </div>
          {space.description && (
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{space.description}</p>
          )}
          <div className="flex items-center gap-1.5 mt-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <span className="text-xs font-medium text-gray-500">
              {space.packages.length} package{space.packages.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <div className="flex space-x-2 ml-4">
          <Button color="light" size="sm" onClick={onEdit}>
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </span>
          </Button>
          <Button
            color="light"
            size="sm"
            onClick={() => onAddPackage(space.id)}
          >
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Package
            </span>
          </Button>
          <Button color="red" size="sm" onClick={onDelete}>
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </span>
          </Button>
        </div>
      </div>

      {/* Packages in this space */}
      {space.packages.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
          {space.packages.map((pkg) => (
            <PackageItem
              key={pkg.id}
              pkg={pkg}
              isEditing={editingPackageId === pkg.id}
              onEdit={() => onEditPackage(pkg.id)}
              onDelete={() => onDeletePackage(pkg.id)}
              onSave={(selectedPackage) => onSavePackage(selectedPackage)}
              onCancel={onCancelPackageEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
