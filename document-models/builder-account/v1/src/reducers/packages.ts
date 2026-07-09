import type { BuilderAccountPackagesOperations } from "document-models/builder-account/v1";

export const builderAccountPackagesOperations: BuilderAccountPackagesOperations =
  {
    addPackageOperation(state, action) {
      const {
        id,
        spaceId,
        name,
        description,
        category,
        author,
        keywords,
        github,
        npm,
        vetraDriveUrl,
      } = action.input;
      const space = state.spaces.find((s) => s.id === spaceId);
      if (!space) {
        return;
      }
      if (space.packages.find((p) => p.id === id)) {
        return;
      }
      space.packages.push({
        id,
        name,
        description: description ?? null,
        category: category ?? null,
        author: author
          ? { name: author.name, website: author.website ?? null }
          : { name: "", website: null },
        keywords: (keywords ?? []).map((label) => ({ id: label, label })),
        github: github ?? null,
        npm: npm ?? null,
        vetraDriveUrl: vetraDriveUrl ?? null,
        driveId: null,
      });
    },
    setPackageDriveIdOperation(state, action) {
      const { packageId, driveId } = action.input;
      for (const space of state.spaces) {
        const pkg = space.packages.find((p) => p.id === packageId);
        if (pkg) {
          pkg.driveId = driveId ?? null;
          return;
        }
      }
    },
    updatePackageOperation(state, action) {
      const { id, name, description } = action.input;
      for (const space of state.spaces) {
        const pkg = space.packages.find((p) => p.id === id);
        if (pkg) {
          if (name) pkg.name = name;
          if (description !== undefined && description !== null)
            pkg.description = description;
          return;
        }
      }
    },
    reorderPackagesOperation(state, action) {
      const { spaceId, ids, insertAfter } = action.input;
      const space = state.spaces.find((s) => s.id === spaceId);
      if (!space) {
        return;
      }

      const toMove = space.packages.filter((p) => ids.includes(p.id));
      const remaining = space.packages.filter((p) => !ids.includes(p.id));

      let insertIndex = 0;
      if (insertAfter) {
        const anchorIndex = remaining.findIndex((p) => p.id === insertAfter);
        insertIndex = anchorIndex === -1 ? remaining.length : anchorIndex + 1;
      }

      remaining.splice(insertIndex, 0, ...toMove);
      space.packages = remaining;
    },
    deletePackageOperation(state, action) {
      const { id } = action.input;
      for (const space of state.spaces) {
        const idx = space.packages.findIndex((p) => p.id === id);
        if (idx !== -1) {
          space.packages.splice(idx, 1);
          return;
        }
      }
    },
  };
