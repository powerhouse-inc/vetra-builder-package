import type { BuilderTeamDocument } from "../../../document-models/builder-team/index.js";

interface QuickStatsProps {
  spaces: BuilderTeamDocument['state']['global']['spaces'];
  members: BuilderTeamDocument['state']['global']['members'];
}

export function QuickStats({ spaces, members }: QuickStatsProps) {
  const totalPackages = spaces.reduce((total, space) => total + space.packages.length, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Spaces</span>
            <span className="text-sm font-medium text-gray-900">{spaces.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Total Packages</span>
            <span className="text-sm font-medium text-gray-900">{totalPackages}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Team Members</span>
            <span className="text-sm font-medium text-gray-900">{members.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

