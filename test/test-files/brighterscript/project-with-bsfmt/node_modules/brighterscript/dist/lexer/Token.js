"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isToken = void 0;
/**
 * Determines whether or not `obj` is a `Token`.
 * @param obj the object to check for `Token`-ness
 * @returns `true` is `obj` is a `Token`, otherwise `false`
 */
function isToken(obj) {
    return !!(obj.kind && obj.text && obj.range);
}
exports.isToken = isToken;
//# sourceMappingURL=Token.js.map