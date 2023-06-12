/**
 * Transaction status
 *
 * @nav Api/Wallets/Types
 */
export enum TransactionStatus {
  confirmed = 'CONFIRMED',
  registered = 'REGISTERED'
}

/**
 * Base transaction
 *
 * @nav Api/Wallets/Types
 */
export interface BaseWalletTransaction {
  direction: string,
  id: string,
  hash: string,
  fee: number,
  status: TransactionStatus,
  senderId: string,
  recipientId: string,
  amount: number,
  height?: number,
}

/**
 * Transaction hex (signed JSON tx object) and ID
 *
 * @nav Api/Wallets/Types
 */
export interface SignedJsonTx {
  hex: {
    senderPublicKey: string,
    nonce: string
    fee: string,
    asset: {
      amount: string,
      recipientAddress: string
    }
    signatures: string[]
  },
  txid: string
}
