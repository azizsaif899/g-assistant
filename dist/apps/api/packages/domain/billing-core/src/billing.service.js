"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingService = void 0;
class BillingService {
    constructor() {
        this.plans = new Map();
        this.subscriptions = new Map();
        this.initializePlans();
    }
    initializePlans() {
        const basicPlan = {
            id: 'basic',
            name: 'Basic Plan',
            price: 29,
            currency: 'USD',
            interval: 'monthly',
            features: ['AI Chat', 'Basic Analytics', 'Email Support']
        };
        const proPlan = {
            id: 'pro',
            name: 'Pro Plan',
            price: 99,
            currency: 'USD',
            interval: 'monthly',
            features: ['AI Chat', 'Advanced Analytics', 'Priority Support', 'API Access']
        };
        this.plans.set('basic', basicPlan);
        this.plans.set('pro', proPlan);
    }
    async createSubscription(userId, planId) {
        const subscription = {
            id: `sub_${Date.now()}`,
            userId,
            planId,
            status: 'trialing',
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt: new Date()
        };
        this.subscriptions.set(subscription.id, subscription);
        console.log(`💳 Subscription created: ${subscription.id}`);
        return subscription;
    }
    async processPayment(subscriptionId) {
        const subscription = this.subscriptions.get(subscriptionId);
        if (!subscription) {
            return { success: false, message: 'Subscription not found' };
        }
        subscription.status = 'active';
        return { success: true, message: 'Payment processed successfully' };
    }
    getPlans() {
        return Array.from(this.plans.values());
    }
}
exports.BillingService = BillingService;
//# sourceMappingURL=billing.service.js.map