import { useCallback } from "react";
import { actions } from "../../../document-models/builder-team/index.js";
import { generateNanoId } from "../../../utils/nano-id.js";
import { type DocumentDispatch } from "@powerhousedao/reactor-browser";
import { type Action } from "document-model";

export function useMemberHandlers(dispatch: DocumentDispatch<Action>) {
  const handleAddMember = useCallback(
    (address: string) => {
      if (address.trim()) {
        const id = generateNanoId();
        dispatch(actions.addMember({ id }));
        dispatch(actions.updateMemberInfo({ id, ethAddress: address.trim() }));
        return true;
      }
      return false;
    },
    [dispatch]
  );

  const handleRemoveMember = useCallback(
    (id: string) => {
      dispatch(actions.removeMember({ id }));
    },
    [dispatch]
  );

  return {
    handleAddMember,
    handleRemoveMember,
  };
}
