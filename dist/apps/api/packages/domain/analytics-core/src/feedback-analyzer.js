"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackAnalyzer = void 0;
class FeedbackAnalyzer {
    async analyzeFeedback(feedback) {
        console.log('🔍 Analyzing user feedback...');
        // Mock AI analysis - in production would use actual AI models
        const sentiment = this.analyzeSentiment(feedback);
        const category = this.categorizeContent(feedback);
        const priority = this.assessPriority(feedback, sentiment);
        const keywords = this.extractKeywords(feedback);
        return { sentiment, category, priority, keywords };
    }
    analyzeSentiment(content) {
        const positiveWords = ['good', 'great', 'excellent', 'love', 'amazing'];
        const negativeWords = ['bad', 'terrible', 'hate', 'awful', 'broken'];
        const positive = positiveWords.some(word => content.toLowerCase().includes(word));
        const negative = negativeWords.some(word => content.toLowerCase().includes(word));
        if (positive && !negative)
            return 'positive';
        if (negative && !positive)
            return 'negative';
        return 'neutral';
    }
    categorizeContent(content) {
        if (content.toLowerCase().includes('bug') || content.toLowerCase().includes('error')) {
            return 'bug';
        }
        if (content.toLowerCase().includes('feature') || content.toLowerCase().includes('suggest')) {
            return 'feature';
        }
        if (content.toLowerCase().includes('complaint') || content.toLowerCase().includes('problem')) {
            return 'complaint';
        }
        return 'general';
    }
    assessPriority(content, sentiment) {
        if (content.toLowerCase().includes('critical') || content.toLowerCase().includes('urgent')) {
            return 'critical';
        }
        if (sentiment === 'negative')
            return 'high';
        if (sentiment === 'positive')
            return 'low';
        return 'medium';
    }
    extractKeywords(content) {
        const words = content.toLowerCase().split(/\s+/);
        const stopWords = ['the', 'is', 'at', 'which', 'on', 'and', 'a', 'to', 'are', 'as', 'was', 'were'];
        return words.filter(word => word.length > 3 && !stopWords.includes(word)).slice(0, 5);
    }
    async generateInsights(feedbacks) {
        const totalFeedbacks = feedbacks.length;
        const sentimentDistribution = this.calculateSentimentDistribution(feedbacks);
        const categoryDistribution = this.calculateCategoryDistribution(feedbacks);
        const priorityDistribution = this.calculatePriorityDistribution(feedbacks);
        return {
            totalFeedbacks,
            sentimentDistribution,
            categoryDistribution,
            priorityDistribution,
            averageRating: feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalFeedbacks
        };
    }
    calculateSentimentDistribution(feedbacks) {
        const distribution = { positive: 0, negative: 0, neutral: 0 };
        feedbacks.forEach(f => distribution[f.sentiment]++);
        return distribution;
    }
    calculateCategoryDistribution(feedbacks) {
        const distribution = { bug: 0, feature: 0, general: 0, complaint: 0 };
        feedbacks.forEach(f => distribution[f.category]++);
        return distribution;
    }
    calculatePriorityDistribution(feedbacks) {
        const distribution = { low: 0, medium: 0, high: 0, critical: 0 };
        feedbacks.forEach(f => distribution[f.priority]++);
        return distribution;
    }
}
exports.FeedbackAnalyzer = FeedbackAnalyzer;
//# sourceMappingURL=feedback-analyzer.js.map