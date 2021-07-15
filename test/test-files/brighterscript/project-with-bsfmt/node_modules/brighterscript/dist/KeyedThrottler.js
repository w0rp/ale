"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyedThrottler = void 0;
const Throttler_1 = require("./Throttler");
class KeyedThrottler {
    constructor(delay) {
        this.delay = delay;
        this.throttlers = {};
    }
    /**
     * Run the job for the specified key
     */
    run(key, job) {
        if (!this.throttlers[key]) {
            this.throttlers[key] = new Throttler_1.Throttler(this.delay);
        }
        return this.throttlers[key].run(job);
    }
    /**
    * Get a promise that resolves the next time the throttler becomes idle.
    * If no throttler exists, this will resolve immediately
    */
    async onIdleOnce(key, resolveImmediatelyIfIdle = true) {
        const throttler = this.throttlers[key];
        if (throttler) {
            return throttler.onIdleOnce(resolveImmediatelyIfIdle);
        }
        else {
            return Promise.resolve();
        }
    }
}
exports.KeyedThrottler = KeyedThrottler;
//# sourceMappingURL=KeyedThrottler.js.map