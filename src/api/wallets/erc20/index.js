import axios from 'axios';
import Web3Eth from 'web3-eth';

import abiDecoder from 'abi-decoder';

import {
  calculateFee,
  toEther,
  getTotalFromRange,
  toFraction,
  toWei,
  toWhole,
} from './utils.js';
import {servers} from '../../const.js';

import Erc20 from './erc20.abi.js';

abiDecoder.addABI(Erc20);

export const INCREASE_FEE_MULTIPLIER = 2;

const cache = {};

function parseTxFromIndex(tx, decimals) {
  const hash = tx.txhash.replace(/^.*x/, '0x').toLowerCase();

  const recipientId = tx.contract_to ?
    '0x' + tx.contract_to.substr(-40) :
    tx.txto.toLowerCase();

  const value = tx.contract_value ?
    parseInt(tx.contract_value, 16) :
    tx.value;

  return {
    id: hash,
    hash,
    senderId: tx.txfrom.toLowerCase(),
    recipientId,
    amount: toFraction(value, decimals),
    fee: calculateFee(tx.gas, tx.gasprice || tx.effectiveGasPrice),
    status: 'CONFIRMED',
    timestamp: tx.time * 1000,
    blockNumber: tx.block,
    time: tx.time,
  };
}

export class Erc20Api {
  constructor(options) {
    this.crypto = options.crypto;
    this.decimals = options.decimals;
    this.contractAddress = options.contractAddress;

    this.address = options.address;
    this.privateKey = options.privateKey;

    const url = servers['eth'];

    this.api = new Web3Eth(url);
    this.url = url;
  }

  async getBalance(address) {
    const balance = await this.api.getBalance(address ?? this.address);

    return Number(balance) || 0;
  }

  async sendTransaction({amount, address, increaseFee}) {
    const ethTx = await this.initTransaction(address, amount, increaseFee);
    const signedTx = await this.api.accounts.signTransaction(ethTx, this.privateKey);

    let hash = await this.api.sendSignedTransaction(signedTx.rawTransaction);

    if (typeof hash === 'object') {
      ethTx.gasPrice = hash.effectiveGasPrice;
      hash = hash.transactionHash;
    }

    return {
      hash,
      senderId: ethTx.from,
      recipientId: address,
      amount,
      fee: calculateFee(ethTx.gas, ethTx.gasPrice),
      status: 'PENDING',
      timestamp: Date.now(),
      gasPrice: ethTx.gasPrice,
    };
  }

  async initTransaction(to, amount, increaseFee) {
    const contract = new this.api.Contract(Erc20, this.contractAddress);

    const transaction = {
      from: this.address,
    };

    if (this.contractAddress) {
      transaction.to = this.contractAddress;
      transaction.value = '0x0';
      transaction.data = contract.methods.transfer(to, toWhole(amount, this.decimals)).encodeABI();
    } else {
      transaction.to = to;
      transaction.value = toWei(amount);
    }

    const gasLimit = await this.api.estimateGas(transaction);

    const increasedGasLimit = increaseFee ?
      gasLimit * INCREASE_FEE_MULTIPLIER :
      gasLimit;

    transaction.gas = increasedGasLimit;

    return transaction;
  }

  async getTransaction(txid) {
    const transaction = await this.api.getTransaction(txid);

    return this._mapTransaction(transaction);
  }

  async getTransactions(options) {
    const {address, contract, from, to, limit, decimals} = options;

    const addr = address ?? this.address;

    const filters = [];

    if (contract) {
      filters.push(
          `txto.eq.${contract}`,
          `or(txfrom.eq.${addr},contract_to.eq.000000000000000000000000${addr.replace('0x', '')})`,
      );
    } else {
      filters.push(
          'contract_to.eq.',
          `or(txfrom.eq.${addr},txto.eq.${addr})`,
      );
    }

    if (from) {
      filters.push(`time.gte.${from}`);
    }

    if (to) {
      filters.push(`time.lte.${to}`);
    }

    const filterString = filters.join(',');

    if (!cache[filterString]) {
      const params = {
        and: `(${filters.join(',')})`,
        order: 'time.desc',
      };

      if (limit) {
        params.limit = limit;
      }

      const config = {
        params,
        url: this.url,
      };

      try {
        const {data, headers} = await axios.request(config);
        delete cache[filterString];

        const range = headers['content-range'];
        const total = getTotalFromRange(range);

        return {
          total,
          items: data.map((x) => parseTxFromIndex(x, decimals)),
        };
      } catch (error) {
        delete cache[filterString];
        return Promise.reject(error);
      }
    }

    return cache[filterString];
  }

  _mapTransaction(tx) {
    let recipientId = null;
    let amount = null;

    if (this.contractAddress) {
      const decoded = abiDecoder.decodeMethod(tx.input);

      if (decoded && decoded.name === 'transfer') {
        decoded.params.forEach((x) => {
          if (x.name === '_to') {
            recipientId = x.value;
          }

          if (x.name === '_value') {
            amount = toFraction(x.value, this.decimals);
          }
        });
      }
    } else {
      amount = toEther(tx.value.toString());
    }

    const fee = calculateFee(tx.gas, (tx.gasPrice || tx.effectiveGasPrice).toString(10));

    const direction = tx.from === this.address ? 'from' : 'to';
    const status = !tx.blockHash ? 'REGISTERED' : 'CONFIRMED';

    return {
      fee,
      status,
      direction,
      amount,
      id: tx.hash,
      hash: tx.hash,
      senderId: tx.from,
      recipientId: recipientId ?? tx.to,
      height: tx.blockNumber,
    };
  }
}
