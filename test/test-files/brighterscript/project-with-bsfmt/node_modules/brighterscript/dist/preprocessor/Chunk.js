"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorChunk = exports.HashIfStatement = exports.DeclarationChunk = exports.BrightScriptChunk = void 0;
const util_1 = require("../util");
/** A series of BrightScript tokens that will be parsed and interpreted directly. */
class BrightScriptChunk {
    constructor(tokens) {
        this.tokens = tokens;
    }
    accept(visitor) {
        return visitor.visitBrightScript(this);
    }
}
exports.BrightScriptChunk = BrightScriptChunk;
/**
 * A conditional compilation directive that declares a constant value that's in-scope only during
 * preprocessing.
 *
 * Typically takes the form of:
 *
 * @example
 * #const foo = true
 */
class DeclarationChunk {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    accept(visitor) {
        return visitor.visitDeclaration(this);
    }
}
exports.DeclarationChunk = DeclarationChunk;
/**
 * A directive that adds the "conditional" to "conditional compilation". Typically takes the form
 * of:
 *
 * @example
 * #if foo
 *     someBrightScriptGoesHere()
 * #else if bar
 *     compileSomeOtherCode()
 * #else
 *     otherwise("compile this!")
 * #end if
 */
class HashIfStatement {
    constructor(condition, thenChunks, elseIfs, elseChunks) {
        this.condition = condition;
        this.thenChunks = thenChunks;
        this.elseIfs = elseIfs;
        this.elseChunks = elseChunks;
    }
    accept(visitor) {
        return visitor.visitIf(this);
    }
}
exports.HashIfStatement = HashIfStatement;
/**
 * A forced BrightScript compilation error with a message attached.  Typically takes the form of:
 *
 * @example
 * #error Some message describing the error goes here.
 */
class ErrorChunk {
    constructor(hashError, message) {
        var _a;
        this.hashError = hashError;
        this.message = message;
        this.range = util_1.default.createRangeFromPositions(this.hashError.range.start, ((_a = this.message) !== null && _a !== void 0 ? _a : this.hashError).range.end);
    }
    accept(visitor) {
        return visitor.visitError(this);
    }
}
exports.ErrorChunk = ErrorChunk;
//# sourceMappingURL=Chunk.js.map