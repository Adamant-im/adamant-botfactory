import type { BaseWalletTransaction, SignedJsonTx } from './shared.d.ts'

export interface LiskNetwork {
  name: string,
  port: number,
  wsPort: number,
  unit: string,
}

export interface KeyPair {
  publicKey: Buffer
  secretKey: Buffer
}

/**
 * @nav Api/Wallets/LiskApi/Types
 */
export interface LiskTransaction extends BaseWalletTransaction {
  data: any,
  timestamp: number,
  confirmations: number,
  nonce: string,
  moduleId: string,
  assetId: string,
  moduleName: string,
  assetName: string,
}

/**
 * @nav Api/Wallets/LiskApi/Types
 */
export interface LiskAccount {
  /**
   * The account's balance
   */
  balance: number,

  /**
   * The account's nonce
   */
  nonce: number
}

/**
 * @nav Api/Wallets/LiskApi
 */
export class LiskApi {
  /**
   * Name of the wallet coin, should be 'lisk'
   */
  crypto: 'lisk'

  /**
   * Lisk API network information
   */
  network: LiskNetwork;

  /**
   * The account's key pair
   */
  keyPair: KeyPair;

  /**
   * The account's Lisk address
   */
  address: string;

  /**
   * The account's binary address in hex format
   */
  addressHexBinary: Buffer;

  /**
   * The account's addres in hex format
   */
  addressHex: string;

  /**
   * Number of the coin's decimals
   */
  decimals: 8

  /**
   * The coin's multiplier
   */
  multiplier: 1e8

  /**
   * The coin's module id
   */
  moduleId: 2

  /**
   * The coin's asset id
   */
  assetId: 0

  /**
   * The coin's network identifier
   */
  networkIdentifier: Buffer

  /**
   * The coin's asset schema
   */
  assetSchema: any

  /**
   * Gets the account's info including balance
   */
  getAccount(): Promise<LiskAccount>

  /**
   * Gets Lisk height
   */
  getHeight(): Promise<number>

  /**
   * Gets transaction by the specified id
   */
  getTransaction(transactionId: string): LiskTransaction

  /**
   * Gets list of transactions by specified filters
   */
  getTransactions(options: any): LiskTransaction[]

  /**
   * Sends a signed transaction
   *
   * @details
   *
   * Returns transaction id
   */
  sendTransaction(signedTx: any): Promise<number>

  /**
   * Creates a transfer transaction hex (signed JSON tx object) and ID
   * Signed JSON tx object is ready for broadcasting to blockchain network
   *
   * @details
   *
   * The address should be in Base32 format, amount and fee should be in coins instead of satoshis
   */
  createTransaction(address: string, amount: string, fee: number, nonce: number, data?: string): Promise<SignedJsonTx>
}
