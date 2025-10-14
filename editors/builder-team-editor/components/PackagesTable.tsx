import { ObjectSetTable, Icon } from "@powerhousedao/document-engineering";
import { useMemo } from "react";
import type { VetraPackageInfo } from "../../../document-models/builder-team/index.js";
import type { ColumnDef } from "@powerhousedao/document-engineering";
import { config } from "../config.js";

interface PackagesTableProps {
  packages: VetraPackageInfo[];
  onEdit: (packageId: string) => void;
  onDelete: (packageId: string) => void;
  onReorder: (packageIds: string[], targetIndex: number) => void;
}

export function PackagesTable({
  packages,
  onEdit,
  onDelete,
  onReorder,
}: PackagesTableProps) {
  const columns = useMemo<ColumnDef<VetraPackageInfo>[]>(
    () => [
      {
        field: "title",
        title: "Package Name",
        type: "string",
        width: "250px",
        renderHeader: () => <div className="px-4">Package Name</div>,
        renderCell: (value, context) => {
          const pkg = context.row;
          return (
            <div className="flex items-center gap-2 px-4">
              <Icon name="PackageManager" size="16px" color="rgb(75 85 99)" />
              <span className="font-medium text-gray-900">
                {(value as string) || "Untitled Package"}
              </span>
            </div>
          );
        },
      },
      {
        field: "description",
        title: "Description",
        type: "string",
        width: "300px",
        renderHeader: () => <div className="px-4">Description</div>,
        renderCell: (value) => {
          return (
            <div className="px-4">
              <span className="text-sm text-gray-600 line-clamp-2">
                {(value as string) || "—"}
              </span>
            </div>
          );
        },
      },
      {
        field: "phid",
        title: "PHID",
        type: "phid",
        width: "200px",
        renderHeader: () => <div className="px-4">PHID</div>,
        renderCell: (value) => {
          if (!value) return <div className="px-4"><span className="text-gray-400">—</span></div>;
          return (
            <div className="px-4">
              <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-700">
                {(value as string).slice(0, 16)}...
              </code>
            </div>
          );
        },
      },
      {
        field: "phid",
        title: "Links",
        type: "string",
        width: "120px",
        align: "center",
        renderHeader: () => <div className="px-4">Links</div>,
        renderCell: (value, context) => {
          const pkg = context.row;
          const hasLinks = pkg.phid || pkg.github || pkg.vetraDriveUrl;

          if (!hasLinks) {
            return <div className="px-4"><span className="text-gray-400">—</span></div>;
          }

          return (
            <div className="flex items-center gap-2 justify-center px-4">
              {pkg.phid && (
                <a
                  href={`${config.vetraPackageBasePath}/${pkg.phid}`}
                  className="text-gray-700 hover:text-gray-900"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Package"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
              {pkg.github && (
                <a
                  href={pkg.github}
                  className="text-gray-700 hover:text-gray-900"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View GitHub"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Icon name="Github" size="16px" />
                </a>
              )}
              {pkg.vetraDriveUrl && (() => {
                // Extract driveId from vetraDriveUrl (e.g., "/d/vetra-builder-package" -> "vetra-builder-package")
                const driveId = pkg.vetraDriveUrl.replace(/^\/d\//, '');

                return (
                  <>
                    <a
                      href={pkg.vetraDriveUrl}
                      className="text-gray-700 hover:text-gray-900"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Vetra Drive"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon name="Drive" size="16px" />
                    </a>
                    <a
                      href={`${window.location.origin}/?driveUrl=${driveId}`}
                      className="text-gray-700 hover:text-gray-900"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Connect to Drive"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon name="ConnectSmall" size="16px" />
                    </a>
                  </>
                );
              })()}
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="w-full packages-table">
      <ObjectSetTable
        data={packages}
        columns={columns}
        allowRowSelection={false}
        showRowNumbers={false}
        width="100%"
        minRowHeight={56}
        onReorder={(rows, targetIndex) => {
          const packageIds = rows.map((row) => row.id);
          onReorder(packageIds, targetIndex);
        }}
        actions={{
          secondary: [
            {
              label: "Edit Package",
              callback: ({ row }) => {
                onEdit(row.id);
              },
            },
            {
              label: "Remove",
              callback: ({ row }) => {
                onDelete(row.id);
              },
            },
          ],
        }}
      />
    </div>
  );
}
