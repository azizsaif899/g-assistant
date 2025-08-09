# 🏗️ معمارية المشروع

## هيكل Monorepo

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

## المكونات الأساسية

### Apps (التطبيقات)

#### Sidebar
- **الغرض:** واجهة داخل Google Sheets
- **التقنية:** Google Apps Script + TypeScript
- **البناء:** esbuild → dist/ → clasp push

#### Web
- **الغرض:** واجهة ويب شاملة
- **التقنية:** React/Vue + TypeScript
- **النشر:** Vercel/Firebase Hosting

#### Admin
- **الغرض:** بوابة إدارة داخلية
- **التقنية:** React + TypeScript
- **الوصول:** محدود للفريق

### Packages (الحزم المشتركة)

#### Core Services
- خدمات Gemini AI
- إدارة قواعد البيانات
- منطق الأعمال المشترك

#### Shared UI
- مكونات واجهة المستخدم
- أنماط التصميم
- الثيمات

#### Shared Types
- تعريفات TypeScript
- واجهات API
- نماذج البيانات

## مبادئ المعمارية

1. **فصل الاهتمامات:** كل تطبيق له غرض محدد
2. **إعادة الاستخدام:** الكود المشترك في packages/
3. **الأمان:** عزل كامل للـ Sidebar
4. **القابلية للصيانة:** هيكل واضح ومنظم

## 🔧 إرشادات متقدمة للمطورين

### سير العمل الإلزامي عند تغيير الهيكل

**تحذير:** تجاهل هذه القاعدة يسبب أخطاء `TypeError: Cannot read properties of undefined`.

عند أي تغيير هيكلي (إضافة/حذف ملف، تغيير تبعيات):

1. **إعادة بناء الترتيب:**
   ```bash
   node scripts/generatePushOrder.js
   ```

2. **النشر:**
   ```bash
   clasp push
   ```

### البرمجة الدفاعية

**النمط الصحيح:**
```javascript
if (!ModuleVerifier.isReady('AI.Core')) {
  return Dialogue.createError('الوحدة AI.Core غير جاهزة');
}
const aiCore = Injector.get('AI.Core');
```

**النمط الخاطئ:**
```javascript
// لا تفعل هذا!
const aiCore = Injector.get('AI.Core');
aiCore.someFunction(); // قد يفشل
```

### أدوات التشخيص

| الدالة | الوصف |
|---------|--------|
| `reportModulesStatus()` | حالة تحميل الوحدات |
| `runDocumentationAudit()` | الوحدات غير الموثقة |
| `ModuleVerifier.scanAll()` | فحص جاهزية شامل |
| `Injector.getAll()` | جميع الوحدات المحقونة |

### إعادة هيكلة الملفات بأمان

1. إعادة تسمية الملف محلياً
2. تحديث `config/module_manifest.json`
3. إعادة بناء الترتيب: `node scripts/generatePushOrder.js`
4. النشر: `clasp push`

**توصية:** احتفظ بالترقيم للملفات الأساسية (`00_`, `01_`)