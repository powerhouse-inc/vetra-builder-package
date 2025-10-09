import { Button, Form, PHIDField, StringField } from "@powerhousedao/document-engineering";
import { type VetraPackageInfo } from "document-models/builder-team";
import { GraphQLClient } from "graphql-request";
import { useState } from "react";

const graphqlClient = new GraphQLClient("http://localhost:4001/graphql");

const SEARCH_PACKAGES_QUERY = `
  query SearchPackages($search: String!) {
    vetraPackages(search: $search) {
      authorName
      name
      githubUrl
      documentId
      description
    }
  }
`;

const SEARCH_PACKAGES_BY_DOCUMENT_ID_QUERY = `
  query SearchPackagesByDocumentId($documentIds: [PHID!]) {
    vetraPackages(documentId_in: $documentIds) {
      authorName
      name
      githubUrl
      documentId
      description
    }
  }
`;
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
            <PHIDField
              name="packageName"
              label="Package Name"
              value={editingName}
              onChange={(e) => setEditingName(e)}
              allowUris={true}
              autoComplete={true}
              fetchOptionsCallback={async (userInput) => {
                const data = await graphqlClient.request<{
                  vetraPackages: { documentId: string; name: string; description: string; }[];
                }>(SEARCH_PACKAGES_QUERY, { search: userInput });
                
                const options = data.vetraPackages.map((pkg) => ({
                  id: pkg.documentId,
                  title: pkg.name,
                  value: pkg.documentId,
                  description: pkg.description,
                  path: {
                      text: pkg.name,
                      url: `/vetra-packages/${pkg.documentId}`,
                  },
                }));

                console.log(options);
                return options;
              }}
              fetchSelectedOptionCallback={async (value) => {
                
                  const data = await graphqlClient.request<{
                    vetraPackages: { documentId: string; name: string; description: string; }[];
                  }>(SEARCH_PACKAGES_BY_DOCUMENT_ID_QUERY, { documentIds: [value] });
                  
                  const options = data.vetraPackages.map((pkg) => ({
                    id: pkg.documentId,
                    title: pkg.name,
                    value: pkg.documentId,
                    description: pkg.description,
                    path: {
                        text: pkg.name,
                        url: `/vetra-packages/${pkg.documentId}`,
                    },
                  }));

                  const entry = options[0];

                return entry;
              }}
              variant="withValueTitleAndDescription"
              required={true}
              viewMode="edition"
              placeholder="Enter package name"
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

