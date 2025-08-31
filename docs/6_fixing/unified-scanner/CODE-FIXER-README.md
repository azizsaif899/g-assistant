# Simple Code Fixer 🔧

أداة آمنة لإصلاح الأخطاء البسيطة في الكود دون المساس بالهيكل أو المنطق.

## الميزات الآمنة

✅ **ما يتم إصلاحه:**
- إزالة `console.log` فقط (ليس `console.error` أو `console.warn`)
- إزالة المسافات الزائدة في نهاية الأسطر
- إزالة الأسطر الفارغة المتتالية (أكثر من سطرين)
- تنسيق المسافات حول الأقواس
- إنشاء نسخ احتياطية تلقائياً

❌ **ما لا يتم تغييره:**
- المنطق أو التتابع
- القيم أو الثوابت
- هيكل الكود
- الدوال أو المتغيرات المهمة

## طريقة الاستخدام

### 1. إصلاح ملف واحد
```bash
node simple-code-fixer.js path/to/file.js
```

### 2. إصلاح مجلد كامل
```bash
node simple-code-fixer.js path/to/folder
```

### 3. إصلاح المشروع الحالي
```bash
node simple-code-fixer.js
```

### 4. استعادة النسخ الاحتياطية
```bash
node simple-code-fixer.js --restore
```

### 5. استخدام ملف الـ batch (ويندوز)
```cmd
fix-code.bat
fix-code.bat --restore
```

## الملفات المستثناة

- `package-lock.json`
- `node_modules/`
- `.git/`
- `dist/`, `build/`
- الملفات المضغوطة (`.min.js`)

## الأمان

- ✅ إنشاء نسخ احتياطية تلقائياً
- ✅ تخطي الملفات الحساسة
- ✅ إصلاحات آمنة فقط
- ✅ إمكانية الاستعادة الكاملة

## مثال على الاستخدام

```bash
# إصلاح المشروع
node simple-code-fixer.js

# النتيجة:
# 🔧 Fixed: src/components/Header.jsx
# 🔧 Fixed: src/utils/helpers.js
# 
# 📊 Summary:
#   ✅ Files fixed: 15
#   ⏭️  Files skipped: 3
#   ⏱️  Duration: 245ms
```

## التكوين

يمكن تخصيص الإعدادات في `fixer-config.json`:

```json
{
  "fixes": {
    "removeConsoleLog": true,
    "removeTrailingSpaces": true,
    "removeExtraEmptyLines": true
  },
  "excludeFiles": ["custom-exclude.js"]
}
```