export declare class KeyedThrottler {
    readonly delay: number;
    constructor(delay: number);
    private throttlers;
    /**
     * Run the job for the specified key
     */
    run(key: string, job: any): Promise<void>;
    /**
    * Get a promise that resolves the next time the throttler becomes idle.
    * If no throttler exists, this will resolve immediately
    */
    onIdleOnce(key: string, resolveImmediatelyIfIdle?: boolean): Promise<void>;
}
