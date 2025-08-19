# 🎨 AzizSys Admin Dashboard - دليل الصيانة الشامل

## 📋 نظرة عامة
Dashboard متكامل لإدارة ومراقبة نظام AzizSys AI Assistant مع وكيل الرقيب والذكاء الاصطناعي.

## 🚀 طريقة التشغيل

### التشغيل السريع
```bash
cd E:\azizsys5\g-assistant-nx\apps\admin-dashboard
SIMPLE_START.bat
```

### التشغيل المتقدم
```bash
cd E:\azizsys5\g-assistant-nx\apps\admin-dashboard
OPEN_DASHBOARDS.bat
```

## 📁 هيكل الملفات

### الملفات الرئيسية
```
apps/admin-dashboard/
├── AzizSys Developer Dashboard.html    # الملف الرئيسي
├── src/integration/api-bridge.js       # جسر API للاتصال الحقيقي
├── src/styles/dashboard.css           # ملف التصميم
├── README.md                          # هذا الملف
├── test-dashboard.js                  # ملف الاختبارات
├── SIMPLE_START.bat                   # تشغيل بسيط
├── OPEN_DASHBOARDS.bat               # تشغيل متقدم
├── LAUNCH_REAL_DASHBOARD.bat         # تشغيل النظام الكامل
└── QUICK_START.bat                   # تشغيل سريع
```

### الملفات المرتبطة
```
docs/6_fixing/reports/
└── central_dashboard.json            # تقارير النظام المركزية
```

## 🎛️ التبويبات والوظائف

### التبويبات العلوية
| التبويب | الدالة | الوظيفة |
|---------|--------|---------|
| 📊 نظرة عامة | `showTab('overview')` | عرض حالة النظام العامة |
| 🎛️ لوحة الإصلاح | `showTab('dashboard')` | إدارة المهام والإصلاحات |
| 🛡️ وكيل الرقيب | `showTab('compliance')` | مراقبة الامتثال والأمان |
| ⚙️ الخدمات | `showTab('services')` | إدارة الخدمات |
| 📋 السجلات | `showTab('logs')` | عرض سجلات النظام |
| 🔗 API | `showTab('api')` | إدارة واختبار API |
| 🗄️ قاعدة البيانات | `showTab('database')` | إدارة قاعدة البيانات |
| 💻 Terminal | `showTab('terminal')` | محاكي Terminal |

### الأزرار الجانبية
| الزر | الدالة | الوظيفة |
|-----|-------|---------|
| 🛡️ تشغيل وكيل الرقيب | `runComplianceAudit()` | فحص الامتثال الشامل |
| 🔄 إعادة تشغيل الخدمات | `restartServices()` | إعادة تشغيل جميع الخدمات |
| 🗑️ مسح السجلات | `clearLogs()` | مسح سجلات النظام |
| 🧪 تشغيل الاختبارات | `runTests()` | تشغيل اختبارات النظام |
| 🚀 نشر النظام | `deploySystem()` | نشر النظام للإنتاج |
| 🏠 واجهة العميل | `openClientInterface()` | فتح واجهة العميل |
| 🏥 Health Check | `checkHealth()` | فحص صحة النظام |
| 📡 API Server | `openAPIServer()` | فتح خادم API |
| 🎛️ لوحة الإصلاح | `openFixingDashboard()` | فتح لوحة الإصلاح |

## 🔧 الدوال الأساسية

### دوال التنقل
```javascript
showTab(tabName)                    // عرض تبويب معين
```

### دوال الذكاء الاصطناعي
```javascript
askAI(question)                     // سؤال Gemini AI
sendAIMessage()                     // إرسال رسالة للـ AI
getAIResponse(message)              // الحصول على رد من AI
addAIMessage(text, sender, type)    // إضافة رسالة AI
```

### دوال النظام
```javascript
updateSystemMetrics()               // تحديث مقاييس النظام
updateOverviewData()                // تحديث بيانات النظرة العامة
updateDashboardData()               // تحديث بيانات لوحة الإصلاح
updateServicesStatus()              // تحديث حالة الخدمات
addLogEntry(type, message)          // إضافة سجل جديد
updateLogs()                        // تحديث السجلات
```

### دوال وكيل الرقيب
```javascript
runComplianceAudit()                // تشغيل فحص الامتثال
quickComplianceCheck()              // فحص سريع
displayComplianceResults(result)    // عرض نتائج الفحص
viewComplianceReport()              // عرض تقرير الامتثال
refreshComplianceData()             // تحديث بيانات الامتثال
```

### دوال الخدمات
```javascript
restartServices()                   // إعادة تشغيل الخدمات
runTests()                          // تشغيل الاختبارات
deploySystem()                      // نشر النظام
clearLogs()                         // مسح السجلات
```

### دوال API
```javascript
testAPI(endpoint)                   // اختبار endpoint معين
checkHealth()                       // فحص صحة النظام
openClientInterface()               // فتح واجهة العميل
openAPIServer()                     // فتح خادم API
openFixingDashboard()               // فتح لوحة الإصلاح
```

## 🌐 الروابط والمنافذ

### الخدمات الأساسية
- **Dashboard**: `file:///.../AzizSys Developer Dashboard.html`
- **API Server**: `http://localhost:3333`
- **Web Chatbot**: `http://localhost:3000`
- **Gemini Backend**: `http://localhost:8000`

### API Endpoints
```
GET  /health                        # فحص صحة النظام
GET  /api/docs                      # توثيق API
GET  /ai/models                     # نماذج الذكاء الاصطناعي
POST /odoo-webhook                  # webhook لـ Odoo
POST /api/system/restart            # إعادة تشغيل النظام
POST /api/system/test               # تشغيل الاختبارات
POST /api/system/deploy             # نشر النظام
POST /api/compliance/run            # تشغيل وكيل الرقيب
GET  /compliance/health             # حالة وكيل الرقيب
```

## 🔄 التحديثات التلقائية

### المؤقتات النشطة
```javascript
setInterval(updateSystemMetrics, 5000);     // كل 5 ثوانٍ
setInterval(refreshComplianceData, 30000);  // كل 30 ثانية
setInterval(updateLogs, 10000);             // كل 10 ثوانٍ
```

## 🛠️ الصيانة

### فحص الملفات المطلوبة
```bash
# التحقق من وجود الملفات
ls -la AzizSys\ Developer\ Dashboard.html
ls -la src/integration/api-bridge.js
ls -la ../docs/6_fixing/reports/central_dashboard.json
```

### إعادة تشغيل الخدمات
```bash
# من مجلد المشروع الرئيسي
cd E:\azizsys5\g-assistant-nx

# تشغيل الخدمات
npm run dev:api                     # API Server
npm run dev:web-chatbot             # Web Chatbot
npm run dev:admin-dashboard         # Admin Dashboard
```

### تشخيص المشاكل
```bash
# فحص المنافذ
netstat -an | findstr :3000
netstat -an | findstr :3333
netstat -an | findstr :8000

# فحص العمليات
tasklist | findstr node
tasklist | findstr python
```

## 🧪 الاختبارات

### تشغيل الاختبارات
```bash
node test-dashboard.js
```

### اختبارات يدوية
1. **فتح Dashboard** - تأكد من فتح الملف بنجاح
2. **التنقل بين التبويبات** - اختبر جميع التبويبات
3. **الأزرار الجانبية** - اختبر جميع الأزرار
4. **Gemini AI** - اختبر المحادثة
5. **وكيل الرقيب** - اختبر الفحص
6. **السجلات** - تأكد من التحديث التلقائي

## ⚠️ المشاكل الشائعة

### المشكلة: الأزرار لا تعمل
**الحل**: تأكد من وجود `return false;` في onclick

### المشكلة: البيانات لا تتحدث
**الحل**: تحقق من وجود ملف `central_dashboard.json`

### المشكلة: API لا يستجيب
**الحل**: تأكد من تشغيل الخدمات على المنافذ الصحيحة

### المشكلة: وكيل الرقيب لا يعمل
**الحل**: تحقق من دالة `runComplianceAudit()`

## 📊 مراقبة الأداء

### المقاييس المهمة
- **استجابة Dashboard**: < 2 ثانية
- **تحديث البيانات**: كل 5-30 ثانية
- **استهلاك الذاكرة**: < 100MB
- **حجم السجلات**: < 50 سجل

## 🔐 الأمان

### نقاط الأمان
- جميع API calls محمية بـ try-catch
- لا توجد credentials مكشوفة
- التحقق من صحة البيانات
- حماية من XSS في السجلات

## 📝 سجل التغييرات

### الإصدار الحالي
- ✅ إصلاح جميع الأزرار
- ✅ بيانات حقيقية بدلاً من وهمية
- ✅ تحديث تلقائي للسجلات
- ✅ وكيل الرقيب يعمل محلياً
- ✅ لوحة إصلاح متكاملة

## 🆘 الدعم

### للمساعدة
1. تحقق من هذا الملف أولاً
2. شغل `test-dashboard.js`
3. راجع السجلات في التبويب المخصص
4. تحقق من console المتصفح (F12)

---

**📅 آخر تحديث**: 2025-08-19  
**👨‍💻 المطور**: AzizSys Team  
**📧 الدعم**: راجع السجلات والاختبارات أولاً