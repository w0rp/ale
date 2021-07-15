"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAlphaNumeric = exports.isAlpha = exports.isHexDigit = exports.isDecimalDigit = void 0;
/**
 * Determines whether or not a single-character string is a base-10 digit.
 *
 * @param char a single-character string that might contain a base-10 digit.
 * @returns `true` if `char` is between 0 and 9 (inclusive), otherwise `false`.
 */
function isDecimalDigit(char) {
    if (char.length > 1) {
        throw new Error(`Lexer#isDecimalDigit expects a single character; received '${char}'`);
    }
    return char >= '0' && char <= '9';
}
exports.isDecimalDigit = isDecimalDigit;
/**
 * Determines whether or not a single-character string is a base-16 digit.
 *
 * @param char a single-character string that might contain a base-16 digit.
 * @returns `true` if `char` matches `/[a-fA-F0-9]/` otherwise `false`.
 */
function isHexDigit(char) {
    if (char.length > 1) {
        throw new Error(`Lexer#isHexDigit expects a single character; received '${char}'`);
    }
    let c = char.toLowerCase();
    return isDecimalDigit(c) || (c >= 'a' && c <= 'f');
}
exports.isHexDigit = isHexDigit;
/**
 * Determines whether a single-character string is alphabetic (or `_`).
 *
 * @param char a single-character string that might contain an alphabetic character.
 * @returns `true` if `char` is between "a" and "z" or "A" and "Z" (inclusive), or is `_`,
 *          otherwise false.
 */
function isAlpha(char) {
    if (char.length > 1) {
        throw new Error(`Lexer#isAlpha expects a single character; received '${char}'`);
    }
    let c = char.toLowerCase();
    return (c >= 'a' && c <= 'z') || c === '_';
}
exports.isAlpha = isAlpha;
/**
 * Determines whether a single-character string is alphanumeric (or `_`).
 *
 * @param char a single-character string that might contain an alphabetic or numeric character.
 * @returns `true` if `char` is alphabetic, numeric, or `_`, otherwise `false`.
 */
function isAlphaNumeric(char) {
    if (char.length > 1) {
        throw new Error(`Lexer#isAlphaNumeric expects a single character; received '${char}'`);
    }
    return isAlpha(char) || isDecimalDigit(char);
}
exports.isAlphaNumeric = isAlphaNumeric;
//# sourceMappingURL=Characters.js.map