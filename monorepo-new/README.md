# 🚀 G-Assistant Monorepo

## 📋 نظرة عامة

هذا المستودع الموحد (Monorepo) الجديد يحتوي على جميع مكونات نظام G-Assistant، مصمم وفقاً لأفضل الممارسات الهندسية.

## 🏗️ الهيكل المعماري

```
monorepo-new/
├── apps/                    # التطبيقات الرئيسية
│   ├── sidebar/            # الشريط الجانبي (Google Apps Script)
│   ├── web/                # واجهة الويب
│   └── admin/              # بوابة الإدارة
├── packages/               # الحزم المشتركة
│   ├── core-services/      # الخدمات الأساسية
│   ├── shared-ui/          # مكونات واجهة المستخدم
│   └── shared-types/       # الأنواع المشتركة
├── tools/                  # أدوات التطوير
├── docs/                   # التوثيق
└── specs/                  # المواصفات
```

## 🚀 البدء السريع

### المتطلبات الأساسية
- Node.js >= 18.0.0
- npm >= 9.0.0
- Google Apps Script CLI (clasp)

### التثبيت
```bash
npm install
```

### البناء
```bash
npm run build
```

### النشر
```bash
# نشر الشريط الجانبي
npm run deploy:sidebar

# نشر واجهة الويب
npm run deploy:web
```

## 🛡️ ضمان الجودة

- **Pre-commit hooks:** فحص تلقائي قبل كل commit
- **GitHub Actions:** فحص شامل عند كل Pull Request
- **ESLint + Prettier:** معايير كود موحدة
- **TypeScript:** فحص الأنواع

## 📚 التوثيق

راجع مجلد `docs/` للحصول على التوثيق المفصل.

---
**تم إنشاؤه بواسطة:** Sprint 0 - إعادة التأسيس  
**التاريخ:** 2025-01-27  
**الحالة:** جاهز للاستخدام