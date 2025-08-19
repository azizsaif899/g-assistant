"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const react_1 = require("react");
exports.Card = (0, react_1.forwardRef)(({ className = '', title, description, children, ...props }, ref) => {
    const baseClasses = 'rounded-lg border border-gray-200 bg-white shadow-sm';
    return (<div ref={ref} className={`${baseClasses} ${className}`} {...props}>
        {(title || description) && (<div className="p-6 pb-4">
            {title && (<h3 className="text-lg font-semibold text-gray-900">{title}</h3>)}
            {description && (<p className="text-sm text-gray-600 mt-1">{description}</p>)}
          </div>)}
        {children && (<div className={title || description ? 'px-6 pb-6' : 'p-6'}>
            {children}
          </div>)}
      </div>);
});
exports.Card.displayName = 'Card';
//# sourceMappingURL=Card.js.map