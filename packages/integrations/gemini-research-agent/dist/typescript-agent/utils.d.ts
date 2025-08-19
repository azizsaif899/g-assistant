/**
 * Utils للـ Gemini Research Agent - محول من Python utils.py
 */
import { Message, Source, Citation, GoogleSearchResponse } from './types';
/**
 * استخراج موضوع البحث من الرسائل
 * محول من get_research_topic في utils.py
 */
export declare function getResearchTopic(messages: Message[]): string;
/**
 * تحويل URLs الطويلة إلى URLs قصيرة
 * محول من resolve_urls في utils.py
 */
export declare function resolveUrls(urlsToResolve: any[], id: number): Record<string, string>;
/**
 * إدراج علامات الاستشهاد في النص
 * محول من insert_citation_markers في utils.py
 */
export declare function insertCitationMarkers(text: string, citationsList: Citation[]): string;
/**
 * استخراج الاستشهادات من استجابة Gemini
 * محول من get_citations في utils.py
 */
export declare function getCitations(response: GoogleSearchResponse, resolvedUrlsMap: Record<string, string>): Citation[];
/**
 * تنسيق التاريخ الحالي
 * مساعد للـ prompts
 */
export declare function getCurrentDate(): string;
/**
 * تنظيف وتنسيق النص
 */
export declare function cleanText(text: string): string;
/**
 * تقييم جودة المصادر
 */
export declare function evaluateSourceQuality(source: Source): number;
/**
 * إزالة المصادر المكررة
 */
export declare function deduplicateSources(sources: Source[]): Source[];
/**
 * تحويل النص إلى slug للـ URLs
 */
export declare function textToSlug(text: string): string;
/**
 * تقدير وقت القراءة
 */
export declare function estimateReadingTime(text: string): number;
/**
 * تحليل المشاعر البسيط
 */
export declare function analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral';
//# sourceMappingURL=utils.d.ts.map