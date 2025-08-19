'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGestures = useGestures;
const react_1 = require("react");
function useGestures(config) {
    const { onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onDoubleClick, onLongPress, threshold = 50 } = config;
    let startX = 0;
    let startY = 0;
    let lastClickTime = 0;
    let longPressTimer;
    const handleTouchStart = (0, react_1.useCallback)((e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        if (onLongPress) {
            longPressTimer = setTimeout(() => {
                onLongPress();
            }, 500);
        }
    }, [onLongPress]);
    const handleTouchEnd = (0, react_1.useCallback)((e) => {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
        }
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (Math.abs(deltaX) > threshold) {
                if (deltaX > 0 && onSwipeRight) {
                    onSwipeRight();
                }
                else if (deltaX < 0 && onSwipeLeft) {
                    onSwipeLeft();
                }
            }
        }
        else {
            if (Math.abs(deltaY) > threshold) {
                if (deltaY > 0 && onSwipeDown) {
                    onSwipeDown();
                }
                else if (deltaY < 0 && onSwipeUp) {
                    onSwipeUp();
                }
            }
        }
    }, [startX, startY, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);
    const handleDoubleClick = (0, react_1.useCallback)(() => {
        const now = Date.now();
        if (now - lastClickTime < 300 && onDoubleClick) {
            onDoubleClick();
        }
        lastClickTime = now;
    }, [onDoubleClick]);
    (0, react_1.useEffect)(() => {
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchend', handleTouchEnd);
        document.addEventListener('click', handleDoubleClick);
        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
            document.removeEventListener('click', handleDoubleClick);
        };
    }, [handleTouchStart, handleTouchEnd, handleDoubleClick]);
}
//# sourceMappingURL=useGestures.js.map