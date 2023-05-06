import BigNumber from 'bignumber.js';
import web3Utils from 'web3-utils';


/**
 * Converts Wei amount to Ether.
 * @param {string | number} wei Wei amount
 * @return {string}
 */
export function toEther(wei) {
  return web3Utils.fromWei(String(wei), 'ether');
}

/**
 * Converts Ether amount to Wei.
 * @param {string | number} eth Ether amount
 * @return {string}
 */
export function toWei(eth) {
  return web3Utils.toWei(String(eth), 'ether');
}

/**
 * Transforms amount in token to sats.
 * Used for ERC20 tokens. I. e., 1.00035 RES = 100035 res-sats.
 * @param {string|number} amount value in token
 * @param {string|number} decimals decimal places for token's contract
 * @return {string} value in sats
 */
export function toWhole(amount, decimals) {
  let [whole, fraction] = Number(amount).toFixed(decimals).replace(/0+$/, '').split('.');
  if (!whole) whole = '0';
  if (!fraction) fraction = '0';

  while (decimals - fraction.length > 0) {
    fraction += '0';
  }

  const num = new BigNumber(whole, 10)
      .times(new BigNumber(10, 10).pow(new BigNumber(decimals, 10)))
      .plus(new BigNumber(fraction, 10))
      .toString(10);

  return num;
}

/**
 * Calculates Tx fee in ETH (not in wei) based on gas price and used gas.
 * @param {string|number} gasUsed used gas, generally number, i. e., 51823
 * @param {string|number} gasPrice gas price in wei. May be string, hex or dec number, i. e., "0x342770c00" (14000000000 wei)
 * @return {string} fee in ETH
 */
export function calculateFee(gasUsed, gasPrice) {
  // After London hardfork we may not receive gasPrice. Still we change gasPrice to effectiveGasPrice where it's possible
  if (!gasPrice) return '0';
  const gas = new BigNumber(gasUsed, 10);
  const price = new BigNumber(gasPrice, 10);
  const fee = gas.times(price).toString(10);
  return toEther(fee);
}

/**
 * Parses the content range to extract the total count of records
 * @param {string} range range to parse
 * @return {number}
 */
export function getTotalFromRange(range = '') {
  const index = range.indexOf('/');

  if (index >= 0) {
    return Number(range.slice(index + 1, range.length - 1));
  }

  return NaN;
}

/**
 * Transforms amount in token-sats to token.
 * Used for ERC20 tokens. I. e., 100035 res-sats = 1.00035 RES.
 * @param {string|number} amount value in sats
 * @param {string|number} decimals decimal places for token's contract
 * @param {string} separator decimal separator sign
 * @return {string} value in token
 */
export function toFraction(amount, decimals, separator = '.') {
  amount = `${amount}`;
  const len = amount.length;

  const whole = len <= decimals ?
    '0' :
    amount.slice(0, amount.length - decimals).replace(/^0+/, '') || '0';

  let fraction = len <= decimals ? amount : amount.slice(amount.length - decimals);

  while (fraction.length < decimals) {
    fraction = '0' + fraction;
  }

  fraction = fraction.replace(/0+$/, '');

  return whole + (fraction ? separator + fraction : '');
}
