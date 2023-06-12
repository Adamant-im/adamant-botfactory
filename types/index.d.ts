/// <reference path="./router/index.d.ts" />

export declare class Api {}

interface Transaction {}
interface CryptedTransaction {}

import type {
  Router,
} from './router/index.d.ts'

/**
 * @nav BotFactoryError
 */
export class BotFactoryError {
  name: 'BotFactoryError'
  error: Error
  transaction: Transaction
}

/**
 * Error handler
 *
 * @nav BotFactoryError
 */
export type ErrorHandler = (err: BotFactoryError) => void

/**
 * @nav Bot
 */
export class Bot extends Router {
  api: Api

  /**
   * Error handler set via Bot.catch()
   */
  handleError: ErrorHandler

  /**
   * Starts the webhook client and listens for new messages
   */
  start(): void

  /**
   * Sets the bot's error handler
   *
   * @param handleError Callback that will be called when error was thrown
   */
  catch(handleError: ErrorHandler): void

  /**
   * Decodes and processes a new transaction, could be used for testing or handling transactions from other sources
   *
   * @param transaction Crypted transaction object to process
   */
  handle(transaction: CryptedTransaction): void
}

/**
 * @nav Bot
 */
export interface botOptions {
  // List of ADAMANT nodes to connect to, bot will automaticly choose fastest one
  nodes: string[],
  enableSSL?: boolean,
  logger?: any,
}

/**
 * Creates new bot instance within given pass phrase and options
 *
 * @param passPhrase Bot's account pass phrase
 * @param options Bot options, including list of nodes to connect
 *
 * @nav Bot
 */
export function createBot(passPhrase: string, options: botOptions): Bot

export type * from './router/index.d.ts'

export type * from './api/index.d.ts'
