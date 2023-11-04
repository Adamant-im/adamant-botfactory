import {AnyTransaction} from 'adamant-api';

export class BotFactoryError extends Error {
  public transaction?: AnyTransaction;

  constructor(message: string, transaction: AnyTransaction) {
    super(message);

    this.name = 'BotFactoryError';
    this.transaction = transaction;
  }
}
