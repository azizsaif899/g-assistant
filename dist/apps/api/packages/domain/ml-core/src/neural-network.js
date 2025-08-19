"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeuralNetwork = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let NeuralNetwork = class NeuralNetwork {
    constructor() {
        this.layers = [];
        this.weights = [];
    }
    async createNetwork(architecture) {
        // Create neural network with specified architecture
        this.layers = architecture.map((neurons, index) => ({
            neurons,
            activation: index === architecture.length - 1 ? 'softmax' : 'relu'
        }));
        this.initializeWeights();
    }
    async forward(input) {
        let output = input;
        for (let i = 0; i < this.layers.length - 1; i++) {
            output = this.layerForward(output, this.weights[i], this.layers[i + 1].activation);
        }
        return output;
    }
    async train(trainingData, epochs, learningRate) {
        for (let epoch = 0; epoch < epochs; epoch++) {
            let totalLoss = 0;
            for (const sample of trainingData) {
                const prediction = await this.forward(sample.input);
                const loss = this.calculateLoss(prediction, sample.target);
                totalLoss += loss;
                // Backpropagation
                await this.backward(sample.input, sample.target, learningRate);
            }
            if (epoch % 100 === 0) {
                console.log(`Epoch ${epoch}, Loss: ${totalLoss / trainingData.length}`);
            }
        }
    }
    initializeWeights() {
        // Initialize weights randomly
        for (let i = 0; i < this.layers.length - 1; i++) {
            const layerWeights = [];
            for (let j = 0; j < this.layers[i].neurons; j++) {
                const neuronWeights = [];
                for (let k = 0; k < this.layers[i + 1].neurons; k++) {
                    neuronWeights.push(Math.random() * 2 - 1); // Random between -1 and 1
                }
                layerWeights.push(neuronWeights);
            }
            this.weights.push(layerWeights);
        }
    }
    layerForward(input, weights, activation) {
        const output = new Array(weights[0].length).fill(0);
        // Matrix multiplication
        for (let i = 0; i < output.length; i++) {
            for (let j = 0; j < input.length; j++) {
                output[i] += input[j] * weights[j][i];
            }
        }
        // Apply activation function
        return this.applyActivation(output, activation);
    }
    applyActivation(values, activation) {
        switch (activation) {
            case 'relu':
                return values.map(v => Math.max(0, v));
            case 'sigmoid':
                return values.map(v => 1 / (1 + Math.exp(-v)));
            case 'softmax':
                const exp = values.map(v => Math.exp(v));
                const sum = exp.reduce((a, b) => a + b, 0);
                return exp.map(v => v / sum);
            default:
                return values;
        }
    }
    calculateLoss(prediction, target) {
        // Mean squared error
        let loss = 0;
        for (let i = 0; i < prediction.length; i++) {
            loss += Math.pow(prediction[i] - target[i], 2);
        }
        return loss / prediction.length;
    }
    async backward(input, target, learningRate) {
        // Simplified backpropagation
        // In a real implementation, this would calculate gradients and update weights
        console.log('Backpropagation step completed');
    }
};
exports.NeuralNetwork = NeuralNetwork;
exports.NeuralNetwork = NeuralNetwork = tslib_1.__decorate([
    (0, common_1.Injectable)()
], NeuralNetwork);
//# sourceMappingURL=neural-network.js.map