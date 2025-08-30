# 🎨 مخطط الواجهة الأمامية (Frontend Blueprint) - بناء الجيل الجديد لواجهة AzizSys

**الجمهور المستهدف:** فريق تطوير الواجهة الأمامية.
**الهدف:** توفير خارطة طريق واضحة لبناء واجهة مستخدم عصرية، عالية الأداء، وقابلة للتوسع باستخدام `Next.js`, `Tailwind CSS`, و `ShadCN UI`.

---

## 📜 الرؤية والمبادئ التوجيهية

نحن لا نقوم فقط بتحديث واجهة، بل نبني تجربة منصة متكاملة (Platform Experience). يجب أن تكون الواجهة الجديدة سريعة، سهلة الاستخدام، وتعكس قوة وقدرات نظام الذكاء الاصطناعي الذي تخدمه.

**المبادئ الأساسية التي يجب اتباعها:**

1.  **الهيكلية القائمة على المكونات (Component-Driven):** كل جزء في الواجهة هو مكون. فكر في بناء أجزاء صغيرة قابلة لإعادة الاستخدام.
2.  **فصل الاهتمامات (Separation of Concerns):** يجب فصل منطق عرض البيانات (UI) عن منطق جلب البيانات (Data Fetching) وعن منطق إدارة الحالة (State Management).
3.  **الأداء أولاً (Performance First):** استفد من قدرات Next.js (Server-Side Rendering) لضمان تحميل أولي سريع للصفحات.
4.  **الوصولية (Accessibility):** يجب أن يكون التطبيق قابلاً للاستخدام من قبل الجميع. ShadCN مبني على Radix UI، مما يوفر أساساً قوياً للوصولية، وعلينا الحفاظ عليه.
5.  **الكود النظيف:** اتبع الإرشادات الموجودة في المشروع لـ ESLint و Prettier للحفاظ على تناسق الكود.

---

## 🏗️ هيكل المشروع المقترح

للحفاظ على التنظيم داخل الـ Monorepo، سنقوم بإنشاء تطبيق Next.js جديد.

**1. إنشاء التطبيق:**
نفذ الأمر التالي في جذر المشروع لإنشاء تطبيق جديد:
`npx create-next-app@latest apps/web-platform`
*(اختر TypeScript, Tailwind CSS, App Router عند السؤال)*

**2. الهيكل المقترح للمجلدات داخل `apps/web-platform`:**

```
apps/web-platform/
├── app/                  # المجلد الرئيسي للمسارات (Routing) والصفحات
│   ├── (api)/            # مسارات API الخاصة بـ Next.js (e.g., for auth callbacks)
│   ├── (auth)/           # مجموعة مسارات المصادقة (login, register)
│   │   ├── login/page.tsx
│   │   └── layout.tsx
│   ├── (platform)/       # مجموعة المسارات المحمية بعد تسجيل الدخول
│   │   ├── dashboard/page.tsx
│   │   ├── workflows/page.tsx
│   │   └── layout.tsx      # الـ Layout الرئيسي للمنصة (مع الشريط الجانبي والعلوي)
│   └── layout.tsx        # الـ Layout الجذري للتطبيق
├── components/           # المكونات القابلة لإعادة الاستخدام
│   ├── ui/               # المكونات الأساسية التي يتم إنشاؤها بواسطة ShadCN (Button, Input, etc.)
│   ├── layout/           # مكونات الهيكل (Sidebar, Header, PageWrapper)
│   └── features/         # مكونات معقدة خاصة بميزة معينة (e.g., WorkflowDesigner, ChatPanel)
├── lib/                  # الأدوات المساعدة والمنطق المشترك
│   ├── api.ts            # نقطة الدخول لإعداد عميل الـ API (API Client)
│   ├── hooks/            # الـ Custom Hooks (e.g., useCurrentUser)
│   ├── utils.ts          # دوال مساعدة عامة
│   └── validators.ts     # مخططات التحقق من المدخلات (e.g., using Zod)
├── services/             # طبقة الاتصال بالخلفية (Backend Communication Layer)
│   ├── api/              # تعريفات أنواع الـ API (Types/Interfaces)
│   └── queries/          # استعلامات وتعديلات TanStack Query
│       ├── auth.ts
│       └── workflow.ts
└── public/               # الملفات الثابتة (صور، أيقونات)
```

---

## 🔗 آلية الربط مع الخلفية (Backend Integration)

هذا هو الجزء الأهم. يجب أن يتم بطريقة احترافية لضمان سهولة الصيانة.

**التقنية الموصى بها:** **TanStack Query (React Query)**. هذه المكتبة موجودة بالفعل في المشروع وهي الخيار الأمثل لإدارة حالة الخادم (Server State).

**خطة العمل:**

1.  **إعداد عميل API مركزي:**
    سنستخدم `axios` أو `fetch` ولكن سنقوم بإنشاء نسخة مخصصة (instance) تضيف تلقائياً `Authorization Header` لكل طلب.

    *   **الموقع:** `lib/api.ts`
    *   **مثال:**
        ```typescript
        import axios from 'axios';

        const apiClient = axios.create({
          baseURL: process.env.NEXT_PUBLIC_API_URL, // e.g., http://localhost:3333/api
        });

        // Interceptor لإضافة التوكن لكل طلب
        apiClient.interceptors.request.use(config => {
          const token = localStorage.getItem('authToken'); // أو من cookie
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        });

        export default apiClient;
        ```

2.  **إنشاء طبقة خدمات (Services Layer):**
    لا تقم باستدعاء `apiClient` مباشرة من المكونات. قم بإنشاء دوال خاصة في مجلد `services/` لكل عملية.

    *   **الموقع:** `services/queries/workflow.ts`
    *   **مثال:**
        ```typescript
        import { useQuery, useMutation } from '@tanstack/react-query';
        import apiClient from '@/lib/api';

        // نوع البيانات المتوقعة من الـ API
        interface Workflow {
          id: string;
          name: string;
        }

        // دالة لجلب البيانات
        const fetchWorkflows = async (): Promise<Workflow[]> => {
          const response = await apiClient.get('/workflows');
          return response.data;
        };

        // Hook مخصص لاستخدامه في المكونات
        export const useWorkflows = () => {
          return useQuery<Workflow[], Error>({
            queryKey: ['workflows'], // مفتاح التخزين المؤقت
            queryFn: fetchWorkflows,
          });
        };
        ```

3.  **استخدام الـ Hook في المكونات:**
    الآن، المكون يصبح نظيفاً جداً ومسؤوليته فقط عرض الواجهة.

    *   **الموقع:** `app/(platform)/workflows/page.tsx`
    *   **مثال:**
        ```typescript
        'use client';
        import { useWorkflows } from '@/services/queries/workflow';
        import { Button } from '@/components/ui/button'; // استيراد من ShadCN

        export default function WorkflowsPage() {
          const { data: workflows, isLoading, error } = useWorkflows();

          if (isLoading) return <div>Loading...</div>;
          if (error) return <div>Error: {error.message}</div>;

          return (
            <div>
              <h1>My Workflows</h1>
              <ul>
                {workflows?.map(wf => <li key={wf.id}>{wf.name}</li>)}
              </ul>
              <Button>Create New</Button>
            </div>
          );
        }
        ```

---

## ⚙️ آلية العمل مع ShadCN UI

ShadCN ليس مكتبة مكونات، بل هو مولّد كود. هذا يعني:

1.  **عندما تحتاج مكوناً (مثلاً `Card`):**
    *   نفذ الأمر: `npx shadcn-ui@latest add card`
2.  **ماذا يحدث؟**
    *   سيتم نسخ الكود المصدري لملف `card.tsx` إلى مجلد `components/ui`.
3.  **كيف تستخدمه؟**
    *   `import { Card, CardHeader, CardContent } from '@/components/ui/card';`
4.  **كيف تعدله؟**
    *   افتح الملف `components/ui/card.tsx` وقم بتعديل الكود مباشرة. إنه الآن جزء من مشروعك.

**هذه الطريقة تمنحنا قوة ومرونة لا مثيل لها في التخصيص.**

---

## 💡 تعليمات ختامية ومساهمات

*   **ابدأ بالمصادقة (Authentication):** أول مهمة يجب أن تكون بناء صفحات تسجيل الدخول والخروج، وتأمين الـ Token.
*   **استخدم Storybook (موصى به):** لتوثيق المكونات وتطويرها بشكل معزول، قم بإعداد Storybook للمشروع.
*   **التزم بالهيكلية:** الحفاظ على هيكل المشروع المقترح سيجعل الكود سهل الفهم والصيانة على المدى الطويل.
*   **التواصل هو المفتاح:** تواصل باستمرار مع فريق الخلفية (Backend) للاتفاق على أشكال البيانات (Data Contracts) للـ API.

هذا المخطط يوفر أساساً قوياً. باتباعه، سيتمكن الفريق من بناء واجهة أمامية احترافية، قابلة للتطوير، ومتكاملة بسلاسة مع قوة `AzizSys` الخلفية.
