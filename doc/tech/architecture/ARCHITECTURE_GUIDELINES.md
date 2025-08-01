# إرشادات معمارية لمشروع G-Assistant

تهدف هذه الوثيقة إلى توفير مجموعة من أفضل الممارسات والإرشادات للحفاظ على بنية برمجية نظيفة وقابلة للصيانة والتوسع في مشروع G-Assistant.

---

## التعامل مع التبعيات الدائرية (Circular Dependencies)

نظام حقن التبعيات (`Injector`) في المشروع مزود بآلية لاكتشاف التبعيات الدائرية ورمي خطأ واضح لمنع المشاكل الصامتة. ومع ذلك، فإن ظهور هذا الخطأ هو عرض لمشكلة في التصميم المعماري. يجب على المطورين تجنب هذه الحلقات من الأساس باتباع الاستراتيجيات التالية:

### 1. مبدأ انعكاس التبعية (Dependency Inversion Principle)

بدلاً من أن تعتمد الوحدات عالية المستوى على الوحدات منخفضة المستوى مباشرة، يجب أن يعتمد كلاهما على "تجريد" (Abstraction).

*   **السيناريو الخاطئ:** `AI.Core` (عالي المستوى) يستدعي `Tools.Developer` (منخفض المستوى) مباشرة، و `Tools.Developer` يستدعي `AI.Core`.
*   **الحل الصحيح:**
    1.  `AI.Core` لا يعرف شيئًا عن `Tools.Developer`. بدلاً من ذلك، هو يعتمد على `Tools.Catalog` (كتالوج الأدوات) كواجهة مجردة.
    2.  `Tools.Developer` يسجل قدراته في `Tools.Catalog`.
    3.  عندما يحتاج `AI.Core` لتنفيذ أداة، فإنه يطلبها من `Tools.Catalog` دون أن يعرف من الذي قام بتنفيذها.

هذا النمط مطبق بالفعل في المشروع وهو الطريقة المفضلة لكسر الحلقات.

### 2. إعادة الهيكلة وتقسيم الوحدات (Refactoring & Splitting Modules)

إذا وجدت وحدتين تعتمدان على بعضهما البعض بشكل كبير، فهذا قد يعني أحد أمرين:
*   **مسؤوليات متداخلة:** ربما يجب دمجهما في وحدة واحدة لأن مسؤولياتهما غير منفصلة بشكل جيد.
*   **وجود مسؤولية ثالثة مشتركة:** قد يكون هناك منطق مشترك بينهما يمكن استخراجه في وحدة ثالثة جديدة ومستقلة، وتعتمد الوحدتان الأصليتان على هذه الوحدة الجديدة.

**مثال:** إذا كان `Config` يحتاج إلى `DocsManager` لتوثيق نفسه، و`DocsManager` يحتاج إلى `Config` للحصول على إعدادات، يمكن حل هذا عبر:
*   **دالة تهيئة خارجية (Initializer):** يتم تحميل الوحدتين بشكل مستقل، ثم تقوم دالة خارجية (مثل `_initializeGAssistantSystem`) باستدعاء `DocsManager.registerConfigDocs()` بعد التأكد من أن كلاهما جاهز. (هذا هو الحل المطبق حاليًا في المشروع وهو فعال جدًا).

### 3. استخدام الاتصال القائم على الأحداث (Event-Based Communication)

في الحالات المعقدة، بدلاً من أن تستدعي وحدةٌ وحدةً أخرى مباشرة، يمكنها إصدار "حدث" (Event). يمكن للوحدات الأخرى المهتمة بهذا الحدث "الاستماع" له والاستجابة وفقًا لذلك.

*   **مثال:** بدلاً من أن يستدعي `UI` وحدة `AI` مباشرة، يمكن لـ `UI` أن يطلق حدثًا مثل `user_submitted_prompt` مع البيانات. تستمع وحدة `AI` لهذا الحدث وتقوم بالمعالجة.
*   **الفائدة:** هذا يزيل الاعتماد المباشر تمامًا، مما يجعل الوحدات معزولة وقابلة للاستبدال.

---

### خلاصة

1.  **الأولوية الأولى:** استخدم نمط "الكتالوج" أو "السجل" (مثل `Tools.Catalog` و `Agents.Catalog`) كوسيط مجرد.
2.  **الأولوية الثانية:** إذا لم يكن نمط الكتالوج مناسبًا، فكر في استخراج منطق مشترك أو استخدام دالة تهيئة خارجية.
3.  **للحالات المتقدمة:** يمكن النظر في نظام أحداث بسيط لفك الارتباط الكامل.

باتباع هذه الإرشادات، يمكننا ضمان بقاء المشروع منظمًا وسهل التطوير على المدى الطويل.