"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncManager = exports.SyncManager = void 0;
const websocket_client_1 = require("./websocket-client");
class SyncManager {
    constructor() {
        this.pendingChanges = new Map();
        this.conflictHandlers = new Map();
        this.syncListeners = new Map();
        this.setupWebSocketListeners();
    }
    setupWebSocketListeners() {
        websocket_client_1.wsClient.subscribe('sync.event', (event) => {
            this.handleRemoteSync(event);
        });
        websocket_client_1.wsClient.subscribe('sync.conflict', (conflict) => {
            this.handleConflict(conflict);
        });
    }
    async syncChange(event) {
        const syncEvent = {
            ...event,
            id: `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date()
        };
        // إضافة للتغييرات المعلقة
        this.pendingChanges.set(syncEvent.id, syncEvent);
        try {
            // إرسال عبر WebSocket
            websocket_client_1.wsClient.send({
                type: 'sync.event',
                data: syncEvent
            });
            // إشعار المستمعين المحليين
            this.notifyListeners(syncEvent);
        }
        catch (error) {
            console.error('Failed to sync change:', error);
            // الاحتفاظ بالتغيير للمحاولة لاحقاً
        }
    }
    async handleRemoteSync(event) {
        // تجاهل التغييرات من نفس المستخدم
        if (event.userId === this.getCurrentUserId()) {
            return;
        }
        // التحقق من وجود تعارض
        const localChange = this.findConflictingChange(event);
        if (localChange) {
            await this.resolveConflict(localChange, event);
            return;
        }
        // تطبيق التغيير
        this.applyRemoteChange(event);
        this.notifyListeners(event);
    }
    findConflictingChange(remoteEvent) {
        for (const [id, localEvent] of this.pendingChanges) {
            if (localEvent.entity === remoteEvent.entity &&
                localEvent.entityId === remoteEvent.entityId &&
                localEvent.timestamp > remoteEvent.timestamp) {
                return localEvent;
            }
        }
        return null;
    }
    async resolveConflict(local, remote) {
        const resolution = this.conflictHandlers.get(local.entity) || {
            strategy: 'last-write-wins'
        };
        switch (resolution.strategy) {
            case 'last-write-wins':
                if (local.timestamp > remote.timestamp) {
                    // الاحتفاظ بالتغيير المحلي
                    return;
                }
                else {
                    // تطبيق التغيير البعيد
                    this.applyRemoteChange(remote);
                }
                break;
            case 'merge':
                if (resolution.resolver) {
                    const merged = resolution.resolver(local.data, remote.data);
                    const mergedEvent = {
                        ...local,
                        data: merged,
                        timestamp: new Date()
                    };
                    this.applyRemoteChange(mergedEvent);
                }
                break;
            case 'manual':
                // إشعار المستخدم بالتعارض
                this.notifyConflict(local, remote);
                break;
        }
    }
    applyRemoteChange(event) {
        // تطبيق التغيير على البيانات المحلية
        console.log('Applying remote change:', event);
        // هنا سيتم تطبيق التغيير على الحالة المحلية
        // مثل تحديث React Query cache أو Redux store
    }
    notifyListeners(event) {
        const listeners = this.syncListeners.get(event.entity) || [];
        listeners.forEach(listener => {
            try {
                listener(event);
            }
            catch (error) {
                console.error('Error in sync listener:', error);
            }
        });
    }
    notifyConflict(local, remote) {
        // إشعار المستخدم بوجود تعارض
        console.warn('Sync conflict detected:', { local, remote });
        // يمكن إظهار modal للمستخدم لحل التعارض يدوياً
    }
    subscribeToEntity(entity, listener) {
        if (!this.syncListeners.has(entity)) {
            this.syncListeners.set(entity, []);
        }
        this.syncListeners.get(entity).push(listener);
        return () => {
            const listeners = this.syncListeners.get(entity);
            if (listeners) {
                const index = listeners.indexOf(listener);
                if (index > -1) {
                    listeners.splice(index, 1);
                }
            }
        };
    }
    setConflictResolution(entity, resolution) {
        this.conflictHandlers.set(entity, resolution);
    }
    getCurrentUserId() {
        // الحصول على معرف المستخدم الحالي
        return 'current_user_id'; // يجب استبداله بالمعرف الفعلي
    }
    getPendingChanges() {
        return Array.from(this.pendingChanges.values());
    }
    clearPendingChanges() {
        this.pendingChanges.clear();
    }
}
exports.SyncManager = SyncManager;
exports.syncManager = new SyncManager();
//# sourceMappingURL=sync-manager.js.map