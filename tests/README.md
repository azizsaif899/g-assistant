# 🧪 دليل اختبارات خطة أكتوبر

## 📋 نظرة عامة

هذا المجلد يحتوي على مجموعة شاملة من الاختبارات لخطة أكتوبر (الأسبوعين 1+2) لمشروع AzizSys.

## 📁 الملفات

### 🎯 الاختبارات الأساسية
- **`test_october_integration.js`** - اختبار التكامل الشامل
- **`performance_benchmark.js`** - قياس الأداء المتقدم
- **`run_october_tests.bat`** - سكريبت التشغيل التلقائي

### ⚙️ الإعدادات
- **`test_config.json`** - إعدادات الاختبار
- **`README.md`** - هذا الدليل

## 🚀 كيفية التشغيل

### التشغيل السريع
```bash
# تشغيل جميع الاختبارات
run_october_tests.bat

# أو يدوياً
node test_october_integration.js
```

### قياس الأداء
```bash
node performance_benchmark.js
```

## 📊 ما يتم اختباره

### 🔧 الأسبوع الأول (API Gateway)
- ✅ Health Check
- ✅ Security Middleware (API Key validation)
- ✅ Rate Limiting
- ✅ API Gateway functionality
- ✅ Error handling

### 🧠 الأسبوع الثاني (GenAI Processors)
- ✅ Health Check
- ✅ Invoice Processing
- ✅ Metrics Collection
- ✅ Redis Cache integration
- ✅ Performance monitoring

### 🔗 التكامل الشامل
- ✅ Full workflow (Week1 → Week2)
- ✅ Performance under load
- ✅ Cache efficiency
- ✅ Error recovery
- ✅ Resource usage

## 📈 مؤشرات النجاح

### 🎯 الأهداف المطلوبة
- **Response Time**: < 500ms
- **Success Rate**: > 99%
- **Cache Hit Rate**: > 65%
- **Memory Usage**: < 512MB
- **Security**: 100% unauthorized requests blocked

### 📊 معايير التقييم
- **90%+ نجاح**: 🎉 ممتاز - جاهز للإنتاج
- **70-89% نجاح**: ⚠️ جيد - يحتاج تحسينات
- **< 70% نجاح**: ❌ يحتاج مراجعة شاملة

## 🛠️ المتطلبات

### البرمجيات المطلوبة
- Node.js (v14+)
- npm
- الخوادم المحلية للأسبوعين 1 و 2

### المكتبات
```bash
npm install axios
```

### الخوادم المطلوبة
- **Week 1 Server**: `localhost:8080`
- **Week 2 Server**: `localhost:3000`

## 🔧 إعداد البيئة

### 1. تشغيل خادم الأسبوع الأول
```bash
cd october_implementation/week1_poc
node server.js
```

### 2. تشغيل خادم الأسبوع الثاني
```bash
cd october_implementation/week2_processor
node server.js
```

### 3. تشغيل الاختبارات
```bash
cd tests
node test_october_integration.js
```

## 📋 نتائج الاختبار

### تقرير مفصل
يتم إنشاء تقرير مفصل يتضمن:
- ✅ عدد الاختبارات الناجحة/الفاشلة
- ⏱️ أزمنة الاستجابة
- 📊 معدلات النجاح
- 🎯 التقييم الإجمالي

### ملفات التقرير
- **Console Output**: نتائج مباشرة
- **JSON Reports**: تقارير مفصلة للأداء
- **Error Logs**: سجلات الأخطاء

## 🐛 استكشاف الأخطاء

### مشاكل شائعة

#### خطأ الاتصال
```
❌ ECONNREFUSED
```
**الحل**: تأكد من تشغيل الخوادم على المنافذ الصحيحة

#### خطأ المصادقة
```
❌ 401 Unauthorized
```
**الحل**: تحقق من API Key في `test_config.json`

#### خطأ المهلة الزمنية
```
❌ Timeout
```
**الحل**: زيادة قيمة timeout أو تحسين أداء الخادم

### أوامر التشخيص
```bash
# فحص المنافذ
netstat -an | findstr :8080
netstat -an | findstr :3000

# فحص العمليات
tasklist | findstr node.exe

# إيقاف العمليات
taskkill /f /im node.exe
```

## 📞 الدعم

في حالة وجود مشاكل:
1. تحقق من سجلات الخوادم
2. راجع ملف `test_config.json`
3. تأكد من تثبيت جميع المتطلبات
4. راجع التوثيق في `documentation/`

## 🎯 الخطوات التالية

بعد نجاح الاختبارات:
1. **الأسبوع 3**: تشغيل نماذج Gemma المحلية
2. **الأسبوع 4**: تحسين الأداء والتكلفة
3. **النشر النهائي**: إعداد الإنتاج

---

**📅 آخر تحديث**: ${new Date().toLocaleDateString('ar-SA')}  
**🔧 الإصدار**: October Plan v1.0  
**✅ الحالة**: جاهز للاختبار