import {
  BaseDocumentClass,
  applyMixins,
  type SignalDispatch,
} from "document-model";
import { RenownProfilePHState } from "./ph-factories.js";
import { type RenownProfileAction } from "./actions.js";
import { reducer } from "./reducer.js";
import { createDocument } from "./utils.js";
import RenownProfile_Profile from "./profile/object.js";
import RenownProfile_Authorization from "./authorization/object.js";

export * from "./profile/object.js";
export * from "./authorization/object.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface RenownProfile
  extends RenownProfile_Profile,
    RenownProfile_Authorization {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class RenownProfile extends BaseDocumentClass<RenownProfilePHState> {
  static fileExtension = "renown-profile";

  constructor(
    initialState?: Partial<RenownProfilePHState>,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, RenownProfile.fileExtension, name);
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

applyMixins(RenownProfile, [
  RenownProfile_Profile,
  RenownProfile_Authorization,
]);

export { RenownProfile };
