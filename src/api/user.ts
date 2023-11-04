import {AdamantAddress, MessageType} from 'adamant-api';
import {Api} from './index';

/**
 * @nav User
 */
export interface UserData {
  address: AdamantAddress;
  publicKey: string;
}

/**
 * @nav User
 */
export class User {
  private api: Api;

  public address: AdamantAddress;
  public publicKey: string;

  constructor(api: Api, options: UserData) {
    this.api = api;

    this.address = options.address;
    this.publicKey = options.publicKey;
  }

  /**
   * Returns the user's account information.
   */
  async info() {
    return this.api.getAccountInfo({address: this.address});
  }

  /**
   * Gets the user's account balance.
   */
  async balance() {
    return this.api.getAccountBalance(this.address);
  }

  /**
   * Returns list of the chat messages between the bot and the user.
   */
  async messages() {
    return this.api.getChatMessages(this.address);
  }

  /**
   * Sends the given amount of tokens to the user.
   */
  async transfer(amount: number, isADM?: boolean) {
    return this.api.sendTokens(this.address, amount, isADM);
  }

  /**
   * Sends a message to the user
   */
  async reply(
    message: string,
    messageType?: MessageType,
    amount?: number,
    isADM?: boolean
  ) {
    return this.api.sendMessage(
      this.address,
      message,
      messageType,
      amount,
      isADM
    );
  }
}
