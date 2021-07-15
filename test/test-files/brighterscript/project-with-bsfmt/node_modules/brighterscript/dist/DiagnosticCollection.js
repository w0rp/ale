"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticCollection = void 0;
class DiagnosticCollection {
    constructor() {
        this.previousDiagnosticsByFile = {};
    }
    async getPatch(workspaces) {
        const diagnosticsByFile = await this.getDiagnosticsByFileFromWorkspaces(workspaces);
        const patch = Object.assign(Object.assign(Object.assign({}, this.getRemovedPatch(diagnosticsByFile)), this.getModifiedPatch(diagnosticsByFile)), this.getAddedPatch(diagnosticsByFile));
        //save the new list of diagnostics
        this.previousDiagnosticsByFile = diagnosticsByFile;
        return patch;
    }
    async getDiagnosticsByFileFromWorkspaces(workspaces) {
        const result = {};
        //wait for all programs to finish running. This ensures the `Program` exists.
        await Promise.all(workspaces.map(x => x.firstRunPromise));
        //get all diagnostics for all workspaces
        let diagnostics = Array.prototype.concat.apply([], workspaces.map((x) => x.builder.getDiagnostics()));
        const keys = {};
        //build the full current set of diagnostics by file
        for (let diagnostic of diagnostics) {
            const filePath = diagnostic.file.pathAbsolute;
            //ensure the file entry exists
            if (!result[filePath]) {
                result[filePath] = [];
            }
            const diagnosticMap = result[filePath];
            diagnostic.key =
                diagnostic.file.pathAbsolute.toLowerCase() + '-' +
                    diagnostic.code + '-' +
                    diagnostic.range.start.line + '-' +
                    diagnostic.range.start.character + '-' +
                    diagnostic.range.end.line + '-' +
                    diagnostic.range.end.character +
                    diagnostic.message;
            //don't include duplicates
            if (!keys[diagnostic.key]) {
                keys[diagnostic.key] = true;
                diagnosticMap.push(diagnostic);
            }
        }
        return result;
    }
    /**
     * Get a patch for all the files that have been removed since last time
     */
    getRemovedPatch(currentDiagnosticsByFile) {
        const result = {};
        for (const filePath in this.previousDiagnosticsByFile) {
            if (!currentDiagnosticsByFile[filePath]) {
                result[filePath] = [];
            }
        }
        return result;
    }
    /**
     * Get all files whose diagnostics have changed since last time
     */
    getModifiedPatch(currentDiagnosticsByFile) {
        const result = {};
        for (const filePath in currentDiagnosticsByFile) {
            //for this file, if there were diagnostics last time AND there are diagnostics this time, and the lists are different
            if (this.previousDiagnosticsByFile[filePath] && !this.diagnosticListsAreIdentical(this.previousDiagnosticsByFile[filePath], currentDiagnosticsByFile[filePath])) {
                result[filePath] = currentDiagnosticsByFile[filePath];
            }
        }
        return result;
    }
    /**
     * Determine if two diagnostic lists are identical
     */
    diagnosticListsAreIdentical(list1, list2) {
        //skip all checks if the lists are not the same size
        if (list1.length !== list2.length) {
            return false;
        }
        for (let i = 0; i < list1.length; i++) {
            if (list1[i].key !== list2[i].key) {
                return false;
            }
        }
        //if we made it here, the lists are identical
        return true;
    }
    /**
     * Get diagnostics for all new files not seen since last time
     */
    getAddedPatch(currentDiagnosticsByFile) {
        const result = {};
        for (const filePath in currentDiagnosticsByFile) {
            if (!this.previousDiagnosticsByFile[filePath]) {
                result[filePath] = currentDiagnosticsByFile[filePath];
            }
        }
        return result;
    }
}
exports.DiagnosticCollection = DiagnosticCollection;
//# sourceMappingURL=DiagnosticCollection.js.map