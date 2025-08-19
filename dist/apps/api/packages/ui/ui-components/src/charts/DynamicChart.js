"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicChart = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const DynamicChart = ({ data, type = 'bar', title, width = 400, height = 300, animated = true }) => {
    const canvasRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!canvasRef.current || !data.length)
            return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        // Draw based on chart type
        switch (type) {
            case 'bar':
                drawBarChart(ctx, data, width, height);
                break;
            case 'line':
                drawLineChart(ctx, data, width, height);
                break;
            case 'pie':
                drawPieChart(ctx, data, width, height);
                break;
        }
    }, [data, type, width, height]);
    const drawBarChart = (ctx, chartData, w, h) => {
        const maxValue = Math.max(...chartData.map(d => d.value));
        const barWidth = w / chartData.length * 0.8;
        const barSpacing = w / chartData.length * 0.2;
        chartData.forEach((item, index) => {
            const barHeight = (item.value / maxValue) * (h - 40);
            const x = index * (barWidth + barSpacing) + barSpacing / 2;
            const y = h - barHeight - 20;
            ctx.fillStyle = item.color || `hsl(${index * 60}, 70%, 50%)`;
            ctx.fillRect(x, y, barWidth, barHeight);
            // Draw labels
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(item.label, x + barWidth / 2, h - 5);
            ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5);
        });
    };
    const drawLineChart = (ctx, chartData, w, h) => {
        const maxValue = Math.max(...chartData.map(d => d.value));
        const stepX = w / (chartData.length - 1);
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 2;
        ctx.beginPath();
        chartData.forEach((item, index) => {
            const x = index * stepX;
            const y = h - (item.value / maxValue) * (h - 40) - 20;
            if (index === 0) {
                ctx.moveTo(x, y);
            }
            else {
                ctx.lineTo(x, y);
            }
            // Draw points
            ctx.fillStyle = '#2563eb';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
        ctx.stroke();
    };
    const drawPieChart = (ctx, chartData, w, h) => {
        const centerX = w / 2;
        const centerY = h / 2;
        const radius = Math.min(w, h) / 2 - 20;
        const total = chartData.reduce((sum, item) => sum + item.value, 0);
        let currentAngle = -Math.PI / 2;
        chartData.forEach((item, index) => {
            const sliceAngle = (item.value / total) * 2 * Math.PI;
            ctx.fillStyle = item.color || `hsl(${index * 60}, 70%, 50%)`;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();
            currentAngle += sliceAngle;
        });
    };
    return (<div className="dynamic-chart-container">
      {title && <h3 className="chart-title">{title}</h3>}
      <canvas ref={canvasRef} width={width} height={height} style={{ border: '1px solid #ddd', borderRadius: '4px' }}/>
      <div className="chart-legend">
        {data.map((item, index) => (<div key={index} className="legend-item">
            <span className="legend-color" style={{
                backgroundColor: item.color || `hsl(${index * 60}, 70%, 50%)`,
                width: '12px',
                height: '12px',
                display: 'inline-block',
                marginRight: '8px'
            }}/>
            <span>{item.label}: {item.value}</span>
          </div>))}
      </div>
    </div>);
};
exports.DynamicChart = DynamicChart;
//# sourceMappingURL=DynamicChart.js.map