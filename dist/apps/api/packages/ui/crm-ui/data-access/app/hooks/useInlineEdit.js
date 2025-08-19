'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInlineEdit = useInlineEdit;
const react_1 = require("react");
function useInlineEdit({ initialValue, onSave, validate }) {
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [value, setValue] = (0, react_1.useState)(initialValue);
    const [isSaving, setIsSaving] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const inputRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        setValue(initialValue);
    }, [initialValue]);
    (0, react_1.useEffect)(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);
    const startEdit = (0, react_1.useCallback)(() => {
        setIsEditing(true);
        setError(null);
    }, []);
    const cancelEdit = (0, react_1.useCallback)(() => {
        setIsEditing(false);
        setValue(initialValue);
        setError(null);
    }, [initialValue]);
    const saveEdit = (0, react_1.useCallback)(async () => {
        if (validate) {
            const validationError = validate(value);
            if (validationError) {
                setError(validationError);
                return;
            }
        }
        setIsSaving(true);
        setError(null);
        try {
            await onSave(value);
            setIsEditing(false);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'حدث خطأ أثناء الحفظ');
        }
        finally {
            setIsSaving(false);
        }
    }, [value, validate, onSave]);
    const handleKeyDown = (0, react_1.useCallback)((e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveEdit();
        }
        else if (e.key === 'Escape') {
            e.preventDefault();
            cancelEdit();
        }
    }, [saveEdit, cancelEdit]);
    return {
        isEditing,
        value,
        setValue,
        isSaving,
        error,
        inputRef,
        startEdit,
        cancelEdit,
        saveEdit,
        handleKeyDown
    };
}
//# sourceMappingURL=useInlineEdit.js.map