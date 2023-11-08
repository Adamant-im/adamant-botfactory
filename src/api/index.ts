import {
  AdamantApi,
  decodeMessage,
  createKeypairFromPassphrase,
  createAddressFromPublicKey,
  TransactionType,
  CustomLogger,
  LogLevel,
  WebSocketClient,
  AdamantAddress,
  ChatMessageTransaction,
  AddressOrPublicKeyObject,
  ChatroomsOptions,
  TransactionQuery,
  MessageType,
} from 'adamant-api';

export interface ApiOptions {
  /**
   * List of ADAMANT nodes to connect to, bot will automaticly choose the fastest one.
   */
  nodes: string[];
  enableSSL?: boolean;
  logger?: CustomLogger;
  logLevel?: LogLevel;
  checkHealthAtStartup?: boolean;
  timeout?: number;
}

export type DecodedMessageTransaction = Omit<
  ChatMessageTransaction,
  'asset'
> & {
  asset: {
    chat: {
      message: string;
      type: MessageType;
    };
  };
};

const defaultOptions = {
  logger: console,
  logLevel: LogLevel.Log,
};

export class Api {
  private passphrase: string;

  public api: AdamantApi;

  public address: AdamantAddress;
  public options: ApiOptions;

  constructor(passphrase: string, options: ApiOptions) {
    this.options = {
      ...defaultOptions,
      ...options,
    };

    // Initialize ADAMANT account data
    this.passphrase = passphrase;

    const keyPair = createKeypairFromPassphrase(passphrase);
    const address = createAddressFromPublicKey(keyPair.publicKey);

    this.address = address;

    // Initialize API
    const {nodes, logLevel, checkHealthAtStartup} = this.options;
    const apiOptions = {
      nodes,
      logLevel,
      checkHealthAtStartup,
    };

    this.api = new AdamantApi(apiOptions);
  }

  listen(onNewMessage: (transaction: ChatMessageTransaction) => void) {
    const {api, options} = this;

    const wsType = options.enableSSL ? 'wss' : 'ws';

    const socket = new WebSocketClient({
      wsType,
      admAddress: this.address,
    });

    socket.onMessage(onNewMessage);

    api.socket = socket;
  }

  async decode(transaction: ChatMessageTransaction): Promise<
    | {
        success: false;
        error: string;
      }
    | {
        success: true;
        decodedTransaction: DecodedMessageTransaction;
      }
  > {
    if (transaction?.type !== TransactionType.CHAT_MESSAGE) {
      return {
        success: false,
        error: 'Not a message transaction',
      };
    }

    if (
      ![transaction.senderId, transaction.recipientId].includes(this.address)
    ) {
      return {
        success: false,
        error: 'Not a message transaction',
      };
    }

    const recipientName =
      transaction.senderId === this.address
        ? transaction.recipientId
        : transaction.senderId;

    const publicKey = await this.api.getPublicKey(
      recipientName as AdamantAddress
    );

    if (!publicKey) {
      return {
        success: false,
        error: 'Could not get a sender public key',
      };
    }

    const message = decodeMessage(
      transaction.asset.chat.message,
      publicKey,
      this.passphrase,
      transaction.asset.chat.own_message
    );

    const decodedTransaction = {
      ...transaction,
      asset: {
        chat: {
          message,
          type: transaction.asset.chat.type,
        },
      },
    };

    return {success: true, decodedTransaction};
  }

  async getAccountBalance(address = this.address) {
    return this.api.getAccountBalance(address);
  }

  async getAccountInfo(
    options: AddressOrPublicKeyObject = {address: this.address}
  ) {
    return this.api.getAccountInfo(options);
  }

  async getChatMessages(
    address: string,
    options?: TransactionQuery<ChatroomsOptions>
  ) {
    return this.api.getChatMessages(this.address, address, options);
  }

  async sendTokens(
    addressOrPublicKey: string,
    amount: number,
    isAmountInADM?: boolean
  ) {
    const response = await this.api.sendTokens(
      this.passphrase,
      addressOrPublicKey,
      amount,
      isAmountInADM
    );

    return response;
  }

  async sendMessage(
    addressOrPublicKey: string,
    message: string,
    messageType?: MessageType,
    amount?: number,
    isADM?: boolean
  ) {
    const response = await this.api.sendMessage(
      this.passphrase,
      addressOrPublicKey,
      message,
      messageType,
      amount,
      isADM
    );

    return response;
  }
}
