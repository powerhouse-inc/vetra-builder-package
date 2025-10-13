import type { VetraPackageInfo } from "document-models/builder-team/gen/types.js";
import type { BuilderTeamPackagesOperations } from "../../gen/packages/operations.js";

export const reducer: BuilderTeamPackagesOperations = {
  addPackageOperation(state, action, dispatch) {
    const space = state.spaces.find(
      (space) => space.id === action.input.spaceId
    );
    if (!space) {
      return;
    }

    const newPackage: VetraPackageInfo = {
      ...action.input,
      id: action.input.id,
      phid: null,
      title: null,
      description: null,
      github: null,
      npm: null,
      vetraDriveUrl: null,
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
};
