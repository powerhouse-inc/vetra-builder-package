import { type SignalDispatch } from 'document-model';
import {
    type AddPackageAction,
    type UpdatePackageInfoAction,
    type RemovePackageAction,
    type ReorderPackagesAction,
} from './actions.js';
import { type BuilderTeamState } from '../types.js';

export interface BuilderTeamPackagesOperations {
    addPackageOperation: (state: BuilderTeamState, action: AddPackageAction, dispatch?: SignalDispatch) => void,
    updatePackageInfoOperation: (state: BuilderTeamState, action: UpdatePackageInfoAction, dispatch?: SignalDispatch) => void,
    removePackageOperation: (state: BuilderTeamState, action: RemovePackageAction, dispatch?: SignalDispatch) => void,
    reorderPackagesOperation: (state: BuilderTeamState, action: ReorderPackagesAction, dispatch?: SignalDispatch) => void,
}