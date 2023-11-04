import {TransactionType} from 'adamant-api';

import {User} from '../api/user';
import type {RouterHandler} from './index';
import {DecodedMessageTransaction} from '../api';

export type MatchPattern = string | RegExp | MatchPattern[];

export type MatchType = 'command' | 'text';

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
 * @param text string to test against
 * @return command name from the text
 */
const getCommand = (text: string) => {
  const commandRegexp = /^\/([a-zA-Z]+(?:_[a-zA-Z]+)*[a-zA-Z])(?:\s|$)/;
  const match = commandRegexp.exec(text);

  if (match) {
    const [, commandName] = match;

    return commandName;
  }

  return null;
};

const match = (
  transaction: DecodedMessageTransaction,
  type: MatchType,
  pattern: MatchPattern
): boolean => {
  let text;

  if (transaction.type === TransactionType.CHAT_MESSAGE) {
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
  public type: MatchType;
  public pattern: MatchPattern;

  private handlers: RouterHandler[];

  constructor(
    type: MatchType,
    pattern: MatchPattern,
    handlers: RouterHandler[]
  ) {
    this.pattern = pattern;
    this.type = type;

    this.handlers = handlers;
  }

  handle(
    user: User,
    transaction: DecodedMessageTransaction,
    done: (error?: string) => void
  ) {
    let index = 0;

    const next = async (error?: string) => {
      const handler = this.handlers[index++];

      if (error) {
        return done(error);
      }

      if (!handler) {
        return done();
      }

      if (typeof handler === 'function') {
        handler(user, transaction, next);
      }
    };

    next();
  }

  match(transaction: DecodedMessageTransaction) {
    const {type, pattern} = this;

    return match(transaction, type, pattern);
  }
}
