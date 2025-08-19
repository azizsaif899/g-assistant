'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContextMenu = useContextMenu;
const react_1 = require("react");
function useContextMenu() {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [position, setPosition] = (0, react_1.useState)({ x: 0, y: 0 });
    const [items, setItems] = (0, react_1.useState)([]);
    const showContextMenu = (0, react_1.useCallback)((event, menuItems) => {
        event.preventDefault();
        event.stopPropagation();
        setItems(menuItems);
        setPosition({ x: event.clientX, y: event.clientY });
        setIsOpen(true);
    }, []);
    const hideContextMenu = (0, react_1.useCallback)(() => {
        setIsOpen(false);
        setItems([]);
    }, []);
    const executeAction = (0, react_1.useCallback)((item) => {
        if (!item.disabled && item.action) {
            item.action();
            hideContextMenu();
        }
    }, [hideContextMenu]);
    (0, react_1.useEffect)(() => {
        const handleClickOutside = () => {
            if (isOpen) {
                hideContextMenu();
            }
        };
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                hideContextMenu();
            }
        };
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, hideContextMenu]);
    return {
        isOpen,
        position,
        items,
        showContextMenu,
        hideContextMenu,
        executeAction
    };
}
//# sourceMappingURL=useContextMenu.js.map