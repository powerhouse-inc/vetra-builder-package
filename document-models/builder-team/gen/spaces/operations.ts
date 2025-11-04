import { type SignalDispatch } from 'document-model';
import {
    type AddSpaceAction,
    type UpdateSpaceInfoAction,
    type RemoveSpaceAction,
    type ReorderSpacesAction,
} from './actions.js';
import { type BuilderTeamState } from '../types.js';

export interface BuilderTeamSpacesOperations {
    addSpaceOperation: (state: BuilderTeamState, action: AddSpaceAction, dispatch?: SignalDispatch) => void,
    updateSpaceInfoOperation: (state: BuilderTeamState, action: UpdateSpaceInfoAction, dispatch?: SignalDispatch) => void,
    removeSpaceOperation: (state: BuilderTeamState, action: RemoveSpaceAction, dispatch?: SignalDispatch) => void,
    reorderSpacesOperation: (state: BuilderTeamState, action: ReorderSpacesAction, dispatch?: SignalDispatch) => void,
}