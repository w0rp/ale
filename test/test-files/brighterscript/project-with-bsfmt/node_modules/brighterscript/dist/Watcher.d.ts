import type { BsConfig } from './BsConfig';
/**
 * There are some bugs with chokidar, so this attempts to mitigate them
 */
export declare class Watcher {
    private options;
    constructor(options: BsConfig);
    private watchers;
    /**
     * Watch the paths or globs
     * @param paths
     */
    watch(paths: string | string[]): () => Promise<void>;
    /**
     * Be notified of all events
     * @param event
     * @param callback
     */
    on(event: 'all', callback: (event: any, path: any, details: any) => void): () => void;
    dispose(): void;
}
