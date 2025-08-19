"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorDatabase = void 0;
class VectorDatabase {
    constructor() {
        this.documents = new Map();
        this.index = new Map(); // Simple in-memory index
    }
    async addDocument(document) {
        const fullDocument = {
            ...document,
            timestamp: new Date()
        };
        this.documents.set(document.id, fullDocument);
        this.index.set(document.id, document.vector);
    }
    async addDocuments(documents) {
        for (const doc of documents) {
            await this.addDocument(doc);
        }
    }
    async search(query) {
        let queryVector;
        if (query.vector) {
            queryVector = query.vector;
        }
        else if (query.text) {
            queryVector = this.textToVector(query.text);
        }
        else {
            throw new Error('Either text or vector must be provided');
        }
        const results = [];
        const limit = query.limit || 10;
        const threshold = query.threshold || 0.5;
        for (const [docId, docVector] of this.index.entries()) {
            const document = this.documents.get(docId);
            if (!document)
                continue;
            // Apply filters if provided
            if (query.filters && !this.matchesFilters(document, query.filters)) {
                continue;
            }
            const similarity = this.cosineSimilarity(queryVector, docVector);
            if (similarity >= threshold) {
                const relevanceScore = this.calculateRelevanceScore(document, query.text || '', similarity);
                results.push({
                    document,
                    similarity,
                    relevanceScore
                });
            }
        }
        // Sort by relevance score and limit results
        return results
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, limit);
    }
    textToVector(text) {
        // Simple text vectorization (in production, use proper embeddings)
        const words = text.toLowerCase().split(/\s+/);
        const vector = new Array(384).fill(0); // Standard embedding dimension
        // Simple hash-based vectorization
        words.forEach((word, index) => {
            const hash = this.simpleHash(word);
            const position = Math.abs(hash) % vector.length;
            vector[position] += 1 / (index + 1); // Weight by position
        });
        // Normalize vector
        const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
        return magnitude > 0 ? vector.map(val => val / magnitude) : vector;
    }
    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash;
    }
    cosineSimilarity(vectorA, vectorB) {
        if (vectorA.length !== vectorB.length) {
            throw new Error('Vectors must have the same dimension');
        }
        let dotProduct = 0;
        let magnitudeA = 0;
        let magnitudeB = 0;
        for (let i = 0; i < vectorA.length; i++) {
            dotProduct += vectorA[i] * vectorB[i];
            magnitudeA += vectorA[i] * vectorA[i];
            magnitudeB += vectorB[i] * vectorB[i];
        }
        magnitudeA = Math.sqrt(magnitudeA);
        magnitudeB = Math.sqrt(magnitudeB);
        if (magnitudeA === 0 || magnitudeB === 0) {
            return 0;
        }
        return dotProduct / (magnitudeA * magnitudeB);
    }
    matchesFilters(document, filters) {
        for (const [key, value] of Object.entries(filters)) {
            const docValue = document.metadata[key];
            if (Array.isArray(value)) {
                if (!value.includes(docValue))
                    return false;
            }
            else if (typeof value === 'object' && value !== null) {
                // Range queries
                if (value.min !== undefined && docValue < value.min)
                    return false;
                if (value.max !== undefined && docValue > value.max)
                    return false;
            }
            else {
                if (docValue !== value)
                    return false;
            }
        }
        return true;
    }
    calculateRelevanceScore(document, queryText, similarity) {
        let score = similarity;
        // Boost score based on content relevance
        if (queryText) {
            const queryWords = queryText.toLowerCase().split(/\s+/);
            const contentWords = document.content.toLowerCase().split(/\s+/);
            const matchingWords = queryWords.filter(word => contentWords.some(contentWord => contentWord.includes(word)));
            const contentRelevance = matchingWords.length / queryWords.length;
            score = score * 0.7 + contentRelevance * 0.3;
        }
        // Boost recent documents slightly
        const daysSinceCreation = (Date.now() - document.timestamp.getTime()) / (1000 * 60 * 60 * 24);
        const recencyBoost = Math.max(0, 1 - daysSinceCreation / 365); // Decay over a year
        score = score * 0.95 + recencyBoost * 0.05;
        return Math.min(1, score);
    }
    async getDocument(id) {
        return this.documents.get(id) || null;
    }
    async deleteDocument(id) {
        const deleted = this.documents.delete(id);
        this.index.delete(id);
        return deleted;
    }
    async updateDocument(id, updates) {
        const document = this.documents.get(id);
        if (!document)
            return false;
        const updatedDocument = { ...document, ...updates };
        this.documents.set(id, updatedDocument);
        if (updates.vector) {
            this.index.set(id, updates.vector);
        }
        return true;
    }
    async similarDocuments(documentId, limit = 5) {
        const document = this.documents.get(documentId);
        if (!document)
            return [];
        return this.search({
            vector: document.vector,
            limit: limit + 1, // +1 to exclude the original document
            threshold: 0.1
        }).then(results => results.filter(result => result.document.id !== documentId).slice(0, limit));
    }
    getStatistics() {
        const documents = Array.from(this.documents.values());
        if (documents.length === 0) {
            return {
                totalDocuments: 0,
                averageVectorDimension: 0,
                metadataKeys: []
            };
        }
        const timestamps = documents.map(d => d.timestamp);
        const allMetadataKeys = new Set();
        documents.forEach(doc => {
            Object.keys(doc.metadata).forEach(key => allMetadataKeys.add(key));
        });
        const averageVectorDimension = documents.reduce((sum, doc) => sum + doc.vector.length, 0) / documents.length;
        return {
            totalDocuments: documents.length,
            averageVectorDimension: Math.round(averageVectorDimension),
            oldestDocument: new Date(Math.min(...timestamps.map(t => t.getTime()))),
            newestDocument: new Date(Math.max(...timestamps.map(t => t.getTime()))),
            metadataKeys: Array.from(allMetadataKeys)
        };
    }
    async createCollection(name, schema) {
        // In a real implementation, this would create a separate collection
        // For now, we'll just store the schema information
        const collections = this.getCollections();
        collections.set(name, { schema: schema || {}, createdAt: new Date() });
        return true;
    }
    getCollections() {
        // Simple in-memory collections storage
        if (!global.vectorCollections) {
            global.vectorCollections = new Map();
        }
        return global.vectorCollections;
    }
    async backup() {
        return {
            documents: Array.from(this.documents.entries()),
            index: Array.from(this.index.entries()),
            timestamp: new Date(),
            version: '1.0'
        };
    }
    async restore(backupData) {
        try {
            this.documents.clear();
            this.index.clear();
            backupData.documents.forEach(([id, doc]) => {
                this.documents.set(id, doc);
            });
            backupData.index.forEach(([id, vector]) => {
                this.index.set(id, vector);
            });
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.VectorDatabase = VectorDatabase;
//# sourceMappingURL=vector-database.js.map