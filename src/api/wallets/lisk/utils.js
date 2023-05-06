/**
 * Returns Millis timestamp by LSK UNIX timestamp (sec)
 * @param {number} liskTimestamp
 * @return {number}
 */
export function getMillisTimestamp(liskTimestamp) {
  return parseInt(liskTimestamp) * 1000;
}

/**
 * Returns LSK timestamp (UNIX in sec) by Millis timestamp
 * @param {number} millisTimestamp
 * @return {number}
 */
export function getLiskTimestamp(millisTimestamp) {
  return Math.round(parseInt(millisTimestamp) / 1000);
}

/**
 * Converts a bytes array to the respective string representation
 * @param {Array<number>|Uint8Array} bytes bytes array
 * @return {string}
 */
export function bytesToHex(bytes = []) {
  const hex = [];

  bytes.forEach((b) => {
    hex.push((b >>> 4).toString(16));
    hex.push((b & 0xF).toString(16));
  });

  return hex.join('');
}
