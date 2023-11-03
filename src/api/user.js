export class User {
  constructor(api, options = {}) {
    this.api = api;

    this.id = options.id;
    this.publicKey = options.publicKey;
  }

  async info() {
    const options = {};

    if (this.id) {
      options.address = this.id;
    } else if (this.publicKey) {
      options.publicKey = this.publicKey;
    } else {
      throw new Error('No user id or publicKey specified');
    }

    return this.api.getAccountInfo(options);
  }

  async balance() {
    return this.api.getAccountBalance(this.id);
  }

  async messages() {
    return this.api.getChatMessages(this.id);
  }

  async transfer(amount, isADM) {
    return this.api.sendTokens(this.id ?? this.publicKey, amount, isADM);
  }

  async reply(message, messageType, amount, isADM) {
    return this.api.sendMessage(
      this.id ?? this.publicKey,
      message,
      messageType,
      amount,
      isADM
    );
  }
}
