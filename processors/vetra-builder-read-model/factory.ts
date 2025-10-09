import { type RelationalDbProcessorFilter } from "document-drive/processors/relational";
import {
  type IProcessorHostModule,
  type ProcessorRecord,
} from "document-drive/processors/types";
import { type PHDocumentHeader } from "document-model";
import { VetraBuilderReadModelProcessor } from "./index.js";

export const vetraBuilderReadModelProcessorFactory =
  (module: IProcessorHostModule) =>
  async (driveHeader: PHDocumentHeader): Promise<ProcessorRecord[]> => {
    // Create a namespace for the processor and the provided drive id
    const namespace = VetraBuilderReadModelProcessor.getNamespace(
      driveHeader.id
    );

    // Create a namespaced db for the processor
    const store =
      await module.relationalDb.createNamespace<VetraBuilderReadModelProcessor>(
        namespace
      );

    // Create a filter for the processor
    const filter: RelationalDbProcessorFilter = {
      branch: ["main"],
      documentId: ["*"],
      documentType: [
        "powerhouse/vetra/builder-account",
        "powerhouse/document-drive",
      ],
      scope: ["global"],
    };

    // Create the processor
    const processor = new VetraBuilderReadModelProcessor(
      namespace,
      filter,
      store
    );
    return [
      {
        processor,
        filter,
      },
    ];
  };
