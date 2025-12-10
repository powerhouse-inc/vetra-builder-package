import { baseActions } from "document-model";
import {
  profileActions,
  memberActions,
  spacesActions,
  packagesActions,
} from "./gen/creators.js";

/** Actions for the BuilderTeam document model */
export const actions = {
  ...baseActions,
  ...profileActions,
  ...memberActions,
  ...spacesActions,
  ...packagesActions,
};
