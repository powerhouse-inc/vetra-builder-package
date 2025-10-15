import type { VetraPackageInfo } from "document-models/builder-team/gen/types.js";
import type { BuilderTeamPackagesOperations } from "../../gen/packages/operations.js";

// Extended type that includes sortOrder for internal sorting
type PackageWithSortOrder = VetraPackageInfo & { sortOrder: number };

export const reducer: BuilderTeamPackagesOperations = {
  addPackageOperation(state, action, dispatch) {
    const space = state.spaces.find(
      (space) => space.id === action.input.spaceId
    );
    if (!space) {
      return;
    }

    // Assign sortOrder as the next index
    const sortOrder = space.packages.length;
    const newPackage: PackageWithSortOrder = {
      ...action.input,
      id: action.input.id,
      phid: null,
      title: null,
      description: null,
      github: null,
      npm: null,
      vetraDriveUrl: null,
      sortOrder,
    };

    space.packages.push(newPackage);
  },
  updatePackageInfoOperation(state, action, dispatch) {
    let packageIndex = -1;
    const spaceIndex = state.spaces.findIndex((space) => {
      packageIndex = space.packages.findIndex((p) => p.id === action.input.id);
      return packageIndex !== -1;
    });
    if (packageIndex === -1) {
      return;
    }

    state.spaces[spaceIndex].packages[packageIndex] = {
      ...state.spaces[spaceIndex].packages[packageIndex],
      ...action.input,
    };
  },
  removePackageOperation(state, action, dispatch) {
    const spaceIndex = state.spaces.findIndex((space) =>
      space.packages.find((p) => p.id === action.input.id)
    );
    if (spaceIndex === -1) {
      return;
    }
    state.spaces[spaceIndex].packages = state.spaces[
      spaceIndex
    ].packages.filter((p) => p.id !== action.input.id);
  },
  reorderPackagesOperation(state, action, dispatch) {
      const { spaceId, packageIds, targetIndex } = action.input;

      // Find the space
      const space = state.spaces.find(s => s.id === spaceId);
      if (!space) {
        return;
      }

      // Find the packages to move
      const packagesToMove = space.packages.filter(pkg => packageIds.includes(pkg.id));
      const remainingPackages = space.packages.filter(pkg => !packageIds.includes(pkg.id));

      // Insert the packages at the target index
      remainingPackages.splice(targetIndex, 0, ...packagesToMove);
      space.packages = remainingPackages;

      // Update sortOrder for all packages
      space.packages.forEach((pkg, index) => {
        (pkg as PackageWithSortOrder).sortOrder = index;
      });
  },
};
