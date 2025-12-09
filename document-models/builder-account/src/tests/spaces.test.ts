/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { generateMock } from '@powerhousedao/codegen';
import * as utils from '../../gen/utils.js';
import {
    type AddSpaceInput,
    type DeleteSpaceInput,
    type SetSpaceTitleInput,
    type SetSpaceDescriptionInput,
    type ReorderSpacesInput,
    AddSpaceInputSchema,
    DeleteSpaceInputSchema,
    SetSpaceTitleInputSchema,
    SetSpaceDescriptionInputSchema,
    ReorderSpacesInputSchema,
} from '../../gen/schema/index.js';
import { reducer } from '../../gen/reducer.js';
import * as creators from '../../gen/spaces/creators.js';
import type { BuilderAccountDocument } from '../../gen/types.js';

describe('Spaces Operations', () => {
    let document: BuilderAccountDocument;

    beforeEach(() => {
        document = utils.createDocument();
    });

    it('should handle addSpace operation', () => {
        const input: AddSpaceInput = generateMock(
            AddSpaceInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.addSpace(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'ADD_SPACE',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
    it('should handle deleteSpace operation', () => {
        const input: DeleteSpaceInput = generateMock(
            DeleteSpaceInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.deleteSpace(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'DELETE_SPACE',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
    it('should handle setSpaceTitle operation', () => {
        const input: SetSpaceTitleInput = generateMock(
            SetSpaceTitleInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.setSpaceTitle(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'SET_SPACE_TITLE',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
    it('should handle setSpaceDescription operation', () => {
        const input: SetSpaceDescriptionInput = generateMock(
            SetSpaceDescriptionInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.setSpaceDescription(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'SET_SPACE_DESCRIPTION',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
    it('should handle reorderSpaces operation', () => {
        const input: ReorderSpacesInput = generateMock(
            ReorderSpacesInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.reorderSpaces(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'REORDER_SPACES',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
});
