/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { baseActions } from "document-model";
import {
  builderTeamMemberActions,
  builderTeamPackagesActions,
  builderTeamProfileActions,
  builderTeamSpacesActions,
} from "./gen/creators.js";

/** Actions for the BuilderTeam document model */

export const actions = {
  ...baseActions,
  ...builderTeamProfileActions,
  ...builderTeamMemberActions,
  ...builderTeamSpacesActions,
  ...builderTeamPackagesActions,
};
