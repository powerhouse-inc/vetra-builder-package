import {
  Button,
  Form,
  PHIDField,
  StringField,
} from "@powerhousedao/document-engineering";
import { GraphQLClient } from "graphql-request";
import { useState } from "react";
import type { VetraPackageInfo } from "../../../document-models/builder-team/index.js";
import { config } from "../config.js";

interface PackageFormProps {
  spaceId: string;
  onSave: (spaceId: string, packageInfo: VetraPackageInfo | null) => boolean;
  onCancel: () => void;
}

const graphqlClient = new GraphQLClient(config.vetraGraphqlEndpoint);

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

export function PackageForm({ spaceId, onSave, onCancel }: PackageFormProps) {
  const [selectedPhid, setSelectedPhid] = useState("");
  const [packageInfo, setPackageInfo] = useState<VetraPackageInfo | null>(null);

  const handleSave = () => {
    if (onSave(spaceId, packageInfo)) {
      setSelectedPhid("");
      setPackageInfo(null);
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
              value={selectedPhid}
              onChange={(phid) => {
                setSelectedPhid(phid);
                // Fetch the full package info when a selection is made
                if (phid) {
                  graphqlClient
                    .request<{
                      vetraPackages: {
                        documentId: string;
                        name: string;
                        description: string;
                        authorName: string;
                        githubUrl: string;
                      }[];
                    }>(SEARCH_PACKAGES_BY_DOCUMENT_ID_QUERY, {
                      documentIds: [phid],
                    })
                    .then((data) => {
                      if (data.vetraPackages.length > 0) {
                        const pkg = data.vetraPackages[0];
                        setPackageInfo({
                          id: "", // Will be set by handleAddPackage
                          phid: pkg.documentId,
                          title: pkg.name,
                          description: pkg.description,
                          github: pkg.githubUrl || null,
                          npm: null,
                          vetraDriveUrl: null,
                        });
                      }
                    });
                }
              }}
              allowUris={true}
              autoComplete={true}
              initialOptions={[]}
              fetchOptionsCallback={async (userInput) => {
                const data = await graphqlClient.request<{
                  vetraPackages: {
                    documentId: string;
                    name: string;
                    description: string;
                  }[];
                }>(SEARCH_PACKAGES_QUERY, { search: userInput });

                const options = data.vetraPackages.map((pkg) => ({
                  id: pkg.documentId,
                  title: pkg.name,
                  value: pkg.documentId,
                  description: pkg.description,
                  path: {
                    text: `${config.vetraPackageBasePath}/${pkg.name}`,
                    url: `${config.vetraPackageBasePath}/${pkg.name}`,
                  },
                }));

                console.log(options);
                return options;
              }}
              fetchSelectedOptionCallback={async (value) => {
                const data = await graphqlClient.request<{
                  vetraPackages: {
                    documentId: string;
                    name: string;
                    description: string;
                  }[];
                }>(SEARCH_PACKAGES_BY_DOCUMENT_ID_QUERY, {
                  documentIds: [value],
                });

                const options = data.vetraPackages.map((pkg) => ({
                  id: pkg.documentId,
                  title: pkg.name,
                  value: pkg.documentId,
                  description: pkg.description,
                  path: {
                    text: `${config.vetraPackageBasePath}/${pkg.name}`,
                    url: `${config.vetraPackageBasePath}/${pkg.name}`,
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
              <Button onClick={handleSave} disabled={!selectedPhid || !spaceId}>
                Add Package
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
