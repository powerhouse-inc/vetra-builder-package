import type { UpgradeManifest } from "document-model";
import { builderAccountUpgradeManifest } from "./builder-account/upgrades/upgrade-manifest.js";
import { builderTeamUpgradeManifest } from "./builder-team/upgrades/upgrade-manifest.js";

export const upgradeManifests: UpgradeManifest<readonly number[]>[] = [
  builderAccountUpgradeManifest,
  builderTeamUpgradeManifest,
];
