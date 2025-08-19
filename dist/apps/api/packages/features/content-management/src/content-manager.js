"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentManager = exports.WorkflowEngine = exports.ContentRepository = void 0;
const tslib_1 = require("tslib");
const uuid_1 = require("uuid");
const marked_1 = require("marked");
const dompurify_1 = tslib_1.__importDefault(require("dompurify"));
const types_1 = require("./types");
const search_engine_1 = require("./search-engine");
const ai_assistant_1 = require("./ai-assistant");
class ContentRepository {
    constructor() {
        this.contents = new Map();
        this.versions = new Map();
    }
    async save(content) {
        this.contents.set(content.id, content);
    }
    async findById(id) {
        return this.contents.get(id) || null;
    }
    async findAll() {
        return Array.from(this.contents.values());
    }
    async saveVersion(content) {
        if (!this.versions.has(content.id)) {
            this.versions.set(content.id, []);
        }
        this.versions.get(content.id).push({ ...content });
    }
    async getVersions(contentId) {
        return this.versions.get(contentId) || [];
    }
    async delete(id) {
        this.contents.delete(id);
        this.versions.delete(id);
    }
}
exports.ContentRepository = ContentRepository;
class WorkflowEngine {
    async startApprovalWorkflow(content) {
        console.log(`Starting approval workflow for content: ${content.title}`);
        // Mock workflow implementation
    }
}
exports.WorkflowEngine = WorkflowEngine;
class ContentManager {
    constructor() {
        this.repository = new ContentRepository();
        this.searchEngine = new search_engine_1.SemanticSearchEngine();
        this.workflowEngine = new WorkflowEngine();
        this.aiAssistant = new ai_assistant_1.AIContentAssistant();
    }
    async createContent(contentData, author) {
        // Validate content
        await this.validateContent(contentData);
        // Generate AI suggestions
        const aiSuggestions = await this.aiAssistant.generateSuggestions(contentData);
        // Create content item
        const content = {
            id: (0, uuid_1.v4)(),
            type: contentData.type,
            title: contentData.title,
            slug: this.generateSlug(contentData.title),
            content: this.sanitizeContent(contentData.content),
            metadata: {
                ...contentData.metadata,
                keywords: contentData.metadata.keywords || [],
                category: contentData.metadata.category || 'general',
                aiSuggestions
            },
            status: types_1.ContentStatus.DRAFT,
            author,
            createdAt: new Date(),
            updatedAt: new Date(),
            version: 1,
            tags: contentData.tags || await this.aiAssistant.suggestTags(contentData.content),
            categories: contentData.categories || await this.aiAssistant.categorizeContent(contentData.content),
            language: contentData.language || 'ar',
            seo: await this.generateSEOMetadata(contentData)
        };
        // Save to repository
        await this.repository.save(content);
        // Index for search
        await this.searchEngine.index(content);
        // Start workflow if needed
        if (contentData.requiresApproval) {
            await this.workflowEngine.startApprovalWorkflow(content);
        }
        return content;
    }
    async updateContent(id, updates, user) {
        const existingContent = await this.repository.findById(id);
        if (!existingContent) {
            throw new Error('Content not found');
        }
        // Check permissions
        await this.checkUpdatePermissions(existingContent, user);
        // Create new version
        const updatedContent = {
            ...existingContent,
            ...updates,
            updatedAt: new Date(),
            version: existingContent.version + 1
        };
        // AI-powered content enhancement
        if (updates.content) {
            updatedContent.content = this.sanitizeContent(updates.content);
            const enhancements = await this.aiAssistant.enhanceContent(updates.content);
            updatedContent.metadata.aiEnhancements = enhancements;
        }
        // Save version history
        await this.repository.saveVersion(existingContent);
        // Update current version
        await this.repository.save(updatedContent);
        // Re-index for search
        await this.searchEngine.reindex(updatedContent);
        return updatedContent;
    }
    async getContent(id) {
        return await this.repository.findById(id);
    }
    async getAllContent() {
        return await this.repository.findAll();
    }
    async searchContent(query, user) {
        // Semantic search with AI
        const semanticResults = await this.searchEngine.semanticSearch(query);
        // Filter by permissions
        const filteredResults = await this.filterByPermissions(semanticResults, user);
        // Enhance with AI insights
        const enhancedResults = await this.aiAssistant.enhanceSearchResults(filteredResults, query);
        return {
            results: enhancedResults,
            totalCount: filteredResults.length,
            facets: await this.generateSearchFacets(filteredResults),
            suggestions: await this.aiAssistant.generateSearchSuggestions(query.query)
        };
    }
    async publishContent(id, user) {
        const content = await this.repository.findById(id);
        if (!content) {
            throw new Error('Content not found');
        }
        // Check permissions
        await this.checkPublishPermissions(content, user);
        const publishedContent = {
            ...content,
            status: types_1.ContentStatus.PUBLISHED,
            publishedAt: new Date(),
            updatedAt: new Date()
        };
        await this.repository.save(publishedContent);
        await this.searchEngine.reindex(publishedContent);
        return publishedContent;
    }
    async archiveContent(id, user) {
        const content = await this.repository.findById(id);
        if (!content) {
            throw new Error('Content not found');
        }
        const archivedContent = {
            ...content,
            status: types_1.ContentStatus.ARCHIVED,
            updatedAt: new Date()
        };
        await this.repository.save(archivedContent);
        await this.searchEngine.remove(id);
        return archivedContent;
    }
    async getContentVersions(id) {
        return await this.repository.getVersions(id);
    }
    async restoreVersion(contentId, version, user) {
        const versions = await this.repository.getVersions(contentId);
        const targetVersion = versions.find(v => v.version === version);
        if (!targetVersion) {
            throw new Error('Version not found');
        }
        const restoredContent = {
            ...targetVersion,
            id: contentId,
            version: (await this.repository.findById(contentId)).version + 1,
            updatedAt: new Date()
        };
        await this.repository.save(restoredContent);
        await this.searchEngine.reindex(restoredContent);
        return restoredContent;
    }
    async validateContent(contentData) {
        if (!contentData.title || contentData.title.trim().length === 0) {
            throw new Error('Title is required');
        }
        if (!contentData.content || contentData.content.trim().length === 0) {
            throw new Error('Content is required');
        }
        if (contentData.title.length > 200) {
            throw new Error('Title is too long (max 200 characters)');
        }
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
    sanitizeContent(content) {
        // Convert markdown to HTML if needed
        const html = (0, marked_1.marked)(content);
        // Sanitize HTML to prevent XSS
        return dompurify_1.default.sanitize(html);
    }
    async generateSEOMetadata(contentData) {
        const title = contentData.title;
        const description = contentData.metadata.description ||
            contentData.content.substring(0, 160) + '...';
        return {
            title,
            description,
            keywords: contentData.metadata.keywords || [],
            canonicalUrl: `/content/${this.generateSlug(title)}`,
            ogImage: contentData.metadata.ogImage
        };
    }
    async checkUpdatePermissions(content, user) {
        // Simple permission check - in reality, this would be more sophisticated
        if (content.author.id !== user.id && user.role !== 'admin') {
            throw new Error('Insufficient permissions to update content');
        }
    }
    async checkPublishPermissions(content, user) {
        if (user.role !== 'admin' && user.role !== 'editor') {
            throw new Error('Insufficient permissions to publish content');
        }
    }
    async filterByPermissions(results, user) {
        // Simple permission filtering
        return results.filter(content => {
            if (content.status === types_1.ContentStatus.PUBLISHED)
                return true;
            if (content.author.id === user.id)
                return true;
            if (user.role === 'admin' || user.role === 'editor')
                return true;
            return false;
        });
    }
    async generateSearchFacets(results) {
        const facets = {
            types: {},
            authors: {},
            tags: {},
            categories: {}
        };
        for (const result of results) {
            // Count types
            facets.types[result.type] = (facets.types[result.type] || 0) + 1;
            // Count authors
            facets.authors[result.author.name] = (facets.authors[result.author.name] || 0) + 1;
            // Count tags
            for (const tag of result.tags) {
                facets.tags[tag] = (facets.tags[tag] || 0) + 1;
            }
            // Count categories
            for (const category of result.categories) {
                facets.categories[category] = (facets.categories[category] || 0) + 1;
            }
        }
        return facets;
    }
}
exports.ContentManager = ContentManager;
//# sourceMappingURL=content-manager.js.map