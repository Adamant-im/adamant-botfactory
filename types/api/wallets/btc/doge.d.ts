import type { BitcoinBaseTransaction, BitcoinBaseApi } from './shared.d.ts'

interface DogeUnspents {
  txid: string,
  amount: number,
  vout: { value: number, address: string }[]
}

/**
 * @nav Api/Wallets/DogeApi
 */
export class DogeApi extends BitcoinBaseApi {
  /**
   * Gets the account's balance
   */
  getBalance(): Promise<number>

  /**
   * Gets transaction by the specified id
   */
  getTransaction(transactionId: string): BitcoinBaseTransaction

  /**
   * Gets list of transactions by specified filters
   */
  getTransactions(options: {from: number, address: string}): { hasMore: boolean, items: BitcoinBaseTransaction[] }

  /**
   * Sends a signed transaction
   */
  sendTransaction(signedTx: any): Promise<any>

  /**
   * Gets unspents
   */
  getUnspents(address: string): Promise<DogeUnspents>
}
