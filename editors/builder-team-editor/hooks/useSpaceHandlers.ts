import { useCallback, useState } from "react";
import {
  type BuilderTeamDocument,
  actions,
} from "../../../document-models/builder-team/index.js";
import { type DocumentDispatch } from "@powerhousedao/reactor-browser";
import { type Action } from "document-model";

export function useSpaceHandlers(
  spaces: BuilderTeamDocument["state"]["global"]["spaces"],
  dispatch: DocumentDispatch<Action>
) {
  const [editingSpaceId, setEditingSpaceId] = useState<string | null>(null);
  const [editingSpaceTitle, setEditingSpaceTitle] = useState("");
  const [editingSpaceDescription, setEditingSpaceDescription] = useState("");

  const handleAddSpace = useCallback(
    (title: string, description: string) => {
      if (title.trim()) {
        dispatch(
          actions.addSpace({
            id: title.trim(),
          })
        );
        return true;
      }
      return false;
    },
    [dispatch]
  );

  const handleDeleteSpace = useCallback(
    (spaceId: string) => {
      dispatch(actions.removeSpace({ id: spaceId }));
    },
    [dispatch]
  );

  const handleSetSpaceTitle = useCallback(
    (spaceId: string, newTitle: string) => {
      if (newTitle.trim()) {
        dispatch(
          actions.updateSpaceInfo({ id: spaceId, title: newTitle.trim() })
        );
      }
    },
    [dispatch]
  );

  const handleSetSpaceDescription = useCallback(
    (spaceId: string, description: string) => {
      dispatch(
        actions.updateSpaceInfo({
          id: spaceId,
          description: description.trim(),
        })
      );
    },
    [dispatch]
  );

  const handleStartEditingSpace = useCallback(
    (spaceId: string) => {
      const space = spaces.find((s) => s.id === spaceId);
      if (space) {
        setEditingSpaceId(spaceId);
        setEditingSpaceTitle(space.title);
        setEditingSpaceDescription(space.description || "");
      }
    },
    [spaces]
  );

  const handleSaveSpaceEdit = useCallback(() => {
    if (editingSpaceId && editingSpaceTitle.trim()) {
      handleSetSpaceTitle(editingSpaceId, editingSpaceTitle);
      handleSetSpaceDescription(editingSpaceId, editingSpaceDescription);
      setEditingSpaceId(null);
      setEditingSpaceTitle("");
      setEditingSpaceDescription("");
      return true;
    }
    return false;
  }, [
    editingSpaceId,
    editingSpaceTitle,
    editingSpaceDescription,
    handleSetSpaceTitle,
    handleSetSpaceDescription,
  ]);

  const handleCancelSpaceEdit = useCallback(() => {
    setEditingSpaceId(null);
    setEditingSpaceTitle("");
    setEditingSpaceDescription("");
  }, []);

  return {
    editingSpaceId,
    editingSpaceTitle,
    setEditingSpaceTitle,
    editingSpaceDescription,
    setEditingSpaceDescription,
    handleAddSpace,
    handleDeleteSpace,
    handleStartEditingSpace,
    handleSaveSpaceEdit,
    handleCancelSpaceEdit,
  };
}
