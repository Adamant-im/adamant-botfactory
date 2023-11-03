import {BotFactoryError} from './error.js';
import {Router} from './router/index.js';
import {User} from './api/user.js';
import {Api} from './api/index.js';

class Bot extends Router {
  constructor(passPhrase, options = {}) {
    super();

    this.api = new Api(passPhrase, options);

    this.handleError = async err => {
      console.error(
        'Error in middleware while handling transaction',
        err?.transaction?.id,
        err.error
      );
      console.error('No error handler was set!');
      console.error('Set your own error handler with `bot.catch(...)`');

      throw err;
    };
  }

  start(callback) {
    const onNewMessage = this.handle.bind(this);

    this.api.listen(onNewMessage);

    callback?.();
  }

  catch(handleError) {
    if (typeof handleError !== 'function') {
      throw new Error('handleError should be a function');
    }

    this.handleError = handleError;
  }

  async handle(transaction) {
    const done = error => {
      if (error) {
        const botFactoryError = new BotFactoryError(error, transaction);

        this.handleError(botFactoryError);
      }
    };

    const tx = await this.api.decode(transaction);

    const usr = new User(this.api, {
      id: tx.senderId,
      publickKey: tx.senderPublickKey,
    });

    super.handle(usr, tx, done);
  }
}

function createBot(passPhrase, options) {
  const bot = new Bot(passPhrase, options);

  return bot;
}

export {createBot, Router};
