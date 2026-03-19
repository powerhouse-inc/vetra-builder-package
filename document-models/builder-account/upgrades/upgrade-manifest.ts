import type { UpgradeManifest } from "document-model";
import { latestVersion, supportedVersions } from "./versions.js";

export const builderAccountUpgradeManifest: UpgradeManifest<
  typeof supportedVersions
> = {
  documentType: "powerhouse/vetra/builder-account",
  latestVersion,
  supportedVersions,
  upgrades: {},
};
