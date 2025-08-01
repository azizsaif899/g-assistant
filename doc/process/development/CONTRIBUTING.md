# دليل المساهمة - G-Assistant v6.1.0

## 🤝 مرحباً بالمساهمين
نرحب بمساهماتكم في تطوير G-Assistant! هذا الدليل سيساعدكم على البدء والمساهمة بفعالية.

## 📌 تعليمات يومية للمساعدين البرمجيين
**مهم جدًا:** قبل البدء بأي مهمة، يجب على جميع المساعدين (البشريين والذكاء الاصطناعي) قراءة ملف `doc/context/DAILY_BOOT.md`. يحتوي هذا الملف على سياق العمل اليومي، توزيع المهام، والتعليمات الخاصة باليوم.

---

## 🤖 التعاون مع مساعدي الذكاء الاصطناعي
نحن نستخدم مساعدي الذكاء الاصطناعي (مثل Gemini Code Assist) لتسريع عملية التطوير. يتم دمجهم في سير العمل كأعضاء في الفريق لهم أدوار محددة.

### أدوار الذكاء الاصطناعي:
- **تنفيذ المهام المحددة**: كتابة كود لوظائف واضحة المعالم.
- **كتابة الاختبارات**: إنشاء اختبارات الوحدة والتكامل.
- **التوثيق**: إنشاء مسودات للتوثيق وتعليقات الكود.
- **إعادة الهيكلة**: تنفيذ مهام إعادة الهيكلة الموجهة.

### مسؤولية المطور البشري:
- **التحقق والمراجعة**: **كل كود يتم إنشاؤه بواسطة الذكاء الاصطناعي يجب أن يمر بمراجعة بشرية دقيقة قبل الدمج.**
- **التوجيه**: إنشاء GitHub Issues واضحة ومفصلة لتوجيه عمل الذكاء الاصطناعي.
- **الهندسة المعمارية**: اتخاذ القرارات التصميمية عالية المستوى.

---

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

---

## 🧠 الخطوة التالية: دليل المطور المتقدم
بعد أن تتقن سير العمل الأساسي، نوصي بشدة بقراءة `doc/guides/ADVANCED_DEVELOPER_GUIDE.md`.
يحتوي هذا الدليل على معلومات حيوية حول:
- سير العمل الإلزامي عند تغيير هيكل المشروع.
- أنماط البرمجة الدفاعية لضمان استقرار النظام.
- كيفية استخدام أدوات التشخيص الداخلية.
- الطريقة الآمنة لإعادة هيكلة وتسمية الملفات.

---

**شكراً لمساهمتكم في جعل G-Assistant أفضل! 🚀**
