"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Watcher = void 0;
const chokidar = require("chokidar");
/**
 * There are some bugs with chokidar, so this attempts to mitigate them
 */
class Watcher {
    constructor(options) {
        this.options = options;
        this.watchers = [];
    }
    /**
     * Watch the paths or globs
     * @param paths
     */
    watch(paths) {
        let watcher = chokidar.watch(paths, {
            cwd: this.options.rootDir,
            ignoreInitial: true,
            awaitWriteFinish: {
                stabilityThreshold: 200,
                pollInterval: 100
            }
        });
        this.watchers.push(watcher);
        return async () => {
            //unwatch all paths
            watcher.unwatch(paths);
            //close the watcher
            await watcher.close();
            //remove the watcher from our list
            this.watchers.splice(this.watchers.indexOf(watcher), 1);
        };
    }
    /**
     * Be notified of all events
     * @param event
     * @param callback
     */
    on(event, callback) {
        let watchers = [...this.watchers];
        for (let watcher of watchers) {
            watcher.on(event, callback);
        }
        //a disconnect function
        return () => {
            for (let watcher of watchers) {
                watcher.removeListener('all', callback);
            }
        };
    }
    dispose() {
        for (let watcher of this.watchers) {
            watcher.removeAllListeners();
        }
    }
}
exports.Watcher = Watcher;
//# sourceMappingURL=Watcher.js.map