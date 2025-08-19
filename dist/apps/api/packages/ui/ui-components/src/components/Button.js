"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const react_1 = require("react");
exports.Button = (0, react_1.forwardRef)(({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    };
    const sizes = {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base'
    };
    return (<button ref={ref} className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
        {children}
      </button>);
});
exports.Button.displayName = 'Button';
//# sourceMappingURL=Button.js.map