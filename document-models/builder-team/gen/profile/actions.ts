import { type Action } from 'document-model';
import type {
    SetLogoInput,
    SetTeamNameInput,
    SetSlugInput,
    SetDescriptionInput,
    SetSocialsInput,
} from '../types.js';

export type SetLogoAction = Action & { type: 'SET_LOGO'; input: SetLogoInput };
export type SetTeamNameAction = Action & { type: 'SET_TEAM_NAME'; input: SetTeamNameInput };
export type SetSlugAction = Action & { type: 'SET_SLUG'; input: SetSlugInput };
export type SetDescriptionAction = Action & { type: 'SET_DESCRIPTION'; input: SetDescriptionInput };
export type SetSocialsAction = Action & { type: 'SET_SOCIALS'; input: SetSocialsInput };

export type BuilderTeamProfileAction = 
    | SetLogoAction
    | SetTeamNameAction
    | SetSlugAction
    | SetDescriptionAction
    | SetSocialsAction
;