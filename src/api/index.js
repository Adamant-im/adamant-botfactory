import adamantApi from 'adamant-api';
import keys from 'adamant-api/keys.js';

const defaultOptions = {
  logger: console,
};

export class Api {
  constructor(passPhrase, options = {}) {
    this.passPhrase = passPhrase;

    const keyPair = keys.createKeypairFromPassPhrase(passPhrase);
    const address = keys.createAddressFromPublicKey(keyPair.publicKey);

    this.address = address;

    this.options = {
      ...defaultOptions,
      ...options,
    };

    this.initApi();
  }

  initApi() {
    const {logger, nodes: node} = this.options;
    const {logLevel} = logger;

    const apiOptions = {
      node,
      logLevel,
    };

    this.api = adamantApi(apiOptions, logger);
  }

  listen(onNewMessage) {
    const {api, options} = this;

    const wsType = options.enableSSL ? 'wss' : 'ws';

    api.socket.initSocket({
      wsType,
      onNewMessage,
      socket: true,
      admAddress: this.address,
    });
  }

  async decode(transaction) {
    const {transactionTypes} = this.api.constants;

    if (transaction?.type !== transactionTypes.CHAT_MESSAGE) {
      return {
        success: false,
        error: 'Not a message transaction',
      };
    }

    if (transaction.asset?.chat.own_message) {
      const readerAddress = this.address;

      if (
        ![transaction.senderId, transaction.recipientId].includes(readerAddress)
      ) {
        return transaction;
      }

      const recipientName =
        transaction.senderId === readerAddress
          ? transaction.recipientId
          : transaction.senderId;

      const publicKey = await this.api.getPublicKey(recipientName);

      if (publicKey) {
        const decoded = this.api.decodeMsg(
          transaction.asset.chat.message,
          publicKey,
          this.passPhrase,
          transaction.asset.chat.own_message
        );

        transaction.asset.chat.message = decoded;

        delete transaction.asset.chat.own_message;
      }
    }

    return transaction;
  }

  async _get(endpoint, options) {
    const response = this.api.get(endpoint, options);

    return response?.data;
  }

  getAccountInfo(options) {
    return this._get('accounts', options);
  }

  getAccountBalance(address) {
    return this._get('accounts/getBalance', {address});
  }

  getPublicKey(address) {
    return this.api.getPublicKey(address);
  }

  async getBlock(id) {
    return this._get('blocks/get', {id});
  }

  async getBlocks(options) {
    return this._get('blocks', options);
  }

  async getChats(address, options) {
    const addr = address ?? this.address;

    return this._get(`chatrooms/${addr}`, options);
  }

  async getChatMessages(address1, address2, options) {
    const query = typeof address2 === 'object' ? address2 : options;
    const address = typeof address2 === 'object' ? this.address : address2;

    return this._get(`chatrooms/${address}/${address1}`, query);
  }

  async getChatTransactions(senderId, options) {
    return this._get('chats/get', {senderId, ...options});
  }

  async getDelegates(options) {
    return this._get('delegates', options);
  }

  async getDelegate(options) {
    return this._get('delegates/get', options);
  }

  async searchDelegates(q) {
    return this._get('delegates/search', {q});
  }

  async getDelegatesCount() {
    return this._get('delegates/count');
  }

  async getDelegateStats(generatorPublicKey) {
    return this._get('delegates/forging/getForgedByAccount', {
      generatorPublicKey,
    });
  }

  async getNextForgers(limit) {
    return this._get('delegates/getNextForgers', {limit});
  }

  async getVoters(publicKey) {
    return this._get('delegates/voters', {publicKey});
  }

  async getVoteData(address) {
    return this._get('accounts/delegates', {address});
  }

  async registerDelegate(username) {
    const response = await this.api.newDelegate(this.passPhrase, username);
    return response;
  }

  async voteForDelegate(votes) {
    const response = await this.api.voteForDelegate(this.passPhrase, votes);
    return response;
  }

  async getPeers() {
    return this._get('peers');
  }

  async getLoadingStatus() {
    return this._get('loader/status');
  }

  async getSyncStatus() {
    return this._get('loader/status/sync');
  }

  async getPingStatus() {
    return this._get('loader/status/ping');
  }

  async getNodeVersion() {
    return this._get('peers/version');
  }

  async getBroadhash() {
    return this._get('blocks/getBroadhash');
  }

  async getEpoch() {
    return this._get('blocks/getEpoch');
  }

  async getHeight() {
    return this._get('blocks/getHeight');
  }

  async getFee() {
    return this._get('blocks/getFee');
  }

  async getFees() {
    return this._get('blocks/getFees');
  }

  async getNethash() {
    return this._get('blocks/getNethash');
  }

  async getMilestone() {
    return this._get('blocks/getMilestone');
  }

  async getReward() {
    return this._get('blocks/getReward');
  }

  async getSupply() {
    return this._get('blocks/getSupply');
  }

  async getStatus() {
    return this._get('blocks/getStatus');
  }

  async getNodeStatus() {
    return this._get('node/status');
  }

  async getTransactions(options) {
    return this._get('transactions', options);
  }

  async getTransaction(id, options) {
    return this._get('transactions/get', {id, ...options});
  }

  async getTransactionsCount() {
    return this._get('transactions/count');
  }

  async getQueuedTransactions() {
    return this._get('transactions/queued');
  }

  async getQueuedTransaction(id) {
    return this._get('transactions/queued/get', {id});
  }

  async getUnconfirmedTransactions() {
    return this._get('transactions/unconfirmed');
  }

  async getUnconfirmedTransaction(id) {
    return this._get('transactions/unconfirmed/get', {id});
  }

  async sendTokens(addressOrPublicKey, amount, isAmountInADM) {
    const response = await this.api.sendTokens(
      this.passPhrase,
      addressOrPublicKey,
      amount,
      isAmountInADM
    );

    return response?.data;
  }

  async sendMessage(addressOrPublicKey, message, messageType, amount, isADM) {
    const response = await this.api.sendMessage(
      this.passPhrase,
      addressOrPublicKey,
      message,
      messageType,
      amount,
      isADM
    );

    return response?.data;
  }
}
