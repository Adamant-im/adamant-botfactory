import type { BitcoinBaseTransaction, BitcoinBaseApi } from './shared.d.ts'

interface BitcoinUnspents {
  txid: string,
  amount: number,
  vout: { value: number, address: string }[]
}

/**
 * @nav Api/Wallets/BTC/BitcoinApi
 */
export class BitcoinApi extends BitcoinBaseApi {
  /**
   * Gets the account's balance
   */
  getBalance(): Promise<number>

  /**
   * Gets bitcoin height
   */
  getHeight(): Promise<number>

  /**
   * Gets transaction by the specified id
   */
  getTransaction(transactionId: string): BitcoinBaseTransaction

  /**
   * Gets list of transactions by specified filters
   */
  getTransactions(options: any): BitcoinBaseTransaction[]

  /**
   * Sends a signed transaction
   */
  sendTransaction(signedTx: any): Promise<any>

  /**
   * Gets unspents
   */
  getUnspents(address: string): Promise<BitcoinUnspents>

  /**
   * Gets fee rate
   */
  getFeeRate(): Promise<number>
}
