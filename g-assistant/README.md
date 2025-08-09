# 🤖 G-Assistant

نظام مساعد ذكي متكامل مع قدرات الإصلاح الذاتي وإدارة المهام التلقائية.

## ✨ الميزات الرئيسية

- 📊 **إضافة Google Sheets** مع واجهة ذكية
- 💬 **واجهة دردشة خارجية** للتفاعل المباشر
- 🎛️ **لوحة تحكم إدارية** شاملة
- 🤖 **تكامل Gemini AI** للتحليل الذكي
- 📈 **تحليلات BigQuery** للبيانات الضخمة
- 🔧 **Monorepo** منظم مع Turborepo

## 🏗️ هيكل المشروع

```
g-assistant/
├── apps/                   # التطبيقات
│   ├── sheets-addon/       # إضافة Google Sheets
│   ├── web-chatbot/        # واجهة الدردشة
│   └── admin-dashboard/    # لوحة التحكم
├── packages/               # المكتبات المشتركة
│   ├── core-logic/         # منطق الأعمال
│   ├── ui-components/      # مكونات الواجهة
│   └── config/             # إعدادات المشروع
├── docs/                   # التوثيق
└── tests/                  # الاختبارات
```

## 🚀 البدء السريع

```bash
# استنساخ المشروع
git clone <repository-url>
cd g-assistant

# تثبيت التبعيات
npm install

# تشغيل بيئة التطوير
npm run dev

# بناء المشروع
npm run build
```

## 📚 التوثيق

- [دليل الإعداد](docs/setup.md)
- [المعمارية](docs/architecture.md)
- [مرجع API](docs/api_reference.md)
- [خارطة الطريق](docs/roadmap.md)

## 🧪 الاختبار

```bash
# تشغيل الاختبارات
npm run test

# تشغيل مع التغطية
npm run test:coverage
```

## 🤝 المساهمة

نرحب بالمساهمات! يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) قبل البدء.

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

---

تم تطوير هذا المشروع بواسطة فريق G-Assistant 🚀