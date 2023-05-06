import {BitcoinBase} from './base';

export class BitcoinApi extends BitcoinBase {
  constructor() {
    super('bitcoin');
  }

  getFee() {
    return 0;
  }

  async getBalance() {
    const data = await this._get(`/address/${this.address}`);

    return (data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum) / this.multiplier;
  }

  async getHeight() {
    const height = await this._get('/blocks/tip/height');

    return Number(height) || 0;
  }

  async sendTransaction(txHex) {
    const data = await this._post('/tx', txHex);

    return data;
  }

  async getTransaction(txid) {
    const transaction = await this._get(`/tx/${txid}`);

    return this._mapTransaction(transaction);
  }

  async getTransactions({address, toTx = ''}) {
    let url = `/address/${address ?? this.address}/txs`;

    if (toTx) {
      url += `/chain/${toTx}`;
    }

    const transactions = await this._get(url);

    return transactions.map(this._mapTransaction);
  }

  async getUnspents(address) {
    const addr = address ?? this.address;
    const outputs = await this._get(`/address/${addr}/utxo`);

    return outputs.map((tx) => ({txid: tx.txid, amount: tx.value, vout: tx.vout}));
  }

  async getFeeRate() {
    const estimates = await this._get('/fee-estimates');

    return estimates['2'];
  }

  _mapTransaction(tx) {
    const mapped = super._mapTransaction({
      ...tx,
      vin: tx.vin.map((x) => ({...x, addr: x.prevout.scriptpubkey_address})),
      vout: tx.vout.map((x) => ({
        ...x,
        scriptPubKey: {addresses: [x.scriptpubkey_address]},
      })),
      fees: tx.fee,
      time: tx.status.block_time,
      confirmations: tx.status.confirmed ? 1 : 0,
    });

    mapped.amount /= this.multiplier;
    mapped.fee /= this.multiplier;
    mapped.height = tx.status.block_height;

    return mapped;
  }
}
