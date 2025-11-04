import { createAction } from 'document-model/core';
import { z,
    type SetLogoInput,
    type SetTeamNameInput,
    type SetSlugInput,
    type SetDescriptionInput,
    type SetSocialsInput,
} from '../types.js';
import {
    type SetLogoAction,
    type SetTeamNameAction,
    type SetSlugAction,
    type SetDescriptionAction,
    type SetSocialsAction,
} from './actions.js';

export const setLogo = (input: SetLogoInput) =>
    createAction<SetLogoAction>(
        'SET_LOGO',
        {...input},
        undefined,
        z.SetLogoInputSchema,
        'global'
    );

export const setTeamName = (input: SetTeamNameInput) =>
    createAction<SetTeamNameAction>(
        'SET_TEAM_NAME',
        {...input},
        undefined,
        z.SetTeamNameInputSchema,
        'global'
    );

export const setSlug = (input: SetSlugInput) =>
    createAction<SetSlugAction>(
        'SET_SLUG',
        {...input},
        undefined,
        z.SetSlugInputSchema,
        'global'
    );

export const setDescription = (input: SetDescriptionInput) =>
    createAction<SetDescriptionAction>(
        'SET_DESCRIPTION',
        {...input},
        undefined,
        z.SetDescriptionInputSchema,
        'global'
    );

export const setSocials = (input: SetSocialsInput) =>
    createAction<SetSocialsAction>(
        'SET_SOCIALS',
        {...input},
        undefined,
        z.SetSocialsInputSchema,
        'global'
    );


