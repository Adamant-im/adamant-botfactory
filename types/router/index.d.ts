import type { User } from '../api/index.d.ts'

interface Transaction {}

/**
 * @nav Router
 */
export type Pattern = string | RegExp | Pattern[]

export type NextFunction = (error: Error) => void

/**
 * You can provide multiple callback functions that behave like middleware to handle a request.
 * The only exception is that these callbacks might invoke next() to bypass the remaining route callbacks.
 * You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if
 * there’s no reason to proceed with the current route.
 *
 * @example
 *
 * In the following example, the `/statistic` command will only execute handler if the message was sent by an admin.
 *
 * ```js
 * bot.use((usr, tx, next) => {
 *   if (isAdmin(usr)) {
 *     next()
 *   }
 * })
 *
 * bot.command('statistic', () => {
 *   // ...
 * })
 * ```
 *
 * @nav Router
 */
export type Handler = (usr: User, tx: Transaction, next: NextFunction) => void

/**
 * @nav Router
 */
export declare class Router {
  /**
   * Registers some middleware
   *
   * @param handlers
   */
  use(...handlers: Handler[]): void

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
   *
   * @param pattern Some pattern to match the incoming text messages that will cause the handlers to be called. Can be RegExp, string or an array of both
   * @param handlers Function to call when the pattern matches
   */
  hears(pattern: Pattern, ...handlers: Handler[]): void

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
   *
   * @param name
   * @param handlers
   */
  command(name: string, ...handlers: Handler[]): void
}
