"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let OperationsService = class OperationsService {
    constructor() {
        this.invoices = [];
        this.expenses = [];
        this.inventory = [];
    }
    createInvoice(invoiceData) {
        const invoice = {
            id: `INV-${Date.now()}`,
            ...invoiceData,
            createdAt: new Date(),
            status: 'draft'
        };
        this.invoices.push(invoice);
        return invoice;
    }
    getInvoices(filters = {}) {
        return this.invoices.filter(invoice => {
            if (filters.status && invoice.status !== filters.status)
                return false;
            if (filters.customerId && invoice.customerId !== filters.customerId)
                return false;
            return true;
        });
    }
    recordExpense(expenseData) {
        const expense = {
            id: `EXP-${Date.now()}`,
            ...expenseData,
            createdAt: new Date(),
            status: 'pending'
        };
        this.expenses.push(expense);
        return expense;
    }
    getExpenses(filters = {}) {
        return this.expenses.filter(expense => {
            if (filters.category && expense.category !== filters.category)
                return false;
            if (filters.status && expense.status !== filters.status)
                return false;
            return true;
        });
    }
    addInventoryItem(itemData) {
        const item = {
            id: `ITEM-${Date.now()}`,
            ...itemData,
            createdAt: new Date(),
            lastUpdated: new Date()
        };
        this.inventory.push(item);
        return item;
    }
    getInventory(filters = {}) {
        return this.inventory.filter(item => {
            if (filters.category && item.category !== filters.category)
                return false;
            if (filters.lowStock && item.quantity > item.minQuantity)
                return false;
            return true;
        });
    }
    getFinancialSummary(period = 'month') {
        const now = new Date();
        const startDate = this.getPeriodStartDate(period, now);
        const periodInvoices = this.invoices.filter(inv => new Date(inv.createdAt) >= startDate && inv.status === 'paid');
        const periodExpenses = this.expenses.filter(exp => new Date(exp.createdAt) >= startDate && exp.status === 'approved');
        const totalRevenue = periodInvoices.reduce((sum, inv) => sum + (inv.amount || 0), 0);
        const totalExpenses = periodExpenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
        return {
            period,
            totalRevenue,
            totalExpenses,
            netProfit: totalRevenue - totalExpenses,
            invoiceCount: periodInvoices.length,
            expenseCount: periodExpenses.length
        };
    }
    getPeriodStartDate(period, now) {
        switch (period) {
            case 'week':
                return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            case 'month':
                return new Date(now.getFullYear(), now.getMonth(), 1);
            case 'quarter':
                const quarter = Math.floor(now.getMonth() / 3);
                return new Date(now.getFullYear(), quarter * 3, 1);
            case 'year':
                return new Date(now.getFullYear(), 0, 1);
            default:
                return new Date(now.getFullYear(), now.getMonth(), 1);
        }
    }
};
exports.OperationsService = OperationsService;
exports.OperationsService = OperationsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], OperationsService);
//# sourceMappingURL=operations-service.js.map