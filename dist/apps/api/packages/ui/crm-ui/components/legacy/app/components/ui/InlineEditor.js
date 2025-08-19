'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineEditor = InlineEditor;
const framer_motion_1 = require("framer-motion");
const lucide_react_1 = require("lucide-react");
const useInlineEdit_1 = require("../../hooks/useInlineEdit");
function InlineEditor({ value, onSave, validate, placeholder = 'انقر للتحرير...', className = '', type = 'text', multiline = false }) {
    const { isEditing, value: editValue, setValue, isSaving, error, inputRef, startEdit, cancelEdit, saveEdit, handleKeyDown } = (0, useInlineEdit_1.useInlineEdit)({ initialValue: value, onSave, validate });
    if (isEditing) {
        return (<framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`inline-flex items-center space-x-2 ${className}`}>
        {multiline ? (<textarea ref={inputRef} value={editValue} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                        e.preventDefault();
                        saveEdit();
                    }
                    else if (e.key === 'Escape') {
                        e.preventDefault();
                        cancelEdit();
                    }
                }} className={`px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`} rows={3} disabled={isSaving}/>) : (<input ref={inputRef} type={type} value={editValue} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} className={`px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`} disabled={isSaving}/>)}
        
        <div className="flex items-center space-x-1">
          <button onClick={saveEdit} disabled={isSaving} className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors" title="حفظ (Enter)">
            {isSaving ? (<lucide_react_1.Loader2 className="w-4 h-4 animate-spin"/>) : (<lucide_react_1.Check className="w-4 h-4"/>)}
          </button>
          
          <button onClick={cancelEdit} disabled={isSaving} className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors" title="إلغاء (Escape)">
            <lucide_react_1.X className="w-4 h-4"/>
          </button>
        </div>
        
        {error && (<div className="absolute top-full left-0 mt-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded shadow-lg z-10">
            {error}
          </div>)}
      </framer_motion_1.motion.div>);
    }
    return (<framer_motion_1.motion.div whileHover={{ scale: 1.02 }} className={`inline-flex items-center space-x-2 cursor-pointer group ${className}`} onClick={startEdit}>
      <span className={`${value ? 'text-gray-900' : 'text-gray-400'}`}>
        {value || placeholder}
      </span>
      <lucide_react_1.Edit3 className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"/>
    </framer_motion_1.motion.div>);
}
//# sourceMappingURL=InlineEditor.js.map