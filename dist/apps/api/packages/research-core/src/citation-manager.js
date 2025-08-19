"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitationManager = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let CitationManager = class CitationManager {
    constructor() {
        this.urlMap = new Map();
        this.citationCounter = 0;
    }
    resolveUrls(urls, id) {
        const prefix = 'https://vertexaisearch.cloud.google.com/id/';
        const resolvedMap = new Map();
        urls.forEach((url, idx) => {
            if (!resolvedMap.has(url)) {
                resolvedMap.set(url, `${prefix}${id}-${idx}`);
            }
        });
        return resolvedMap;
    }
    insertCitationMarkers(text, citations) {
        const sortedCitations = citations.sort((a, b) => b.end_index - a.end_index || b.start_index - a.start_index);
        let modifiedText = text;
        for (const citation of sortedCitations) {
            const endIdx = citation.end_index;
            let markerToInsert = '';
            for (const segment of citation.segments || []) {
                markerToInsert += ` [${segment.label}](${segment.short_url})`;
            }
            modifiedText = modifiedText.slice(0, endIdx) + markerToInsert + modifiedText.slice(endIdx);
        }
        return modifiedText;
    }
    extractCitations(response, resolvedUrlsMap) {
        const citations = [];
        if (!response?.candidates?.[0]?.grounding_metadata?.grounding_supports) {
            return citations;
        }
        const candidate = response.candidates[0];
        for (const support of candidate.grounding_metadata.grounding_supports) {
            if (!support.segment)
                continue;
            const citation = {
                start_index: support.segment.start_index || 0,
                end_index: support.segment.end_index,
                segments: []
            };
            if (support.grounding_chunk_indices) {
                for (const ind of support.grounding_chunk_indices) {
                    try {
                        const chunk = candidate.grounding_metadata.grounding_chunks[ind];
                        const resolvedUrl = resolvedUrlsMap.get(chunk.web.uri);
                        citation.segments.push({
                            label: chunk.web.title.split('.')[0],
                            short_url: resolvedUrl,
                            value: chunk.web.uri
                        });
                    }
                    catch (error) {
                        // Skip problematic chunks
                        continue;
                    }
                }
            }
            citations.push(citation);
        }
        return citations;
    }
    generateCitation(source) {
        this.citationCounter++;
        return {
            id: this.citationCounter,
            title: source.title,
            url: source.url,
            type: source.type || 'web',
            accessDate: new Date().toISOString(),
            shortUrl: this.generateShortUrl(source.url)
        };
    }
    generateShortUrl(originalUrl) {
        if (this.urlMap.has(originalUrl)) {
            return this.urlMap.get(originalUrl);
        }
        const shortUrl = `https://cite.ai/${this.citationCounter}`;
        this.urlMap.set(originalUrl, shortUrl);
        return shortUrl;
    }
    formatCitations(citations) {
        return citations.map((citation, index) => `[${index + 1}] ${citation.title}. ${citation.url}. Accessed: ${new Date(citation.accessDate).toLocaleDateString()}`).join('\n');
    }
    getCitationStats() {
        return {
            totalCitations: this.citationCounter,
            uniqueUrls: this.urlMap.size,
            averageCitationsPerUrl: this.citationCounter / Math.max(this.urlMap.size, 1)
        };
    }
};
exports.CitationManager = CitationManager;
exports.CitationManager = CitationManager = tslib_1.__decorate([
    (0, common_1.Injectable)()
], CitationManager);
//# sourceMappingURL=citation-manager.js.map