export declare class Stopwatch {
    totalMilliseconds: number;
    /**
     * The number of milliseconds when the stopwatch was started.
     */
    private startTime;
    start(): void;
    stop(): void;
    reset(): void;
    getDurationText(): string;
}
