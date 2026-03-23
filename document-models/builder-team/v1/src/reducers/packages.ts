import type { BuilderTeamPackagesOperations } from "@powerhousedao/vetra-builder-package/document-models/builder-team/v1";

export const builderTeamPackagesOperations: BuilderTeamPackagesOperations = {
  addPackageOperation(state, action) {
    // TODO: implement addPackageOperation reducer
    throw new Error("Reducer for 'addPackageOperation' not implemented.");
  },
  updatePackageInfoOperation(state, action) {
    // TODO: implement updatePackageInfoOperation reducer
    throw new Error(
      "Reducer for 'updatePackageInfoOperation' not implemented.",
    );
  },
  removePackageOperation(state, action) {
    // TODO: implement removePackageOperation reducer
    throw new Error("Reducer for 'removePackageOperation' not implemented.");
  },
  reorderPackagesOperation(state, action) {
    const { spaceId, packageIds, targetIndex } = action.input;

    // Find the space
    const space = state.spaces.find((s) => s.id === spaceId);
    if (!space) {
      return;
    }

    // Find the packages to move
    const packagesToMove = space.packages.filter((pkg) =>
      packageIds.includes(pkg.id),
    );
    const remainingPackages = space.packages.filter(
      (pkg) => !packageIds.includes(pkg.id),
    );

    // Insert the packages at the target index
    remainingPackages.splice(targetIndex, 0, ...packagesToMove);
    space.packages = remainingPackages;
  },
};
