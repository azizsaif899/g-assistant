/**
 * Gemini Research Agent - محول من Python LangGraph إلى TypeScript
 * يحافظ على نفس workflow ووظائف Python version
 */
import { OverallState, GeminiResearchConfig, ResearchResult } from './types';
export declare class GeminiResearchAgent {
    private config;
    private state;
    constructor(config: GeminiResearchConfig);
    /**
     * تشغيل البحث الكامل
     * محول من graph.py workflow
     */
    research(query: string): Promise<ResearchResult>;
    /**
     * توليد استعلامات البحث
     * محول من generate_query في graph.py
     */
    private generateQuery;
    /**
     * البحث الأولي على الويب
     * محول من web_research في graph.py
     */
    private performInitialWebResearch;
    /**
     * البحث على الويب لاستعلام واحد
     * محول من web_research في graph.py
     */
    private webResearch;
    /**
     * التفكير وتقييم كفاية البحث
     * محول من reflection في graph.py
     */
    private reflection;
    /**
     * البحث التكميلي
     */
    private performFollowUpResearch;
    /**
     * تجميع الإجابة النهائية
     * محول من finalize_answer في graph.py
     */
    private finalizeAnswer;
    /**
     * حساب مستوى الثقة في النتائج
     */
    private calculateConfidence;
    /**
     * الحصول على الحالة الحالية
     */
    getState(): OverallState;
    /**
     * إعادة تعيين الحالة
     */
    reset(): void;
}
export default GeminiResearchAgent;
//# sourceMappingURL=GeminiResearchAgent.d.ts.map