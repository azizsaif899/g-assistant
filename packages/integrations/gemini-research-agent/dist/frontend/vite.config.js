"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const vite_1 = require("vite");
const plugin_react_swc_1 = __importDefault(require("@vitejs/plugin-react-swc"));
const vite_2 = __importDefault(require("@tailwindcss/vite"));
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_swc_1.default)(), (0, vite_2.default)()],
    base: "/app/",
    resolve: {
        alias: {
            "@": node_path_1.default.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            // Proxy API requests to the backend server
            "/api": {
                target: "http://127.0.0.1:8000", // Default backend address
                changeOrigin: true,
                // Optionally rewrite path if needed (e.g., remove /api prefix if backend doesn't expect it)
                // rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
//# sourceMappingURL=vite.config.js.map