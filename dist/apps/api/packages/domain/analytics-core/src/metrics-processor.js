"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsProcessor = void 0;
class MetricsProcessor {
    constructor(dataCollector) {
        this.dataCollector = dataCollector;
    }
    async calculateKPIs(timeRange) {
        const events = await this.dataCollector.getEventsInTimeRange(timeRange);
        return {
            userMetrics: await this.calculateUserMetrics(events, timeRange),
            businessMetrics: await this.calculateBusinessMetrics(events, timeRange),
            technicalMetrics: await this.calculateTechnicalMetrics(events, timeRange),
            aiMetrics: await this.calculateAIMetrics(events, timeRange)
        };
    }
    async calculateUserMetrics(events, timeRange) {
        const loginEvents = events.filter(e => e.eventType === 'user_login');
        const sessionEvents = events.filter(e => e.eventType === 'session_start');
        // Daily Active Users
        const today = new Date();
        const todayEvents = events.filter(e => e.timestamp.toDateString() === today.toDateString());
        const dailyActiveUsers = new Set(todayEvents.map(e => e.userId)).size;
        // Monthly Active Users
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEvents = events.filter(e => e.timestamp >= monthStart);
        const monthlyActiveUsers = new Set(monthEvents.map(e => e.userId)).size;
        // User Retention Rate
        const userRetentionRate = await this.calculateRetentionRate(events);
        // User Churn Rate
        const userChurnRate = 1 - userRetentionRate;
        // Average Session Duration
        const averageSessionDuration = this.calculateAverageSessionDuration(sessionEvents);
        // User Lifetime Value (simplified calculation)
        const userLifetimeValue = await this.calculateUserLTV(events);
        return {
            dailyActiveUsers,
            monthlyActiveUsers,
            userRetentionRate,
            userChurnRate,
            averageSessionDuration,
            userLifetimeValue
        };
    }
    async calculateBusinessMetrics(events, timeRange) {
        const purchaseEvents = events.filter(e => e.eventType === 'purchase');
        const signupEvents = events.filter(e => e.eventType === 'user_signup');
        // Monthly Recurring Revenue
        const monthlyRecurringRevenue = purchaseEvents
            .filter(e => e.properties.subscriptionType === 'monthly')
            .reduce((sum, e) => sum + (e.properties.amount || 0), 0);
        // Customer Acquisition Cost (simplified)
        const customerAcquisitionCost = 100; // This would be calculated from marketing spend
        // Conversion Rate
        const conversionRate = purchaseEvents.length / signupEvents.length * 100;
        // Average Revenue Per User
        const totalRevenue = purchaseEvents.reduce((sum, e) => sum + (e.properties.amount || 0), 0);
        const uniqueUsers = new Set(purchaseEvents.map(e => e.userId)).size;
        const averageRevenuePerUser = uniqueUsers > 0 ? totalRevenue / uniqueUsers : 0;
        // Gross Margin (simplified)
        const grossMargin = 0.7; // 70% margin
        // Net Promoter Score (from survey events)
        const npsEvents = events.filter(e => e.eventType === 'nps_survey');
        const netPromoterScore = this.calculateNPS(npsEvents);
        return {
            monthlyRecurringRevenue,
            customerAcquisitionCost,
            conversionRate,
            averageRevenuePerUser,
            grossMargin,
            netPromoterScore
        };
    }
    async calculateTechnicalMetrics(events, timeRange) {
        const errorEvents = events.filter(e => e.eventType === 'error');
        const performanceEvents = events.filter(e => e.eventType === 'performance');
        // System Uptime (simplified)
        const systemUptime = 99.9;
        // Average Response Time
        const responseTimes = performanceEvents.map(e => e.properties.responseTime || 0);
        const averageResponseTime = responseTimes.length > 0
            ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
            : 0;
        // Error Rate
        const totalRequests = events.filter(e => e.eventType === 'api_request').length;
        const errorRate = totalRequests > 0 ? (errorEvents.length / totalRequests) * 100 : 0;
        // Throughput (requests per second)
        const timeRangeSeconds = (timeRange.end.getTime() - timeRange.start.getTime()) / 1000;
        const throughput = totalRequests / timeRangeSeconds;
        // Resource Utilization (simplified)
        const resourceUtilization = 65; // This would come from system monitoring
        // Deployment Frequency
        const deploymentEvents = events.filter(e => e.eventType === 'deployment');
        const deploymentFrequency = deploymentEvents.length;
        return {
            systemUptime,
            averageResponseTime,
            errorRate,
            throughput,
            resourceUtilization,
            deploymentFrequency
        };
    }
    async calculateAIMetrics(events, timeRange) {
        const aiQueryEvents = events.filter(e => e.eventType === 'ai_query');
        const aiResponseEvents = events.filter(e => e.eventType === 'ai_response');
        // Query Accuracy (from user feedback)
        const feedbackEvents = events.filter(e => e.eventType === 'ai_feedback');
        const positiveFeeback = feedbackEvents.filter(e => e.properties.rating >= 4);
        const queryAccuracy = feedbackEvents.length > 0
            ? (positiveFeeback.length / feedbackEvents.length) * 100
            : 0;
        // Response Time
        const responseTimes = aiResponseEvents.map(e => e.properties.responseTime || 0);
        const responseTime = responseTimes.length > 0
            ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
            : 0;
        // User Satisfaction
        const satisfactionRatings = feedbackEvents.map(e => e.properties.rating || 0);
        const userSatisfaction = satisfactionRatings.length > 0
            ? satisfactionRatings.reduce((sum, rating) => sum + rating, 0) / satisfactionRatings.length
            : 0;
        // Model Performance (simplified)
        const modelPerformance = 85; // This would come from ML model metrics
        // API Usage
        const apiUsage = aiQueryEvents.length;
        // Cost Per Query (simplified)
        const costPerQuery = 0.01; // $0.01 per query
        return {
            queryAccuracy,
            responseTime,
            userSatisfaction,
            modelPerformance,
            apiUsage,
            costPerQuery
        };
    }
    calculateRetentionRate(events) {
        // Simplified retention calculation
        // In a real implementation, this would be more sophisticated
        const uniqueUsers = new Set(events.map(e => e.userId));
        const returningUsers = new Set();
        uniqueUsers.forEach(userId => {
            const userEvents = events.filter(e => e.userId === userId);
            if (userEvents.length > 1) {
                returningUsers.add(userId);
            }
        });
        return uniqueUsers.size > 0 ? returningUsers.size / uniqueUsers.size : 0;
    }
    calculateAverageSessionDuration(sessionEvents) {
        const durations = sessionEvents
            .map(e => e.properties.duration || 0)
            .filter(d => d > 0);
        return durations.length > 0
            ? durations.reduce((sum, duration) => sum + duration, 0) / durations.length
            : 0;
    }
    calculateUserLTV(events) {
        // Simplified LTV calculation
        const purchaseEvents = events.filter(e => e.eventType === 'purchase');
        const totalRevenue = purchaseEvents.reduce((sum, e) => sum + (e.properties.amount || 0), 0);
        const uniqueUsers = new Set(purchaseEvents.map(e => e.userId)).size;
        return uniqueUsers > 0 ? totalRevenue / uniqueUsers : 0;
    }
    calculateNPS(npsEvents) {
        if (npsEvents.length === 0)
            return 0;
        const scores = npsEvents.map(e => e.properties.score || 0);
        const promoters = scores.filter(s => s >= 9).length;
        const detractors = scores.filter(s => s <= 6).length;
        return ((promoters - detractors) / scores.length) * 100;
    }
}
exports.MetricsProcessor = MetricsProcessor;
//# sourceMappingURL=metrics-processor.js.map