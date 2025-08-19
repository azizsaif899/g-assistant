'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUndoRedo = useUndoRedo;
const react_1 = require("react");
function useUndoRedo(initialState) {
    const [state, setState] = (0, react_1.useState)({
        past: [],
        present: initialState,
        future: []
    });
    const canUndo = state.past.length > 0;
    const canRedo = state.future.length > 0;
    const undo = (0, react_1.useCallback)(() => {
        if (!canUndo)
            return;
        setState(currentState => {
            const previous = currentState.past[currentState.past.length - 1];
            const newPast = currentState.past.slice(0, currentState.past.length - 1);
            return {
                past: newPast,
                present: previous,
                future: [currentState.present, ...currentState.future]
            };
        });
    }, [canUndo]);
    const redo = (0, react_1.useCallback)(() => {
        if (!canRedo)
            return;
        setState(currentState => {
            const next = currentState.future[0];
            const newFuture = currentState.future.slice(1);
            return {
                past: [...currentState.past, currentState.present],
                present: next,
                future: newFuture
            };
        });
    }, [canRedo]);
    const set = (0, react_1.useCallback)((newPresent) => {
        setState(currentState => ({
            past: [...currentState.past, currentState.present],
            present: newPresent,
            future: []
        }));
    }, []);
    const reset = (0, react_1.useCallback)((newPresent) => {
        setState({
            past: [],
            present: newPresent,
            future: []
        });
    }, []);
    return {
        state: state.present,
        set,
        reset,
        undo,
        redo,
        canUndo,
        canRedo
    };
}
//# sourceMappingURL=useUndoRedo.js.map