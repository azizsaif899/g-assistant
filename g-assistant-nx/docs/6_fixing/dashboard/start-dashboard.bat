@echo off
echo 🚀 تشغيل لوحة تحكم الإصلاح الذاتي
echo ================================

cd /d "%~dp0"

echo 📊 بدء خادم لوحة التحكم...
echo.
echo 🌐 ستفتح لوحة التحكم على: http://localhost:3000
echo 📁 التقارير متاحة على: http://localhost:3000/reports/
echo.
echo 💡 لإيقاف الخادم اضغط Ctrl+C
echo.

node server.js

pause