import {
  Button,
  Form,
  PHIDField,
  Icon,
} from "@powerhousedao/document-engineering";
import { type VetraPackageInfo } from "document-models/builder-team";
import { useState } from "react";
import { config } from "../config.js";
import { getPackage, searchPackageOptions, getPackageOption } from "../services/vetra-api.js";
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
                selectedPackage.phid
                  ? [
                      {
                        value: selectedPackage.phid,
                        description: selectedPackage.description ?? "",
                        path: {
                          text: `${config.vetraPackageBasePath}/${selectedPackage.phid}`,
                          url: `${config.vetraPackageBasePath}/${selectedPackage.phid}`,
                        },
                        title: selectedPackage.title ?? "",
                        icon: "PackageManager",
                      },
                    ]
                  : []
              }
              value={selectedPackage.phid ?? undefined}
              onChange={async (phid) => {
                if (!phid) {
                  return;
                }
                const pkg = await getPackage(phid);
                if (pkg) {
                  setSelectedPackage({
                    id: selectedPackage.id,
                    phid: pkg.documentId,
                    title: pkg.name,
                    description: pkg.description,
                    github: pkg.githubUrl || null,
                    npm: null,
                    vetraDriveUrl: null,
                  });
                }
              }}
              allowUris={true}
              autoComplete={true}
              fetchOptionsCallback={searchPackageOptions}
              fetchSelectedOptionCallback={async (value) => {
                const pkg = await getPackage(value);
                if (pkg) {
                  setSelectedPackage({
                    id: selectedPackage.id,
                    phid: pkg.documentId,
                    title: pkg.name,
                    description: pkg.description,
                    github: pkg.githubUrl || null,
                    npm: null,
                    vetraDriveUrl: null,
                  });
                }
                return getPackageOption(value);
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
            <Icon name="PackageManager" size="16px" color="rgb(75 85 99)" />
            <span className="font-semibold text-gray-900 truncate">
              {pkg.title || "Untitled Package"}
            </span>
          </div>
          {pkg.description && (
            <p className="text-sm text-gray-600 ml-6 leading-relaxed">{pkg.description}</p>
          )}
          {pkg.phid && (
            <a
              href={`${config.vetraPackageBasePath}/${pkg.phid}`}
              className="text-xs text-gray-600 hover:text-gray-900 hover:underline ml-6 mt-1.5 inline-flex items-center gap-1 group/link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Package
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
