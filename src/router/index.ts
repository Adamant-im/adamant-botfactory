import {User} from '../api/user.js';
import {Layer, MatchType} from './layer.js';
import {DecodedMessageTransaction} from '../api/index.js';

/**
 * You can provide multiple callback functions that behave like middleware to handle a request.
 * The only exception is that these callbacks might invoke next() to bypass the remaining route callbacks.
 * You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if
 * there’s no reason to proceed with the current route.
 *
 * @example
 *
 * In the following example, the `/stats` command will only execute handler if the message was sent by an admin.
 *
 * ```js
 * bot.use((usr, tx, next) => {
 *   if (isAdmin(usr)) {
 *     next()
 *   }
 * })
 *
 * bot.command('stats', () => {
 *   // ...
 * })
 * ```
 *
 * @nav Router
 */
export interface RouterHandler {
  (
    usr: User,
    tx: DecodedMessageTransaction,
    next: (error?: string) => void
  ): void;
}

/**
 * @nav Router
 */
class Router {
  protected stack: Array<Layer | RouterHandler>;

  constructor() {
    this.stack = [];
  }

  /**
   * Registers some middlewares or routers.
   */
  public use(...handlers: (Layer | RouterHandler)[]) {
    this.stack.push(...handlers);
    return this;
  }

  /**
   * Registers some middleware(s) that will only be executed when the message contains some text specified by `pattern`
   *
   * @example
   *
   * This route will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.
   *
   * ```js
   * bot.hears(/.*fly$/, () => {})
   * ```
   */
  public hears(pattern: RegExp, ...handlers: RouterHandler[]) {
    return this.push('text', pattern, handlers);
  }

  /**
   * Registers some middleware that will only be executed when the bot received a message that starts with the specifid command.
   *
   * @details
   *
   * The commands must meet the following criteria:
   * - The command must start with a forward slash character (/).
   * - The command must be composed of one or more uppercase or lowercase letters.
   * - The letters in the command may be separated by one underscore (_).
   * - The command must end with a single letter.
   *
   * @example
   *
   * The following route will match `/hello` command
   *
   * ```js
   * bot.command('hello', () => {})
   * ```
   */
  public command(name: string, ...handlers: RouterHandler[]) {
    return this.push('command', name, handlers);
  }

  private push(
    type: MatchType,
    trigger: RegExp | string,
    handlers: RouterHandler[]
  ) {
    const layer = new Layer(type, trigger, handlers);
    this.stack.push(layer);

    return this;
  }

  /**
   * Handles a new chat message transaction sent by a user.
   */
  public handle(
    usr: User,
    tx: DecodedMessageTransaction,
    done: (error?: string) => void
  ) {
    let index = 0;

    const next = async (error?: string) => {
      const route = this.stack[index++];

      if (error) {
        return done(error);
      }

      if (!route) {
        return done();
      }

      if (route instanceof Router) {
        route.handle(usr, tx, next);
        return;
      }

      if (route instanceof Layer) {
        const matches = route.match(tx);

        if (matches) {
          route.handle(usr, tx, next);
          return;
        }
      }

      if (typeof route === 'function') {
        try {
          route(usr, tx, next);
        } catch (error) {
          next(`${error}`);
        }
      }

      next();
    };

    next();
  }
}

export {Router};
