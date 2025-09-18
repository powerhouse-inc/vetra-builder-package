/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { generateMock } from '@powerhousedao/codegen';
import utils from '../../gen/utils.js';
import {
    z,
    type AddPackageInput,
    type SetPackageDriveIdInput,
    type UpdatePackageInput,
    type ReorderPackagesInput,
    type DeletePackageInput,
} from '../../gen/schema/index.js';
import { reducer } from '../../gen/reducer.js';
import * as creators from '../../gen/packages/creators.js';
import type { BuilderAccountDocument } from '../../gen/types.js';

describe('Packages Operations', () => {
    let document: BuilderAccountDocument;

    beforeEach(() => {
        document = utils.createDocument();
    });

    it('should handle addPackage operation', () => {
        const input: AddPackageInput = generateMock(
            z.AddPackageInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.addPackage(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'ADD_PACKAGE',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
    it('should handle setPackageDriveId operation', () => {
        const input: SetPackageDriveIdInput = generateMock(
            z.SetPackageDriveIdInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.setPackageDriveId(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'SET_PACKAGE_DRIVE_ID',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
    it('should handle updatePackage operation', () => {
        const input: UpdatePackageInput = generateMock(
            z.UpdatePackageInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.updatePackage(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'UPDATE_PACKAGE',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
    it('should handle reorderPackages operation', () => {
        const input: ReorderPackagesInput = generateMock(
            z.ReorderPackagesInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.reorderPackages(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'REORDER_PACKAGES',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
    it('should handle deletePackage operation', () => {
        const input: DeletePackageInput = generateMock(
            z.DeletePackageInputSchema(),
        );

        const updatedDocument = reducer(
            document,
            creators.deletePackage(input),
        );

        expect(updatedDocument.operations.global).toHaveLength(1);
        expect(updatedDocument.operations.global[0].action.type).toBe(
            'DELETE_PACKAGE',
        );
        expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
        expect(updatedDocument.operations.global[0].index).toEqual(0);
    });
});
