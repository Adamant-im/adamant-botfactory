import type { Api, MessageType, AnyResponse } from './index.d.ts';
import type {
  GetAccountInfoResponseDto,
  GetAccountBalanceResponseDto,
  TransferTokenResponseDto,
  GetChatMessagesResponseDto
} from './generated.ts';

/**
 * @nav User
 */
export class User {
  /**
   * The user's ADAMANT address
   */
  id: string

  /**
   * The user's Public Key
   */
  publicKey: string

  api: Api

  /**
   * Returns the user's account information using
   */
  info(): AnyResponse<GetAccountInfoResponseDto>

  /**
   * Gets the user's account balance
   */
  balance(): AnyResponse<GetAccountBalanceResponseDto>

  /**
   * Sends the given amount of tokens to the user
   *
   * @param amount Amount to send
   * @param isADM Boolean value representing whenever the amount is in ADM
   */
  send(amount: number, isADM?: boolean): AnyResponse<TransferTokenResponseDto>

  /**
   * Sends a message to the user
   */
  reply(
    message: string,
    messageType?: MessageType,
    amount?: number,
    isADM?: boolean
  ): AnyResponse<TransferTokenResponseDto>

  /**
   * Returns list of the chat messages between the bot and the user
   */
  chatMessages(): AnyResponse<GetChatMessagesResponseDto>
}
