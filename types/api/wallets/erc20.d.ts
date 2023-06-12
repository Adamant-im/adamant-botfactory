import type { BaseWalletTransaction, TransactionStatus } from './shared.d.ts'

export interface GetTransactionsFilters {
  address?: string,
  contract?: string,
  from?: number,
  to?: number,
  limit?: number,
  decimals?: number
}

export interface SendTransactionOptions {
  amount: number,
  address: string,
  increaseFee?: boolean
}

export interface SentTransaction {
  hash: string,
  senderId: string,
  recipientId: string,
  amount: number,
  fee: string,
  status: TransactionStatus,
  timestamp: number,
  gasPrice: number
}

/**
 * @nav Api/Wallets/Erc20Api/Types
 */
export interface Erc20Transaction extends BaseWalletTransaction {
  timestamp: number,
  blockNumber: number,
  time: number,
}

export interface InitTransaction {
  from: string,
  to: string,
  value: string,
  gas: number
  data?: any,
}

/**
 * @nav Api/Wallets/Erc20Api
 */
export class Erc20Api {
  /**
   * The coin's name
   */
  crypto: string;

  /**
   * Number of decimals
   */
  decimals: number;

  /**
   * The coin's contract address
   */
  contractAddress: string;

  /**
   * The account's address
   */
  address: string;

  /**
   * The account's private key
   */
  privateKey: Buffer;

  /**
   * Url of the wallet's server
   */
  url: string;

  /**
   * Gets the account's balance
   */
  getBalance(): Promise<number>

  /**
   * Gets transaction by the specified id
   */
  getTransaction(transactionId: string): BaseWalletTransaction

  /**
   * Gets list of transactions by specified filters
   */
  getTransactions(options: GetTransactionsFilters): { total: number, items: Erc20Transaction[] }

  /**
   * Signs and sends transaction
   *
   * @details
   *
   * Returns sent transaction info
   */
  sendTransaction(options: SendTransactionOptions): Promise<SentTransaction>

  /**
   * Creates a transfer transaction
   */
  initTransaction(to: string, amount: number, increaseFee?: boolean): Promise<InitTransaction>
}
