'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAdvancedCommands = useAdvancedCommands;
const react_1 = require("react");
const command_registry_1 = require("../lib/command-registry");
function useAdvancedCommands() {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [query, setQuery] = (0, react_1.useState)('');
    const [filteredCommands, setFilteredCommands] = (0, react_1.useState)([]);
    const [selectedIndex, setSelectedIndex] = (0, react_1.useState)(0);
    const [history, setHistory] = (0, react_1.useState)([]);
    // البحث في الأوامر
    (0, react_1.useEffect)(() => {
        if (query.trim()) {
            const results = command_registry_1.commandRegistry.search(query);
            setFilteredCommands(results);
            setSelectedIndex(0);
        }
        else {
            // عرض الأوامر الأكثر استخداماً
            const recentCommands = getRecentCommands();
            setFilteredCommands(recentCommands);
        }
    }, [query]);
    // اختصارات لوحة المفاتيح
    (0, react_1.useEffect)(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
                setQuery('');
            }
            if (isOpen) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSelectedIndex(prev => prev < filteredCommands.length - 1 ? prev + 1 : 0);
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSelectedIndex(prev => prev > 0 ? prev - 1 : filteredCommands.length - 1);
                }
                if (e.key === 'Enter') {
                    e.preventDefault();
                    executeSelectedCommand();
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredCommands, selectedIndex]);
    const executeSelectedCommand = (0, react_1.useCallback)(() => {
        const command = filteredCommands[selectedIndex];
        if (command) {
            executeCommand(command);
        }
    }, [filteredCommands, selectedIndex]);
    const executeCommand = (0, react_1.useCallback)((command) => {
        // تنفيذ الأمر
        command_registry_1.commandRegistry.execute(command.id);
        // إضافة إلى التاريخ
        const historyEntry = {
            commandId: command.id,
            timestamp: new Date()
        };
        setHistory(prev => [historyEntry, ...prev.slice(0, 49)]); // الاحتفاظ بآخر 50 أمر
        // إغلاق شريط الأوامر
        setIsOpen(false);
        setQuery('');
    }, []);
    const getRecentCommands = (0, react_1.useCallback)(() => {
        const recentIds = history.slice(0, 5).map(h => h.commandId);
        const recentCommands = recentIds
            .map(id => command_registry_1.commandRegistry.getAll().find(cmd => cmd.id === id))
            .filter(Boolean);
        // إضافة أوامر شائعة إذا لم يكن هناك تاريخ كافي
        const allCommands = command_registry_1.commandRegistry.getAll();
        const popularCommands = allCommands
            .sort((a, b) => b.priority - a.priority)
            .slice(0, 8);
        return [...recentCommands, ...popularCommands]
            .filter((cmd, index, arr) => arr.findIndex(c => c.id === cmd.id) === index)
            .slice(0, 8);
    }, [history]);
    return {
        isOpen,
        setIsOpen,
        query,
        setQuery,
        filteredCommands,
        selectedIndex,
        setSelectedIndex,
        executeCommand,
        executeSelectedCommand,
        history
    };
}
//# sourceMappingURL=useAdvancedCommands.js.map