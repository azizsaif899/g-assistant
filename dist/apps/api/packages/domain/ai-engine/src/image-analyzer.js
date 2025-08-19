"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageAnalyzer = void 0;
class ImageAnalyzer {
    constructor(apiKey) {
        this.geminiApiKey = apiKey;
    }
    async analyzeImage(file) {
        const startTime = Date.now();
        try {
            // إنشاء URL للصورة
            const imageUrl = URL.createObjectURL(file);
            // الحصول على معلومات الصورة
            const metadata = await this.getImageMetadata(file);
            // تحليل الصورة بـ Gemini Vision
            const analysis = await this.analyzeWithGeminiVision(file);
            const processingTime = Date.now() - startTime;
            return {
                id: `img_${Date.now()}`,
                fileName: file.name,
                imageUrl,
                extractedText: analysis.extractedText,
                description: analysis.description,
                objects: analysis.objects,
                faces: analysis.faces,
                text: analysis.text,
                metadata: {
                    ...metadata,
                    processingTime
                },
                confidence: analysis.confidence
            };
        }
        catch (error) {
            console.error('Image analysis failed:', error);
            throw new Error('فشل في تحليل الصورة');
        }
    }
    async getImageMetadata(file) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                resolve({
                    width: img.width,
                    height: img.height,
                    format: file.type,
                    size: file.size
                });
            };
            img.src = URL.createObjectURL(file);
        });
    }
    async analyzeWithGeminiVision(file) {
        // محاكاة تحليل Gemini Vision
        // في التطبيق الحقيقي: استدعاء Gemini Vision API
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockAnalysis = {
            extractedText: 'نص مستخرج من الصورة: عقد بيع بقيمة 250,000 ريال',
            description: 'صورة تحتوي على مستند عقد بيع مع توقيعات وأختام رسمية',
            objects: [
                {
                    name: 'مستند',
                    confidence: 0.95,
                    boundingBox: { x: 10, y: 10, width: 300, height: 400 }
                },
                {
                    name: 'توقيع',
                    confidence: 0.88,
                    boundingBox: { x: 200, y: 350, width: 100, height: 50 }
                }
            ],
            faces: [
                {
                    confidence: 0.92,
                    emotions: {
                        joy: 0.1,
                        sorrow: 0.05,
                        anger: 0.02,
                        surprise: 0.03
                    },
                    boundingBox: { x: 150, y: 50, width: 80, height: 100 }
                }
            ],
            text: [
                {
                    text: 'عقد بيع',
                    confidence: 0.96,
                    boundingBox: { x: 50, y: 30, width: 100, height: 25 }
                },
                {
                    text: '250,000 ريال',
                    confidence: 0.94,
                    boundingBox: { x: 150, y: 200, width: 120, height: 20 }
                }
            ],
            confidence: 0.91
        };
        return mockAnalysis;
    }
    async batchAnalyze(files) {
        const results = await Promise.all(files.map(file => this.analyzeImage(file)));
        return results;
    }
    async extractTextFromImage(file) {
        const analysis = await this.analyzeImage(file);
        return analysis.extractedText;
    }
    async detectObjects(file) {
        const analysis = await this.analyzeImage(file);
        return analysis.objects;
    }
    async analyzeProductImage(file) {
        // محاكاة تحليل صورة المنتج
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            productName: 'لابتوب Dell Inspiron',
            category: 'إلكترونيات',
            features: ['شاشة 15 بوصة', 'معالج Intel Core i5', 'ذاكرة 8GB'],
            condition: 'used',
            estimatedValue: 2500
        };
    }
    async compareImages(image1, image2) {
        // محاكاة مقارنة الصور
        await new Promise(resolve => setTimeout(resolve, 1200));
        return {
            similarity: 0.78,
            differences: ['الإضاءة مختلفة', 'الزاوية مختلفة'],
            matchingObjects: ['مستند', 'توقيع']
        };
    }
}
exports.ImageAnalyzer = ImageAnalyzer;
//# sourceMappingURL=image-analyzer.js.map