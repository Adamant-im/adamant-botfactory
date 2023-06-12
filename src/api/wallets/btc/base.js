import BigNumber from 'bignumber.js';
import bitcoin from 'bitcoinjs-lib';
import qs from 'qs';

import {ClientApi} from '../client.js';
import {isPositiveNumber} from '../../../utils.js';

const getUnique = (array) => [...new Set(array)];
const isDefined = (value) => String(value) !== 'undefined';

const POST_CONFIG = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

export class BitcoinBase extends ClientApi {
  constructor(name) {
    super(name);
  }

  get multiplier() {
    return 1e8;
  }

  async _post(endpoint, data) {
    const url = `${this.baseURL}${endpoint}`;
    const params = qs.stringify(data);

    const response = await this.client.post(url, params, POST_CONFIG);

    return response.data;
  }

  async createTransaction(address = '', amount = 0, fee) {
    const unspents = await this.getUnspents();

    const hex = this._buildTransaction(address, amount, unspents, fee);

    let txid = bitcoin.crypto.sha256(Buffer.from(hex, 'hex'));
    txid = bitcoin.crypto.sha256(Buffer.from(txid));
    txid = txid.toString('hex').match(/.{2}/g).reverse().join('');

    return {hex, txid};
  }

  _buildTransaction(address, amount, unspents, fee) {
    amount = new BigNumber(amount).times(this.multiplier).toNumber();
    amount = Math.floor(amount);

    const txb = new bitcoin.TransactionBuilder(this.network);
    txb.setVersion(1);

    const target = amount + new BigNumber(fee).times(this.multiplier).toNumber();
    let transferAmount = 0;
    let inputs = 0;

    unspents.forEach((tx) => {
      const amt = Math.floor(tx.amount);
      if (transferAmount < target) {
        txb.addInput(tx.txid, tx.vout);
        transferAmount += amt;
        inputs++;
      }
    });

    txb.addOutput(bitcoin.address.toOutputScript(address, this.network), amount);

    const change = transferAmount - target;
    if (isPositiveNumber(change)) {
      txb.addOutput(this.address, change);
    }

    for (let i = 0; i < inputs; ++i) {
      txb.sign(i, this.keyPair);
    }

    return txb.build().toHex();
  }

  _mapTransaction(tx) {
    // Remove invalid txs like "possibleDoubleSpend" and txs without info
    if (tx.possibleDoubleSpend || (!tx.txid && !tx.time && !tx.valueIn && !tx.vin)) return;

    const addressField = tx.vin[0].address ? 'address' : 'addr';
    const senders = getUnique(tx.vin.map((input) => input[addressField])).filter(isDefined);

    const direction = senders.includes(this._address) ? 'from' : 'to';

    const recipients = getUnique(tx.vout.reduce((list, out) => {
      list.push(...out.scriptPubKey.addresses);
      return list;
    }, [])).filter(isDefined);

    if (direction === 'from') {
      // Disregard our address for an outgoing transaction unless it's the only address (i.e. we're sending to ourselves)
      const idx = recipients.indexOf(this._address);
      if (idx >= 0 && recipients.length > 1) recipients.splice(idx, 1);
    }

    if (direction === 'to' && senders.length === 1) {
      // Disregard the only sender address for an incoming transaction unless it's the only address (i.e. we're sending to ourselves)
      const idx = recipients.indexOf(senders[0]);
      if (idx >= 0 && recipients.length > 1) recipients.splice(idx, 1);
    }

    let senderId; let recipientId;
    if (direction === 'from') {
      senderId = this._address;
      recipientId = recipients.length === 1 ? recipients[0] : undefined;
    } else {
      senderId = senders.length === 1 ? senders[0] : undefined;
      recipientId = this._address;
    }

    // Calculate amount from outputs:
    // * for the outgoing transactions take outputs that DO NOT target us
    // * for the incoming transactions take outputs that DO target us
    const amount = tx.vout.reduce((sum, t) =>
      ((direction === 'to') === (t.scriptPubKey.addresses.includes(this._address)) ? sum + Number(t.value) : sum), 0);

    const confirmations = tx.confirmations;
    const timestamp = tx.time ? tx.time * 1000 : undefined;

    let fee = tx.fees;
    if (!fee) {
      const totalIn = tx.vin.reduce((sum, x) => sum + (x.value ? +x.value : 0), 0);
      const totalOut = tx.vout.reduce((sum, x) => sum + (x.value ? +x.value : 0), 0);
      fee = totalIn - totalOut;
    }

    const height = tx.height;

    return {
      id: tx.txid,
      hash: tx.txid,
      fee,
      status: confirmations > 0 ? 'CONFIRMED' : 'REGISTERED',
      timestamp,
      direction,
      senders,
      senderId,
      recipients,
      recipientId,
      amount,
      confirmations,
      height,
      instantlock: tx.instantlock,
      instantlock_internal: tx.instantlock_internal,
      instantsend: tx.instantlock,
    };
  }
}
