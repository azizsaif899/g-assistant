"use strict";
/**
 * Gemini Research Agent - محول من Python LangGraph إلى TypeScript
 * يحافظ على نفس workflow ووظائف Python version
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiResearchAgent = void 0;
const utils_1 = require("./utils");
class GeminiResearchAgent {
    constructor(config) {
        this.config = {
            queryGeneratorModel: 'gemini-2.0-flash-exp',
            reflectionModel: 'gemini-2.0-flash-thinking-exp',
            answerModel: 'gemini-2.5-flash-exp',
            numberOfInitialQueries: 3,
            maxResearchLoops: 3,
            temperature: 1.0,
            maxRetries: 2,
            ...config
        };
        this.state = {
            messages: [],
            searchQuery: [],
            webResearchResult: [],
            sourcesGathered: [],
            initialSearchQueryCount: this.config.numberOfInitialQueries,
            maxResearchLoops: this.config.maxResearchLoops,
            researchLoopCount: 0,
            reasoningModel: this.config.reflectionModel
        };
    }
    /**
     * تشغيل البحث الكامل
     * محول من graph.py workflow
     */
    async research(query) {
        console.log(`🚀 بدء البحث المتقدم: ${query}`);
        // تهيئة الحالة
        this.state.messages = [{
                role: 'user',
                content: query,
                timestamp: new Date()
            }];
        try {
            // المرحلة 1: توليد الاستعلامات
            await this.generateQuery();
            // المرحلة 2: البحث الأولي
            await this.performInitialWebResearch();
            // المرحلة 3: التفكير والتحسين (حلقات)
            while (this.state.researchLoopCount < this.state.maxResearchLoops) {
                const reflection = await this.reflection();
                if (reflection.isSufficient) {
                    console.log('✅ البحث كافي، الانتقال للمرحلة النهائية');
                    break;
                }
                // بحث إضافي بناءً على التفكير
                await this.performFollowUpResearch(reflection.followUpQueries);
                this.state.researchLoopCount++;
            }
            // المرحلة 4: تجميع الإجابة النهائية
            const finalAnswer = await this.finalizeAnswer();
            console.log('✅ اكتمل البحث المتقدم');
            return finalAnswer;
        }
        catch (error) {
            console.error('❌ خطأ في البحث:', error);
            throw error;
        }
    }
    /**
     * توليد استعلامات البحث
     * محول من generate_query في graph.py
     */
    async generateQuery() {
        console.log('🔍 توليد استعلامات البحث...');
        const researchTopic = (0, utils_1.getResearchTopic)(this.state.messages);
        const currentDate = (0, utils_1.getCurrentDate)();
        // محاكاة توليد الاستعلامات (في الواقع سيستخدم Gemini API)
        const queries = [
            {
                query: `${researchTopic} معلومات حديثة`,
                rationale: 'البحث عن معلومات حديثة ومحدثة'
            },
            {
                query: `${researchTopic} تحليل شامل`,
                rationale: 'البحث عن تحليل مفصل وشامل'
            },
            {
                query: `${researchTopic} مصادر موثوقة`,
                rationale: 'البحث في مصادر أكاديمية وموثوقة'
            }
        ];
        this.state.searchQuery = queries;
        console.log(`✅ تم توليد ${queries.length} استعلامات`);
        return { searchQuery: queries };
    }
    /**
     * البحث الأولي على الويب
     * محول من web_research في graph.py
     */
    async performInitialWebResearch() {
        console.log('🌐 تنفيذ البحث الأولي...');
        for (let i = 0; i < this.state.searchQuery.length; i++) {
            const query = this.state.searchQuery[i];
            await this.webResearch({
                searchQuery: query.query,
                id: i.toString()
            });
        }
        console.log(`✅ اكتمل البحث الأولي - ${this.state.webResearchResult.length} نتائج`);
    }
    /**
     * البحث على الويب لاستعلام واحد
     * محول من web_research في graph.py
     */
    async webResearch(state) {
        console.log(`🔎 البحث عن: ${state.searchQuery}`);
        // محاكاة البحث (في الواقع سيستخدم Google Search API)
        const mockSources = [
            {
                url: `https://example.com/search-${state.id}`,
                title: `نتيجة البحث ${parseInt(state.id) + 1}`,
                snippet: `معلومات مفيدة حول ${state.searchQuery}...`,
                relevanceScore: 0.9 - (parseInt(state.id) * 0.1)
            }
        ];
        // محاكاة النص المولد مع الاستشهادات
        const generatedText = `بناءً على البحث عن "${state.searchQuery}"، تم العثور على معلومات قيمة. هذه النتائج تشير إلى أهمية الموضوع وتقدم رؤى مفيدة.`;
        this.state.sourcesGathered.push(...mockSources);
        this.state.webResearchResult.push(generatedText);
    }
    /**
     * التفكير وتقييم كفاية البحث
     * محول من reflection في graph.py
     */
    async reflection() {
        console.log('🤔 تقييم كفاية البحث...');
        const researchTopic = (0, utils_1.getResearchTopic)(this.state.messages);
        const summaries = this.state.webResearchResult.join('\n\n---\n\n');
        // محاكاة التفكير (في الواقع سيستخدم Gemini Thinking Model)
        const isSufficient = this.state.webResearchResult.length >= 3 ||
            this.state.researchLoopCount >= this.state.maxResearchLoops - 1;
        const reflection = {
            isSufficient,
            knowledgeGap: isSufficient ? '' : 'نحتاج لمزيد من التفاصيل والمصادر المتخصصة',
            followUpQueries: isSufficient ? [] : [
                `${researchTopic} تفاصيل إضافية`,
                `${researchTopic} آراء الخبراء`
            ]
        };
        console.log(`✅ التقييم: ${isSufficient ? 'كافي' : 'يحتاج مزيد من البحث'}`);
        return reflection;
    }
    /**
     * البحث التكميلي
     */
    async performFollowUpResearch(followUpQueries) {
        console.log(`🔄 البحث التكميلي - ${followUpQueries.length} استعلامات`);
        for (let i = 0; i < followUpQueries.length; i++) {
            await this.webResearch({
                searchQuery: followUpQueries[i],
                id: (this.state.searchQuery.length + i).toString()
            });
        }
    }
    /**
     * تجميع الإجابة النهائية
     * محول من finalize_answer في graph.py
     */
    async finalizeAnswer() {
        console.log('📝 تجميع الإجابة النهائية...');
        const researchTopic = (0, utils_1.getResearchTopic)(this.state.messages);
        const summaries = this.state.webResearchResult.join('\n---\n\n');
        // تنظيف وإزالة المصادر المكررة
        const uniqueSources = (0, utils_1.deduplicateSources)(this.state.sourcesGathered);
        // تجميع الإجابة النهائية
        const answer = `# ${researchTopic}

## الملخص
${summaries}

## المصادر
${uniqueSources.map((source, idx) => `${idx + 1}. [${source.title}](${source.url})\n   ${source.snippet}`).join('\n\n')}

## الخلاصة
تم جمع هذه المعلومات من ${uniqueSources.length} مصدر موثوق خلال ${this.state.researchLoopCount + 1} جولة بحث.`;
        const result = {
            answer: (0, utils_1.cleanText)(answer),
            sources: uniqueSources,
            searchQueries: this.state.searchQuery.map(q => q.query),
            researchLoops: this.state.researchLoopCount + 1,
            confidence: this.calculateConfidence(),
            timestamp: new Date(),
            citations: [] // سيتم ملؤها لاحقاً
        };
        console.log('✅ تم تجميع الإجابة النهائية');
        return result;
    }
    /**
     * حساب مستوى الثقة في النتائج
     */
    calculateConfidence() {
        let confidence = 0.5; // نقطة البداية
        // تحسين الثقة بناءً على عدد المصادر
        confidence += Math.min(this.state.sourcesGathered.length * 0.1, 0.3);
        // تحسين الثقة بناءً على عدد جولات البحث
        confidence += Math.min(this.state.researchLoopCount * 0.1, 0.2);
        // تحسين الثقة بناءً على جودة المصادر
        const avgSourceQuality = this.state.sourcesGathered.reduce((sum, source) => sum + source.relevanceScore, 0) / this.state.sourcesGathered.length;
        confidence += avgSourceQuality * 0.2;
        return Math.min(confidence, 1.0);
    }
    /**
     * الحصول على الحالة الحالية
     */
    getState() {
        return { ...this.state };
    }
    /**
     * إعادة تعيين الحالة
     */
    reset() {
        this.state = {
            messages: [],
            searchQuery: [],
            webResearchResult: [],
            sourcesGathered: [],
            initialSearchQueryCount: this.config.numberOfInitialQueries,
            maxResearchLoops: this.config.maxResearchLoops,
            researchLoopCount: 0,
            reasoningModel: this.config.reflectionModel
        };
    }
}
exports.GeminiResearchAgent = GeminiResearchAgent;
exports.default = GeminiResearchAgent;
//# sourceMappingURL=GeminiResearchAgent.js.map