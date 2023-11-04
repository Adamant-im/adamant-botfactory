import {DecodedMessageTransaction} from './api';

/**
 * @nav BotFactoryError
 */
export class BotFactoryError extends Error {
  public transaction?: DecodedMessageTransaction;

  constructor(message: string, transaction: DecodedMessageTransaction) {
    super(message);

    this.name = 'BotFactoryError';
    this.transaction = transaction;
  }
}
