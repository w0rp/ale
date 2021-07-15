import type { Token } from '../lexer/Token';
import * as CC from './Chunk';
import type { Diagnostic } from 'vscode-languageserver';
/** * Parses `Tokens` into chunks of tokens, excluding conditional compilation directives. */
export declare class PreprocessorParser {
    diagnostics: Diagnostic[];
    tokens: Token[];
    private current;
    /**
     * an array of chunks (conditional compilation directives and the associated BrightScript)
     */
    chunks: CC.Chunk[];
    /**
     * Parses an array of tokens into an array of "chunks" - conditional compilation directives and their
     * associated BrightScript.
     *
     * @param toParse the array of tokens to parse
     */
    parse(tokens: Token[]): this;
    static parse(tokens: Token[]): PreprocessorParser;
    /**
     * Parses tokens to produce an array containing a variable number of heterogeneous chunks.
     * @returns a heterogeneous array of chunks
     */
    private nChunks;
    /**
     * Parses tokens to produce a "declaration" chunk if possible, otherwise falls back to `hashIf`.
     * @returns a "declaration" chunk if one is detected, otherwise whatever `hashIf` returns
     */
    private hashConst;
    /**
     * Parses tokens to produce an "if" chunk (including "else if" and "else" chunks) if possible,
     * otherwise falls back to `hashError`.
     * @returns an "if" chunk if one is detected, otherwise whatever `hashError` returns
     */
    private hashIf;
    /**
     * Parses tokens to produce an "error" chunk (including the associated message) if possible,
     * otherwise falls back to a chunk of plain BrightScript.
     * @returns an "error" chunk if one is detected, otherwise whatever `brightScriptChunk` returns
     */
    private hashError;
    /**
     * Parses tokens to produce a chunk of BrightScript.
     * @returns a chunk of plain BrightScript if any is detected, otherwise `undefined` to indicate
     *          that no non-conditional compilation directives were found.
     */
    private brightScriptChunk;
    private eof;
    /**
     * If the next token is any of the provided tokenKinds, advance and return true.
     * Otherwise return false
     */
    private match;
    private consume;
    private advance;
    private check;
    private isAtEnd;
    private peek;
    private previous;
}
