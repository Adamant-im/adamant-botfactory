import {AdamantAddress, MessageType} from 'adamant-api';
import {Api} from './index';

export interface UserData {
  address: AdamantAddress;
  publicKey: string;
}

export class User {
  private api: Api;

  public address: AdamantAddress;
  public publicKey: string;

  constructor(api: Api, options: UserData) {
    this.api = api;

    this.address = options.address;
    this.publicKey = options.publicKey;
  }

  async info() {
    return this.api.getAccountInfo({address: this.address});
  }

  async balance() {
    return this.api.getAccountBalance(this.address);
  }

  async messages() {
    return this.api.getChatMessages(this.address);
  }

  async transfer(amount: number, isADM?: boolean) {
    return this.api.sendTokens(this.address, amount, isADM);
  }

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
