@echo off
chcp 65001 >nul
title 🎯 مركز التحكم الرئيسي - AzizSys
color 0B

cls
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                🎯 مركز التحكم الرئيسي                      ║
echo ║                      AzizSys Control Center                  ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo 🚀 بدء تشغيل مركز التحكم الرئيسي...
echo.

echo 📡 تشغيل الخادم المحلي...
start "Control Center Server" cmd /k "node server.js"

echo ⏳ انتظار تشغيل الخادم...
timeout /t 3 >nul

echo 🌐 فتح مركز التحكم في المتصفح...
start http://localhost:3001

echo.
echo ✅ تم تشغيل مركز التحكم الرئيسي بنجاح!
echo.
echo 📊 الروابط المتاحة:
echo    🎯 مركز التحكم الرئيسي: http://localhost:3001
echo    📋 لوحة التحكم الشاملة: http://localhost:3001/COMPREHENSIVE_DASHBOARD.html
echo    📊 التقارير: http://localhost:3001/reports/
echo.
echo 🔧 أوامر مفيدة:
echo    Ctrl+R - تحديث شامل
echo    Ctrl+S - تشغيل النظام التلقائي
echo    Ctrl+P - إيقاف مؤقت
echo.
echo 💡 نصيحة: اتركه يعمل في الخلفية لمراقبة مستمرة
echo.

pause