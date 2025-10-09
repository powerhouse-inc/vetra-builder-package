import { Button, Form, StringField } from "@powerhousedao/document-engineering";
import { type VetraPackageInfo } from "document-models/builder-team";
import { useState } from "react";


interface PackageItemProps {
  pkg: VetraPackageInfo;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSave: (name: string, description: string) => void;
  onCancel: () => void;
}

export function PackageItem({
  pkg,
  isEditing,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}: PackageItemProps) {
  const [editingName, setEditingName] = useState(pkg.title || "");
  const [editingDescription, setEditingDescription] = useState(pkg.description || "");

  const handleSave = () => {
    onSave(editingName, editingDescription);
  };

  if (isEditing) {
    return (
      <div className="p-3 bg-gray-50 rounded border">
        <Form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
          <div className="space-y-3">
            <StringField
              name="packageName"
              label="Package Name"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              placeholder="Enter package name"
            />
            
            <StringField
              name="packageDescription"
              label="Description"
              value={editingDescription}
              onChange={(e) => setEditingDescription(e.target.value)}
              placeholder="Enter package description"
            />

            <div className="flex justify-end space-x-3">
              <Button color="light" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!editingName.trim()}>
                Save Changes
              </Button>
            </div>
          </div>
        </Form>
      </div>
    );
  }

  return (
    <div className="p-3 bg-gray-50 rounded border">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-medium text-gray-900">{pkg.title}</span>
          {pkg.description && (
            <p className="text-sm text-gray-500">{pkg.description}</p>
          )}
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
            color="red" 
            size="sm"
            onClick={onDelete}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

