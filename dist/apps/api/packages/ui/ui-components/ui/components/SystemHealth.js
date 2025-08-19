"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const SystemHealth = () => {
    const metrics = [
        { name: 'CPU Usage', status: 'healthy', value: '45%' },
        { name: 'Memory Usage', status: 'healthy', value: '62%' },
        { name: 'Database', status: 'healthy', value: 'Connected' },
        { name: 'API Response', status: 'healthy', value: '120ms' }
    ];
    return (<div className="system-health">
      <h2>System Health</h2>
      {metrics.map((metric) => (<div key={metric.name} className={`metric ${metric.status}`}>
          <span>{metric.name}</span>
          <span>{metric.value}</span>
        </div>))}
    </div>);
};
exports.default = SystemHealth;
//# sourceMappingURL=SystemHealth.js.map