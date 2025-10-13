import { Button, Form, StringField } from "@powerhousedao/document-engineering";
import { useState } from "react";

interface SpaceFormProps {
  initialTitle?: string;
  initialDescription?: string;
  onSave: (title: string, description: string) => void;
  onCancel: () => void;
  saveButtonText?: string;
}

export function SpaceForm({
  initialTitle = "",
  initialDescription = "",
  onSave,
  onCancel,
  saveButtonText = "Add Space",
}: SpaceFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSave = () => {
    onSave(title, description);
  };

  return (
    <div className="p-5 bg-gray-50 rounded-lg border border-gray-300 shadow-sm mb-5">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900">Create New Space</h3>
      </div>
      <Form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
        <div className="space-y-4">
          <StringField
            name="spaceTitle"
            label="Space Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter space title"
          />

          <StringField
            name="spaceDescription"
            label="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter space description"
          />

          <div className="flex justify-end space-x-3 pt-2">
            <Button color="light" onClick={onCancel}>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </span>
            </Button>
            <Button onClick={handleSave} disabled={!title.trim()}>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {saveButtonText}
              </span>
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

