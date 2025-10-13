import {
  BaseDocumentClass,
  applyMixins,
  type SignalDispatch,
} from "document-model";
import { type BuilderTeamPHState } from "./ph-factories.js";
import { type BuilderTeamAction } from "./actions.js";
import { reducer } from "./reducer.js";
import { createDocument } from "./utils.js";
import BuilderTeam_Profile from "./profile/object.js";
import BuilderTeam_Member from "./member/object.js";
import BuilderTeam_Spaces from "./spaces/object.js";
import BuilderTeam_Packages from "./packages/object.js";

export * from "./profile/object.js";
export * from "./member/object.js";
export * from "./spaces/object.js";
export * from "./packages/object.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface BuilderTeam
  extends BuilderTeam_Profile,
    BuilderTeam_Member,
    BuilderTeam_Spaces,
    BuilderTeam_Packages {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class BuilderTeam extends BaseDocumentClass<BuilderTeamPHState> {
  static fileExtension = "phvba";

  constructor(
    initialState?: Partial<BuilderTeamPHState>,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, BuilderTeam.fileExtension, name);
  }

  public loadFromFile(path: string) {
    return super.loadFromFile(path);
  }

  static async fromFile(path: string) {
    const document = new this();
    await document.loadFromFile(path);
    return document;
  }
}

applyMixins(BuilderTeam, [
  BuilderTeam_Profile,
  BuilderTeam_Member,
  BuilderTeam_Spaces,
  BuilderTeam_Packages,
]);

export { BuilderTeam };
