export class BotFactoryError extends Error {
  constructor(error, transaction) {
    super(error);

    this.name = 'BotFactoryError';
    this.error = error;
    this.transaction = transaction;
  }
}
