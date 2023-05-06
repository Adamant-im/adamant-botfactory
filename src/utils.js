/**
 * Checks if number is finite
 * @param {number} value Number to validate
 * @return {boolean}
 */
export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value) && Number.isFinite(value);
}

/**
 * Checks if number is finite and greater, than 0
 * @param {number} value Number to validate
 * @return {boolean}
 */
export function isPositiveNumber(value) {
  return isNumber(value) && value > 0;
}

/**
 * Compares two strings, case insensitive
 * @param {string} string1
 * @param {string} string2
 * @return {boolean} true, if strings are equal, case insensitive
 */
export function isStringEqualCI(string1, string2) {
  if (typeof string1 !== 'string' || typeof string2 !== 'string') return false;
  return string1.toUpperCase() === string2.toUpperCase();
}
