import { Proposed } from 'vscode-languageserver-protocol';
import { Feature, _Languages, ServerRequestHandler } from './main';
export interface SemanticTokens {
    semanticTokens: {
        on(handler: ServerRequestHandler<Proposed.SemanticTokensParams, Proposed.SemanticTokens, Proposed.SemanticTokensPartialResult, void>): void;
        onEdits(handler: ServerRequestHandler<Proposed.SemanticTokensEditsParams, Proposed.SemanticTokensEdits | Proposed.SemanticTokens, Proposed.SemanticTokensEditsPartialResult | Proposed.SemanticTokensEditsPartialResult, void>): void;
        onRange(handler: ServerRequestHandler<Proposed.SemanticTokensRangeParams, Proposed.SemanticTokens, Proposed.SemanticTokensPartialResult, void>): void;
    };
}
export declare const SemanticTokensFeature: Feature<_Languages, SemanticTokens>;
export declare class SemanticTokensBuilder {
    private _id;
    private _prevLine;
    private _prevChar;
    private _data;
    private _dataLen;
    private _prevData;
    constructor();
    private initialize;
    push(line: number, char: number, length: number, tokenType: number, tokenModifiers: number): void;
    get id(): string;
    previousResult(id: string): void;
    build(): Proposed.SemanticTokens;
    canBuildEdits(): boolean;
    buildEdits(): Proposed.SemanticTokens | Proposed.SemanticTokensEdits;
}
