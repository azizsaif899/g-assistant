"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingSpinner = LoadingSpinner;
function LoadingSpinner({ size = 'md', className = '' }) {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8'
    };
    return (<div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizes[size]} ${className}`}/>);
}
//# sourceMappingURL=LoadingSpinner.js.map