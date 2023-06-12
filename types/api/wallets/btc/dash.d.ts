import type { BitcoinBaseTransaction, BitcoinBaseApi } from './shared.d.ts'

interface DashUnspents {
  txid: string,
  amount: number,
  vout: { value: number, address: string }[]
}

type DashTransaction = BitcoinBaseTransaction & {
  vin: { value: number, addr: string }[]
}

/**
 * @nav Api/Wallets/BTC/DashApi
 */
export class DashApi extends BitcoinBaseApi {
  /**
   * Gets the account's balance
   */
  getBalance(): Promise<number>

  /**
   * Gets transaction by the specified id
   */
  getTransaction(transactionId: string): DashTransaction

  /**
   * Gets list of transactions by specified filters
   */
  getTransactions(options?: { excludes: string[]}): { hasMore: boolean, items: DashTransaction[] }

  /**
   * Sends a signed transaction
   */
  sendTransaction(signedTx: any): Promise<any>

  /**
   * Gets unspents
   */
  getUnspents(address: string): Promise<DashUnspents>
}
