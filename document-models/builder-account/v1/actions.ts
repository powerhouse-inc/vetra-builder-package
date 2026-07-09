/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { baseActions } from "document-model";
import {
  builderAccountMembersActions,
  builderAccountPackagesActions,
  builderAccountProfileActions,
  builderAccountSpacesActions,
} from "./gen/creators.js";

/** Actions for the BuilderAccount document model */

export const actions = {
  ...baseActions,
  ...builderAccountProfileActions,
  ...builderAccountMembersActions,
  ...builderAccountSpacesActions,
  ...builderAccountPackagesActions,
};
