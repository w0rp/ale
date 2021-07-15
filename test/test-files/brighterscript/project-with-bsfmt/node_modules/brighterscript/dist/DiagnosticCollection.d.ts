import type { BsDiagnostic } from './interfaces';
import type { Workspace } from './LanguageServer';
export declare class DiagnosticCollection {
    private previousDiagnosticsByFile;
    getPatch(workspaces: Workspace[]): Promise<Record<string, KeyedDiagnostic[]>>;
    private getDiagnosticsByFileFromWorkspaces;
    /**
     * Get a patch for all the files that have been removed since last time
     */
    private getRemovedPatch;
    /**
     * Get all files whose diagnostics have changed since last time
     */
    private getModifiedPatch;
    /**
     * Determine if two diagnostic lists are identical
     */
    private diagnosticListsAreIdentical;
    /**
     * Get diagnostics for all new files not seen since last time
     */
    private getAddedPatch;
}
interface KeyedDiagnostic extends BsDiagnostic {
    key: string;
}
export {};
