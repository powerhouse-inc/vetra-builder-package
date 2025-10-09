import { Button } from "@powerhousedao/document-engineering";
import { useState } from "react";
import type { BuilderTeamDocument } from "../../../document-models/builder-team/index.js";

interface MembersSectionProps {
  members: BuilderTeamDocument['state']['global']['members'];
  onAddMember: (address: string) => boolean;
  onRemoveMember: (id: string) => void;
}

export function MembersSection({ members, onAddMember, onRemoveMember }: MembersSectionProps) {
  const [newMemberAddress, setNewMemberAddress] = useState("");

  const handleAddMember = () => {
    if (onAddMember(newMemberAddress)) {
      setNewMemberAddress("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
        <p className="text-sm text-gray-500">Manage team access</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMemberAddress}
              onChange={(e) => setNewMemberAddress(e.target.value)}
              placeholder="0x..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <Button 
              onClick={handleAddMember}
              disabled={!newMemberAddress.trim()}
            >
              Add
            </Button>
          </div>
          
          <div className="space-y-2">
            {members.length > 0 ? (
              members.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                  <span className="text-sm font-mono text-gray-700 truncate">
                    {member.ethAddress}
                  </span>
                  <Button 
                    color="red" 
                    size="sm"
                    onClick={() => onRemoveMember(member.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No team members added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

