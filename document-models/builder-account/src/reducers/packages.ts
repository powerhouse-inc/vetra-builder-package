import type { BuilderAccountPackagesOperations } from "../../gen/packages/operations.js";
import { toPascalCase } from "document-drive/utils/misc";

export const reducer: BuilderAccountPackagesOperations = {
  addPackageOperation(state, action, dispatch) {
    const { spaceId } = action.input;
    const packageId = spaceId + "-" + toPascalCase(action.input.name);

    // Find the space index
    const spaceIndex = state.spaces.findIndex((space) => space.id === spaceId);

    if (spaceIndex === -1) {
      console.warn(`Space with id ${spaceId} not found`);
      return;
    }

    // Create the new package
    const newPackage = {
      id: packageId,
      ...action.input,
      category: action.input.category ?? "",
      description: action.input.description ?? "",
      github: action.input.github ?? "",
      npm: action.input.npm ?? "",
      vetraDriveUrl: action.input.vetraDriveUrl ?? "",
      author: action.input.author
        ? {
            name: action.input.author?.name ?? "",
            website: action.input.author?.website ?? "",
          }
        : {
            name: "",
            website: "",
          },
      keywords:
        action.input.keywords?.map((keyword) => {
          return {
            id: keyword,
            label: keyword,
          };
        }) ?? [],
    };

    // Create new space with the package added
    const updatedSpace = {
      ...state.spaces[spaceIndex],
      packages: [...state.spaces[spaceIndex].packages, newPackage],
    };

    // Replace the space in state
    state.spaces = [
      ...state.spaces.slice(0, spaceIndex),
      updatedSpace,
      ...state.spaces.slice(spaceIndex + 1),
    ];
  },
  setPackageDriveIdOperation(state, action, dispatch) {
    const { packageId, driveId } = action.input;
    for (const space of state.spaces) {
      const packageObject = space.packages.find(
        (packageObject) => packageObject.id === packageId
      );
      if (packageObject) {
        packageObject.vetraDriveUrl = driveId!;
      }
    }
  },
  updatePackageOperation(state, action, dispatch) {
    const { id, title, description } = action.input;
    for (const space of state.spaces) {
      let packageObject = space.packages.find(
        (packageObject) => packageObject.id === id
      );

      if (packageObject) {
        packageObject = {
          ...packageObject,
          name: title ?? packageObject.name,
          description: description ?? packageObject.description ?? "",
        };
      }
    }
  },
  reorderPackagesOperation(state, action, dispatch) {
    const { ids, insertAfter, spaceId } = action.input;
    for (const space of state.spaces) {
      if (space.id === spaceId) {
        // Remove the packages being reordered from their current positions
        const reorderedPackages = space.packages.filter((pkg) =>
          ids.includes(pkg.id)
        );
        const remainingPackages = space.packages.filter(
          (pkg) => !ids.includes(pkg.id)
        );

        if (insertAfter) {
          // Find the insertAfter package index in remaining packages
          const insertAfterIndex = remainingPackages.findIndex(
            (pkg) => pkg.id === insertAfter
          );

          if (insertAfterIndex !== -1) {
            // Insert the reordered packages after the insertAfter package
            space.packages = [
              ...remainingPackages.slice(0, insertAfterIndex + 1),
              ...reorderedPackages,
              ...remainingPackages.slice(insertAfterIndex + 1),
            ];
          } else {
            // If insertAfter package not found, just append to the end
            space.packages = [...reorderedPackages, ...remainingPackages];
          }
        } else {
          // No insertAfter specified, just append to the end
          space.packages = [...reorderedPackages, ...remainingPackages];
        }
      }
    }
  },
  deletePackageOperation(state, action, dispatch) {
    const { id } = action.input;
    for (const space of state.spaces) {
      space.packages = space.packages.filter(
        (packageObject) => packageObject.id !== id
      );
    }
  },
};
