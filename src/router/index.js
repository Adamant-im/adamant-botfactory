import {Layer} from './layer.js';

export class Router {
  constructor() {
    this.stack = [];
  }

  use(...handlers) {
    this.stack.push(...handlers);
  }

  hears(pattern, ...handlers) {
    this.add('text', pattern, handlers);
  }

  command(name, ...handlers) {
    this.add('command', name, handlers);
  }

  add(type, trigger, handlers) {
    const layer = new Layer(type, trigger, handlers);

    this.stack.push(layer);
  }

  handle(usr, msg, done) {
    let index = 0;

    const next = async (error) => {
      const route = this.stack[index++];

      if (error) {
        return done(error);
      }

      if (!route) {
        return done();
      }

      if (route instanceof Router) {
        route.handle(usr, msg, next);
        return;
      }

      if (route instanceof Layer) {
        const matches = route.match(msg);

        if (matches) {
          route.handle(usr, msg, next);
          return;
        }
      }

      if (typeof route === 'function') {
        try {
          route(usr, msg, next);
        } catch (error) {
          next(error);
        }
      }

      next();
    };

    next();
  }
}
