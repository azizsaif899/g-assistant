"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const InputForm_1 = require("./InputForm");
const WelcomeScreen = ({ handleSubmit, onCancel, isLoading, }) => ((0, jsx_runtime_1.jsxs)("div", { className: "h-full flex flex-col items-center justify-center text-center px-4 flex-1 w-full max-w-3xl mx-auto gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-5xl md:text-6xl font-semibold text-neutral-100 mb-3", children: "Welcome." }), (0, jsx_runtime_1.jsx)("p", { className: "text-xl md:text-2xl text-neutral-400", children: "How can I help you today?" })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full mt-4", children: (0, jsx_runtime_1.jsx)(InputForm_1.InputForm, { onSubmit: handleSubmit, isLoading: isLoading, onCancel: onCancel, hasHistory: false }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-neutral-500", children: "Powered by Google Gemini and LangChain LangGraph." })] }));
exports.WelcomeScreen = WelcomeScreen;
//# sourceMappingURL=WelcomeScreen.js.map