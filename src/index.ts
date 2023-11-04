import type {AdamantAddress, ChatMessageTransaction} from 'adamant-api';

import {BotFactoryError} from './error';
import {Router} from './router/index';

import {Api, type ApiOptions} from './api/index';
import {User} from './api/user';

/**
 * @nav Bot
 */
export type ErrorHandler = (error: BotFactoryError) => void;

/**
 * @nav Bot
 */
class Bot extends Router {
  private api: Api;

  /**
   * Error handler set via `Bot.catch()`.
   */
  handleError: ErrorHandler;

  constructor(passphrase: string, options: ApiOptions) {
    super();

    this.api = new Api(passphrase, options);

    this.handleError = async err => {
      console.error(
        'Error in middleware while handling transaction',
        err.transaction?.id,
        err.message
      );
      console.error('No error handler was set!');
      console.error('Set your own error handler with `bot.catch(...)`');

      throw err;
    };
  }

  /**
   * Starts the webhook client and listens for new messages.
   */
  start(callback?: () => void) {
    this.api.listen(this.handleTransaction.bind(this));

    callback?.();
  }

  /**
   * Sets the bot's error handler.
   *
   * @param errorHandler Function that will be called when error was thrown.
   */
  catch(errorHandler: ErrorHandler) {
    if (typeof errorHandler !== 'function') {
      throw new Error('handleError should be a function');
    }

    this.handleError = errorHandler;
  }

  /**
   * Decodes and processes a new transaction, can be used for
   * testing and handling transactions from other sources.
   *
   * @param transaction Encrypted transaction object to process.
   */
  async handleTransaction(transaction: ChatMessageTransaction) {
    const done = (error?: string) => {
      if (error) {
        const botFactoryError = new BotFactoryError(error, transaction);

        this.handleError(botFactoryError);
      }
    };

    const result = await this.api.decode(transaction);

    if (!result.success) {
      return done(result.error);
    }

    const {decodedTransaction} = result;
    const {senderId, senderPublicKey} = decodedTransaction;

    const user = new User(this.api, {
      address: senderId as AdamantAddress,
      publicKey: senderPublicKey,
    });

    super.handle(user, decodedTransaction, done);
  }
}

/**
 * Creates new bot instance within given passphrase and options.
 *
 * @param passphrase Bot's account passphrase.
 * @param options Bot options, including list of nodes to connect.
 *
 * @nav Bot
 */
function createBot(passphrase: string, options: ApiOptions) {
  const bot = new Bot(passphrase, options);

  return bot;
}

export {createBot, Bot};

export * from './error';

export * from './router/index';
export * from './router/layer';

export * from './api/index';
export * from './api/user';
