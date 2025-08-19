'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemHotkeys = void 0;
exports.useHotkeys = useHotkeys;
const react_1 = require("react");
function useHotkeys(hotkeys, enabled = true) {
    const handleKeyDown = (0, react_1.useCallback)((event) => {
        if (!enabled)
            return;
        const matchingHotkey = hotkeys.find(hotkey => {
            return (hotkey.key.toLowerCase() === event.key.toLowerCase() &&
                !!hotkey.ctrlKey === event.ctrlKey &&
                !!hotkey.altKey === event.altKey &&
                !!hotkey.shiftKey === event.shiftKey &&
                !!hotkey.metaKey === event.metaKey);
        });
        if (matchingHotkey) {
            event.preventDefault();
            matchingHotkey.action();
        }
    }, [hotkeys, enabled]);
    (0, react_1.useEffect)(() => {
        if (enabled) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyDown, enabled]);
    const formatHotkey = (0, react_1.useCallback)((hotkey) => {
        const parts = [];
        if (hotkey.ctrlKey)
            parts.push('Ctrl');
        if (hotkey.altKey)
            parts.push('Alt');
        if (hotkey.shiftKey)
            parts.push('Shift');
        if (hotkey.metaKey)
            parts.push('Cmd');
        parts.push(hotkey.key.toUpperCase());
        return parts.join(' + ');
    }, []);
    return { formatHotkey };
}
// اختصارات النظام الأساسية
exports.systemHotkeys = [
    {
        key: 'k',
        ctrlKey: true,
        action: () => console.log('Open command bar'),
        description: 'فتح شريط الأوامر',
        category: 'navigation'
    },
    {
        key: 'n',
        ctrlKey: true,
        action: () => console.log('Create new item'),
        description: 'إنشاء عنصر جديد',
        category: 'create'
    },
    {
        key: 'f',
        ctrlKey: true,
        action: () => console.log('Search'),
        description: 'البحث',
        category: 'navigation'
    },
    {
        key: 's',
        ctrlKey: true,
        action: () => console.log('Save'),
        description: 'حفظ',
        category: 'actions'
    },
    {
        key: 'z',
        ctrlKey: true,
        action: () => console.log('Undo'),
        description: 'تراجع',
        category: 'actions'
    },
    {
        key: 'y',
        ctrlKey: true,
        action: () => console.log('Redo'),
        description: 'إعادة',
        category: 'actions'
    },
    {
        key: 'a',
        ctrlKey: true,
        action: () => console.log('Select all'),
        description: 'تحديد الكل',
        category: 'selection'
    },
    {
        key: 'Escape',
        action: () => console.log('Cancel/Close'),
        description: 'إلغاء/إغلاق',
        category: 'navigation'
    },
    {
        key: '?',
        action: () => console.log('Show help'),
        description: 'عرض المساعدة',
        category: 'help'
    }
];
//# sourceMappingURL=useHotkeys.js.map