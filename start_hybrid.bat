@echo off
chcp 65001 >nul
echo ========================================
echo تشغيل النظام الهجين - AzizSys Enhanced
echo ========================================

echo [1/3] بدء خدمة Node.js...
cd external_service
start /B node server.js
echo ✅ تم تشغيل الخدمة على المنفذ 4000

echo.
echo [2/3] انتظار تهيئة الخدمة...
timeout /t 3 /nobreak >nul

echo.
echo [3/3] اختبار الاتصال...
curl -s http://localhost:4000/health >nul 2>&1
if %errorlevel%==0 (
    echo ✅ الخدمة تعمل بنجاح!
) else (
    echo ⚠️ تحذير: قد تحتاج لتثبيت curl أو فحص الخدمة يدوياً
)

echo.
echo ========================================
echo 🚀 النظام الهجين جاهز!
echo ========================================
echo 📡 خدمة Node.js: http://localhost:4000
echo 📊 Google Sheets: افتح المشروع واختبر الواجهة
echo 🔧 لإيقاف الخدمة: Ctrl+C في نافذة منفصلة
echo ========================================

cd ..
pause