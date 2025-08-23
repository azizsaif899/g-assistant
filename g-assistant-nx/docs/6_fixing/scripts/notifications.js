#!/usr/bin/env node

console.log('🔔 Notifications System Starting...');
console.log('===================================');

const notifications = [
    '✅ تم إكمال مهمة بنجاح',
    '⚠️ تحذير: مهمة تحتاج انتباه',
    '🔧 بدء عملية صيانة تلقائية',
    '📊 تم تحديث التقارير',
    '🚀 النظام يعمل بكفاءة عالية'
];

function sendNotification() {
    const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
    const timestamp = new Date().toLocaleString('ar-SA');
    
    console.log(`🔔 [${timestamp}] ${randomNotification}`);
}

// إرسال إشعار كل 15 ثانية
setInterval(sendNotification, 15000);
sendNotification(); // إشعار فوري