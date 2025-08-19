'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBulkActions = useBulkActions;
const react_1 = require("react");
function useBulkActions() {
    const [selectedItems, setSelectedItems] = (0, react_1.useState)(new Set());
    const [isExecuting, setIsExecuting] = (0, react_1.useState)(false);
    const [showConfirmation, setShowConfirmation] = (0, react_1.useState)(false);
    const [pendingAction, setPendingAction] = (0, react_1.useState)(null);
    const toggleSelection = (0, react_1.useCallback)((id) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            }
            else {
                newSet.add(id);
            }
            return newSet;
        });
    }, []);
    const selectAll = (0, react_1.useCallback)((ids) => {
        setSelectedItems(new Set(ids));
    }, []);
    const clearSelection = (0, react_1.useCallback)(() => {
        setSelectedItems(new Set());
    }, []);
    const executeAction = (0, react_1.useCallback)(async (action) => {
        if (selectedItems.size === 0)
            return;
        if (action.requiresConfirmation) {
            setPendingAction(action);
            setShowConfirmation(true);
            return;
        }
        setIsExecuting(true);
        try {
            await action.execute(Array.from(selectedItems));
            clearSelection();
        }
        catch (error) {
            console.error('Bulk action failed:', error);
        }
        finally {
            setIsExecuting(false);
        }
    }, [selectedItems, clearSelection]);
    const confirmAction = (0, react_1.useCallback)(async () => {
        if (!pendingAction)
            return;
        setShowConfirmation(false);
        setIsExecuting(true);
        try {
            await pendingAction.execute(Array.from(selectedItems));
            clearSelection();
        }
        catch (error) {
            console.error('Bulk action failed:', error);
        }
        finally {
            setIsExecuting(false);
            setPendingAction(null);
        }
    }, [pendingAction, selectedItems, clearSelection]);
    const cancelAction = (0, react_1.useCallback)(() => {
        setShowConfirmation(false);
        setPendingAction(null);
    }, []);
    return {
        selectedItems,
        selectedCount: selectedItems.size,
        isExecuting,
        showConfirmation,
        pendingAction,
        toggleSelection,
        selectAll,
        clearSelection,
        executeAction,
        confirmAction,
        cancelAction,
        isSelected: (id) => selectedItems.has(id)
    };
}
//# sourceMappingURL=useBulkActions.js.map