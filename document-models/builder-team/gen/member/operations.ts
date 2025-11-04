import { type SignalDispatch } from 'document-model';
import {
    type AddMemberAction,
    type UpdateMemberInfoAction,
    type RemoveMemberAction,
} from './actions.js';
import { type BuilderTeamState } from '../types.js';

export interface BuilderTeamMemberOperations {
    addMemberOperation: (state: BuilderTeamState, action: AddMemberAction, dispatch?: SignalDispatch) => void,
    updateMemberInfoOperation: (state: BuilderTeamState, action: UpdateMemberInfoAction, dispatch?: SignalDispatch) => void,
    removeMemberOperation: (state: BuilderTeamState, action: RemoveMemberAction, dispatch?: SignalDispatch) => void,
}