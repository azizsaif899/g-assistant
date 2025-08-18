# 🚀 خطة اليوم 2: بناء النواة المنطقية

**الهدف الرئيسي**: تطوير المكتبة الأساسية (`core-logic`) التي ستحتوي على منطق الأعمال المشترك، مع كتابة اختبارات وحدة لضمان جودتها.

---

### 🟡 عالية الأولوية
- [ ] **TASK-CORE-001**: إنشاء حزمة `packages/core-logic` وتطوير `GeminiClient` للتواصل مع Gemini API. (المصدر: `MONTHLY_PLAN.md` - المرحلة الأولى)
- [ ] **TASK-CORE-002**: تطوير `SheetsClient` للتفاعل مع Google Sheets API داخل حزمة `core-logic`. (المصدر: `MONTHLY_PLAN.md` - المرحلة الأولى)

### 🔵 متوسطة الأولوية
- [ ] **TASK-TEST-001**: إعداد بيئة الاختبار (Vitest) في `packages/core-logic` وكتابة اختبارات وحدة أولية لـ `GeminiClient`. (المصدر: `IMPLEMENTATION_ROADMAP.md` - المرحلة الثانية)
- [ ] **TASK-TYPES-001**: إنشاء ملف `types/index.ts` داخل `core-logic` لتعريف الواجهات (Interfaces) المشتركة مثل User, Plan, Task. (المصدر: أفضل الممارسات)