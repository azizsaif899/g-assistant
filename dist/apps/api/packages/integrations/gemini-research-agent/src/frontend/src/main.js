"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = require("react");
const client_1 = require("react-dom/client");
const react_router_dom_1 = require("react-router-dom");
require("./global.css");
const App_tsx_1 = tslib_1.__importDefault(require("./App.tsx"));
(0, client_1.createRoot)(document.getElementById("root")).render(<react_1.StrictMode>
    <react_router_dom_1.BrowserRouter>
      <App_tsx_1.default />
    </react_router_dom_1.BrowserRouter>
  </react_1.StrictMode>);
//# sourceMappingURL=main.js.map