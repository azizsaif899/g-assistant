# 🤝 دليل المساهمة - G-Assistant

## مرحباً بالمساهمين

نرحب بمساهماتكم في تطوير G-Assistant! هذا الدليل سيساعدكم على البدء والمساهمة بفعالية.

## 📌 قبل البدء

### المتطلبات الأساسية
- قراءة [نظرة عامة على المشروع](../1_concept/project_overview.md)
- فهم [معمارية المشروع](./architecture.md)
- الالتزام بـ [معايير الكود](./coding_standards.md)
- إعداد [بيئة التطوير](./setup.md)

### تعليمات يومية للمساعدين البرمجيين
**مهم جداً:** قبل البدء بأي مهمة، يجب قراءة ملف `doc/process/context/DAILY_BOOT.md` للحصول على:
- سياق العمل اليومي
- توزيع المهام
- التعليمات الخاصة باليوم

## 🤖 التعاون مع مساعدي الذكاء الاصطناعي

### أدوار الذكاء الاصطناعي:
- **تنفيذ المهام المحددة:** كتابة كود لوظائف واضحة المعالم
- **كتابة الاختبارات:** إنشاء اختبارات الوحدة والتكامل
- **التوثيق:** إنشاء مسودات للتوثيق وتعليقات الكود
- **إعادة الهيكلة:** تنفيذ مهام إعادة الهيكلة الموجهة

### مسؤولية المطور البشري:
- **التحقق والمراجعة:** كل كود من الذكاء الاصطناعي يحتاج مراجعة بشرية
- **التوجيه:** إنشاء GitHub Issues واضحة ومفصلة
- **الهندسة المعمارية:** اتخاذ القرارات التصميمية عالية المستوى

## 🛠️ عملية المساهمة

### 1. Fork والاستنساخ
```bash
# Fork المستودع على GitHub
# ثم استنسخ نسختك
git clone https://github.com/YOUR_USERNAME/g-assistant.git
cd g-assistant

# إضافة المستودع الأصلي كـ upstream
git remote add upstream https://github.com/azizsaif899/g-assistant.git
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

### 4. سير عمل المساهمة

1. **إنشاء فرع جديد:**
   ```bash
   git checkout -b feature/your-feature-name
   # أو
   git checkout -b fix/your-bug-fix
   ```

2. **تطوير التغييرات:** قم بإجراء التغييرات اللازمة في الكود

3. **اختبار التغييرات:** تأكد من أن تغييراتك تعمل بشكل صحيح

4. **الالتزام بالمعايير:** تأكد من التزام الكود بـ [معايير الكود](./coding_standards.md)

5. **رسائل الـ Commit:** اكتب رسائل commit واضحة وموجزة

6. **إنشاء طلب سحب (Pull Request):** إلى الفرع الرئيسي (`main`)

## 🔍 قبل إضافة أو حذف وحدة برمجية

1. ابحث عبر المستودع عن اسم الوحدة أو مسار مشابه
2. شغّل الأمر:
   ```bash
   grep -R "ModuleName" -n packages/
   ```
3. إن لم تجد ما يشبهها، أضف الوحدة مع الالتزام بهيدر/فوتر الـ Template
4. دوّن نتائج البحث ومبرراتك في وصف الـ PR

## 📋 إرشادات إضافية

### التوثيق
- إذا كانت تغييراتك تتطلب تحديث التوثيق، يرجى القيام بذلك
- استخدم JSDoc للدوال العامة
- اشرح "لماذا" وليس "ماذا"

### الاختبارات
- إذا كانت تغييراتك تضيف ميزات جديدة، أضف اختبارات لها
- تأكد من نجاح جميع الاختبارات الموجودة
- اكتب اختبارات للحالات الحدية

### مراجعة الكود
- كل PR يحتاج موافقة من مراجع واحد على الأقل
- استجب للتعليقات بسرعة

Before taking any step, make sure you've read the entire project file.
To avoid duplicate files, ensure their interconnectedness, functions, and dependencies, and ensure the service's integration with the sidebar and external interface.

AzizSys هو نظام إدارة ذكي متكامل مبني على Google Apps Script مع تكامل كامل مع Gemini AI. يستخدم النظام معمارية معيارية متقدمة مع نظام حقن التبعيات المخصص.

🏗️ المعمارية


نظام الوحدات

javascript
// تعريف وحدة جديدة
defineModule('System.Tools.NewTool', ({ Utils, Config }) => {
  return {
    processData(data) {
      // منطق المعالجة
    }
  };
});


حقن التبعيات

javascript
// الحصول على وحدة
const tool = Injector.get('System.Tools.NewTool');

// التحقق من جاهزية الوحدة
if (ModuleVerifier.isReady('AI.Core')) {
  // استخدام الوحدة
}


📦 إضافة وحدة جديدة


1. إنشاء الملف

javascript
// في 30_tools/new_tool.js
defineModule('System.Tools.NewTool', ({ Utils, Config }) => {
  return {
    summarizeData() {
      // منطق التلخيص
    }
  };
});


2. تسجيل في المانيفست

json
{
  "module": "System.Tools.NewTool",
  "file": "30_tools/new_tool.js",
  "dependencies": ["System.Utils", "System.Config"]
}


3. تحديث ترتيب التحميل

bash
node scripts/generatePushOrder.js


4. التوثيق

javascript
DocsManager.registerModuleDocs('System.Tools.NewTool', {
  summary: 'أداة تحليل وتلخيص البيانات',
  functions: {
    summarizeData: 'تلخيص جدول البيانات'
  }
});


🛡️ البرمجة الدفاعية


التحقق من التبعيات

javascript
if (!ModuleVerifier.isReady('AI.Core')) {
  return Dialogue.createError('الوحدة AI.Core غير جاهزة');
}


استخدام Fallback

javascript
const agent = Injector.get('AgentsCatalog')?.handleRequest ?? (() => {
  return Dialogue.createError('الوكيل غير متاح حالياً');
});


🔍 أدوات التشخيص


| الأداة | الوصف |
|-------|--------|
| reportModulesStatus() | حالة الوحدات الأساسية |
| runDocumentationAudit() | الوحدات غير الموثقة |
| ModuleVerifier.scanAll() | فحص جاهزية الوحدات |
| DependencyGuardian.waitFor() | انتظار تحميل وحدة |

🔄 سير العمل للنشر


1. البناء

bash
node scripts/generatePushOrder.js


2. النشر

bash
clasp push


3. الاختبار

javascript
// في Google Apps Script Console
initializeSystem();
debugModules();
testSystem();


📋 أفضل الممارسات


التسمية

- استخدم System.Domain.Functionality
- الوحدات الأساسية تبدأ بـ 00_
- الواجهة تُحمل أخيراً

تجنب التبعيات الدائرية

- استخدم نمط الكتالوج
- فصل المسؤوليات
- استخدم دوال التهيئة الخارجية

معالجة الأخطاء

javascript
try {
  const result = processData(data);
  return Dialogue.createSuccess(result);
} catch (error) {
  Logger.error('خطأ في معالجة البيانات', error);
  return Dialogue.createError('فشل في المعالجة');
}


🧪 الاختبارات


اختبار الوحدة

javascript
function testNewTool() {
  const tool = Injector.get('System.Tools.NewTool');
  const result = tool.summarizeData(testData);
  
  if (result.success) {
    Logger.log('✅ اختبار ناجح');
  } else {
    Logger.error('❌ اختبار فاشل');
  }
}


اختبار التكامل

javascript
function testSystemIntegration() {
  // اختبار تفاعل الوحدات
  const ai = Injector.get('AI.Core');
  const tools = Injector.get('Tools.Catalog');
  
  // اختبار السيناريو الكامل
}


🔧 استكشاف الأخطاء


خطأ defineModule is not defined

- تحقق من ترتيب التحميل
- تأكد من تحميل 00_utils.js أولاً

خطأ Cannot read properties of undefined

- تحقق من تسجيل الوحدة في Injector
- استخدم ModuleVerifier.isReady()

تبعيات دائرية

- راجع module_manifest.json
- استخدم نمط الكتالوج
- فصل المنطق المشترك

- اشرح قراراتك التصميمية

## 🚀 الخطوة التالية

بعد إتقان سير العمل الأساسي، راجع:
- [الإرشادات المتقدمة](./architecture.md#🔧-إرشادات-متقدمة-للمطورين)
- [استراتيجية الاختبار](./testing_strategy.md)
- [دليل المستخدم](./user_manual.md)

**شكراً لمساهمتكم في جعل G-Assistant أفضل! 🚀**