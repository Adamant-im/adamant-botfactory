import * as cryptography from '@liskhq/lisk-cryptography';
import * as transactions from '@liskhq/lisk-transactions';

import {ClientApi} from '../client.js';

import {isStringEqualCI} from '../../../utils.js';
import {
  getMillisTimestamp,
  getLiskTimestamp,
  bytesToHex,
} from './utils.js';

export const TX_CHUNK_SIZE = 25;

export class LiskApi extends ClientApi {
  constructor(account) {
    super('lisk');

    this.network = account.network;
    this.keyPair = account.keyPair;
    this.address = account.address;
    this.addressHexBinary = account.addressHexBinary;
    this.addressHex = account.addressHex;
  }

  get decimals() {
    return 8;
  }

  get multiplier() {
    return 1e8;
  }

  get moduleId() {
    return 2;
  }

  get assetId() {
    return 0;
  }

  get networkIdentifier() {
    // Testnet: '15f0dacc1060e91818224a94286b13aa04279c640bd5d6f193182031d133df7c'
    // Mainnet: '4c09e6a781fc4c7bdb936ee815de8f94190f8a7519becd9de2081832be309a99'
    const networkIdentifier = '4c09e6a781fc4c7bdb936ee815de8f94190f8a7519becd9de2081832be309a99';
    return Buffer.from(networkIdentifier, 'hex');
  }

  get assetSchema() {
    return {
      $id: 'lisk/transfer-asset',
      title: 'Transfer transaction asset',
      type: 'object',
      required: ['amount', 'recipientAddress', 'data'],
      properties: {
        amount: {
          dataType: 'uint64',
          fieldNumber: 1,
        },
        recipientAddress: {
          dataType: 'bytes',
          fieldNumber: 2,
          minLength: 20,
          maxLength: 20,
        },
        data: {
          dataType: 'string',
          fieldNumber: 3,
          minLength: 0,
          maxLength: 64,
        },
      },
    };
  }

  async getAccount() {
    const data = await this._get(`/api/accounts/${this.addressHex}`);

    const account = {};

    if (data?.data?.token?.balance) {
      account.balance = (data.data.token.balance) / this.multiplier;
    }

    if (data?.data?.sequence?.nonce) {
      account.nonce = data.data.sequence.nonce;
    }

    return account;
  }

  async getHeight() {
    const data = await this._get('/api/node/info');

    return Number(data?.data?.height) || 0;
  }

  async getTransaction(transactionId) {
    const data = await this._getService('/api/v2/transactions/', {transactionId});

    if (data && data?.data[0]) {
      return this._mapTransaction(data.data[0]);
    }
  }

  async getTransactions(options = {}) {
    const url = '/api/v2/transactions/';

    const request = {
      moduleAssetId: `${this.moduleId}:${this.assetId}`,
      limit: TX_CHUNK_SIZE,
      address: this.address,
      ...options,
    };

    if (request.toTimestamp || request.fromTimestamp) {
      const toTimestamp = request.toTimestamp || Date.now();
      const fromTimestamp = request.fromTimestamp || 0;

      request.timestamp = `${getLiskTimestamp(fromTimestamp) + 1}:${getLiskTimestamp(toTimestamp) - 1}`;
    }

    delete request.toTimestamp;
    delete request.fromTimestamp;

    // additional options: offset, height, and others
    try {
      const transactions = await this._getService(url, request);

      if (transactions?.data) {
        const mappedTxs = transactions.data.map((tx) => this._mapTransaction(tx));

        return mappedTxs;
      }
    } catch (error) {
      return [];
    }
  }

  async sendTransaction(signedTx) {
    const response = await this._post('/api/transactions', signedTx);

    return response.data.data.transactionId;
  }

  /**
   * Creates a transfer transaction hex (signed JSON tx object) and ID
   * Signed JSON tx object is ready for broadcasting to blockchain network
   * @override
   * @param {string} address receiver address in Base32 format
   * @param {number} amount amount to transfer (coins, not satoshis)
   * @param {number} fee transaction fee (coins, not satoshis)
   * @param {number} nonce transaction nonce
   * @param {string} data transaction data field
   * @return {Promise<{hex: string, txid: string}>}
   */
  createTransaction(address = '', amount = 0, fee, nonce, data = '') {
    const liskTx = this._buildTransaction(address, amount, fee, nonce, data).liskTx;

    // To use transactions.signTransaction, passPhrase is necessary
    // So we'll use cryptography.signDataWithPrivateKey
    const liskTxBytes = transactions.getSigningBytes(this.assetSchema, liskTx);
    const txSignature = cryptography.signDataWithPrivateKey(Buffer.concat([this.networkIdentifier, liskTxBytes]), this.keyPair.secretKey);

    liskTx.signatures[0] = txSignature;
    const txid = bytesToHex(cryptography.hash(transactions.getBytes(this.assetSchema, liskTx)));

    // To send Tx to node's core API, we should change data types
    liskTx.senderPublicKey = bytesToHex(liskTx.senderPublicKey);
    liskTx.nonce = nonce.toString();
    liskTx.fee = transactions.convertLSKToBeddows((+fee).toFixed(this.decimals));
    liskTx.asset.amount = transactions.convertLSKToBeddows((+amount).toFixed(this.decimals));
    liskTx.asset.recipientAddress = bytesToHex(liskTx.asset.recipientAddress);
    liskTx.signatures[0] = bytesToHex(txSignature);

    return Promise.resolve({hex: liskTx, txid});
  }

  _buildTransaction(address, amount, fee, nonce, data = '') {
    const amountString = transactions.convertLSKToBeddows((+amount).toFixed(this.decimals));
    const feeString = transactions.convertLSKToBeddows((+fee).toFixed(this.decimals));
    const nonceString = nonce.toString();
    const liskTx = {
      moduleID: this.moduleId,
      assetID: this.assetId,
      nonce: BigInt(nonceString),
      fee: BigInt(feeString),
      asset: {
        amount: BigInt(amountString),
        recipientAddress: cryptography.getAddressFromBase32Address(address),
        data,
        // data: 'Sent with ADAMANT Messenger'
      },
      signatures: [],
    };
    liskTx.senderPublicKey = this.keyPair.publicKey;
    const minFee = Number(transactions.computeMinFee(this.assetSchema, liskTx)) / this.multiplier;

    return {liskTx, minFee};
  }

  _mapTransaction(tx) {
    const direction = isStringEqualCI(tx.sender.address, this.address) ? 'from' : 'to';
    // no confirmations field
    // additional data: asset, receivedAt, blockId, height, type, recipientPublicKey, senderSecondPublicKey
    return {
      direction,
      id: tx.id,
      hash: tx.id,
      fee: tx.fee / this.multiplier,
      status: tx.height ? 'CONFIRMED' : 'REGISTERED',
      data: tx.asset.data,
      timestamp: getMillisTimestamp(tx.block.timestamp),
      senderId: tx.sender.address,
      recipientId: tx.asset.recipient.address,
      amount: tx.asset.amount / this.multiplier,
      confirmations: tx.confirmations,
      height: tx.height,
      nonce: tx.nonce,
      moduleId: tx.moduleAssetId.split(':')[0],
      assetId: tx.moduleAssetId.split(':')[1],
      moduleName: tx.moduleAssetName.split(':')[0],
      assetName: tx.moduleAssetName.split(':')[1],
    };
  }
}
