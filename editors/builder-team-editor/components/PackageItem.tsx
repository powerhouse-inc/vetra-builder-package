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
      <div className="p-3 bg-gray-50 rounded border">
        <Form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
          <div className="space-y-3">
            <PHIDField
              name="packageName"
              label="Package Name"
              initialOptions={[displayedPkg].map((p) => ({
                value: displayedPkg.phid ?? "",
                description: displayedPkg.description ?? "",
                path: {
                  text: `${config.vetraPackageBasePath}/${displayedPkg.title}`,
                  url: `${config.vetraPackageBasePath}/${displayedPkg.title}`,
                },
                title: displayedPkg.title ?? "",
              }))}
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

            <div className="flex justify-end space-x-3">
              <Button color="light" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!selectedPackage}>
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
        <div className="flex-1 min-w-0">
          <span className="font-medium text-gray-900">
            {displayedPkg.title}
          </span>
          {displayedPkg.description && (
            <p className="text-sm text-gray-500">{displayedPkg.description}</p>
          )}
          {displayedPkg.phid && displayedPkg.title && (
            <a
              href={`${config.vetraPackageBasePath}/${displayedPkg.title}`}
              className="text-xs text-blue-600 hover:text-blue-800 hover:underline block mt-1"
            >
              {config.vetraPackageBasePath}/{displayedPkg.title}
            </a>
          )}
        </div>
        <div className="flex space-x-2">
          <Button color="light" size="sm" onClick={onEdit}>
            Edit
          </Button>
          <Button color="red" size="sm" onClick={onDelete}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
