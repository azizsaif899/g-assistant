"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionModels = void 0;
const tslib_1 = require("tslib");
const tf = tslib_1.__importStar(require("@tensorflow/tfjs-node"));
const core_logic_1 = require("@azizsys/core-logic");
class PredictionModels {
    constructor() {
        this.eventBus = core_logic_1.EventBus.getInstance();
        this.models = new Map();
        this.initializeModels();
    }
    async initializeModels() {
        // Revenue Prediction Model
        const revenueModel = tf.sequential({
            layers: [
                tf.layers.dense({ inputShape: [10], units: 64, activation: 'relu' }),
                tf.layers.dropout({ rate: 0.2 }),
                tf.layers.dense({ units: 32, activation: 'relu' }),
                tf.layers.dense({ units: 1, activation: 'linear' })
            ]
        });
        revenueModel.compile({
            optimizer: 'adam',
            loss: 'meanSquaredError',
            metrics: ['mae']
        });
        this.models.set('revenue', revenueModel);
        // Cost Prediction Model
        const costModel = tf.sequential({
            layers: [
                tf.layers.dense({ inputShape: [8], units: 48, activation: 'relu' }),
                tf.layers.dense({ units: 24, activation: 'relu' }),
                tf.layers.dense({ units: 1, activation: 'linear' })
            ]
        });
        costModel.compile({
            optimizer: 'adam',
            loss: 'meanSquaredError'
        });
        this.models.set('costs', costModel);
        this.eventBus.emit('models:initialized', { modelCount: this.models.size });
    }
    async predictRevenue(input) {
        const model = this.models.get('revenue');
        if (!model)
            throw new Error('Revenue model not initialized');
        const prediction = model.predict(tf.tensor2d([input.features]));
        const value = (await prediction.data())[0];
        const confidence = this.calculateConfidence(input.features);
        const trend = this.determineTrend(value, input.context.historical || []);
        return {
            value,
            confidence,
            trend,
            factors: this.identifyKeyFactors(input.features)
        };
    }
    async predictCosts(input) {
        const model = this.models.get('costs');
        if (!model)
            throw new Error('Cost model not initialized');
        const prediction = model.predict(tf.tensor2d([input.features]));
        const value = (await prediction.data())[0];
        return {
            value,
            confidence: this.calculateConfidence(input.features),
            trend: this.determineTrend(value, input.context.historical || []),
            factors: this.identifyKeyFactors(input.features)
        };
    }
    async trainModel(modelName, trainingData) {
        const model = this.models.get(modelName);
        if (!model)
            throw new Error(`Model ${modelName} not found`);
        const xs = tf.tensor2d(trainingData.inputs);
        const ys = tf.tensor2d(trainingData.outputs, [trainingData.outputs.length, 1]);
        await model.fit(xs, ys, {
            epochs: 100,
            batchSize: 32,
            validationSplit: 0.2,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    this.eventBus.emit('model:training:progress', {
                        model: modelName,
                        epoch,
                        loss: logs?.loss
                    });
                }
            }
        });
        this.eventBus.emit('model:training:completed', { model: modelName });
    }
    calculateConfidence(features) {
        const variance = this.calculateVariance(features);
        return Math.max(0.1, Math.min(0.95, 1 - variance / 100));
    }
    calculateVariance(data) {
        const mean = data.reduce((a, b) => a + b) / data.length;
        return data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
    }
    determineTrend(currentValue, historical) {
        if (historical.length === 0)
            return 'stable';
        const lastValue = historical[historical.length - 1];
        const threshold = 0.05; // 5% threshold
        if (currentValue > lastValue * (1 + threshold))
            return 'up';
        if (currentValue < lastValue * (1 - threshold))
            return 'down';
        return 'stable';
    }
    identifyKeyFactors(features) {
        const factorNames = [
            'market_conditions', 'seasonality', 'competition',
            'customer_demand', 'operational_efficiency'
        ];
        return features
            .map((value, index) => ({ name: factorNames[index] || `factor_${index}`, value }))
            .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
            .slice(0, 3)
            .map(f => f.name);
    }
}
exports.PredictionModels = PredictionModels;
//# sourceMappingURL=prediction-models.js.map