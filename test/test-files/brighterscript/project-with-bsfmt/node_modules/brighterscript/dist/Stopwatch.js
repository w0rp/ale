"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stopwatch = void 0;
const parseMilliseconds = require("parse-ms");
const perf_hooks_1 = require("perf_hooks");
class Stopwatch {
    constructor() {
        this.totalMilliseconds = 0;
    }
    start() {
        this.startTime = perf_hooks_1.performance.now();
    }
    stop() {
        if (this.startTime) {
            this.totalMilliseconds += perf_hooks_1.performance.now() - this.startTime;
        }
        this.startTime = undefined;
    }
    reset() {
        this.totalMilliseconds = undefined;
        this.startTime = undefined;
    }
    getDurationText() {
        let parts = parseMilliseconds(this.totalMilliseconds);
        let fractionalMilliseconds = parseInt(this.totalMilliseconds.toFixed(3).toString().split('.')[1]);
        if (parts.minutes > 0) {
            return `${parts.minutes}m${parts.seconds}s${parts.milliseconds}.${fractionalMilliseconds}ms`;
        }
        else if (parts.seconds > 0) {
            return `${parts.seconds}s${parts.milliseconds}.${fractionalMilliseconds}ms`;
        }
        else {
            return `${parts.milliseconds}.${fractionalMilliseconds}ms`;
        }
    }
}
exports.Stopwatch = Stopwatch;
//# sourceMappingURL=Stopwatch.js.map