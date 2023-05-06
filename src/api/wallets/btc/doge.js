import BigNumber from 'bignumber.js';
import {BitcoinBase} from './base.js';

export const TX_FEE = 1;
export const CHUNK_SIZE = 20;

export class DogeApi extends BitcoinBase {
  constructor(options) {
    super('doge');

    this.address = options.address;
    this.keyPair = options.keyPair;
    this.network = options.network;
  }

  getFee() {
    return TX_FEE;
  }

  async getBalance(address) {
    const addr = address ?? this.address;

    const balance = await this._get(`/addr/${addr}/balance`);

    return Number(balance) / this.multiplier;
  }

  async sendTransaction(rawtx) {
    const response = await this._post('/tx/send', {rawtx});

    return response.txid;
  }

  async getTransaction(txid) {
    const transaction = await this._get(`/tx/${txid}`);

    return this._mapTransaction(transaction);
  }

  async getTransactions({from = 0, address}) {
    const to = from + CHUNK_SIZE;
    const addr = address ?? this.address;

    const transactions = await this._get(`/addrs/${addr}/txs`, {
      from, to,
    });

    const {totalItems, items} = transactions;

    transactions.hasMore = to < totalItems;
    transactions.items = items.map((tx) => this._mapTransaction(tx));

    return transactions;
  }

  async getUnspents(address) {
    const addr = address ?? this.address;

    const unspents = await this._get(`/addr/${addr}/utxo?noCache=1`);

    for (const tx of unspents) {
      tx.amount = new BigNumber(tx.amount)
          .times(this.multiplier)
          .toNumber();
    }

    return unspents;
  }
}
