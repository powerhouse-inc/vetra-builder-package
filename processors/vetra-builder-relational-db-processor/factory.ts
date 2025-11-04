import { type RelationalDbProcessorFilter } from "document-drive";
import {
  type IProcessorHostModule,
  type ProcessorRecord,
} from "document-drive";
import { type PHDocumentHeader } from "document-model";
import { VetraBuilderRelationalDbProcessor } from "./index.js";

export const vetraBuilderTeamRelationalDbProcessorFactory =
  (module: IProcessorHostModule) =>
  async (driveHeader: PHDocumentHeader): Promise<ProcessorRecord[]> => {
    // Create a namespace for the processor and the provided drive id
    const namespace = VetraBuilderRelationalDbProcessor.getNamespace(
      driveHeader.id
    );

    // Create a namespaced db for the processor
    const store =
      await module.relationalDb.createNamespace<VetraBuilderRelationalDbProcessor>(
        namespace
      );

    // Create a filter for the processor
    const filter: RelationalDbProcessorFilter = {
      branch: ["main"],
      documentId: ["*"],
      documentType: ["powerhouse/builder-team", "powerhouse/document-drive"],
      scope: ["global"],
    };

    // Create the processor
    const processor = new VetraBuilderRelationalDbProcessor(
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
