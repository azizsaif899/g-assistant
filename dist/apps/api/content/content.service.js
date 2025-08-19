"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let ContentService = class ContentService {
    constructor() {
        this.contents = new Map();
    }
    async create(createContentDto) {
        const id = Date.now().toString();
        const content = {
            id,
            ...createContentDto,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: 'draft'
        };
        this.contents.set(id, content);
        return content;
    }
    async findAll(query) {
        const allContent = Array.from(this.contents.values());
        let filtered = allContent;
        if (query.type) {
            filtered = filtered.filter(c => c.type === query.type);
        }
        if (query.status) {
            filtered = filtered.filter(c => c.status === query.status);
        }
        if (query.category) {
            filtered = filtered.filter(c => c.categories?.includes(query.category));
        }
        return {
            data: filtered,
            total: filtered.length
        };
    }
    async findOne(id) {
        const content = this.contents.get(id);
        if (!content) {
            throw new Error('Content not found');
        }
        return content;
    }
    async update(id, updateContentDto) {
        const content = this.contents.get(id);
        if (!content) {
            throw new Error('Content not found');
        }
        const updated = {
            ...content,
            ...updateContentDto,
            updatedAt: new Date()
        };
        this.contents.set(id, updated);
        return updated;
    }
    async remove(id) {
        const deleted = this.contents.delete(id);
        if (!deleted) {
            throw new Error('Content not found');
        }
        return { message: 'Content deleted successfully' };
    }
    async publish(id) {
        const content = this.contents.get(id);
        if (!content) {
            throw new Error('Content not found');
        }
        content.status = 'published';
        content.publishedAt = new Date();
        content.updatedAt = new Date();
        this.contents.set(id, content);
        return content;
    }
    async search(query) {
        const allContent = Array.from(this.contents.values());
        const results = allContent.filter(content => content.title?.toLowerCase().includes(query.toLowerCase()) ||
            content.content?.toLowerCase().includes(query.toLowerCase()) ||
            content.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase())));
        return {
            query,
            results,
            total: results.length
        };
    }
    async findByCategory(category) {
        const allContent = Array.from(this.contents.values());
        const results = allContent.filter(content => content.categories?.includes(category));
        return {
            category,
            results,
            total: results.length
        };
    }
    async findByTag(tag) {
        const allContent = Array.from(this.contents.values());
        const results = allContent.filter(content => content.tags?.includes(tag));
        return {
            tag,
            results,
            total: results.length
        };
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ContentService);
//# sourceMappingURL=content.service.js.map