"use strict";
/**
 * Citation Manager - مدير الاستشهادات الذكي
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitationManager = void 0;
class CitationManager {
    constructor() {
        this.citations = new Map();
    }
    /**
     * إنشاء استشهاد جديد
     */
    createCitation(source, text, context) {
        const id = this.generateCitationId(source);
        const citation = {
            id,
            source,
            text,
            context,
            confidence: this.calculateConfidence(source, text)
        };
        this.citations.set(id, citation);
        return citation;
    }
    /**
     * الحصول على جميع الاستشهادات
     */
    getAllCitations() {
        return Array.from(this.citations.values());
    }
    /**
     * البحث في الاستشهادات
     */
    searchCitations(query) {
        return this.getAllCitations().filter(citation => citation.text.toLowerCase().includes(query.toLowerCase()) ||
            citation.source.title.toLowerCase().includes(query.toLowerCase()));
    }
    /**
     * تنسيق الاستشهاد للعرض
     */
    formatCitation(citationId, style = 'apa') {
        const citation = this.citations.get(citationId);
        if (!citation)
            return '';
        switch (style) {
            case 'apa':
                return this.formatAPA(citation);
            case 'mla':
                return this.formatMLA(citation);
            case 'chicago':
                return this.formatChicago(citation);
            default:
                return this.formatAPA(citation);
        }
    }
    /**
     * تصدير الاستشهادات
     */
    exportCitations(format = 'json') {
        const citations = this.getAllCitations();
        switch (format) {
            case 'json':
                return JSON.stringify(citations, null, 2);
            case 'bibtex':
                return this.toBibTeX(citations);
            case 'csv':
                return this.toCSV(citations);
            default:
                return JSON.stringify(citations, null, 2);
        }
    }
    generateCitationId(source) {
        const domain = new URL(source.url).hostname;
        const timestamp = Date.now();
        return `${domain}-${timestamp}`.replace(/[^a-zA-Z0-9-]/g, '');
    }
    calculateConfidence(source, text) {
        let confidence = source.relevanceScore || 0.5;
        // تحسين الثقة بناءً على طول النص
        if (text.length > 100)
            confidence += 0.1;
        if (text.length > 500)
            confidence += 0.1;
        // تحسين الثقة بناءً على المجال
        const domain = new URL(source.url).hostname;
        if (domain.includes('edu') || domain.includes('gov')) {
            confidence += 0.2;
        }
        return Math.min(confidence, 1.0);
    }
    formatAPA(citation) {
        const domain = new URL(citation.source.url).hostname;
        const date = citation.source.publishDate?.getFullYear() || 'n.d.';
        return `${citation.source.title}. (${date}). ${domain}. ${citation.source.url}`;
    }
    formatMLA(citation) {
        const domain = new URL(citation.source.url).hostname;
        const date = citation.source.publishDate?.toLocaleDateString() || 'n.d.';
        return `"${citation.source.title}." ${domain}, ${date}, ${citation.source.url}.`;
    }
    formatChicago(citation) {
        const domain = new URL(citation.source.url).hostname;
        const date = citation.source.publishDate?.toLocaleDateString() || 'n.d.';
        return `"${citation.source.title}." ${domain}. Accessed ${date}. ${citation.source.url}.`;
    }
    toBibTeX(citations) {
        return citations.map(citation => {
            const domain = new URL(citation.source.url).hostname.replace(/\./g, '');
            const year = citation.source.publishDate?.getFullYear() || new Date().getFullYear();
            return `@misc{${citation.id},
  title={${citation.source.title}},
  url={${citation.source.url}},
  journal={${domain}},
  year={${year}},
  note={Accessed: ${new Date().toLocaleDateString()}}
}`;
        }).join('\n\n');
    }
    toCSV(citations) {
        const headers = 'ID,Title,URL,Domain,Confidence,Text';
        const rows = citations.map(citation => {
            const domain = new URL(citation.source.url).hostname;
            return `"${citation.id}","${citation.source.title}","${citation.source.url}","${domain}","${citation.confidence}","${citation.text.replace(/"/g, '""')}"`;
        });
        return [headers, ...rows].join('\n');
    }
}
exports.CitationManager = CitationManager;
exports.default = CitationManager;
//# sourceMappingURL=CitationManager.js.map