/**
 * EventBus - نظام الأحداث المركزي
 * يربط بين جميع مكونات النظام (Gemini AI, Amazon Q, Dashboard, Scripts)
 */

class EventBus {
    constructor() {
        this.events = {};
        this.history = [];
        this.maxHistory = 100;
        this.isActive = true;
        
        console.log('🚀 EventBus initialized');
        this.setupDefaultHandlers();
    }

    /**
     * الاستماع لحدث معين
     */
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
        console.log(`📡 EventBus: Registered listener for '${eventName}'`);
    }

    /**
     * إرسال حدث
     */
    emit(eventName, data = {}) {
        if (!this.isActive) return;

        const event = {
            name: eventName,
            data: data,
            timestamp: new Date().toISOString(),
            id: this.generateEventId()
        };

        // حفظ في التاريخ
        this.addToHistory(event);

        // إرسال للمستمعين
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                try {
                    callback(event);
                } catch (error) {
                    console.error(`❌ EventBus: Error in listener for '${eventName}':`, error);
                }
            });
        }

        console.log(`📤 EventBus: Emitted '${eventName}'`, data);
        return event;
    }

    /**
     * إرسال حدث مرة واحدة فقط
     */
    once(eventName, callback) {
        const onceWrapper = (event) => {
            callback(event);
            this.off(eventName, onceWrapper);
        };
        this.on(eventName, onceWrapper);
    }

    /**
     * إلغاء الاستماع
     */
    off(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
        }
    }

    /**
     * إعداد المعالجات الافتراضية
     */
    setupDefaultHandlers() {
        // معالج أحداث النظام
        this.on('system:start', (event) => {
            console.log('🚀 System starting...', event.data);
        });

        this.on('system:stop', (event) => {
            console.log('🛑 System stopping...', event.data);
        });

        // معالج أحداث المهام
        this.on('task:assigned', (event) => {
            console.log('📋 Task assigned:', event.data.taskId);
        });

        this.on('task:completed', (event) => {
            console.log('✅ Task completed:', event.data.taskId);
        });

        this.on('task:failed', (event) => {
            console.error('❌ Task failed:', event.data.taskId, event.data.error);
        });

        // معالج أحداث الذكاء الاصطناعي
        this.on('ai:gemini:active', (event) => {
            console.log('🧠 Gemini AI activated');
        });

        this.on('ai:amazonq:active', (event) => {
            console.log('⚡ Amazon Q activated');
        });

        // معالج أحداث الأخطاء
        this.on('error:critical', (event) => {
            console.error('🚨 Critical error:', event.data);
        });
    }

    /**
     * إضافة حدث للتاريخ
     */
    addToHistory(event) {
        this.history.unshift(event);
        if (this.history.length > this.maxHistory) {
            this.history = this.history.slice(0, this.maxHistory);
        }
    }

    /**
     * الحصول على تاريخ الأحداث
     */
    getHistory(limit = 20) {
        return this.history.slice(0, limit);
    }

    /**
     * إنشاء معرف فريد للحدث
     */
    generateEventId() {
        return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * الحصول على إحصائيات EventBus
     */
    getStats() {
        const eventTypes = Object.keys(this.events);
        const totalListeners = eventTypes.reduce((sum, type) => sum + this.events[type].length, 0);
        
        return {
            isActive: this.isActive,
            eventTypes: eventTypes.length,
            totalListeners: totalListeners,
            historySize: this.history.length,
            recentEvents: this.getHistory(5)
        };
    }

    /**
     * تفعيل/إلغاء تفعيل EventBus
     */
    setActive(active) {
        this.isActive = active;
        console.log(`📡 EventBus: ${active ? 'Activated' : 'Deactivated'}`);
    }

    /**
     * مسح جميع المستمعين
     */
    clear() {
        this.events = {};
        console.log('🧹 EventBus: All listeners cleared');
    }

    /**
     * مسح التاريخ
     */
    clearHistory() {
        this.history = [];
        console.log('🧹 EventBus: History cleared');
    }
}

// إنشاء instance مشترك
const eventBus = new EventBus();

// تصدير للاستخدام في Node.js و Browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EventBus, eventBus };
} else {
    window.EventBus = EventBus;
    window.eventBus = eventBus;
}

// اختبار EventBus عند التحميل
if (typeof window !== 'undefined') {
    // في المتصفح - اختبار بسيط
    setTimeout(() => {
        eventBus.emit('system:test', { message: 'EventBus is working!' });
    }, 1000);
}