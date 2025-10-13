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
    <div className="bg-white rounded-lg shadow-md border border-gray-300 mb-4">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h2 className="text-lg font-semibold text-gray-900">Add Package</h2>
        </div>
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

            <div className="flex justify-end space-x-3 pt-2">
              <Button color="light" onClick={onCancel}>
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </span>
              </Button>
              <Button onClick={handleSave} disabled={!selectedPhid || !spaceId}>
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Package
                </span>
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
