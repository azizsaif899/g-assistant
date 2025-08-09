# 🤖 G-Assistant - نظام مساعد ذكي متكامل

نظام مساعد ذكي احترافي يدعم Google Sheets، WhatsApp Bots، ولوحات التحكم مع تكامل BigQuery وخدمات Google.

## 🏗️ هيكل المشروع

```
g-assistant/
├── .github/                        # CI/CD وملفات الأمان
├── apps/                           # تطبيقات المنصة
│   ├── sheets-addon/               # إضافة Google Sheets
│   ├── whatsapp-query-bot/         # بوت واتس اب للاستعلام
│   ├── whatsapp-exec-bot/          # بوت واتس اب التنفيذي
│   ├── web-chatbot/                # واجهة الدردشة الخارجية
│   └── admin-dashboard/            # لوحة تحكم المدير
├── packages/                       # مكتبات مشتركة
│   ├── core-logic/                 # منطق الأعمال المشترك
│   ├── bigquery-client/            # عميل BigQuery
│   ├── whatsapp-core/              # منطق WhatsApp مشترك
│   └── ui-components/              # مكونات واجهة مشتركة
├── tests/                          # اختبارات آلية
├── docs/                           # التوثيق الرسمي
└── scripts/                        # سكربتات مساعدة
```

## 🚀 البدء السريع

### التثبيت
```bash
# تثبيت التبعيات
pnpm install

# بناء المشروع
pnpm build

# تشغيل التطوير
pnpm dev
```

### الأوامر المتاحة
```bash
# بناء جميع التطبيقات
pnpm build

# تشغيل الاختبارات
pnpm test

# فحص الكود
pnpm lint

# نشر تطبيق معين
pnpm deploy:sheets-addon
pnpm deploy:web-chatbot
pnpm deploy:admin-dashboard
```

## 📱 التطبيقات

### 📊 Google Sheets Add-on
إضافة احترافية لـ Google Sheets مع:
- سايدبار تفاعلي
- تكامل Gemini AI
- تحليلات BigQuery

### 💬 WhatsApp Bots
- **Query Bot**: للاستعلامات والبحث
- **Executive Bot**: للمهام التنفيذية

### 🌐 Web Interfaces
- **Web Chatbot**: واجهة دردشة خارجية
- **Admin Dashboard**: لوحة تحكم شاملة

## 🔧 التطوير

### إضافة تطبيق جديد
```bash
nx g @nx/node:app my-new-app
```

### إضافة مكتبة جديدة
```bash
nx g @nx/js:lib my-new-lib
```

### تشغيل تطبيق معين
```bash
nx serve sheets-addon
nx serve web-chatbot
```

## 📚 التوثيق

- [دليل المطور](docs/2_developer_guide/setup.md)
- [معمارية النظام](docs/architecture.md)
- [مرجع API](docs/api_reference.md)
- [خارطة الطريق](docs/roadmap.md)

## 🤝 المساهمة

يرجى قراءة [دليل المساهمة](docs/2_developer_guide/contributing.md) قبل البدء.

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT.

---

تم تطوير هذا المشروع بواسطة فريق AzizSys 🚀