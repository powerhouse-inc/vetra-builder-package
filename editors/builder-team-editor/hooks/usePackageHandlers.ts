import { useCallback, useState } from "react";
import {
  type BuilderTeamDocument,
  actions,
} from "../../../document-models/builder-team/index.js";
import { generateNanoId } from "../../../utils/nano-id.js";
import { type DocumentDispatch } from "@powerhousedao/reactor-browser";
import { type Action } from "document-model";

export function usePackageHandlers(
  spaces: BuilderTeamDocument["state"]["global"]["spaces"],
  dispatch: DocumentDispatch<Action>
) {
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);

  const handleAddPackage = useCallback(
    (spaceId: string, name: string, description: string) => {
      if (name.trim() && spaceId) {
        const id = generateNanoId();
        dispatch(actions.addPackage({ id, spaceId }));
        dispatch(
          actions.updatePackageInfo({
            id,
            title: name.trim(),
            description: description.trim() || null,
          })
        );
        return true;
      }
      return false;
    },
    [dispatch]
  );

  const handleDeletePackage = useCallback(
    (packageId: string) => {
      dispatch(actions.removePackage({ id: packageId }));
    },
    [dispatch]
  );

  const handleStartEditingPackage = useCallback((packageId: string) => {
    setEditingPackageId(packageId);
  }, []);

  const handleSavePackageEdit = useCallback(
    (packageId: string, name: string, description: string) => {
      console.log("handleSavePackageEdit", packageId, name, description);
      if (packageId && name.trim()) {
        dispatch(
          actions.updatePackageInfo({
            id: packageId,
            title: name.trim(),
            description: description.trim() || null,
          })
        );
        setEditingPackageId(null);
        return true;
      }
      return false;
    },
    [dispatch]
  );

  const handleCancelPackageEdit = useCallback(() => {
    setEditingPackageId(null);
  }, []);

  return {
    editingPackageId,
    handleAddPackage,
    handleDeletePackage,
    handleStartEditingPackage,
    handleSavePackageEdit,
    handleCancelPackageEdit,
  };
}
