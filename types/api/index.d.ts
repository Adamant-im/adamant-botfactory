import type {
  GetAccountInfoResponseDto,
  GetAccountBalanceResponseDto,
  GetAccountPublicKeyResponseDto,
  GetBlockInfoResponseDto,
  GetBlocksResponseDto,
  GetChatRoomsResponseDto,
  GetChatMessagesResponseDto,
  GetDelegatesResponseDto,
  SearchDelegateResponseDto,
  GetDelegatesCountResponseDto,
  GetDelegateStatsResponseDto,
  GetNextForgersResponseDto,
  GetVotersResponseDto,
  GetAccountVotesResponseDto,
  RegisterDelegateResponseDto,
  RegisterVotesResponseDto,
  GetPeersResponseDto,
  GetLoadingStatusResponseDto,
  GetSyncStatusResponseDto,
  GetPingStatusResponseDto,
  GetNodeVersionResponseDto,
  GetBroadhashResponseDto,
  GetEpochResponseDto,
  GetHeightResponseDto,
  GetTokenTransferFeeResponseDto,
  GetTransactionTypesFeesResponseDto,
  GetNethashResponseDto,
  GetMilestoneResponseDto,
  GetRewardResponseDto,
  GetTokensTotalSupplyResponseDto,
  GetNetworkInfoResponseDto,
  GetNodeStatusResponseDto,
  GetTransactionsResponseDto,
  GetTransactionByIdResponseDto,
  GetTransactionsCountResponseDto,
  GetQueuedTransactionsResponseDto,
  GetUnconfirmedTransactionsResponseDto,
  GetUnconfirmedTransactionByIdResponseDto,
  TransferTokenResponseDto,
  GetDelegateResponseDto
} from './generated.ts';

import type {
  LiskApi,
  BitcoinApi,
  Erc20Api,
  DogeApi,
  DashApi
} from './wallets/index'

import coins from '../../static/eth.json'

export * from './generated.ts'
export type * from './user.d.ts'

export type * from './wallets/index.d.ts'

/**
 * Message type
 *
 * @see https://github.com/Adamant-im/adamant/wiki/Message-Types
 *
 * @nav Api/Types
 */
export enum MessageType {
  basic = 'basic',
  rich = 'rich',
  signal = 'signal'
}

/**
 * @nav Api/Types
 */
export interface UsernameObject {
  username: string
}

/**
 * @nav Api/Types
 */
export interface PublicKeyObject {
  publicKey: string
}

/**
 * @nav Api/Types
 */
export interface AddressObject {
  address: string
}

/**
 * Object that contains either `address` or `publicKey` field
 *
 * @nav Api/Types
 */
export type AddressOrPublicKeyObject =  AddressObject | PublicKeyObject

/**
 * @nav Api/Types
 */
export type UsernameOrPublicKeyObject = UsernameObject | PublicKeyObject

/**
 * @nav Api/Types
 */
export type TransactionQuery<T extends {}> = T & {
  or: T,
  and: T
}

export interface GetBlocksOptions {
  limit?: number,
  offset?: number,
  generatorPublicKey?: string,
  height?: number
}

export interface GetDelegatesOptions {
  limit?: number,
  offset?: number,
}

export interface TransactionQueryParameters {
  blockId?: number,
  fromHeight?: number,
  toHeight?: number,
  minAmount?: number,
  maxAmount?: number,
  senderId?: string,
  recipientId?: string,
  inId?: string,
  limit?: number,
  offset?: number,
  orderBy?: string,
}

// parameters that available for /api/chatrooms
export interface ChatroomsOptions extends TransactionQueryParameters {
  type?: number,
  withoutDirectTransfers?: boolean,
}

// parameters that available for /api/chats/get
interface ChatsGetOptions extends TransactionQueryParameters {
  type?: number,
}

// parameters that available for /api/states/get
interface StatesGetOptions extends TransactionQueryParameters {
  senderIds?: string[],
  type?: number,
  key?: string,
  keyIds?: string[]
}

// parameters that available for /api/transactions
export interface TransactionsOptions extends TransactionQueryParameters {
  senderIds?: string[],
  recipientIds?: string[],
  senderPublicKey?: string,
  senderPublicKeys?: string[],
  recipientPublicKey?: string,
  recipientPublicKeys?: string[],
  type?: number,
  types?: number[],
  returnAsset?: 1 | 0,
}

export type ethCoins = keyof typeof coins

export type Erc20Wallets = {
  [k in ethCoins]: Erc20Api;
}

/**
 * Api/Wallets
 */
export type Wallets = Erc20Wallets & {
  /**
   * The account's Lisk wallet API
   */
  lisk: LiskApi;

  /**
   * The account's Bitcoin wallet API
   */
  bitcoin: BitcoinApi;

  /**
   * The account's Doge wallet API
   */
  doge: DogeApi;

  /**
   * The account's Dash wallet API
   */
  dash: DashApi;
}

/**
 * @nav Api/Adamant
 */
export class AdamantApi {
  /**
   * Calculated bot's address from pass phrase
   */
  address: string;

  /**
   * Get account information by ADAMANT address or Public Key
   *
   * @nav Account
   */
  getAccountInfo(options: AddressOrPublicKeyObject): Promise<GetAccountInfoResponseDto>

  /**
   * Get account balance
   *
   * @nav Account
   */
  getAccountBalance(address: string): Promise<GetAccountBalanceResponseDto>

  /**
   * Get account Public Key
   *
   * @nav Account
   */
  getPublicKey(address: string): Promise<GetAccountPublicKeyResponseDto>

  /**
   * Get block information by ID
   *
   * @nav Blocks
   */
  getBlock(id: string): Promise<GetBlockInfoResponseDto>

  /**
   * Get list of blocks
   *
   * @nav Blocks
   */
  getBlocks(options?: GetBlocksOptions): Promise<GetBlocksResponseDto>

  /**
   * Get list of Chats
   *
   * @nav Chat
   */
  getChats(address: string, options?: TransactionQuery<ChatroomsOptions>): Promise<GetChatRoomsResponseDto>

  /**
   * Get messages between two accounts
   *
   * @nav Chat
   */
  getChatMessages(address1: string, address2: string, options?: TransactionQuery<ChatroomsOptions>):
    Promise<GetChatMessagesResponseDto>

  /**
   * Retrieves list of registered ADAMANT delegates
   *
   * @nav Delegates
   */
  getDelegates(options: GetDelegatesOptions): Promise<GetDelegatesResponseDto>

  /**
   * Get delegate info by `username` or `publicKey`
   *
   * @nav Delegates
   */
  getDelegate(options: UsernameOrPublicKeyObject): Promise<GetDelegateResponseDto>

  /**
   * Search delegates by `username`
   *
   * @nav Delegates
   */
  searchDelegates(q: string): Promise<SearchDelegateResponseDto>

  /**
   * Get total count of delegates
   *
   * @nav Delegates
   */
  getDelegatesCount(): Promise<GetDelegatesCountResponseDto>

  /**
   * Get forging activity of a delegate
   *
   * @nav Delegates
   */
  getDelegateStats(generatorPublicKey: string): Promise<GetDelegateStatsResponseDto>

  /**
   * returns list of next forgers
   *
   * @param limit count to retrieve
   *
   * @nav Delegates
   */
  getNextForgers(limit?: number): Promise<GetNextForgersResponseDto>

  /**
   * gets list of delegate's voters
   *
   * @param publicKey representing delegate's publicKey
   *
   * @nav Delegates
   */
  getVoters(publicKey: string): Promise<GetVotersResponseDto>

  /**
   * get current votes of specific ADAMANT account
   *
   * @param address address of the account to get votes
   *
   * @nav Delegates
   */
  getVoteData(address: string): Promise<GetAccountVotesResponseDto>

  /**
   * registers new delegate within given username
   *
   * @param username new delegate's username
   *
   * @nav Delegates
   */
  registerDelegate(username: string): Promise<RegisterDelegateResponseDto>

  /**
   * votes for specific delegates
   *
   * @param votes Array with public keys. For upvote, add leading `+` to delegate's public key. For downvote, add leading `-` to delegate's public key.
   *
   * @example
   * ```
   * voteForDelegate([
   *   '+b3d0c0b99f64d0960324089eb678e90d8bcbb3dd8c73ee748e026f8b9a5b5468',
   *   '-9ef1f6212ae871716cfa2d04e3dc5339e8fe75f89818be21ee1d75004983e2a8'
   * ])
   * ```
   * @nav Delegates
   */
  voteForDelegate(votes: string[]): Promise<RegisterVotesResponseDto>

  /**
   * gets list of connected peer nodes
   *
   * @nav Node
   */
  getPeers(): Promise<GetPeersResponseDto>

  /**
   * gets loading status
   *
   * @nav Node
   */
  getLoadingStatus(): Promise<GetLoadingStatusResponseDto>

  /**
   * gets information on node's sync process with other peers
   *
   * @nav Node
   */
  getSyncStatus(): Promise<GetSyncStatusResponseDto>

  /**
   * checks whenever the node is alive
   *
   * @nav Node
   */
  getPingStatus(): Promise<GetPingStatusResponseDto>

  /**
   * gets node's software information
   *
   * @nav Node
   */
  getNodeVersion(): Promise<GetNodeVersionResponseDto>

  /**
   * Broadhash is established as an aggregated rolling hash of the past five blocks present in the database.
   *
   * @nav Node
   */
  getBroadhash(): Promise<GetBroadhashResponseDto>

  /**
   * Returns time when blockchain epoch starts. Value `2017-09-02T17:00:00.000Z` is for mainnet.
   *
   * @nav Node
   */
  getEpoch(): Promise<GetEpochResponseDto>

  /**
   * Returns current node's blockchain height
   *
   * @nav Node
   */
  getHeight(): Promise<GetHeightResponseDto>

  /**
   * Returns current fee value for `type 0` (token transfer) transactions. Integer amount of 1/10^8 ADM tokens (1 ADM = 100000000).
   *
   * @nav Node
   */
  getFee(): Promise<GetTokenTransferFeeResponseDto>

  /**
   * Returns current fee values for different transaction types
   *
   * @nav Node
   */
  getFees(): Promise<GetTransactionTypesFeesResponseDto>

  /**
   * The nethash describes e.g. the Mainnet or the Testnet, that the node is connecting to.
   *
   * @nav Node
   */
  getNethash(): Promise<GetNethashResponseDto>

  /**
   * Return current slot height, which determines reward a delegate will get for forging a block.
   *
   * @nav Node
   */
  getMilestone(): Promise<GetMilestoneResponseDto>

  /**
   * Returns reward — the reward a delegate will get for forging a block. Integer amount of 1/10^8 ADM tokens (1 ADM = 100000000). Depends on the slot height.
   *
   * @nav Node
   */
  getReward(): Promise<GetRewardResponseDto>

  /**
   * Returns total current supply of ADM tokens in network. Integer amount of 1/10^8 ADM tokens (1 ADM = 100000000). Total supply increases with every new forged block.
   *
   * @nav Node
   */
  getSupply(): Promise<GetTokensTotalSupplyResponseDto>

  /**
   * Returns blockchain network information in a single request
   *
   * @nav Node
   */
  getStatus(): Promise<GetNetworkInfoResponseDto>

  /**
   * Returns both ADAMANT blockchain network information and Node information in a single request.
   *
   * @nav Node
   */
  getNodeStatus(): Promise<GetNodeStatusResponseDto>

  /**
   * Returns list of transactions
   *
   * @nav Node
   */
  getTransactions(options?: TransactionQuery<TransactionsOptions>): Promise<GetTransactionsResponseDto>

  /**
   * Get transaction by ID
   *
   * @nav Transactions
   */
  getTransaction(id: number, options?: TransactionQuery<TransactionsOptions>): Promise<GetTransactionByIdResponseDto>

  /**
   * Get `confirmed`, `uncofirmed` and `queued` transactions count
   *
   * @nav Transactions
   */
  getTransactionsCount(): Promise<GetTransactionsCountResponseDto>

  /**
   * Get queued transactions count
   *
   * @nav Transactions
   */
  getQueuedTransactions(): Promise<GetQueuedTransactionsResponseDto>

  /**
   * Get queued transaction by ID
   *
   * @nav Transactions
   */
  getQueuedTransaction(id: number): Promise<GetQueuedTransactionsResponseDto>

  /**
   * Get unconfirmed transactions
   *
   * @nav Transactions
   */
  getUnconfirmedTransactions(): Promise<GetUnconfirmedTransactionsResponseDto>

  /**
   * Get unconfirmed transaction by ID
   *
   * @nav Transactions
   */
  getUnconfirmedTransaction(id: number): Promise<GetUnconfirmedTransactionByIdResponseDto>

  /**
   * Send tokens to an account
   *
   * @nav Chat
   */
  sendTokens(addressOrPublicKey: string, amount: number, isAmountInADM?: boolean): Promise<TransferTokenResponseDto>

  /**
    *
    * Encrypts a message, creates Message transaction, signs it, and broadcasts to ADAMANT network.
    * Supports Basic, Rich and Signal Message Types.
    *
    * @param addressOrPublicKey Recipient's ADAMANT address or public key.
    * Using public key is faster, as the library wouldn't request it from the network.
    * Though we cache public keys, and next request with address will be processed as fast as with public key.
    * @param message Message plain text in case of basic message. Stringified JSON in case of rich or signal messages.
    * Example of rich message for Ether in-chat transfer:
    * `{"type":"eth_transaction","amount":"0.002","hash":"0xfa46d2b3c99878f1f9863fcbdb0bc27d220d7065c6528543cbb83ced84487deb","comments":"I like to send it, send it"}`
    * @param messageType Type of message: 'basic', 'rich', or 'signal'
    * @param amount Amount to send with a message
    * @param isADM If amount specified in ADM, or in sats (10^-8 ADM)
    *
    * @returns Object with the transaction id
    *
    * @nav Chat
    */
  sendMessage(addressOrPublicKey: string, message: string, messageType?: MessageType, amount?: number, isADM?: boolean):
    Promise<TransferTokenResponseDto>
}

/**
 * Main API class including wallets and ADAMANT
 *
 * @nav Api
 */
export type Api = Wallets & AdamantApi
