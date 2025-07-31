@echo off
title AzizSys - اختبار خطة أكتوبر السريع
color 0A

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║                    🚀 AzizSys October Tests                  ║
echo  ║                   اختبار خطة أكتوبر السريع                   ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

:: التحقق من Node.js
echo 🔍 التحقق من البيئة...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js غير مثبت. يرجى تثبيت Node.js أولاً
    pause
    exit /b 1
)

:: التحقق من axios
echo 📦 التحقق من المكتبات...
if not exist node_modules\axios (
    echo 📥 تثبيت axios...
    npm install axios --no-save
    if errorlevel 1 (
        echo ❌ فشل تثبيت axios
        pause
        exit /b 1
    )
)

:: تشغيل الاختبار السريع
echo.
echo 🧪 تشغيل اختبار التكامل...
echo ────────────────────────────────────────

cd tests
node test_october_integration.js

if errorlevel 1 (
    echo.
    echo ❌ فشل الاختبار
    echo 💡 تأكد من تشغيل خوادم الأسبوعين 1 و 2
    echo.
    echo للتشغيل الكامل مع الخوادم:
    echo   tests\run_october_tests.bat
) else (
    echo.
    echo ✅ نجح الاختبار!
    echo 🎉 النظام جاهز للمرحلة التالية
)

echo.
echo 📊 لقياس الأداء المتقدم:
echo   npm run test:performance
echo.
pause