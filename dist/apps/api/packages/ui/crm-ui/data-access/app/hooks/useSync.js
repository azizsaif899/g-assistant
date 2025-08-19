'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSync = useSync;
const react_1 = require("react");
const sync_manager_1 = require("../lib/sync-manager");
function useSync(entity) {
    const syncCreate = (0, react_1.useCallback)(async (entityId, data) => {
        await sync_manager_1.syncManager.syncChange({
            type: 'create',
            entity,
            entityId,
            data,
            userId: 'current_user' // يجب الحصول على المعرف الفعلي
        });
    }, [entity]);
    const syncUpdate = (0, react_1.useCallback)(async (entityId, data) => {
        await sync_manager_1.syncManager.syncChange({
            type: 'update',
            entity,
            entityId,
            data,
            userId: 'current_user'
        });
    }, [entity]);
    const syncDelete = (0, react_1.useCallback)(async (entityId) => {
        await sync_manager_1.syncManager.syncChange({
            type: 'delete',
            entity,
            entityId,
            data: null,
            userId: 'current_user'
        });
    }, [entity]);
    const subscribe = (0, react_1.useCallback)((listener) => {
        return sync_manager_1.syncManager.subscribeToEntity(entity, listener);
    }, [entity]);
    return {
        syncCreate,
        syncUpdate,
        syncDelete,
        subscribe
    };
}
//# sourceMappingURL=useSync.js.map