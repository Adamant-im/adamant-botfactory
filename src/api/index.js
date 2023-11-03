import {
  AdamantApi,
  decodeMessage,
  createKeypairFromPassphrase,
  createAddressFromPublicKey,
  TransactionType,
} from 'adamant-api';

const defaultOptions = {
  logger: console,
};

export class Api {
  constructor(passphrase, options = {}) {
    this.passphrase = passphrase;

    const keyPair = createKeypairFromPassphrase(passphrase);
    const address = createAddressFromPublicKey(keyPair.publicKey);

    this.address = address;

    this.options = {
      ...defaultOptions,
      ...options,
    };

    this.initApi();
  }

  initApi() {
    const {logger, nodes} = this.options;
    const {logLevel} = logger;

    const apiOptions = {
      nodes,
      logLevel,
    };

    this.api = new AdamantApi(apiOptions);
  }

  listen(onNewMessage) {
    const {api, options} = this;

    const wsType = options.enableSSL ? 'wss' : 'ws';

    api.initSocket({
      wsType,
      admAddress: this.address,
    });

    api.socket.onMessage(onNewMessage);
  }

  async decode(transaction) {
    if (transaction?.type !== TransactionType.CHAT_MESSAGE) {
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
        const decoded = decodeMessage(
          transaction.asset.chat.message,
          publicKey,
          this.passphrase,
          transaction.asset.chat.own_message
        );

        transaction.asset.chat.message = decoded;

        delete transaction.asset.chat.own_message;
      }
    }

    return transaction;
  }

  async getAccountBalance(address = this.address) {
    return this.api.getAccountBalance(address);
  }

  async getAccountInfo(options = {address: this.address}) {
    return this.api.getAccountInfo(options);
  }

  async getChatMessages(address, options) {
    return this.api.getChatMessages(this.address, address, options);
  }

  async sendTokens(addressOrPublicKey, amount, isAmountInADM) {
    const response = await this.api.sendTokens(
      this.passphrase,
      addressOrPublicKey,
      amount,
      isAmountInADM
    );

    return response?.data;
  }

  async sendMessage(addressOrPublicKey, message, messageType, amount, isADM) {
    const response = await this.api.sendMessage(
      this.passphrase,
      addressOrPublicKey,
      message,
      messageType,
      amount,
      isADM
    );

    return response?.data;
  }
}
