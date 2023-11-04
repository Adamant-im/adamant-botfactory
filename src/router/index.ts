import {User} from '../api/user.js';
import {Layer, MatchType} from './layer.js';
import {DecodedMessageTransaction} from '../api/index.js';

export interface RouterHandler {
  (
    usr: User,
    tx: DecodedMessageTransaction,
    next: (error?: string) => void
  ): void;
}

class Router {
  private stack: Array<Layer | RouterHandler>;

  constructor() {
    this.stack = [];
  }

  public use(...handlers: RouterHandler[]) {
    this.stack.push(...handlers);
  }

  public hears(pattern: RegExp, ...handlers: RouterHandler[]) {
    this.push('text', pattern, handlers);
  }

  public command(name: string, ...handlers: RouterHandler[]) {
    this.push('command', name, handlers);
  }

  private push(
    type: MatchType,
    trigger: RegExp | string,
    handlers: RouterHandler[]
  ) {
    const layer = new Layer(type, trigger, handlers);
    this.stack.push(layer);
  }

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
