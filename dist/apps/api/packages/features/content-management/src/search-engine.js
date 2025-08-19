"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemanticSearchEngine = void 0;
const tslib_1 = require("tslib");
const fuse_js_1 = tslib_1.__importDefault(require("fuse.js"));
class SemanticSearchEngine {
    constructor() {
        this.contentIndex = new Map();
        const options = {
            keys: [
                { name: 'title', weight: 0.3 },
                { name: 'content', weight: 0.4 },
                { name: 'tags', weight: 0.2 },
                { name: 'metadata.keywords', weight: 0.1 }
            ],
            threshold: 0.3,
            includeScore: true,
            includeMatches: true
        };
        this.fuse = new fuse_js_1.default([], options);
    }
    async index(content) {
        this.contentIndex.set(content.id, content);
        this.rebuildIndex();
    }
    async reindex(content) {
        this.contentIndex.set(content.id, content);
        this.rebuildIndex();
    }
    async remove(contentId) {
        this.contentIndex.delete(contentId);
        this.rebuildIndex();
    }
    async semanticSearch(query) {
        let results = this.fuse.search(query.query);
        // Apply filters
        if (query.filters) {
            results = results.filter(result => {
                const content = result.item;
                // Type filter
                if (query.filters.type && !query.filters.type.includes(content.type)) {
                    return false;
                }
                // Status filter
                if (query.filters.status && !query.filters.status.includes(content.status)) {
                    return false;
                }
                // Author filter
                if (query.filters.author && !query.filters.author.includes(content.author.id)) {
                    return false;
                }
                // Tags filter
                if (query.filters.tags) {
                    const hasMatchingTag = query.filters.tags.some(tag => content.tags.includes(tag));
                    if (!hasMatchingTag)
                        return false;
                }
                // Categories filter
                if (query.filters.categories) {
                    const hasMatchingCategory = query.filters.categories.some(category => content.categories.includes(category));
                    if (!hasMatchingCategory)
                        return false;
                }
                // Date range filter
                if (query.filters.dateRange) {
                    const contentDate = content.publishedAt || content.createdAt;
                    if (contentDate < query.filters.dateRange.start ||
                        contentDate > query.filters.dateRange.end) {
                        return false;
                    }
                }
                return true;
            });
        }
        // Sort results
        if (query.sort) {
            results.sort((a, b) => {
                const aValue = this.getFieldValue(a.item, query.sort.field);
                const bValue = this.getFieldValue(b.item, query.sort.field);
                if (query.sort.direction === 'asc') {
                    return aValue > bValue ? 1 : -1;
                }
                else {
                    return aValue < bValue ? 1 : -1;
                }
            });
        }
        // Apply pagination
        const offset = query.offset || 0;
        const limit = query.limit || 10;
        const paginatedResults = results.slice(offset, offset + limit);
        return paginatedResults.map(result => result.item);
    }
    async findSimilar(contentId, limit = 5) {
        const content = this.contentIndex.get(contentId);
        if (!content)
            return [];
        // Create a search query based on the content's tags and categories
        const searchTerms = [...content.tags, ...content.categories, content.title].join(' ');
        const results = this.fuse.search(searchTerms);
        return results
            .filter(result => result.item.id !== contentId)
            .slice(0, limit)
            .map(result => result.item);
    }
    async getPopularContent(limit = 10) {
        // Mock implementation - in reality, this would use view counts, engagement metrics, etc.
        const allContent = Array.from(this.contentIndex.values());
        return allContent
            .filter(content => content.status === 'published')
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(0, limit);
    }
    async getRecentContent(limit = 10) {
        const allContent = Array.from(this.contentIndex.values());
        return allContent
            .filter(content => content.status === 'published')
            .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
            .slice(0, limit);
    }
    async getTrendingTags(limit = 20) {
        const tagCounts = new Map();
        for (const content of this.contentIndex.values()) {
            if (content.status === 'published') {
                for (const tag of content.tags) {
                    tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
                }
            }
        }
        return Array.from(tagCounts.entries())
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    }
    async getContentByTag(tag, limit = 10) {
        const allContent = Array.from(this.contentIndex.values());
        return allContent
            .filter(content => content.status === 'published' &&
            content.tags.includes(tag))
            .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
            .slice(0, limit);
    }
    async getContentByCategory(category, limit = 10) {
        const allContent = Array.from(this.contentIndex.values());
        return allContent
            .filter(content => content.status === 'published' &&
            content.categories.includes(category))
            .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
            .slice(0, limit);
    }
    async getContentByAuthor(authorId, limit = 10) {
        const allContent = Array.from(this.contentIndex.values());
        return allContent
            .filter(content => content.status === 'published' &&
            content.author.id === authorId)
            .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
            .slice(0, limit);
    }
    async generateSearchSuggestions(query) {
        // Simple suggestion generation based on existing content
        const allContent = Array.from(this.contentIndex.values());
        const suggestions = new Set();
        // Extract keywords from titles and tags
        for (const content of allContent) {
            if (content.status === 'published') {
                // Add title words
                const titleWords = content.title.toLowerCase().split(/\s+/);
                titleWords.forEach(word => {
                    if (word.length > 3 && word.includes(query.toLowerCase())) {
                        suggestions.add(content.title);
                    }
                });
                // Add tags
                content.tags.forEach(tag => {
                    if (tag.toLowerCase().includes(query.toLowerCase())) {
                        suggestions.add(tag);
                    }
                });
            }
        }
        return Array.from(suggestions).slice(0, 5);
    }
    rebuildIndex() {
        const contentArray = Array.from(this.contentIndex.values());
        this.fuse.setCollection(contentArray);
    }
    getFieldValue(item, field) {
        const fields = field.split('.');
        let value = item;
        for (const f of fields) {
            value = value?.[f];
        }
        return value;
    }
}
exports.SemanticSearchEngine = SemanticSearchEngine;
//# sourceMappingURL=search-engine.js.map