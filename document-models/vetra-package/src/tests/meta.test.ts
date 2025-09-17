/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { generateMock } from '@powerhousedao/codegen';
import utils from '../../gen/utils.js';
import {
    z,
    type SetPackageNameInput,
    type SetPackageDescriptionInput,
    type SetPackageCategoryInput,
    type SetPackageGithubInput,
    type SetPackageNpmInput,
    type SetAuthorInput,
    type AddKeywordsInput,
    type RemoveKeywordsInput,
} from '../../gen/schema/index.js';
import { reducer } from '../../gen/reducer.js';
import * as creators from '../../gen/meta/creators.js';
import type { VetraPackageDocument } from '../../gen/types.js';

describe('Meta Operations', () => {
    let document: VetraPackageDocument;

    beforeEach(() => {
        document = utils.createDocument();
    });

    it('should handle setPackageName operation', () => {
        const input: SetPackageNameInput = generateMock(
            z.SetPackageNameInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.setPackageName(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'SET_PACKAGE_NAME',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
    it('should handle setPackageDescription operation', () => {
        const input: SetPackageDescriptionInput = generateMock(
            z.SetPackageDescriptionInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.setPackageDescription(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'SET_PACKAGE_DESCRIPTION',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
    it('should handle setPackageCategory operation', () => {
        const input: SetPackageCategoryInput = generateMock(
            z.SetPackageCategoryInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.setPackageCategory(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'SET_PACKAGE_CATEGORY',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
    it('should handle setPackageGithub operation', () => {
        const input: SetPackageGithubInput = generateMock(
            z.SetPackageGithubInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.setPackageGithub(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'SET_PACKAGE_GITHUB',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
    it('should handle setPackageNpm operation', () => {
        const input: SetPackageNpmInput = generateMock(
            z.SetPackageNpmInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.setPackageNpm(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'SET_PACKAGE_NPM',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
    it('should handle setAuthor operation', () => {
        const input: SetAuthorInput = generateMock(
            z.SetAuthorInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.setAuthor(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'SET_AUTHOR',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
    it('should handle addKeywords operation', () => {
        const input: AddKeywordsInput = generateMock(
            z.AddKeywordsInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.addKeywords(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'ADD_KEYWORDS',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
    it('should handle removeKeywords operation', () => {
        const input: RemoveKeywordsInput = generateMock(
            z.RemoveKeywordsInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.removeKeywords(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'REMOVE_KEYWORDS',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
});
