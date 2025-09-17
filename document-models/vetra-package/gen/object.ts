import {
  BaseDocumentClass,
  applyMixins,
  type SignalDispatch,
} from "document-model";
import { VetraPackagePHState } from "./ph-factories.js";
import { type VetraPackageAction } from "./actions.js";
import { reducer } from "./reducer.js";
import { createDocument } from "./utils.js";
import VetraPackage_Meta from "./meta/object.js";

export * from "./meta/object.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface VetraPackage extends VetraPackage_Meta {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class VetraPackage extends BaseDocumentClass<VetraPackagePHState> {
  static fileExtension = "phvp";

  constructor(
    initialState?: Partial<VetraPackagePHState>,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, VetraPackage.fileExtension, name);
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

applyMixins(VetraPackage, [VetraPackage_Meta]);

export { VetraPackage };
