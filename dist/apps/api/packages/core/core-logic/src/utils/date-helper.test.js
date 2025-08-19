"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_helper_1 = require("./date-helper");
describe('DateHelper', () => {
    describe('formatToISO', () => {
        it('should format valid date to ISO string', () => {
            const date = new Date('2025-01-09T12:00:00Z');
            const result = (0, date_helper_1.formatToISO)(date);
            expect(result).toBe('2025-01-09T12:00:00.000Z');
        });
        it('should return null for invalid date', () => {
            expect((0, date_helper_1.formatToISO)('invalid')).toBeNull();
            expect((0, date_helper_1.formatToISO)(null)).toBeNull();
            expect((0, date_helper_1.formatToISO)(undefined)).toBeNull();
        });
        it('should handle string dates', () => {
            const result = (0, date_helper_1.formatToISO)('2025-01-09');
            expect(result).toContain('2025-01-09');
        });
    });
    describe('formatForDisplay', () => {
        it('should format date for Arabic locale by default', () => {
            const date = new Date('2025-01-09');
            const result = (0, date_helper_1.formatForDisplay)(date);
            expect(result).toBeTruthy();
        });
        it('should return empty string for invalid date', () => {
            expect((0, date_helper_1.formatForDisplay)('invalid')).toBe('');
            expect((0, date_helper_1.formatForDisplay)(null)).toBe('');
        });
        it('should accept custom locale', () => {
            const date = new Date('2025-01-09');
            const result = (0, date_helper_1.formatForDisplay)(date, { locale: 'en-US' });
            expect(result).toBeTruthy();
        });
    });
    describe('daysDifference', () => {
        it('should calculate days difference correctly', () => {
            const start = '2025-01-01';
            const end = '2025-01-09';
            const result = (0, date_helper_1.daysDifference)(start, end);
            expect(result).toBe(8);
        });
        it('should return 0 for invalid dates', () => {
            expect((0, date_helper_1.daysDifference)('invalid', '2025-01-09')).toBe(0);
            expect((0, date_helper_1.daysDifference)('2025-01-01', 'invalid')).toBe(0);
        });
        it('should handle Date objects', () => {
            const start = new Date('2025-01-01');
            const end = new Date('2025-01-03');
            const result = (0, date_helper_1.daysDifference)(start, end);
            expect(result).toBe(2);
        });
    });
    describe('isValidDate', () => {
        it('should return true for valid dates', () => {
            expect((0, date_helper_1.isValidDate)(new Date())).toBe(true);
            expect((0, date_helper_1.isValidDate)('2025-01-09')).toBe(true);
            expect((0, date_helper_1.isValidDate)('2025-01-09T12:00:00Z')).toBe(true);
        });
        it('should return false for invalid dates', () => {
            expect((0, date_helper_1.isValidDate)('invalid')).toBe(false);
            expect((0, date_helper_1.isValidDate)(null)).toBe(false);
            expect((0, date_helper_1.isValidDate)(undefined)).toBe(false);
            expect((0, date_helper_1.isValidDate)('')).toBe(false);
            expect((0, date_helper_1.isValidDate)({})).toBe(false);
        });
    });
    describe('getMonthStart', () => {
        it('should return first day of month', () => {
            const date = '2025-01-15';
            const result = (0, date_helper_1.getMonthStart)(date);
            expect(result?.getDate()).toBe(1);
            expect(result?.getMonth()).toBe(0); // January
            expect(result?.getFullYear()).toBe(2025);
        });
        it('should return null for invalid date', () => {
            expect((0, date_helper_1.getMonthStart)('invalid')).toBeNull();
        });
    });
    describe('getMonthEnd', () => {
        it('should return last day of month', () => {
            const date = '2025-01-15';
            const result = (0, date_helper_1.getMonthEnd)(date);
            expect(result?.getDate()).toBe(31); // January has 31 days
            expect(result?.getMonth()).toBe(0); // January
            expect(result?.getFullYear()).toBe(2025);
        });
        it('should handle February correctly', () => {
            const date = '2025-02-15';
            const result = (0, date_helper_1.getMonthEnd)(date);
            expect(result?.getDate()).toBe(28); // 2025 is not a leap year
        });
        it('should return null for invalid date', () => {
            expect((0, date_helper_1.getMonthEnd)('invalid')).toBeNull();
        });
    });
});
//# sourceMappingURL=date-helper.test.js.map