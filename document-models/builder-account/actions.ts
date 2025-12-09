import { baseActions } from "document-model";
import {
  profileActions,
  membersActions,
  spacesActions,
  packagesActions,
} from "./gen/creators.js";

/** Actions for the BuilderAccount document model */
export const actions = {
  ...baseActions,
  ...profileActions,
  ...membersActions,
  ...spacesActions,
  ...packagesActions,
};
