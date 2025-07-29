

## نظرة عامة

هذا الدليل يتبع أفضل الممارسات في تطوير البرمجيات مع عملية بناء (Build Process) احترافية قبل النشر.

---

## المرحلة الأولى: الإصلاح والبناء المحلي

### 1. التحقق من البيئة
```bash
# التأكد من وجود Node.js
node --version

# تثبيت التبعيات
npm install
```

### 2. إصلاح الكود المصدري
```bash
# إصلاح الأخطاء النحوية
npm run fix-syntax

# فحص صحة النظام
npm run health-check
```

### 3. تشغيل عملية البناء
```bash
# بناء كامل مع تنظيف
npm run full-build

# أو بناء سريع
npm run build
```

### 4. التحقق من النتائج
- تحقق من مجلد `dist/` للملفات المعالجة
- تحقق من مجلد `gas_ready/` للنسخة الجاهزة للنشر
- راجع تقرير البناء في الطرفية

---

## المرحلة الثانية: النشر في Google Apps Script

### 1. إعداد المشروع
1. اذهب إلى [script.google.com](https://script.google.com)
2. أنشئ مشروع جديد
3. احذف `Code.gs` الافتراضي

### 2. رفع الملفات بالترتيب الصحيح

**⚠️ مهم جداً: اتبع هذا الترتيب بدقة**

1. **`00_Main_Initializer.js`** - نقطة الدخول الرئيسية
2. **`Utils.js`** - الأدوات المساعدة الأساسية  
3. **`Config.js`** - نظام الإعدادات
4. **`AI_LongTermMemory.js`** - نظام الذاكرة
5. **`AI_Core.js`** - محرك الذكاء الصناعي
6. **`Tools_Sheets.js`** - أدوات Sheets
7. **`UI_DeveloperSidebar.js`** - واجهة المطور
8. **`AssistantSidebar.html`** - واجهة المستخدم

### 3. إعداد التكوين
1. افتح ملف `appsscript.json` في المحرر
2. انسخ محتوى `gas_ready/appsscript.json`
3. الصق المحتوى واحفظ

### 4. إعداد المتغيرات
```javascript
// في Properties > Script properties
GEMINI_API_KEY = "your_gemini_api_key_here"
AI_LONG_TERM_MEMORY_VERSION = "1.0.1"
LTM_FOLDER_NAME = "AZIZSYS6_Memory"
```

---

## المرحلة الثالثة: الاختبار والتحقق

### 1. اختبار التهيئة
```javascript
// في محرر Apps Script
function testInitialization() {
  Logger.log('🧪 اختبار التهيئة...');
  onOpen();
  Logger.log('✅ اكتمل الاختبار');
}
```

### 2. اختبار الوحدات
```javascript
function testModules() {
  Logger.log('🧪 اختبار الوحدات...');
  runSystemTest();
}
```

### 3. اختبار الواجهة
1. شغّل دالة `onOpen()`
2. اذهب إلى Google Sheet
3. تحقق من ظهور قائمة "🤖 AZIZSYS6"
4. اختبر فتح المساعد

---

## استكشاف الأخطاء الشائعة

### خطأ: "ReferenceError: [function] is not defined"
**السبب:** ترتيب تحميل الملفات خاطئ  
**الحل:** تأكد من اتباع الترتيب المحدد في القسم 2.2

### خطأ: "TypeError: Cannot read property of undefined"
**السبب:** وحدة لم يتم تحميلها بشكل صحيح  
**الحل:** تحقق من وجود جميع الملفات وتشغيل `testModules()`

### خطأ: "Authorization required"
**السبب:** صلاحيات مفقودة  
**الحل:** تحقق من `appsscript.json` وأضف الصلاحيات المطلوبة

### السايدبار لا يظهر
**السبب:** ملف HTML مفقود أو خطأ في الاسم  
**الحل:** تأكد من وجود `AssistantSidebar.html` بالاسم الصحيح

---

## نصائح للنجاح

### ✅ افعل
- استخدم `npm run full-build` قبل كل نشر
- احتفظ بنسخ احتياطية من المشروع
- اختبر كل وحدة منفصلة قبل النشر الكامل
- راجع سجلات الأخطاء في Apps Script بانتظام

### ❌ لا تفعل
- لا تنسخ الملفات من `src/` مباشرة
- لا تتجاهل ترتيب تحميل الملفات
- لا تنشر بدون اختبار محلي
- لا تنس إضافة مفاتيح API المطلوبة

---

## الدعم والمساعدة

### سجلات مفيدة
```javascript
// لعرض حالة النظام
function debugSystem() {
  Logger.log('GAssistant version: ' + GAssistant.version);
  Logger.log('Loaded modules: ' + Object.keys(GAssistant.modules));
  Logger.log('Initialized: ' + GAssistant.initialized);
}
```

### أوامر مفيدة
```bash
# فحص سريع للمشروع
npm run health-check

# تحليل شامل
npm run analyze

# إعادة بناء كاملة
npm run clean && npm run full-build
```

---

## الخلاصة

باتباع هذا الدليل، ستضمن نشر نسخة مستقرة وموثوقة من AZIZSYS6. عملية البناء المهنية تضمن:

- ✅ كود خالٍ من الأخطاء النحوية
- ✅ ترتيب تحميل صحيح للوحدات  
- ✅ توافق كامل مع Google Apps Script
- ✅ اختبار شامل قبل النشر

**نجاح النشر = إصلاح + بناء + ترتيب + اختبار** 🎯