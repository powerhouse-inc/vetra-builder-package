import {
  type IProcessorHostModule,
  type ProcessorFilter,
  type ProcessorRecord,
} from "@powerhousedao/reactor";
import { type PHDocumentHeader } from "document-model";
import { VetraBuilderRelationalDbProcessor } from "./index.js";

// "powerhouse" is the existing default namespace key — keeping it preserves
// all current rows. Per-drive processor instances now share the same tables;
// rows are distinguished by source_drive_id.
const SHARED_NAMESPACE_KEY = "powerhouse";

export const vetraBuilderTeamRelationalDbProcessorFactory =
  (module: IProcessorHostModule) =>
  async (driveHeader: PHDocumentHeader): Promise<ProcessorRecord[]> => {
    const namespace = VetraBuilderRelationalDbProcessor.getNamespace(
      SHARED_NAMESPACE_KEY,
    );

    const store =
      await module.relationalDb.createNamespace<VetraBuilderRelationalDbProcessor>(
        namespace,
      );

    const filter: ProcessorFilter = {
      branch: ["main"],
      documentId: ["*"],
      documentType: [
        "powerhouse/builder-team",
        "powerhouse/builder-account",
        "powerhouse/document-drive",
      ],
      scope: ["global"],
    };

    const processor = new VetraBuilderRelationalDbProcessor(
      namespace,
      filter,
      store,
      driveHeader.id,
    );
    return [
      {
        processor,
        filter,
      },
    ];
  };
