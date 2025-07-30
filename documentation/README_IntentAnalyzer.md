# System.IntentAnalyzer - محلل النوايا المتقدم

**الحالة**: 🟡 Beta  
**الإصدار**: 1.0.0

## الهدف
تحليل نوايا المستخدم باستخدام Few-shot learning لتوجيه الطلبات للوكيل المناسب.

## كيفية الاستخدام

```javascript
const analyzer = injector.get('System.IntentAnalyzer');

const analysis = await analyzer.analyzeIntent(
  "أريد تحليل البيانات المالية",
  { currentSheet: "الميزانية" }
);
```

## مثال توضيحي

```javascript
// تحليل النية مع السياق
const result = await analyzer.analyzeIntent(
  "راجع هذا الكود وأخبرني عن المشاكل",
  { 
    activeCell: "B5",
    hasCode: true 
  }
);

console.log(result);
// {
//   agent: "Developer",
//   confidence: 0.92,
//   reasoning: "مراجعة وتحليل كود"
// }
```

## الوكلاء المدعومون
- `CFO` - التحليل المالي والتقارير
- `Developer` - مراجعة الكود والبرمجة  
- `DatabaseManager` - إدارة البيانات
- `General` - الاستفسارات العامة

## ميزات متقدمة
- Few-shot prompts مع أمثلة واقعية
- إخراج JSON منظم
- تعلم تدريجي من التفاعلات
- احتياطي ذكي عند الفشل
- إحصائيات الاستخدام