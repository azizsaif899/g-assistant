# ⚡ دليل البدء السريع - AzizSys

## 🚀 البدء في 5 دقائق

### 1. التثبيت السريع
```bash
# استنساخ المشروع
git clone https://github.com/your-username/azizsys5.git
cd azizsys5

# تثبيت التبعيات
npm install

# إعداد البيئة
copy .env.example .env
```

### 2. إعداد مفاتيح API
```env
# في ملف .env
GEMINI_API_KEY=your_gemini_api_key_here
LANGSMITH_API_KEY=your_langsmith_key_here
```

### 3. البناء والنشر
```bash
# بناء المشروع
npm run full-build

# تسجيل الدخول إلى Google
clasp login

# النشر
clasp push
```

### 4. الاختبار
```javascript
// في Google Apps Script Console
initializeSystem();
testModules();
```

## 🎯 الاستخدام الأساسي

### فتح المساعد الذكي
1. افتح Google Sheets
2. Extensions → AzizSys → عرض المساعد
3. اكتب سؤالك في الشريط الجانبي

### أمثلة سريعة
```
"حلل بيانات المبيعات في العمود A"
"أنشئ تقرير مالي شهري"
"راجع الكود في هذا الملف"
```

## 🤖 الوكلاء المتاحة

- **💰 CFO Agent**: التحليل المالي
- **👨‍💻 Developer Agent**: مراجعة الكود
- **📊 Analyst Agent**: تحليل البيانات
- **🤵 General Agent**: المهام العامة

## 📊 الوظائف في الخلايا

```excel
=GEMINI("ما هو عاصمة السعودية؟")
=GEMINI_ANALYZE(A1:C10, "summary")
=GEMINI_CODE("دالة لحساب الضريبة", "javascript")
```

## 🔧 استكشاف الأخطاء السريع

### المساعد لا يظهر
```bash
# إعادة النشر
clasp push
```

### خطأ في الوحدات
```javascript
// في Console
debugModules();
```

### مشاكل API
- تحقق من مفتاح Gemini API
- تأكد من الاتصال بالإنترنت

## 📚 الموارد

- [دليل المطورين](./DEVELOPER_GUIDE.md)
- [مرجع API](./API_REFERENCE.md)
- [دليل النشر](./DEPLOYMENT_GUIDE.md)
- [استكشاف الأخطاء](./TROUBLESHOOTING.md)

---

**🎉 مبروك! AzizSys جاهز للاستخدام**