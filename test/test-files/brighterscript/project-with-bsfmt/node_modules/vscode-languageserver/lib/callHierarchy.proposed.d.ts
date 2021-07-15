import { Proposed } from 'vscode-languageserver-protocol';
import { Feature, _Languages, ServerRequestHandler } from './main';
export interface CallHierarchy {
    callHierarchy: {
        onPrepare(handler: ServerRequestHandler<Proposed.CallHierarchyPrepareParams, Proposed.CallHierarchyItem[] | null, never, void>): void;
        onIncomingCalls(handler: ServerRequestHandler<Proposed.CallHierarchyIncomingCallsParams, Proposed.CallHierarchyIncomingCall[] | null, Proposed.CallHierarchyIncomingCall[], void>): void;
        onOutgoingCalls(handler: ServerRequestHandler<Proposed.CallHierarchyOutgoingCallsParams, Proposed.CallHierarchyOutgoingCall[] | null, Proposed.CallHierarchyOutgoingCall[], void>): void;
    };
}
export declare const CallHierarchyFeature: Feature<_Languages, CallHierarchy>;
