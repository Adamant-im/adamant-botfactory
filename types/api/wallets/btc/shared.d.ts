import type { SignedJsonTx, TransactionStatus } from '../shared.d.ts'

/**
 * @nav Api/Wallets/BTC/Types
 */
export interface BitcoinBaseTransaction {
  id: string,
  hash: string,
  fee: number,
  status: TransactionStatus,
  timestamp: number,
  direction: string,
  senders: string[],
  senderId: string,
  recipients: string[],
  recipientId: string,
  amount: number,
  confirmations: any,
  height: number,
  instantlock: any,
  instantlock_internal: any,
  instantsend: any,
}

export class BitcoinBaseApi {
  /**
   * Bitcoin base multiplier
   */
  multiplier: 1e8;

  /**
   * Creates base bitcoin transaction
   */
  createTransaction(address: string, amount: number, fee: number): Promise<SignedJsonTx>

  /**
   * Gets fee
   */
  getFee(): number
}
