import {
  BaseDocumentClass,
  applyMixins,
  type SignalDispatch,
} from "document-model";
import { BuilderAccountPHState } from "./ph-factories.js";
import { type BuilderAccountAction } from "./actions.js";
import { reducer } from "./reducer.js";
import { createDocument } from "./utils.js";
import BuilderAccount_Profile from "./profile/object.js";
import BuilderAccount_Members from "./members/object.js";
import BuilderAccount_Spaces from "./spaces/object.js";
import BuilderAccount_Packages from "./packages/object.js";

export * from "./profile/object.js";
export * from "./members/object.js";
export * from "./spaces/object.js";
export * from "./packages/object.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface BuilderAccount
  extends BuilderAccount_Profile,
    BuilderAccount_Members,
    BuilderAccount_Spaces,
    BuilderAccount_Packages {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class BuilderAccount extends BaseDocumentClass<BuilderAccountPHState> {
  static fileExtension = "phvba";

  constructor(
    initialState?: Partial<BuilderAccountPHState>,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, BuilderAccount.fileExtension, name);
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

applyMixins(BuilderAccount, [
  BuilderAccount_Profile,
  BuilderAccount_Members,
  BuilderAccount_Spaces,
  BuilderAccount_Packages,
]);

export { BuilderAccount };
