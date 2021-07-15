export declare class Throttler {
    readonly delay: number;
    constructor(delay: number);
    private runningJobPromise;
    private pendingJob;
    private emitter;
    private get isIdle();
    /**
     * Get a promise that resolves the next time the throttler becomes idle
     */
    onIdleOnce(resolveImmediatelyIfIdle?: boolean): Promise<void>;
    onIdle(callback: any): () => void;
    /**
     * If no job is running, the given job will run.
     * If a job is running, this job will be run after the current job finishes.
     * If a job is running, and a new job comes in after this one, this one will be discarded in favor of the new one.
     */
    run(job: any): Promise<void>;
    /**
     * Private method to run a job after a delay.
     */
    private runInternal;
    dispose(): void;
}
