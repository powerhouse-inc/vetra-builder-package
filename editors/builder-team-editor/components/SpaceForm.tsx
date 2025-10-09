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
    <div className="p-4 bg-gray-50 rounded-lg">
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

          <div className="flex justify-end space-x-3">
            <Button color="light" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!title.trim()}>
              {saveButtonText}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

