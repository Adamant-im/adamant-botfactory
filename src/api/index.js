import adamantApi from 'adamant-api';
import keys from 'adamant-api/keys.js';

const defaultOptions = {
  logger: console,
};

export class Api {
  #passPhrase;

  constructor(passPhrase, options = {}) {
    this.#passPhrase = passPhrase;

    const keyPair = keys.createKeypairFromPassPhrase(passPhrase);
    const address = keys.createAddressFromPublicKey(keyPair.publicKey);

    this.address = address;

    this.options = {
      ...defaultOptions,
      ...options,
    };

    this.init();
  }

  init() {
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

    const socket = api.socket.initSocket({
      wsType,
      onNewMessage,
      socket: true,
      admAddress: this.address,
    });

    this.socket = socket;
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

      if (![transaction.senderId, transaction.recipientId].includes(readerAddress)) {
        return transaction;
      }

      const recipientName = transaction.senderId === readerAddress ?
        transaction.recipientId :
        transaction.senderId;

      const publicKey = await this.api.getPublicKey(recipientName);

      if (publicKey) {
        const decoded = this.api.decodeMsg(
            transaction.asset.chat.message,
            publicKey,
            this.#passPhrase,
            transaction.asset.chat.own_message,
        );

        transaction.asset.chat.message = decoded;

        delete transaction.asset.chat.own_message;
      }
    }

    return transaction;
  }

  async getAccountInfo(options) {
    const res = await this.api.get('accounts', options);

    return res?.data;
  }

  async getAccountBalance(address) {
    const res = await this.api.get('accounts/getBalance', {address});

    return res?.data;
  }

  async sendTokens(addressOrPublicKey, amount, isAmountInADM) {
    const res = await this.api.sendTokens(
        this.#passPhrase,
        addressOrPublicKey,
        amount,
        isAmountInADM,
    );

    return res?.data;
  }

  async sendMessage(addressOrPublicKey, message, messageType, amount, isADM) {
    const res = await this.api.sendMessage(
        this.#passPhrase,
        addressOrPublicKey,
        message,
        messageType,
        amount,
        isADM,
    );

    return res?.data;
  }
}
