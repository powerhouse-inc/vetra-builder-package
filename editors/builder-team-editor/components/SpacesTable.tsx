import { ObjectSetTable } from "@powerhousedao/document-engineering";
import { useMemo } from "react";
import type { VetraBuilderSpace } from "../../../document-models/builder-team/index.js";
import type { ColumnDef } from "@powerhousedao/document-engineering";

interface SpacesTableProps {
  spaces: VetraBuilderSpace[];
  onEdit: (spaceId: string) => void;
  onDelete: (spaceId: string) => void;
  onAddPackage: (spaceId: string) => void;
  onViewPackages: (spaceId: string) => void;
  onReorder: (spaceIds: string[], targetIndex: number) => void;
}

export function SpacesTable({
  spaces,
  onEdit,
  onDelete,
  onAddPackage,
  onViewPackages,
  onReorder,
}: SpacesTableProps) {
  const columns = useMemo<ColumnDef<VetraBuilderSpace>[]>(
    () => [
      {
        field: "title",
        title: "Space Title",
        type: "string",
        width: "300px",
        renderCell: (value, context) => {
          return (
            <div
              className="cursor-pointer hover:text-blue-600 font-medium"
              onClick={() => onViewPackages(context.row.id)}
            >
              {value as string}
            </div>
          );
        },
      },
      {
        field: "description",
        title: "Description",
        type: "string",
        width: "400px",
      },
      {
        field: "packages",
        title: "Packages",
        type: "number",
        width: "120px",
        align: "center",
        valueGetter: (row) => row.packages.length,
        renderCell: (value) => {
          const count = value as number;
          return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {count} {count === 1 ? "package" : "packages"}
            </span>
          );
        },
      },
    ],
    [onViewPackages]
  );

  return (
    <div className="w-full spaces-table">
      <ObjectSetTable
        data={spaces}
        columns={columns}
        allowRowSelection={false}
        showRowNumbers={false}
        width="100%"
        minRowHeight={60}
        onReorder={(rows, targetIndex) => {
          const spaceIds = rows.map((row) => row.id);
          onReorder(spaceIds, targetIndex);
        }}
        actions={{
          secondary: [
            {
              label: "View Packages",
              callback: ({ row }) => {
                onViewPackages(row.id);
              },
            },
            {
              label: "Edit Space",
              callback: ({ row }) => {
                onEdit(row.id);
              },
            },
            {
              label: "Add Package",
              callback: ({ row }) => {
                onAddPackage(row.id);
              },
            },
            {
              label: "Remove",
              callback: ({ row }) => {
                onDelete(row.id);
              },
            }
          ],
        }}
      />
    </div>
  );
}
