"use strict";
/**
 * Date Helper Utilities - TypeScript Migration
 * مساعدات التعامل مع التواريخ
 * @module DateHelper
 * @version 2.0.0 (TypeScript)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatToISO = formatToISO;
exports.formatForDisplay = formatForDisplay;
exports.daysDifference = daysDifference;
exports.isValidDate = isValidDate;
exports.getMonthStart = getMonthStart;
exports.getMonthEnd = getMonthEnd;
function formatToISO(date) {
    if (!date)
        return null;
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime()))
        return null;
    return dateObj.toISOString();
}
function formatForDisplay(date, options = {}) {
    if (!date)
        return '';
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime()))
        return '';
    const { locale = 'ar-SA', ...formatOptions } = options;
    return dateObj.toLocaleDateString(locale, formatOptions);
}
function daysDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()))
        return 0;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
function isValidDate(date) {
    if (date === null || date === undefined || date === '')
        return false;
    const dateObj = new Date(date);
    return !isNaN(dateObj.getTime());
}
function getMonthStart(date) {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime()))
        return null;
    return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
}
function getMonthEnd(date) {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime()))
        return null;
    return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
}
//# sourceMappingURL=date-helper.js.map