"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentimentAnalyzer = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let SentimentAnalyzer = class SentimentAnalyzer {
    constructor() {
        this.positiveWords = ['ممتاز', 'رائع', 'جيد', 'أحب', 'سعيد'];
        this.negativeWords = ['سيء', 'فظيع', 'أكره', 'حزين', 'غاضب'];
    }
    async analyzeSentiment(text) {
        const tokens = this.tokenize(text);
        const scores = this.calculateScores(tokens);
        return {
            sentiment: this.classifySentiment(scores.compound),
            scores: {
                positive: scores.positive,
                negative: scores.negative,
                neutral: scores.neutral,
                compound: scores.compound
            },
            confidence: Math.abs(scores.compound)
        };
    }
    async batchAnalyze(texts) {
        return Promise.all(texts.map(text => this.analyzeSentiment(text)));
    }
    async getEmotions(text) {
        // Emotion detection beyond sentiment
        const emotions = {
            joy: 0,
            sadness: 0,
            anger: 0,
            fear: 0,
            surprise: 0,
            disgust: 0
        };
        const tokens = this.tokenize(text);
        // Simple emotion detection based on keywords
        tokens.forEach(token => {
            if (['سعيد', 'فرح', 'مبسوط'].includes(token))
                emotions.joy += 0.3;
            if (['حزين', 'مكتئب', 'زعلان'].includes(token))
                emotions.sadness += 0.3;
            if (['غاضب', 'زعلان', 'متضايق'].includes(token))
                emotions.anger += 0.3;
        });
        return emotions;
    }
    tokenize(text) {
        return text.toLowerCase()
            .replace(/[^\u0600-\u06FF\s]/g, '') // Keep only Arabic characters and spaces
            .split(/\s+/)
            .filter(token => token.length > 0);
    }
    calculateScores(tokens) {
        let positive = 0;
        let negative = 0;
        let neutral = 0;
        tokens.forEach(token => {
            if (this.positiveWords.includes(token)) {
                positive += 1;
            }
            else if (this.negativeWords.includes(token)) {
                negative += 1;
            }
            else {
                neutral += 1;
            }
        });
        const total = positive + negative + neutral;
        const compound = total > 0 ? (positive - negative) / total : 0;
        return {
            positive: total > 0 ? positive / total : 0,
            negative: total > 0 ? negative / total : 0,
            neutral: total > 0 ? neutral / total : 0,
            compound
        };
    }
    classifySentiment(compound) {
        if (compound >= 0.05)
            return 'positive';
        if (compound <= -0.05)
            return 'negative';
        return 'neutral';
    }
};
exports.SentimentAnalyzer = SentimentAnalyzer;
exports.SentimentAnalyzer = SentimentAnalyzer = tslib_1.__decorate([
    (0, common_1.Injectable)()
], SentimentAnalyzer);
//# sourceMappingURL=sentiment-analyzer.js.map