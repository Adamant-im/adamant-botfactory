import axios from 'axios';
import {BitcoinBase} from './base';

export const TX_FEE = 0.0001;

class DashApiError extends Error {
  constructor(requests, error) {
    super('Dash API returned an error');

    this.code = 'DASH_API';
    this.requests = requests;
    this.details = error;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DashApiError);
    }
  }
}

export class DashApi extends BitcoinBase {
  constructor(options) {
    super('dash');

    this.address = options.address;
    this.keyPair = options.keyPair;
    this.network = options.network;
  }

  getFee() {
    return TX_FEE;
  }

  async getBalance(address) {
    const addr = this.address ?? address;

    const result = await this._invoke('getaddressbalance', [addr]);

    return Number(result.balance) / this.multiplier;
  }

  async sendTransaction(txHex) {
    const result = await this._invoke('sendrawtransaction', [txHex]);

    return result;
  }

  async getTransaction(txid) {
    const result = await this._invoke('getrawtransaction', [txid, true]);

    return this._mapTransaction(result);
  }

  async getTransactions({excludes = []}) {
    const txids = await this._invoke('getaddresstxids', [this.address]);

    const calls = txids
        .filter((id) => !excludes.includes(id))
        .map((id) => ({
          method: 'getrawtransaction',
          params: [id, true],
        }));

    const results = this._invokeMany(calls);
    const items = results
        .filter((data) => !data.error && data.result)
        .map((data) => this._mapTransaction(data.result));

    return ({hasMore: false, items});
  }

  async getUnspents() {
    const result = await this._invoke('getaddressutxos', [this.address]);

    if (!Array.isArray(result)) {
      return [];
    }

    return result.map((tx) => ({
      txid: tx.txid,
      amount: tx.satoshis,
      vout: tx.outputIndex,
    }));
  }

  _mapTransaction(tx) {
    tx.vin = tx.vin.map((x) => ({...x, addr: x.address}));

    return super._mapTransaction(tx);
  }

  async _invoke(method, params) {
    const options = {method, params};

    const {data} = await axios.post('/', options);

    if (data.error) {
      throw new DashApiError([options], data.error);
    }

    return data.result;
  }

  async _invokeMany(calls) {
    const {data} = await axios.post('/', calls);

    if (data.error) {
      throw new DashApiError(calls, data.error);
    }

    return data.result;
  }
}
