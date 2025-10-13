import { useCallback } from "react";
import { actions } from "../../../document-models/builder-team/index.js";
import { generateNanoId } from "../../../utils/nano-id.js";
import { type DocumentDispatch } from "@powerhousedao/reactor-browser";
import { type Action } from "document-model";

export interface MemberProfileData {
  phid: string;
  ethAddress: string;
  name: string;
  profileImage?: string;
}

export function useMemberHandlers(dispatch: DocumentDispatch<Action>) {
  const handleAddMember = useCallback(
    (profileData: MemberProfileData) => {
      if (profileData.ethAddress.trim()) {
        const id = generateNanoId();
        dispatch(actions.addMember({ id }));
        dispatch(
          actions.updateMemberInfo({
            id,
            phid: profileData.phid,
            ethAddress: profileData.ethAddress.trim(),
            name: profileData.name,
            profileImage: profileData.profileImage,
          })
        );
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
