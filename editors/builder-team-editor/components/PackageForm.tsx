import { Button, Form, PHIDField, StringField } from "@powerhousedao/document-engineering";
import { GraphQLClient } from "graphql-request";
import { useState } from "react";

interface PackageFormProps {
  spaceId: string;
  onSave: (spaceId: string, name: string, description: string) => boolean;
  onCancel: () => void;
}

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

export function PackageForm({ spaceId, onSave, onCancel }: PackageFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (onSave(spaceId, name, description)) {
      setName("");
      setDescription("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Add Package</h2>
      </div>
      <div className="p-6">
        <Form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
          <div className="space-y-4">
            <PHIDField
              
              name="packageId"
              label="Package Name"
              value={name}
              onChange={(e) => setName(e)}
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
                console.log(value);
                return { 
                  id: value, 
                  title: value, 
                  value: value, 
                  description: value, 
                  type: "powerhouse/vetra/package", 
                  path: { text: value, url: `/vetra-packages/${value}` } 
                };
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
              <Button onClick={handleSave} disabled={!name.trim() || !spaceId}>
                Add Package
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

