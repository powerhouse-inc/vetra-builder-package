import {
  type ProcessorRecord,
  type IProcessorHostModule,
} from "document-drive/processors/types";
import { type RelationalDbProcessorFilter } from "document-drive/processors/relational";
import { type PHDocumentHeader } from "document-model";
import { RenownProfileProcessor } from "./index.js";

export const renownProfileProcessorFactory =
  (module: IProcessorHostModule) =>
  async (driveHeader: PHDocumentHeader): Promise<ProcessorRecord[]> => {
    // Create a namespace for the processor and the provided drive id
    const namespace = RenownProfileProcessor.getNamespace(driveHeader.id);

    // Create a namespaced db for the processor
    const store =
      await module.relationalDb.createNamespace<RenownProfileProcessor>(
        namespace,
      );

    // Create a filter for the processor
    const filter: RelationalDbProcessorFilter = {
      branch: ["main"],
      documentId: ["*"],
      documentType: ["powerhouse/renown-profile"],
      scope: ["global"],
    };

    // Create the processor
    const processor = new RenownProfileProcessor(namespace, filter, store);
    return [
      {
        processor,
        filter,
      },
    ];
  };
