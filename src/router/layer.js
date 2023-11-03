import {TransactionType} from 'adamant-api';

/**
 * The commands must meet the following criteria:
 * - The command must start with a forward slash character (/).
 * - The command must be composed of one or more uppercase or lowercase letters.
 * - The letters in the command may be separated by one underscore (_).
 * - The command must end with a single letter.
 *
 * Examples of valid commands that would match:
 *
 * /hello
 * /this_is_a_command
 * /Another_Command
 * /c
 *
 * Examples of invalid commands that would not match:
 *
 * /123
 * not a command
 * /starts_with_underscore_
 * /multiple__underscores
 * /ends_with_
 * /has spaces
 *
 * @param {string} text string to test against
 * @return {string?} command name from the text
 */
const getCommand = text => {
  const commandRegexp = /^\/([a-zA-Z]+(?:_[a-zA-Z]+)*[a-zA-Z])(?:\s|$)/;
  const match = commandRegexp.exec(text);

  if (match) {
    const [, commandName] = match;

    return commandName;
  }

  return null;
};

const match = (transaction, type, pattern) => {
  let text;

  if (transaction?.type === TransactionType.CHAT_MESSAGE) {
    text = transaction.asset.chat.message;

    if (type === 'command') {
      text = getCommand(text);
    }
  }

  if (!text) {
    return false;
  }

  if (Array.isArray(pattern)) {
    return pattern.some(item => match(transaction, type, item));
  }

  if (pattern === '*') {
    return true;
  }

  if (typeof pattern === 'string') {
    return pattern === text;
  }

  if (pattern instanceof RegExp) {
    return !!text.match(pattern);
  }

  return false;
};

export class Layer {
  constructor(type, pattern, handlers) {
    this.handlers = handlers;
    this.pattern = pattern;
    this.type = type;
  }

  handle(usr, msg, done) {
    let index = 0;

    const next = async error => {
      const handler = this.handlers[index++];

      if (error) {
        return done(error);
      }

      if (!handler) {
        return done();
      }

      if (typeof handler === 'function') {
        handler(usr, msg, next);
      }
    };

    next();
  }

  match(transaction) {
    const {type, pattern} = this;

    return match(transaction, type, pattern);
  }
}
