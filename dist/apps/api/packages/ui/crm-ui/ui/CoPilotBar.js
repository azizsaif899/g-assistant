"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoPilotBar = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const useCommands_1 = require("../../hooks/useCommands");
const CoPilotBar = ({ isOpen, onClose }) => {
    const [query, setQuery] = (0, react_1.useState)('');
    const [selectedIndex, setSelectedIndex] = (0, react_1.useState)(0);
    const [isExecuting, setIsExecuting] = (0, react_1.useState)(false);
    const inputRef = (0, react_1.useRef)(null);
    const { commands, executeCommand, loading } = (0, useCommands_1.useCommands)();
    // فلترة الأوامر بناءً على الاستعلام
    const filteredCommands = commands.filter(cmd => cmd.title.toLowerCase().includes(query.toLowerCase()) ||
        cmd.description.toLowerCase().includes(query.toLowerCase())).slice(0, 8); // أقصى 8 نتائج
    (0, react_1.useEffect)(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);
    (0, react_1.useEffect)(() => {
        const handleKeyDown = (e) => {
            if (!isOpen)
                return;
            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev => prev < filteredCommands.length - 1 ? prev + 1 : 0);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev => prev > 0 ? prev - 1 : filteredCommands.length - 1);
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (filteredCommands[selectedIndex]) {
                        handleExecuteCommand(filteredCommands[selectedIndex]);
                    }
                    break;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredCommands, selectedIndex, onClose]);
    const handleExecuteCommand = async (command) => {
        setIsExecuting(true);
        try {
            await executeCommand(command.id);
            onClose();
            setQuery('');
            setSelectedIndex(0);
        }
        catch (error) {
            console.error('Error executing command:', error);
        }
        finally {
            setIsExecuting(false);
        }
    };
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'navigation': return '🧭';
            case 'action': return '⚡';
            case 'query': return '🔍';
            case 'automation': return '🤖';
            default: return '📋';
        }
    };
    const getCategoryColor = (category) => {
        switch (category) {
            case 'navigation': return '#2196F3';
            case 'action': return '#4CAF50';
            case 'query': return '#FF9800';
            case 'automation': return '#9C27B0';
            default: return '#666';
        }
    };
    if (!isOpen)
        return null;
    return (<div className="copilot-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '20vh'
        }} onClick={onClose}>
      <div className="copilot-bar" style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            width: '600px',
            maxWidth: '90vw',
            overflow: 'hidden'
        }} onClick={(e) => e.stopPropagation()}>
        {/* شريط البحث */}
        <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #f0f0f0'
        }}>
          <span style={{ fontSize: '20px', marginRight: '12px' }}>🎯</span>
          <input ref={inputRef} type="text" value={query} onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
        }} placeholder="ماذا تريد أن تفعل؟ (جرب: 'إنشاء عميل جديد' أو 'عرض الفرص الحارة')" style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            background: 'transparent'
        }}/>
          <div style={{
            fontSize: '12px',
            color: '#999',
            background: '#f5f5f5',
            padding: '4px 8px',
            borderRadius: '4px'
        }}>
            Ctrl+K
          </div>
        </div>

        {/* قائمة الأوامر */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {loading ? (<div style={{
                padding: '40px',
                textAlign: 'center',
                color: '#666'
            }}>
              جاري تحميل الأوامر...
            </div>) : filteredCommands.length === 0 ? (<div style={{
                padding: '40px',
                textAlign: 'center',
                color: '#666'
            }}>
              {query ? 'لا توجد أوامر مطابقة' : 'ابدأ بالكتابة للبحث عن الأوامر'}
            </div>) : (filteredCommands.map((command, index) => (<div key={command.id} style={{
                padding: '12px 20px',
                background: index === selectedIndex ? '#f8f9ff' : 'transparent',
                borderLeft: index === selectedIndex ? `3px solid ${getCategoryColor(command.category)}` : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
            }} onClick={() => handleExecuteCommand(command)} onMouseEnter={() => setSelectedIndex(index)}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{
                fontSize: '16px',
                marginRight: '12px'
            }}>
                    {getCategoryIcon(command.category)}
                  </span>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '2px'
            }}>
                      {command.title}
                    </div>
                    <div style={{
                fontSize: '12px',
                color: '#666'
            }}>
                      {command.description}
                    </div>
                  </div>

                  {command.shortcut && (<div style={{
                    fontSize: '11px',
                    color: '#999',
                    background: '#f0f0f0',
                    padding: '2px 6px',
                    borderRadius: '3px'
                }}>
                      {command.shortcut}
                    </div>)}
                </div>
              </div>)))}
        </div>

        {/* شريط المساعدة */}
        <div style={{
            padding: '12px 20px',
            background: '#f8f9fa',
            borderTop: '1px solid #f0f0f0',
            fontSize: '12px',
            color: '#666',
            display: 'flex',
            justifyContent: 'space-between'
        }}>
          <span>↑↓ للتنقل • Enter للتنفيذ • Esc للإغلاق</span>
          {isExecuting && (<span style={{ color: '#2196F3' }}>
              جاري التنفيذ...
            </span>)}
        </div>
      </div>
    </div>);
};
exports.CoPilotBar = CoPilotBar;
//# sourceMappingURL=CoPilotBar.js.map