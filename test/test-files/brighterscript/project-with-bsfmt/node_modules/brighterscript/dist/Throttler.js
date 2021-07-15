"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Throttler = void 0;
const util_1 = require("./util");
const eventemitter3_1 = require("eventemitter3");
const deferred_1 = require("./deferred");
class Throttler {
    constructor(delay) {
        this.delay = delay;
        this.emitter = new eventemitter3_1.EventEmitter();
    }
    get isIdle() {
        return !this.runningJobPromise;
    }
    /**
     * Get a promise that resolves the next time the throttler becomes idle
     */
    async onIdleOnce(resolveImmediatelyIfIdle = true) {
        if (resolveImmediatelyIfIdle && this.isIdle) {
            return Promise.resolve();
        }
        const deferred = new deferred_1.Deferred();
        const callback = () => {
            this.emitter.off('idle', callback);
            deferred.resolve();
        };
        this.emitter.on('idle', callback);
        return deferred.promise;
    }
    onIdle(callback) {
        this.emitter.on('idle', callback);
        return () => {
            this.emitter.off('idle', callback);
        };
    }
    /**
     * If no job is running, the given job will run.
     * If a job is running, this job will be run after the current job finishes.
     * If a job is running, and a new job comes in after this one, this one will be discarded in favor of the new one.
     */
    async run(job) {
        //if there's a running job, store the incoming job
        //(overwrite if one already exists)
        if (this.runningJobPromise) {
            this.pendingJob = job;
            //queue this job, and resolve when throttler becomes idle
            return this.onIdleOnce();
        }
        else {
            //kick off running the job
            return this.runInternal(job);
        }
    }
    /**
     * Private method to run a job after a delay.
     */
    async runInternal(job) {
        this.runningJobPromise = util_1.default.sleep(this.delay).then(() => {
            //run the job
            return job();
        }).catch((e) => {
            //log the error, but keep moving
            console.error(e);
        }).then(() => {
            //if there's a pending job, run that one now
            if (this.pendingJob) {
                //get reference to the pending job
                let pendingJob = this.pendingJob;
                //erase the pending job since we're going to run it (it'll be come the active job)
                this.pendingJob = undefined;
                return this.runInternal(pendingJob);
            }
            else {
                //there is no pending job
                this.emitter.emit('idle');
                this.runningJobPromise = undefined;
            }
        });
        //resolve when throttler becomes idle
        return this.onIdleOnce();
    }
    dispose() {
        this.emitter.removeAllListeners();
    }
}
exports.Throttler = Throttler;
//# sourceMappingURL=Throttler.js.map