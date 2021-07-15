"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreprocessorParser = void 0;
const TokenKind_1 = require("../lexer/TokenKind");
const CC = require("./Chunk");
const DiagnosticMessages_1 = require("../DiagnosticMessages");
/** * Parses `Tokens` into chunks of tokens, excluding conditional compilation directives. */
class PreprocessorParser {
    constructor() {
        this.current = 0;
    }
    /**
     * Parses an array of tokens into an array of "chunks" - conditional compilation directives and their
     * associated BrightScript.
     *
     * @param toParse the array of tokens to parse
     */
    parse(tokens) {
        this.tokens = tokens;
        this.diagnostics = [];
        this.current = 0;
        this.chunks = this.nChunks();
        return this;
    }
    static parse(tokens) {
        return new PreprocessorParser().parse(tokens);
    }
    /**
     * Parses tokens to produce an array containing a variable number of heterogeneous chunks.
     * @returns a heterogeneous array of chunks
     */
    nChunks() {
        let chunks = [];
        while (true) {
            let c = this.hashConst();
            if (c) {
                chunks.push(c);
            }
            let maybeEof = this.eof();
            if (maybeEof) {
                chunks.push(maybeEof);
                break;
            }
            else if (!c) {
                break;
            }
        }
        return chunks;
    }
    /**
     * Parses tokens to produce a "declaration" chunk if possible, otherwise falls back to `hashIf`.
     * @returns a "declaration" chunk if one is detected, otherwise whatever `hashIf` returns
     */
    hashConst() {
        if (this.match(TokenKind_1.TokenKind.HashConst)) {
            let name = this.consume(DiagnosticMessages_1.DiagnosticMessages.expectedIdentifierAfterKeyword('#const'), TokenKind_1.TokenKind.Identifier, 
            //look for any alphanumeric token, we will throw out the bad ones in the next check
            ...TokenKind_1.AllowedLocalIdentifiers, ...TokenKind_1.AllowedProperties, ...TokenKind_1.DisallowedLocalIdentifiers);
            //disallow using keywords for const names
            if (TokenKind_1.ReservedWords.has(name.text.toLowerCase())) {
                this.diagnostics.push(Object.assign(Object.assign({}, DiagnosticMessages_1.DiagnosticMessages.constNameCannotBeReservedWord()), { range: name.range }));
            }
            this.consume(DiagnosticMessages_1.DiagnosticMessages.expectedEqualAfterConstName(), TokenKind_1.TokenKind.Equal);
            let value = this.advance();
            //consume trailing newlines
            while (this.match(TokenKind_1.TokenKind.Newline)) { }
            return new CC.DeclarationChunk(name, value);
        }
        return this.hashIf();
    }
    /**
     * Parses tokens to produce an "if" chunk (including "else if" and "else" chunks) if possible,
     * otherwise falls back to `hashError`.
     * @returns an "if" chunk if one is detected, otherwise whatever `hashError` returns
     */
    hashIf() {
        if (this.match(TokenKind_1.TokenKind.HashIf)) {
            let startingLine = this.previous().range.start.line;
            let elseChunk;
            let ifCondition = this.advance();
            this.match(TokenKind_1.TokenKind.Newline);
            let thenChunk = this.nChunks();
            let elseIfs = [];
            while (this.match(TokenKind_1.TokenKind.HashElseIf)) {
                let condition = this.advance();
                this.match(TokenKind_1.TokenKind.Newline);
                elseIfs.push({
                    condition: condition,
                    thenChunks: this.nChunks()
                });
            }
            if (this.match(TokenKind_1.TokenKind.HashElse)) {
                this.match(TokenKind_1.TokenKind.Newline);
                elseChunk = this.nChunks();
            }
            this.consume(DiagnosticMessages_1.DiagnosticMessages.expectedHashElseIfToCloseHashIf(startingLine), TokenKind_1.TokenKind.HashEndIf);
            this.match(TokenKind_1.TokenKind.Newline);
            return new CC.HashIfStatement(ifCondition, thenChunk, elseIfs, elseChunk);
        }
        return this.hashError();
    }
    /**
     * Parses tokens to produce an "error" chunk (including the associated message) if possible,
     * otherwise falls back to a chunk of plain BrightScript.
     * @returns an "error" chunk if one is detected, otherwise whatever `brightScriptChunk` returns
     */
    hashError() {
        if (this.check(TokenKind_1.TokenKind.HashError)) {
            let hashErr = this.advance();
            let message = this.advance();
            return new CC.ErrorChunk(hashErr, message);
        }
        return this.brightScriptChunk();
    }
    /**
     * Parses tokens to produce a chunk of BrightScript.
     * @returns a chunk of plain BrightScript if any is detected, otherwise `undefined` to indicate
     *          that no non-conditional compilation directives were found.
     */
    brightScriptChunk() {
        let chunkTokens = [];
        while (!this.check(TokenKind_1.TokenKind.HashIf, TokenKind_1.TokenKind.HashElseIf, TokenKind_1.TokenKind.HashElse, TokenKind_1.TokenKind.HashEndIf, TokenKind_1.TokenKind.HashConst, TokenKind_1.TokenKind.HashError)) {
            let token = this.advance();
            if (token) {
                chunkTokens.push(token);
            }
            if (this.isAtEnd()) {
                break;
            }
        }
        if (chunkTokens.length > 0) {
            return new CC.BrightScriptChunk(chunkTokens);
        }
        else {
            return undefined;
        }
    }
    eof() {
        if (this.isAtEnd()) {
            return new CC.BrightScriptChunk([this.peek()]);
        }
        else {
            return undefined;
        }
    }
    /**
     * If the next token is any of the provided tokenKinds, advance and return true.
     * Otherwise return false
     */
    match(...tokenKinds) {
        for (let tokenKind of tokenKinds) {
            if (this.check(tokenKind)) {
                this.advance();
                return true;
            }
        }
        return false;
    }
    consume(diagnosticInfo, ...tokenKinds) {
        let foundTokenKind = tokenKinds
            .map(tokenKind => this.peek().kind === tokenKind)
            .reduce((foundAny, foundCurrent) => foundAny || foundCurrent, false);
        if (foundTokenKind) {
            return this.advance();
        }
        else {
            this.diagnostics.push(Object.assign(Object.assign({}, diagnosticInfo), { range: this.peek().range }));
            throw new Error(this.diagnostics[this.diagnostics.length - 1].message);
        }
    }
    advance() {
        if (!this.isAtEnd()) {
            this.current++;
        }
        return this.previous();
    }
    check(...tokenKinds) {
        if (this.isAtEnd()) {
            return false;
        }
        return tokenKinds.some(tokenKind => this.peek().kind === tokenKind);
    }
    isAtEnd() {
        return this.peek().kind === TokenKind_1.TokenKind.Eof;
    }
    peek() {
        return this.tokens[this.current];
    }
    previous() {
        return this.tokens[this.current - 1];
    }
}
exports.PreprocessorParser = PreprocessorParser;
//# sourceMappingURL=PreprocessorParser.js.map