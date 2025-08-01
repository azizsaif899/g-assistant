# 🛠️ AzizSys - دليل استكشاف الأخطاء وإصلاحها

هذا الدليل يساعد المطورين على تشخيص وحل المشاكل الشائعة التي قد تظهر في نظام AzizSys.

---

### 1. خطأ: `TypeError: Cannot read properties of undefined (reading '...')`

هذا هو الخطأ الأكثر شيوعًا، ويحدث عادةً عندما يتم استدعاء وحدة أو دالة قبل أن يتم تحميلها وتهيئتها بالكامل.

**الأسباب المحتملة:**

-   **ترتيب تحميل خاطئ:** ملف يعتمد على وحدة أخرى يتم تحميله قبلها.
-   **تبعية مفقودة:** لم يتم الإعلان عن تبعية بشكل صحيح في `module_manifest.json`.
-   **خطأ في اسم الوحدة:** خطأ إملائي في اسم الوحدة عند استدعائها أو في `module_manifest.json`.

**خطوات الحل:**

1.  **تحديث ترتيب التحميل:** قم بتشغيل السكربت الآلي لتصحيح ترتيب التحميل:
    ```bash
    node scripts/generatePushOrder.js
    ```
2.  **مراجعة `module_manifest.json`:** تأكد من أن الوحدة التي تسببت في الخطأ قد أعلنت عن جميع تبعياتها بشكل صحيح.
3.  **استخدام `ModuleVerifier`:** في بداية الدالة التي تسببت في الخطأ، أضف فحصًا دفاعيًا:
    ```javascript
    if (!ModuleVerifier.isReady('DependencyName')) {
      Utils.error('Critical dependency not ready!');
      return; // or throw error
    }
    ```
4.  **فحص النظام:** قم بتشغيل `reportModulesStatus()` من محرر Apps Script للحصول على تقرير فوري عن حالة الوحدات.

---

### 2. خطأ: `Injector: تعذر حل التبعية 'ModuleName'` أو `Dependency cycle detected`

يحدث هذا الخطأ عندما يفشل نظام حقن التبعيات في العثور على وحدة مطلوبة أو يكتشف حلقة تبعية.

**الأسباب المحتملة:**

-   **تبعية دائرية (Circular Dependency):** الوحدة `A` تعتمد على `B`، والوحدة `B` تعتمد على `A`.
-   **وحدة غير مسجلة:** الوحدة المطلوبة غير موجودة في `module_manifest.json`.

**خطوات الحل:**

1.  **اكتشاف الحلقات الدائرية:** يقوم السكربت `generatePushOrder.js` باكتشاف الحلقات الدائرية تلقائيًا. قم بتشغيله وانتبه لأي رسائل خطأ.
2.  **تحليل التبعيات:** راجع `module_manifest.json` بعناية. هل هناك تبعيات غير ضرورية يمكن إزالتها لكسر الحلقة؟
3.  **إعادة الهيكلة (Refactoring):** في بعض الحالات، قد تحتاج إلى إنشاء وحدة ثالثة `C` تحتوي على الوظائف المشتركة التي تحتاجها كل من `A` و `B` لكسر الحلقة.

---

### 3. مشكلة: الوكيل (Agent) لا يستجيب أو يتم استدعاء الوكيل الافتراضي دائمًا

**الأسباب المحتملة:**

-   **خطأ في التوجيه:** وحدة `Agents.Router` لا تعيد اسم الوكيل الصحيح.
-   **خطأ في الكتالوج:** الوكيل غير مسجل بشكل صحيح في `Agents.Catalog`.

**خطوات الحل:**

1.  **فحص `Agents.Router`:** تأكد من أن القواعد في `25_ai_agents/2_agents_router.js` تعيد أسماء الوكلاء الكاملة والصحيحة (e.g., `'DeveloperAgent'`, not `'developer'`).
2.  **فحص `Agents.Catalog`:** تأكد من أن الوكيل المطلوب مسجل في الخريطة داخل `25_ai_agents/agents_catalog.js`.
3.  **فحص `AgentDispatcher`:** راجع `20_ai/3_ai_dispatcher.js` للتأكد من أنه يستدعي `AgentsCatalog.getAgent()` بشكل صحيح ويتعامل مع الرد.