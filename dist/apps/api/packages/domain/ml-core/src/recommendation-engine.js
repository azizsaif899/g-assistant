"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationEngine = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let RecommendationEngine = class RecommendationEngine {
    constructor() {
        this.userProfiles = new Map();
        this.itemFeatures = new Map();
    }
    async getRecommendations(userId, limit = 10) {
        const userProfile = this.userProfiles.get(userId);
        if (!userProfile) {
            return this.getPopularItems(limit);
        }
        // Collaborative filtering + Content-based filtering
        const recommendations = await this.hybridRecommendation(userId, limit);
        return recommendations;
    }
    async updateUserProfile(userId, interactions) {
        const profile = this.userProfiles.get(userId) || { preferences: {}, history: [] };
        // Update user preferences based on interactions
        for (const interaction of interactions) {
            profile.history.push(interaction);
            this.updatePreferences(profile.preferences, interaction);
        }
        this.userProfiles.set(userId, profile);
    }
    async hybridRecommendation(userId, limit) {
        const collaborative = await this.collaborativeFiltering(userId, limit);
        const contentBased = await this.contentBasedFiltering(userId, limit);
        // Combine recommendations with weights
        return this.combineRecommendations(collaborative, contentBased, limit);
    }
    async collaborativeFiltering(userId, limit) {
        // Find similar users and recommend their liked items
        return [
            { itemId: 'item1', score: 0.95, reason: 'Users like you also liked this' },
            { itemId: 'item2', score: 0.87, reason: 'Popular among similar users' }
        ];
    }
    async contentBasedFiltering(userId, limit) {
        // Recommend items similar to user's preferences
        return [
            { itemId: 'item3', score: 0.92, reason: 'Similar to your interests' },
            { itemId: 'item4', score: 0.84, reason: 'Matches your preferences' }
        ];
    }
    combineRecommendations(collab, content, limit) {
        // Weighted combination of recommendations
        const combined = [...collab, ...content];
        return combined.sort((a, b) => b.score - a.score).slice(0, limit);
    }
    getPopularItems(limit) {
        // Return popular items for new users
        return [
            { itemId: 'popular1', score: 0.9, reason: 'Trending now' },
            { itemId: 'popular2', score: 0.85, reason: 'Most popular' }
        ];
    }
    updatePreferences(preferences, interaction) {
        // Update user preferences based on interaction
        const category = interaction.category;
        preferences[category] = (preferences[category] || 0) + interaction.rating;
    }
};
exports.RecommendationEngine = RecommendationEngine;
exports.RecommendationEngine = RecommendationEngine = tslib_1.__decorate([
    (0, common_1.Injectable)()
], RecommendationEngine);
//# sourceMappingURL=recommendation-engine.js.map