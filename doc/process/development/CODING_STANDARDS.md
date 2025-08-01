# 🎯 AzizSys Coding Standards  
### الإصدار: 3.1 | الحالة: إلزامي وغير قابل للتفاوض  
> _"الكود النظيف ليس مجرد أسلوب، بل ثقافة تُبنى عليها الأنظمة الذكية."_

---

## 📚 أهم المستندات التي يجب قراءتها أولًا

| الملف | الوصف |
|---|---|
| [README.md](../../../README.md) | نظرة عامة على المشروع، أهدافه، طريقة التشغيل |
| [CONTRIBUTING.md](../../../CONTRIBUTING.md) | خطوات المساهمة، التنسيق مع المساعدين، آلية الدمج |
| [CODING_STANDARDS.md](CODING_STANDARDS.md) | معايير كتابة الكود، إلزامية وغير قابلة للتفاوض |
| [COMMIT_MESSAGE.md](../../../COMMIT_MESSAGE.md) | كيف تكتب رسالة commit واضحة وموحدة |
| [AI_Fix_Protocol.md](../AI_Fix_Protocol.md) | بروتوكول الإصلاح الذاتي بين Gemini وAmazon |
| [TEAM_LOG.md](../../TEAM_LOG.md) | سجل التنسيق بين المساعدين، التنبيهات اليومية |
| [fixes_log.md](../../fixes_log.md) | سجل الإصلاحات المنفذة من Amazon |
| [MONTHLY_PLAN.md](../../MONTHLY_PLAN.md) | خطة الإصلاح الشهرية التي يقرأ منها المساعدون مهامهم |

---

## 🧠 فلسفة المشروع

- **الوضوح أولًا:** الكود يجب أن يُفهم دون شرح.
- **الاستدامة:** كل سطر يُكتب يجب أن يخدم النظام على المدى الطويل.
- **الذكاء التفاعلي:** الوكلاء البرمجيون يجب أن يتعاونوا بسلاسة.
- **المرونة:** النظام قابل للتوسع والتعديل دون كسر أي وحدة.

---

## 🛠️ أدوات الفحص والتنسيق

| الأداة | الوظيفة | الحالة |
|--------|---------|--------|
| `Prettier` | تنسيق الكود تلقائيًا | إلزامي |
| `ESLint` | كشف الأخطاء الأسلوبية | إلزامي |
| `Git Hooks` | منع الدمج قبل الفحص | إلزامي |
| `CI/CD` | فحص تلقائي عبر GitHub Actions | إلزامي |

---

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
  Logger.error('''فشل في جلب البيانات:''', error);
  throw new Error('''خطأ في الاتصال''');
} finally {
  cleanup();
}
```

### 🎨 التفكيك
```javascript
const { agent, memory } = ai.core;
```

---

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

---

## 🔧 نظام الإصلاح الذاتي

- كل وحدة تحتوي على وكيل إصلاح خاص بها
- يتم تسجيل السياق الكامل عند حدوث خطأ
- يتم اقتراح إصلاحات تلقائية عبر `FixSuggestion` و `AutoPatch`

---

## 📊 مراقبة الأداء

- نقاط قياس مدمجة داخل كل وحدة
- لوحة مراقبة داخل Google Sheets
- تسجيل الأخطاء حسب الخطورة

---

## 🤖 اختبارات الذكاء الاصطناعي

- اختبار السياق المتغير
- اختبار التعاون بين الوكلاء
- اختبار التحيز في الردود

---

## 🚀 النشر والتشغيل

- يتم النشر عبر `clasp push` أو GitHub Actions
- يتم اختبار النظام تلقائيًا قبل كل إصدار
- يتم تحديث `DAILY_BOOT.md` يوميًا لتحديد المهام

---

## 🧯 استكشاف الأخطاء

| الخطأ | السبب المحتمل | الحل |
|-------|----------------|------|
| `ReferenceError` | متغير غير معرف | تحقق من التسمية |
| `TypeError` | استخدام غير صحيح للكائن | راجع نوع البيانات |
| `AgentNotFoundError` | وكيل غير موجود | تحقق من التكوين |

---

## 🧱 نصائح صارمة للمطور الجديد

- **قبل إنشاء أي ملف جديد، ابحث جيدًا في المشروع:** تأكد مما إذا كان هناك ملف موجود بالفعل يؤدي نفس الغرض، حتى لو كان باسم مختلف. إذا وجدت ملفًا مشابهًا، لا تقم بحذفه أو إعادة كتابته مباشرة. بدلاً من ذلك، استفسر عن أهميته، وقدم اقتراحًا للتعديل أو الدمج، وانتظر الموافقة قبل أي إجراء. يجب أن تكون لديك نظرة شاملة للمشروع قبل البدء في التعديل.

- اقرأ كل المستندات قبل كتابة أي سطر كود.

- لا تتجاوز المساعدين الذكيين. أي تعديل يجب أن يكون منسقًا مع Gemini أو Amazon حسب البروتوكول.

- احترم التسلسل. لا تبدأ من منتصف المشروع أو تتجاهل الملفات الأساسية.

- التزم بالمعايير البرمجية. أي كود لا يتوافق مع CODING_STANDARDS.md سيتم رفضه تلقائيًا.

- استخدم الرسائل الموحدة. لا ترفع أي commit بدون تنسيق واضح حسب COMMIT_MESSAGE.md.

- لا تكتب كود غير موثق. كل دالة عامة يجب أن تحتوي على JSDoc.

- احترم روح الفريق. المشروع يعمل بتناغم بين البشر والمساعدين، لا تتصرف بشكل فردي أو خارج التنسيق.

- **لا تعدل الملفات الأساسية بدون إذن:** يُمنع تعديل الملفات الأساسية مثل `README.md` أو `CODING_STANDARDS.md` أو أي ملفات تكوين رئيسية بدون الحصول على إذن مسبق ومراجعة دقيقة.

- **التزم بنطاق المهمة:** قم بتحديث الملفات المخصصة لك فقط، ولا تعمل خارج نطاق المهمات الموكلة إليك لضمان التنسيق وتجنب التعارضات.

---

## 🔧 تطوير إضافي لـ CODING_STANDARDS.md

### 7.0 تنظيم الملفات والمجلدات
- الوحدات البرمجية (Modules): يجب أن تكون داخل مجلدات واضحة مثل src/ui/, src/ai/, src/agents/.

- الاختبارات (Tests): يجب أن تكون في مجلد tests/ بنفس هيكل الوحدة التي تختبرها.

- المواصفات (Specs): توضع في doc/specs/ وتربط بكل وحدة لها بروتوكول خاص.

### 8.0 التنسيق مع المساعدين
- Gemini AI: لا يُعدل الكود مباشرة، بل يكتب تقارير في reports/ ويُسند المهام.

- Amazon AI: ينفذ التعديلات فقط بعد مراجعة تقارير Gemini، ويكتب في fixes_log.md.

- Copilot: مسؤول عن واجهة المستخدم، ويجب أن ينسق مع باقي المساعدين قبل أي تعديل.

### 9.0 مراجعة الكود
- المراجعة البشرية إلزامية قبل الدمج النهائي.

- يُمنع الدمج المباشر إلى master أو main. يجب استخدام Pull Request مع مراجعة من شخص آخر أو مساعد ذكي.

---

### 10.0 مراقبة التقدم ولوحة التحكم
لضمان الشفافية والمتابعة الفعالة لتقدم المشروع وحالة النظام، تم دمج نظام مراقبة شامل:

- **`monthly_progress.json`**: ملف JSON لتتبع حالة المهام الشهرية (مكتملة، قيد التنفيذ، معلقة).
- **`scripts/update_task_status.js`**: سكريبت Node.js لإدارة وتحديث حالة المهام في `monthly_progress.json`.
  - **الاستخدام:**
    - `node scripts/update_task_status.js list` لعرض المهام.
    - `node scripts/update_task_status.js update <id> <status>` لتحديث حالة مهمة (pending, in_progress, completed).
    - `node scripts/update_task_status.js add "<title>" [description]` لإضافة مهمة جديدة.
- **`scripts/generate_dashboard_data.js`**: سكريبت Node.js يقوم بتوليد بيانات لوحة التحكم (`dashboard_data.json`) من `monthly_progress.json` وسجلات النظام (errors.log, fixes_log.md, status.json, TEAM_SYNC.md).
- **`doc/dashboard.html`**: لوحة تحكم تفاعلية تعرض حالة النظام، التقدم الشهري، الإصلاحات المعلقة، ونشاط الفريق.
  - **الوصول:** افتح `doc/dashboard.html` مباشرة في المتصفح، أو اضغط على زر "📊 لوحة متابعة الصيانة" في `doc/docs_viewer.html`.
- **التشغيل اليومي:** تأكد من تشغيل السكريبتات التالية يوميًا (يمكن أتمتتها عبر مجدول المهام):
  - `node scripts/daily_boot_generator.js` (لتوليد `DAILY_BOOT.md` وتحديث `TEAM_SYNC.md` وتهيئة تتبع التقدم).
  - `node scripts/generate_dashboard_data.js` (لتوليد بيانات لوحة التحكم).

---

## 📄 الترخيص

> المشروع مرخص تحت [MIT License](https://github.com/azizsaif899/g-assistant/blob/master/LICENSE)

---

## 🎉 جاهز للبرمجة

> إذا قرأت هذه الوثيقة بالكامل، فأنت جاهز للمساهمة بثقة في AzizSys.  
> الكود النظيف يبدأ من هنا.
