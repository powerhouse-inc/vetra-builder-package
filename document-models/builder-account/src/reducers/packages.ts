import { generateId } from "document-model";
import type { BuilderAccountPackagesOperations } from "../../gen/packages/operations.js";

export const reducer: BuilderAccountPackagesOperations = {
  addPackageOperation(state, action, dispatch) {
    const { spaceId } = action.input;
    const packageId = generateId();
    state.spaces
      .find((space) => space.id === spaceId)
      ?.packages.push({
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
              id: generateId(),
              label: keyword,
            };
          }) ?? [],
      });
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
        space.packages = space.packages.sort((a, b) => {
          const aIndex = ids.indexOf(a.id);
          const bIndex = ids.indexOf(b.id);
          if (aIndex === -1) {
            return 1;
          }
          if (bIndex === -1) {
            return -1;
          }
          return aIndex - bIndex;
        });
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
