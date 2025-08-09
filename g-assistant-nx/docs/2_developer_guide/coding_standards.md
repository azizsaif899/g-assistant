# 🎯 معايير الكود - G-Assistant

## 🧠 فلسفة المشروع

- **الوضوح أولاً:** الكود يجب أن يُفهم دون شرح
- **الاستدامة:** كل سطر يُكتب يجب أن يخدم النظام على المدى الطويل
- **الذكاء التفاعلي:** الوكلاء البرمجيون يجب أن يتعاونوا بسلاسة
- **المرونة:** النظام قابل للتوسع والتعديل دون كسر أي وحدة

## 🛠️ أدوات الفحص والتنسيق

| الأداة | الوظيفة | الحالة |
|--------|---------|--------|
| `Prettier` | تنسيق الكود تلقائياً | إلزامي |
| `ESLint` | كشف الأخطاء الأسلوبية | إلزامي |
| `Git Hooks` | منع الدمج قبل الفحص | إلزامي |
| `CI/CD` | فحص تلقائي عبر GitHub Actions | إلزامي |

## 🧩 أنماط كتابة الكود

### 📦 المتغيرات والدوال
- `camelCase` للمتغيرات والدوال
- `UPPER_SNAKE_CASE` للثوابت
- `PascalCase` للكلاسات والأنواع
- `_camelCase` للمتغيرات الخاصة

### 🔐 التصريح عن المتغيرات
```javascript
const MAX_RETRIES = 3; // ثابت
let userScore = 0;     // متغير قابل للتغيير
```

### 🧠 معالجة الأخطاء
```javascript
try {
  const result = await fetchData();
} catch (error) {
  Logger.error('فشل في جلب البيانات:', error);
  throw new Error('خطأ في الاتصال');
} finally {
  cleanup();
}
```

## 📝 التوثيق والتعليقات

### 💬 فلسفة التعليق
> اشرح "لماذا" وليس "ماذا"

### 📚 JSDoc إلزامي
```javascript
/**
 * يحلل أمر المستخدم ويوجهه للوكيل المناسب
 * @param {string} command - الأمر النصي
 * @param {object} context - سياق المحادثة
 * @returns {Promise<string>} - رد الوكيل
 * @throws {Error} - إذا لم يُعثر على وكيل مناسب
 */
async function processCommand(command, context) { ... }
```

## 🗂️ إدارة الوحدات البرمجية

### 1. عدم حذف المحتوى القائم
- لا تقم بحذف أي دالة أو ملف موجود إلا بعد:
  1. التحقق من عدم وجود استخدامات (search across repo)
  2. توثيق سبب الحذف في Issue أو PR
  3. الحصول على موافقة من صاحب الوحدة أو القائد التقني

### 2. عدم إضافة وحدة جديدة عشوائياً
- قبل إنشاء مجلد أو ملف وحدة جديد:
  1. ابحث عن وحدات مشابهة بالأسماء أو الوظيفة
  2. إذا وجدت وحدة تؤدي الغرض، قدّم اقتراح دمجها بدلاً من إنشاء أخرى
  3. دوّن نتائج البحث في وصف الـ PR لتسهيل مراجعة الأمر

### 3. قالب للهيدر والفوتر في كل وحدة

#### 3.1 هيدر (Header)
```js
/**
 * @module ModuleName
 * @version 1.2.0
 * @description موجز قصير عن ما يقدّمه هذا الملف
 * @author Your Name
 * @since 2025-08-11
 */
```

#### 3.2 فوتر (Footer)
```js
/**
 * @lastModified 2025-08-11
 * @nextReview  2025-10-11
 * @see docs/core-services.md#ModuleName
 */
```

## 🔧 نظام الإصلاح الذاتي

- كل وحدة تحتوي على وكيل إصلاح خاص بها
- يتم تسجيل السياق الكامل عند حدوث خطأ
- يتم اقتراح إصلاحات تلقائية عبر `FixSuggestion` و `AutoPatch`

## 📊 مراقبة الأداء

- نقاط قياس مدمجة داخل كل وحدة
- لوحة مراقبة داخل Google Sheets
- تسجيل الأخطاء حسب الخطورة

## 🧱 نصائح صارمة للمطور الجديد

- **قبل إنشاء أي ملف جديد، ابحث جيداً في المشروع**
- اقرأ كل المستندات قبل كتابة أي سطر كود
- لا تتجاوز المساعدين الذكيين
- احترم التسلسل
- التزم بالمعايير البرمجية
- استخدم الرسائل الموحدة
- لا تكتب كود غير موثق
- احترم روح الفريق
- **لا تعدل الملفات الأساسية بدون إذن**
- **التزم بنطاق المهمة**

## 🧯 استكشاف الأخطاء

| الخطأ | السبب المحتمل | الحل |
|-------|----------------|------|
| `ReferenceError` | متغير غير معرف | تحقق من التسمية |
| `TypeError` | استخدام غير صحيح للكائن | راجع نوع البيانات |
| `AgentNotFoundError` | وكيل غير موجود | تحقق من التكوين |
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

## 🔧 تنظيم الملفات والمجلدات

- **الوحدات البرمجية:** `src/ui/`, `src/ai/`, `src/agents/`
- **الاختبارات:** `tests/` بنفس هيكل الوحدة
- **المواصفات:** `doc/specs/` مربوطة بكل وحدة

## 🤖 التنسيق مع المساعدين

- **Gemini AI:** يكتب تقارير في `reports/` ويُسند المهام
- **Amazon AI:** ينفذ التعديلات ويكتب في `fixes_log.md`
- **Copilot:** مسؤول عن واجهة المستخدم

## 📄 مراجعة الكود

- المراجعة البشرية إلزامية قبل الدمج النهائي
- يُمنع الدمج المباشر إلى master أو main
- يجب استخدام Pull Request مع مراجعة