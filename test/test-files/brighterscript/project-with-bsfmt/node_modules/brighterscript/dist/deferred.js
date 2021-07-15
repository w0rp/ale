"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deferred = void 0;
class Deferred {
    constructor() {
        this._isCompleted = false;
        this._isResolved = false;
        this._isRejected = false;
        this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }
    get promise() {
        return this._promise;
    }
    /**
     * Indicates whether the promise has been resolved or rejected
     */
    get isCompleted() {
        return this._isCompleted;
    }
    /**
     * Indicates whether the promise has been resolved
     */
    get isResolved() {
        return this._isResolved;
    }
    /**
     * Indicates whether the promise has been rejected
     */
    get isRejected() {
        return this._isRejected;
    }
    /**
     * Resolve the promise
     */
    resolve(value) {
        if (this._isCompleted) {
            throw new Error('Already completed.');
        }
        this._isCompleted = true;
        this._isResolved = true;
        this._resolve(value);
    }
    /**
     * Reject the promise
     */
    reject(value) {
        if (this._isCompleted) {
            throw new Error('Already completed.');
        }
        this._isCompleted = true;
        this._isRejected = true;
        this._reject(value);
    }
}
exports.Deferred = Deferred;
//# sourceMappingURL=deferred.js.map