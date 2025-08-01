# دليل المساهمة - G-Assistant v6.0.0

## 🤝 مرحباً بالمساهمين

نرحب بمساهماتكم في تطوير G-Assistant! هذا الدليل سيساعدكم على البدء والمساهمة بفعالية.

## 🚀 البدء السريع

### 1. إعداد البيئة المحلية
```bash
# استنساخ المستودع
git clone https://github.com/YOUR_USERNAME/g-assistant.git
cd g-assistant

# تثبيت التبعيات
npm install

# تثبيت Google Apps Script CLI
npm install -g @google/clasp

# تسجيل الدخول إلى Google
clasp login
```

### 2. فهم هيكل المشروع
```
g-assistant/
├── src/                    # الكود المصدري المنظم
├── docs/                   # الوثائق التقنية
├── tests/                  # اختبارات الوحدة
├── 10_ui/                  # واجهة المستخدم
├── 20_ai/                  # محرك الذكاء الصناعي
├── 25_ai_agents/           # الوكلاء الذكيون
├── 30_tools/               # الأدوات والوظائف
└── README.md               # الوثائق الرئيسية
```

## 📋 أنواع المساهمات المرحب بها

### 🐛 تقارير الأخطاء
- استخدم GitHub Issues
- قدم وصفاً مفصلاً للمشكلة
- أرفق لقطات شاشة إن أمكن
- اذكر خطوات إعادة الإنتاج

### ✨ طلبات الميزات الجديدة
- ابحث أولاً في Issues الموجودة
- اشرح الحاجة للميزة
- قدم أمثلة على الاستخدام
- ناقش التصميم المقترح

### 🔧 تحسينات الكود
- تحسين الأداء
- إصلاح الأخطاء
- تحسين التوثيق
- إضافة اختبارات

### 📚 تحسين الوثائق
- تصحيح الأخطاء الإملائية
- إضافة أمثلة
- ترجمة المحتوى
- تحسين الشرح

## 🛠️ عملية المساهمة

### 1. Fork والاستنساخ
```bash
# Fork المستودع على GitHub
# ثم استنسخ نسختك
git clone https://github.com/YOUR_USERNAME/g-assistant.git
cd g-assistant

# إضافة المستودع الأصلي كـ upstream
git remote add upstream https://github.com/ORIGINAL_OWNER/g-assistant.git
```

### 2. إنشاء Branch جديد
```bash
# إنشاء branch للميزة الجديدة
git checkout -b feature/new-feature-name

# أو للإصلاح
git checkout -b fix/bug-description
```

### 3. التطوير والاختبار
```bash
# تطوير الكود
# إضافة الاختبارات
npm test

# تشغيل الفحوصات
npm run lint

# بناء المشروع
npm run build
```

### 4. فحص الجودة والاختبار (إجباري)
```bash
# فحص جودة الكود والاختبارات
npm run quality-gate

# إذا فشل الفحص، أصلح المشاكل أولاً
npm run lint:fix
npm run format

# تأكد من نجاح جميع الاختبارات
npm run test:coverage
```

### 5. Commit والدفع
```bash
# إضافة التغييرات
git add .

# Commit مع رسالة وصفية
git commit -m "feat: إضافة ميزة جديدة للتحليل المالي

✅ Tests: Added comprehensive unit tests
✅ Coverage: 95% code coverage achieved
✅ Docs: Updated API documentation"

# دفع إلى branch
git push origin feature/new-feature-name
```

### 6. إنشاء Pull Request
- اذهب إلى GitHub
- أنشئ Pull Request
- **استخدم قالب PR المطلوب**:

```markdown
## 📋 وصف التغييرات
[وصف مفصل للتغييرات]

## ✅ قائمة التحقق
- [ ] تم إضافة اختبارات شاملة
- [ ] تغطية الكود 85%+
- [ ] تم تشغيل `npm run quality-gate` بنجاح
- [ ] تم تحديث الوثائق
- [ ] تم اختبار الميزة يدوياً

## 🧪 تفاصيل الاختبارات
- عدد الاختبارات المضافة: X
- تغطية الكود: X%
- أنواع الاختبارات: [وحدة، تكامل، حالات طرفية]

## 📚 التوثيق
- [ ] تم تحديث README.md
- [ ] تم تحديث API documentation
- [ ] تم إضافة أمثلة للاستخدام

## 🔗 Issues ذات الصلة
Closes #[رقم الـ issue]
```

## 📝 معايير الكود

### JavaScript/Google Apps Script
```javascript
// استخدم نمط الوحدات
defineModule('System.NewModule', function(injector) {
  return {
    // وثق الدوال العامة
    /**
     * وصف الدالة
     * @param {string} param - وصف المعامل
     * @returns {Object} وصف القيمة المرجعة
     */
    publicFunction(param) {
      // منطق الدالة
    }
  };
});
```

### التسمية
- **الوحدات**: `System.ModuleName`
- **الدوال**: `camelCase`
- **الثوابت**: `UPPER_CASE`
- **الملفات**: `snake_case.js`

### التوثيق
- وثق جميع الدوال العامة
- استخدم JSDoc للتوثيق
- اكتب تعليقات واضحة
- حدث README.md عند الحاجة

## 🧪 الاختبارات - متطلبات إجبارية

### ⚠️ متطلبات الاختبار الإجبارية
**جميع المساهمات يجب أن تتضمن اختبارات شاملة. لن يتم قبول أي Pull Request بدون اختبارات مناسبة.**

### معايير الاختبار المطلوبة
- **تغطية الكود**: 85%+ للكود الجديد
- **اختبارات الوحدة**: لجميع الدوال العامة
- **اختبارات الحالات الطرفية**: للمدخلات غير المتوقعة
- **اختبارات معالجة الأخطاء**: لجميع سيناريوهات الفشل

### كتابة الاختبارات
```javascript
// tests/new-feature.test.js
describe('NewFeature - اختبارات شاملة', () => {
  describe('الاختبارات الإيجابية', () => {
    test('should work correctly with valid input', () => {
      const input = 'valid test data';
      const result = newFeature(input);
      expect(result).toBe('expected output');
    });
  });

  describe('اختبارات الحالات الطرفية', () => {
    test('should handle empty input', () => {
      expect(() => newFeature('')).toThrow('Input cannot be empty');
    });

    test('should handle null input', () => {
      expect(() => newFeature(null)).toThrow('Input cannot be null');
    });
  });

  describe('اختبارات معالجة الأخطاء', () => {
    test('should handle network errors gracefully', async () => {
      // Mock network failure
      jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
      
      await expect(newFeature('test')).rejects.toThrow('Network error');
    });
  });
});
```

### تشغيل الاختبارات
```bash
# تشغيل جميع الاختبارات مع التغطية
npm run test:coverage

# تشغيل اختبارات محددة
npm test -- --testNamePattern="NewFeature"

# تشغيل الاختبارات في وضع المراقبة
npm run test:watch

# فحص جودة الكود قبل الاختبار
npm run quality-gate
```

### فحص جودة الكود الإجباري
```bash
# يجب تشغيل هذا الأمر قبل كل commit
npm run quality-gate

# يتضمن:
# - ESLint للتحقق من جودة الكود
# - Prettier للتحقق من التنسيق
# - Jest للاختبارات مع التغطية
```

## 🔍 مراجعة الكود

### معايير المراجعة
- **الوظائف**: هل الكود يعمل كما هو متوقع؟
- **الأداء**: هل هناك تحسينات ممكنة؟
- **الأمان**: هل هناك ثغرات أمنية؟
- **القابلية للقراءة**: هل الكود واضح ومفهوم؟
- **التوثيق**: هل التوثيق كافٍ ودقيق؟

### عملية المراجعة
1. **المراجعة التلقائية**: CI/CD checks
2. **مراجعة الأقران**: من المطورين الآخرين
3. **اختبار الوظائف**: تأكد من عمل الميزات
4. **مراجعة التوثيق**: تحقق من دقة الوثائق

## 🏷️ نظام التسميات

### Git Commit Messages
```bash
# نوع: وصف مختصر
feat: إضافة ميزة جديدة
fix: إصلاح خطأ
docs: تحديث الوثائق
style: تحسين التنسيق
refactor: إعادة هيكلة الكود
test: إضافة اختبارات
chore: مهام صيانة
```

### GitHub Labels
- `bug` - خطأ يحتاج إصلاح
- `enhancement` - ميزة جديدة
- `documentation` - تحسين الوثائق
- `good first issue` - مناسب للمبتدئين
- `help wanted` - نحتاج مساعدة
- `priority: high` - أولوية عالية

## 🌍 الترجمة والتوطين

### إضافة ترجمات جديدة
```javascript
// config/locales/ar.json
{
  "welcome": "مرحباً بك في G-Assistant",
  "error": "حدث خطأ"
}

// config/locales/en.json
{
  "welcome": "Welcome to G-Assistant",
  "error": "An error occurred"
}
```

### اللغات المدعومة
- العربية (ar) - اللغة الأساسية
- الإنجليزية (en) - اللغة الثانوية
- نرحب بإضافة لغات جديدة!

## 📞 الحصول على المساعدة

### قنوات التواصل
- **GitHub Issues**: للأسئلة التقنية
- **GitHub Discussions**: للنقاشات العامة
- **Email**: للاستفسارات الخاصة

### الموارد المفيدة
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Gemini AI API Documentation](https://ai.google.dev/docs)
- [JavaScript Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 🎯 خارطة الطريق

### المرحلة الحالية (85% مكتملة)
- ✅ الوكلاء الذكيون
- ✅ نظام الأتمتة
- ✅ تكامل Sheets
- ✅ تكامل Gemini AI

### المرحلة القادمة (95%)
- 🔄 واجهة المستخدم المحسنة
- 🔄 تجربة المستخدم المتقدمة
- 🔄 خيارات التخصيص

### المرحلة الأخيرة (100%)
- ⏳ تحسين الأداء
- ⏳ الأمان المتقدم
- ⏳ الوثائق الكاملة

## 🏆 شكر المساهمين

نشكر جميع المساهمين في هذا المشروع:

<!-- سيتم تحديث هذا القسم تلقائياً -->

## 📄 الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE).

---

**شكراً لمساهمتكم في جعل G-Assistant أفضل! 🚀**

*تم إنشاء هذا الدليل بواسطة G-Assistant v6.0.0*