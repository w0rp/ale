import { CancellationToken, ProgressToken, ProgressType, WorkDoneProgressParams, PartialResultParams } from 'vscode-languageserver-protocol';
import { Feature, _RemoteWindow } from './main';
export interface ProgressContext {
    sendProgress<P>(type: ProgressType<P>, token: ProgressToken, value: P): void;
}
export interface WorkDoneProgress {
    readonly token: CancellationToken;
    begin(title: string, percentage?: number, message?: string, cancellable?: boolean): void;
    report(percentage: number): void;
    report(message: string): void;
    report(percentage: number, message: string): void;
    done(): void;
}
export interface WindowProgress {
    attachWorkDoneProgress(token: ProgressToken | undefined): WorkDoneProgress;
    createWorkDoneProgress(): Promise<WorkDoneProgress>;
}
export declare function attachWorkDone(connection: ProgressContext, params: WorkDoneProgressParams | undefined): WorkDoneProgress;
export declare const ProgressFeature: Feature<_RemoteWindow, WindowProgress>;
export interface ResultProgress<R> {
    report(data: R): void;
}
export declare function attachPartialResult<R>(connection: ProgressContext, params: PartialResultParams): ResultProgress<R> | undefined;
