"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioAnalyzer = void 0;
class AudioAnalyzer {
    constructor(apiKey) {
        this.geminiApiKey = apiKey;
    }
    async analyzeAudio(file) {
        const startTime = Date.now();
        try {
            // الحصول على معلومات الملف الصوتي
            const metadata = await this.getAudioMetadata(file);
            // تحويل الصوت إلى نص
            const transcript = await this.transcribeAudio(file);
            // تحليل المحتوى بـ Gemini
            const analysis = await this.analyzeWithGemini(transcript);
            const processingTime = Date.now() - startTime;
            return {
                id: `audio_${Date.now()}`,
                fileName: file.name,
                duration: metadata.duration,
                transcript,
                summary: analysis.summary,
                keyPoints: analysis.keyPoints,
                speakers: analysis.speakers,
                sentiment: analysis.sentiment,
                actionItems: analysis.actionItems,
                metadata: {
                    ...metadata,
                    processingTime
                },
                confidence: analysis.confidence
            };
        }
        catch (error) {
            console.error('Audio analysis failed:', error);
            throw new Error('فشل في تحليل الملف الصوتي');
        }
    }
    async getAudioMetadata(file) {
        // محاكاة استخراج معلومات الملف الصوتي
        return {
            format: file.type,
            sampleRate: 44100,
            channels: 2,
            size: file.size,
            duration: 180 // 3 دقائق
        };
    }
    async transcribeAudio(file) {
        // محاكاة تحويل الصوت إلى نص
        // في التطبيق الحقيقي: استخدام Google Speech-to-Text أو Whisper
        await new Promise(resolve => setTimeout(resolve, 3000));
        return `
    المتحدث 1: مرحباً، شكراً لك على وقتك اليوم لمناقشة المشروع.
    المتحدث 2: أهلاً وسهلاً، أنا متحمس لسماع التفاصيل.
    المتحدث 1: المشروع يتضمن تطوير نظام إدارة علاقات العملاء بقيمة 500,000 ريال.
    المتحدث 2: هذا يبدو مثيراً للاهتمام. ما هي المدة الزمنية المتوقعة؟
    المتحدث 1: نتوقع إكمال المشروع خلال 6 أشهر.
    المتحدث 2: ممتاز، سأحتاج لمراجعة العرض مع الفريق وسأعود إليك خلال أسبوع.
    المتحدث 1: بالطبع، سأرسل لك العرض التفصيلي عبر البريد الإلكتروني اليوم.
    `;
    }
    async analyzeWithGemini(transcript) {
        // محاكاة تحليل Gemini
        await new Promise(resolve => setTimeout(resolve, 2000));
        return {
            summary: 'مكالمة مبيعات ناجحة لمناقشة مشروع نظام إدارة علاقات العملاء. العميل أبدى اهتماماً قوياً وطلب مراجعة العرض مع فريقه.',
            keyPoints: [
                'قيمة المشروع: 500,000 ريال',
                'مدة التنفيذ: 6 أشهر',
                'العميل مهتم ويحتاج أسبوع للمراجعة',
                'سيتم إرسال العرض التفصيلي اليوم'
            ],
            speakers: [
                {
                    id: 'speaker_1',
                    name: 'مندوب المبيعات',
                    segments: [
                        {
                            startTime: 0,
                            endTime: 15,
                            text: 'مرحباً، شكراً لك على وقتك اليوم لمناقشة المشروع.',
                            confidence: 0.95
                        }
                    ],
                    totalSpeakingTime: 90,
                    averageConfidence: 0.93
                },
                {
                    id: 'speaker_2',
                    name: 'العميل',
                    segments: [
                        {
                            startTime: 15,
                            endTime: 25,
                            text: 'أهلاً وسهلاً، أنا متحمس لسماع التفاصيل.',
                            confidence: 0.91
                        }
                    ],
                    totalSpeakingTime: 90,
                    averageConfidence: 0.89
                }
            ],
            sentiment: {
                overall: 'positive',
                confidence: 0.87,
                emotions: {
                    joy: 0.6,
                    sadness: 0.1,
                    anger: 0.05,
                    fear: 0.1,
                    surprise: 0.15
                },
                timeline: [
                    { timestamp: 30, sentiment: 'positive', intensity: 0.8 },
                    { timestamp: 60, sentiment: 'positive', intensity: 0.9 },
                    { timestamp: 120, sentiment: 'positive', intensity: 0.85 }
                ]
            },
            actionItems: [
                {
                    id: 'action_1',
                    description: 'إرسال العرض التفصيلي عبر البريد الإلكتروني',
                    assignee: 'مندوب المبيعات',
                    dueDate: '2024-01-12',
                    priority: 'high',
                    confidence: 0.95
                },
                {
                    id: 'action_2',
                    description: 'متابعة رد العميل خلال أسبوع',
                    assignee: 'مندوب المبيعات',
                    dueDate: '2024-01-19',
                    priority: 'medium',
                    confidence: 0.88
                }
            ],
            confidence: 0.91
        };
    }
    async batchAnalyze(files) {
        const results = await Promise.all(files.map(file => this.analyzeAudio(file)));
        return results;
    }
    async extractKeyMoments(analysis) {
        // استخراج اللحظات المهمة من المكالمة
        return [
            {
                timestamp: 45,
                description: 'ذكر قيمة المشروع (500,000 ريال)',
                importance: 'high'
            },
            {
                timestamp: 120,
                description: 'العميل طلب أسبوع للمراجعة',
                importance: 'medium'
            }
        ];
    }
    async generateCallSummary(analysis) {
        // تحليل نتيجة المكالمة
        return {
            outcome: 'successful',
            nextSteps: [
                'إرسال العرض التفصيلي',
                'جدولة مكالمة متابعة خلال أسبوع',
                'تحضير إجابات للأسئلة المحتملة'
            ],
            dealProbability: 0.75,
            recommendations: [
                'التركيز على الفوائد التقنية في العرض',
                'تضمين دراسات حالة مشابهة',
                'تحديد جدول زمني مرن للتنفيذ'
            ]
        };
    }
}
exports.AudioAnalyzer = AudioAnalyzer;
//# sourceMappingURL=audio-analyzer.js.map