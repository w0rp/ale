/**
 * Determines whether or not a single-character string is a base-10 digit.
 *
 * @param char a single-character string that might contain a base-10 digit.
 * @returns `true` if `char` is between 0 and 9 (inclusive), otherwise `false`.
 */
export declare function isDecimalDigit(char: string): boolean;
/**
 * Determines whether or not a single-character string is a base-16 digit.
 *
 * @param char a single-character string that might contain a base-16 digit.
 * @returns `true` if `char` matches `/[a-fA-F0-9]/` otherwise `false`.
 */
export declare function isHexDigit(char: string): boolean;
/**
 * Determines whether a single-character string is alphabetic (or `_`).
 *
 * @param char a single-character string that might contain an alphabetic character.
 * @returns `true` if `char` is between "a" and "z" or "A" and "Z" (inclusive), or is `_`,
 *          otherwise false.
 */
export declare function isAlpha(char: string): boolean;
/**
 * Determines whether a single-character string is alphanumeric (or `_`).
 *
 * @param char a single-character string that might contain an alphabetic or numeric character.
 * @returns `true` if `char` is alphabetic, numeric, or `_`, otherwise `false`.
 */
export declare function isAlphaNumeric(char: string): boolean;
