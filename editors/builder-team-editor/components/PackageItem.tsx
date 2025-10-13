import {
  Button,
  Form,
  PHIDField,
  StringField,
} from "@powerhousedao/document-engineering";
import { type VetraPackageInfo } from "document-models/builder-team";
import { GraphQLClient } from "graphql-request";
import { useState } from "react";
import { config } from "../config.js";

const graphqlClient = new GraphQLClient(config.vetraGraphqlEndpoint);

const SEARCH_PACKAGES_QUERY = `
  query SearchPackages($search: String!) {
    vetraPackages(search: $search) {
      authorName
      name
      githubUrl
      documentId
      npmUrl
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
      npmUrl
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
  onSave: (selectedPackage: VetraPackageInfo) => void;
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
  const [packages, setPackages] = useState([]);
  const [displayedPkg, setDisplayedPkg] = useState(pkg);
  const [selectedPackage, setSelectedPackage] = useState(pkg);

  const handleSave = () => {
    onSave(selectedPackage);
  };

  if (isEditing) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-300 shadow-sm">
        <Form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
          <div className="space-y-3">
            <PHIDField
              name="packageName"
              label="Package Name"
              initialOptions={
                displayedPkg.phid
                  ? [
                      {
                        value: displayedPkg.phid,
                        description: displayedPkg.description ?? "",
                        path: {
                          text: `${config.vetraPackageBasePath}/${displayedPkg.title || ""}`,
                          url: `${config.vetraPackageBasePath}/${displayedPkg.title || ""}`,
                        },
                        title: displayedPkg.title ?? "",
                      },
                    ]
                  : []
              }
              value={displayedPkg.phid ?? undefined}
              allowUris={true}
              autoComplete={true}
              fetchOptionsCallback={async (userInput) => {
                const data = await graphqlClient.request<{
                  vetraPackages: {
                    documentId: string;
                    name: string;
                    description: string;
                    vetraDriveUrl: string;
                    npmUrl: string;
                    githubUrl: string;
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
                    vetraDriveUrl: string;
                    npmUrl: string;
                    githubUrl: string;
                  }[];
                }>(SEARCH_PACKAGES_BY_DOCUMENT_ID_QUERY, {
                  documentIds: [value],
                });

                const pkg = data.vetraPackages[0];
                if (!pkg) {
                  return;
                }

                const newSelectedPackage = {
                  ...pkg,
                  github: pkg.githubUrl,
                  npm: pkg.npmUrl,
                  phid: pkg.documentId,
                  vetraDriveUrl: pkg.vetraDriveUrl,
                  title: pkg.name,
                  id: selectedPackage.id,
                  description: pkg.description,
                };

                setSelectedPackage(newSelectedPackage);
                setDisplayedPkg(newSelectedPackage);

                // Update the entry immediately when refresh is clicked
                // onSave(newSelectedPackage);

                return {
                  title: pkg.name,
                  value: pkg.documentId,
                  description: pkg.description,
                  path: {
                    text: `${config.vetraPackageBasePath}/${pkg.name}`,
                    url: `${config.vetraPackageBasePath}/${pkg.name}`,
                  },
                };
              }}
              onSelect={(e) => {
                console.log(e.target);
              }}
              variant="withValueTitleAndDescription"
              required={true}
              viewMode="edition"
              placeholder="Enter package name"
            />

            <div className="flex justify-end space-x-3 pt-2">
              <Button color="light" onClick={onCancel}>
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </span>
              </Button>
              <Button onClick={handleSave} disabled={!selectedPackage}>
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </span>
              </Button>
            </div>
          </div>
        </Form>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all group">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <span className="font-semibold text-gray-900 truncate">
              {displayedPkg.title || "Untitled Package"}
            </span>
          </div>
          {displayedPkg.description && (
            <p className="text-sm text-gray-600 ml-6 leading-relaxed">{displayedPkg.description}</p>
          )}
          {displayedPkg.phid && displayedPkg.title && (
            <a
              href={`${config.vetraPackageBasePath}/${displayedPkg.title}`}
              className="text-xs text-gray-600 hover:text-gray-900 hover:underline ml-6 mt-1.5 inline-flex items-center gap-1 group/link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {config.vetraPackageBasePath}/{displayedPkg.title}
            </a>
          )}
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
          <Button color="red" size="sm" onClick={onDelete}>
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
