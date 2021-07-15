"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Characters = require("./Characters");
describe('lexer/Characters', () => {
    it('isDecimalDigit throws when when given > 1 length string', () => {
        chai_1.assert.throws(() => {
            Characters.isDecimalDigit('11');
        });
    });
    it('isHexDigit throws when when given > 1 length string', () => {
        chai_1.assert.throws(() => {
            Characters.isHexDigit('ab');
        });
    });
    it('isAlpha throws when when given > 1 length string', () => {
        chai_1.assert.throws(() => {
            Characters.isAlpha('ab');
        });
    });
    it('isAlphaNumeric throws when when given > 1 length string', () => {
        chai_1.assert.throws(() => {
            Characters.isAlphaNumeric('a1');
        });
    });
});
//# sourceMappingURL=Character.spec.js.map