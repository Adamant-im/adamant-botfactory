/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** @example {"account":{"address":"U777355171330060015","unconfirmedBalance":"4509718944753","balance":"4509718944753","publicKey":"a9407418dafb3c8aeee28f3263fd55bae0f528a5697a9df0e77e6568b19dfe34","unconfirmedSignature":0,"secondSignature":0,"secondPublicKey":null,"multisignatures":[],"u_multisignatures":[]},"success":true,"nodeTimestamp":58030181} */
export interface GetAccountInfoResponseDto {
  account: AccountDto;
  success: boolean;
  nodeTimestamp: number;
}

/** @example {"balance":"4509718944753","unconfirmedBalance":"4509718944753","success":true,"nodeTimestamp":58043820} */
export interface GetAccountBalanceResponseDto {
  /** @format int64 */
  balance: string;
  /** @format int64 */
  unconfirmedBalance: string;
  success: boolean;
  nodeTimestamp: number;
}

/** @example {"publicKey":"a9407418dafb3c8aeee28f3263fd55bae0f528a5697a9df0e77e6568b19dfe34","balance":"4509718944753","unconfirmedBalance":"4509718944753"} */
export interface GetAccountPublicKeyResponseDto {
  /** 256 bit public key of ADAMANT address in hex format */
  publicKey: PublicKey;
  success: boolean;
  nodeTimestamp: number;
}

/** @example {"publicKey":"a9407418dafb3c8aeee28f3263fd55bae0f528a5697a9df0e77e6568b19dfe34","balance":"4509718944753","unconfirmedBalance":"4509718944753"} */
export interface CreateNewAccountRequestBody {
  /** 256 bit public key of ADAMANT address in hex format */
  publicKey: PublicKey;
  success: boolean;
  nodeTimestamp: number;
}

/** @example {"account":{"address":"U4697606961271319613","unconfirmedBalance":"0","balance":"0","publicKey":"bee368cc0ce2974adcbcc97e649ac18a031492a579034abed5f77d667001d450","unconfirmedSignature":0,"secondSignature":0,"secondPublicKey":null,"multisignatures":null,"u_multisignatures":null},"success":true,"nodeTimestamp":63205623} */
export interface CreateNewAccountResponseDto {
  account: AccountDto;
  success: boolean;
  nodeTimestamp: number;
}

export interface GetBlockInfoResponseDto {
  block: BlockInfoDto;
  success: boolean;
  nodeTimestamp: number;
}

export interface GetBlocksResponseDto {
  blocks: BlockInfoDto[];
  success: boolean;
  nodeTimestamp: number;
}

export interface GetChatRoomsResponseDto {
  chats: {
    lastTransaction?: TokenTransferTransaction | ChatMessageTransaction;
    participants?: ChatParticipant[];
  }[];
  success: boolean;
  nodeTimestamp: number;
}

export interface GetChatMessagesResponseDto {
  messages: (TokenTransferTransaction | ChatMessageTransaction)[];
  participants: ChatParticipant[];
  success: boolean;
  nodeTimestamp: number;
}

export interface GetChatTransactionsResponseDto {
  transactions: ChatMessageTransaction[];
  /** Number in string format */
  count: string;
  success: boolean;
  nodeTimestamp: number;
}

export interface CreateNewChatMessageRequestBody {
  transaction: RegisterChatMessageTransaction;
}

/** @example {"success":true,"nodeTimestamp":63205623,"transactionId":"2515012750420367858"} */
export interface CreateNewChatMessageResponseDto {
  success: boolean;
  nodeTimestamp: number;
  transactionId: string;
}

export interface GetDelegatesResponseDto {
  delegates: DelegateDto[];
  /** @example 254 */
  totalCount: number;
  /** @example true */
  success: boolean;
  /** @example 61762271 */
  nodeTimestamp: number;
}

export interface GetDelegateResponseDto {
  delegate: DelegateDto;
  /** @example true */
  success: boolean;
  /** @example 61762271 */
  nodeTimestamp: number;
}

export type RegisterDelegateRequestBody = RegisterNewDelegateTransaction;

export interface RegisterDelegateResponseDto {
  transaction: RegisterDelegateTransactionDto;
  /** @example true */
  success: boolean;
  /** @example 61762271 */
  nodeTimestamp: number;
}

export interface SearchDelegateResponseDto {
  delegates: SearchDelegateDto[];
  /** @example true */
  success: boolean;
  /** @example 61762271 */
  nodeTimestamp: number;
}

export interface GetDelegatesCountResponseDto {
  /** @example 255 */
  count: number;
  /** @example true */
  success: boolean;
  /** @example 61762271 */
  nodeTimestamp: number;
}

export interface GetDelegateStatsResponseDto {
  /**
   * Total sum of fees forged by delegate
   * @example "586039475511"
   */
  fees: string;
  /**
   * Total sum of rewards made by delegate
   * @example "3943485000000"
   */
  rewards: string;
  /**
   * Total sum of forged tokens
   * @example "4529524475511"
   */
  forged: string;
  /** @example true */
  success: boolean;
  /** @example 61762271 */
  nodeTimestamp: number;
}

export interface GetNextForgersResponseDto {
  /**
   * Array of next forgers public keys
   * @example ["677c6db63548c99674fed0571da522a6a9569d0c1da9669734a3625645519641","150d638714f65845b50f1ff58f3da2c2baa3a1dc8bf59a9884c10da5a8e951c6"]
   */
  delegates: string[];
  /**
   * Current slot number
   * @example 11610423
   */
  currentSlot: number;
  /**
   * Current blockchain height
   * @example 10146268
   */
  currentBlock: number;
  /**
   * Current block slot number
   * @example 11610422
   */
  currentBlockSlot: number;
  /** @example true */
  success: boolean;
  /** @example 61762271 */
  nodeTimestamp: number;
}

export interface GetVotersResponseDto {
  accounts: VoterDto[];
  /** @example true */
  success: boolean;
  /** @example 61762271 */
  nodeTimestamp: number;
}

export interface GetAccountVotesResponseDto {
  /** List of delegates account voted for. */
  delegates: DelegateDto[];
  /** @example true */
  success: boolean;
  /** @example 61762271 */
  nodeTimestamp: number;
}

export type RegisterVotesRequestBody = RegisterVoteForDelegateTransaction;

export interface RegisterVotesResponseDto {
  transaction: RegisterVotesTransactionDto;
  /** @example true */
  success: boolean;
  /** @example 61762271 */
  nodeTimestamp: number;
}

export interface GetPeersResponseDto {
  peers: PeerDto[];
  success: boolean;
  nodeTimestamp: number;
}

/** @example {"loaded":true,"now":10144343,"blocksCount":0,"success":true,"nodeTimestamp":58052355} */
export interface GetLoadingStatusResponseDto {
  loaded: boolean;
  now: number;
  blocksCount: number;
  success: boolean;
  nodeTimestamp: number;
}

/** @example {"success":true,"nodeTimestamp":58052355,"syncing":false,"blocks":0,"height":10146332,"broadhash":"09f2f5614cf7209979dc1df2dd92d16aade904dae6c9b68bccaeb234647b3c18","consensus":94.32} */
export interface GetSyncStatusResponseDto {
  success: boolean;
  nodeTimestamp: number;
  syncing: boolean;
  blocks: number;
  height: number;
  broadhash: string;
  consensus: number;
}

/** @example {"success":true} */
export interface GetPingStatusResponseDto {
  success: boolean;
}

export type GetNodeVersionResponseDto = NodeVersion & {
  /** @example true */
  success: boolean;
  /** @example 58052984 */
  nodeTimestamp: number;
};

/** @example {"success":true,"nodeTimestamp":58052355,"broadhash":"e1aedd2818679c174e3f6e31891c34f4069927f33f145e1b81fe5d978733e794"} */
export interface GetBroadhashResponseDto {
  success: boolean;
  nodeTimestamp: number;
  /** Broadhash is established as an aggregated rolling hash of the past five blocks present in the database */
  broadhash: string;
}

/** @example {"success":true,"nodeTimestamp":58646306,"epoch":"2017-09-02T17:00:00.000Z"} */
export interface GetEpochResponseDto {
  success: boolean;
  nodeTimestamp: number;
  /** Time when blockchain epoch starts. Value `2017-09-02T17:00:00.000Z` is for mainnet. */
  epoch: string;
}

/** @example {"success":true,"nodeTimestamp":58646306,"height":10145318} */
export interface GetHeightResponseDto {
  success: boolean;
  nodeTimestamp: number;
  /** Current node height. */
  height: number;
}

/** @example {"success":true,"nodeTimestamp":58646306,"fee":50000000} */
export interface GetTokenTransferFeeResponseDto {
  success: boolean;
  nodeTimestamp: number;
  /** Current fee value for `type 0` (token transfer) transactions. Integer amount of 1/10^8 ADM tokens (1 ADM = 100000000). */
  fee: number;
}

export interface GetTransactionTypesFeesResponseDto {
  /** @example true */
  success: boolean;
  /** @example 58646306 */
  nodeTimestamp: number;
  fees: TransactionTypesFeesDto;
}

/** @example {"success":true,"nodeTimestamp":58646306,"nethash":"bd330166898377fb28743ceef5e43a5d9d0a3efd9b3451fb7bc53530bb0a6d64"} */
export interface GetNethashResponseDto {
  success: boolean;
  nodeTimestamp: number;
  /** The `nethash` describes e.g. the Mainnet or the Testnet, that the node is connecting to. */
  nethash: string;
}

/** @example {"success":true,"nodeTimestamp":58646306,"milestone":1} */
export interface GetMilestoneResponseDto {
  success: boolean;
  nodeTimestamp: number;
  /** Current slot height, which determines reward a delegate will get for forging a block. */
  milestone: number;
}

/** @example {"success":true,"nodeTimestamp":58646306,"reward":45000000} */
export interface GetRewardResponseDto {
  success: boolean;
  nodeTimestamp: number;
  /** The reward a delegate will get for forging a block. Integer amount of 1/10^8 ADM tokens (1 ADM = 100000000). Depends on the slot height. */
  reward: number;
}

/** @example {"success":true,"nodeTimestamp":58646306,"supply":10198038140000000} */
export interface GetTokensTotalSupplyResponseDto {
  success: boolean;
  nodeTimestamp: number;
  /** Total current supply of ADM tokens in the network. Integer amount of 1/10^8 ADM tokens (1 ADM = 100000000). Total supply increases with every new forged block. */
  supply: number;
}

export type GetNetworkInfoResponseDto = NetworkStatus & {
  success: boolean;
  nodeTimestamp: number;
};

export interface GetNodeStatusResponseDto {
  /** @example true */
  success: boolean;
  /** @example 58052984 */
  nodeTimestamp: number;
  network: NetworkStatus;
  version: NodeVersion;
  wsClient: WsClient;
}

export interface GetKVSResponseDto {
  transactions: KVSTransaction[];
  /**
   * Integer in string format
   * @example "1"
   */
  count: string;
  /** @example true */
  success: boolean;
  /** @example 63647706 */
  nodeTimestamp: number;
}

export interface SetKVSRequestBody {
  transaction: RegisterKVSTransaction;
}

/** @example {"success":true,"nodeTimestamp":63410860,"transactionId":"3888802408802922744"} */
export interface SetKVSResponseDto {
  success: boolean;
  nodeTimestamp: number;
  transactionId: string;
}

export interface GetTransactionsResponseDto {
  transactions: AnyTransaction[];
  /**
   * Integer in string format
   * @example "1"
   */
  count: string;
  /** @example true */
  success: boolean;
  /** @example 63647706 */
  nodeTimestamp: number;
}

export interface GetTransactionByIdResponseDto {
  transaction: AnyTransaction;
  /** @example true */
  success: boolean;
  /** @example 63647706 */
  nodeTimestamp: number;
}

/** @example {"success":true,"nodeTimestamp":59979539,"confirmed":256953,"unconfirmed":44,"queued":4,"multisignature":0} */
export interface GetTransactionsCountResponseDto {
  success: boolean;
  nodeTimestamp: number;
  confirmed: number;
  unconfirmed: number;
  queued: number;
  multisignature: number;
}

export interface GetQueuedTransactionsResponseDto {
  transactions: QueuedTransaction[];
  /**
   * Integer in string format
   * @example "1"
   */
  count: string;
  /** @example true */
  success: boolean;
  /** @example 63647706 */
  nodeTimestamp: number;
}

export interface GetQueuedTransactionByIdResponseDto {
  transaction: QueuedTransaction;
  /** @example true */
  success: boolean;
  /** @example 63647706 */
  nodeTimestamp: number;
}

export interface GetUnconfirmedTransactionsResponseDto {
  transactions: QueuedTransaction[];
  /**
   * Integer in string format
   * @example "1"
   */
  count: string;
  /** @example true */
  success: boolean;
  /** @example 63647706 */
  nodeTimestamp: number;
}

export interface GetUnconfirmedTransactionByIdResponseDto {
  transaction: QueuedTransaction;
  /** @example true */
  success: boolean;
  /** @example 63647706 */
  nodeTimestamp: number;
}

export interface TransferTokenRequestBody {
  transaction: RegisterTokenTransferTransaction;
}

export interface TransferTokenResponseDto {
  /** @example "6146865104403680934" */
  transactionId: string;
  /** @example true */
  success: boolean;
  /** @example 63647706 */
  nodeTimestamp: number;
}

export interface RegisterTransactionRequestBody {
  transaction: RegisterAnyTransaction;
}

export interface RegisterTransactionResponseDto {
  /** @example "6146865104403680934" */
  transactionId: string;
  /** @example true */
  success: boolean;
  /** @example 63647706 */
  nodeTimestamp: number;
}

/**
 * 256 bit public key of ADAMANT address in hex format
 * @example "ef5e78a3d02e6d82f4ac0c5b8923c1b86185bd17c27c9ac027c20ec62db79a84"
 */
export type PublicKey = string;

export interface AccountDto {
  address: string;
  /** @format int64 */
  unconfirmedBalance: string;
  /** @format int64 */
  balance: string;
  /** 256 bit public key of ADAMANT address in hex format */
  publicKey: PublicKey;
  unconfirmedSignature: number;
  secondSignature: number;
  secondPublicKey: string | null;
  /** @example [] */
  multisignatures: string[];
  /** @example [] */
  u_multisignatures: string[];
}

/** @example {"id":"11114690216332606721","version":0,"timestamp":61741820,"height":10873829,"previousBlock":"11483763337863654141","numberOfTransactions":1,"totalAmount":10000000,"totalFee":50000000,"reward":45000000,"payloadLength":117,"payloadHash":"f7c0fa338a3a848119cad999d8035ab3fcb3d274a4555e141ebeb86205e41345","generatorPublicKey":"134a5de88c7da1ec71e75b5250d24168c6c6e3965ff16bd71497bd015d40ea6a","generatorId":"U3238410389688281135","blockSignature":"18607b15417a6b0a56b4c74cacd713ad7a10df16ec3ab45a697fa72b6f811f9213d895b7e0fbca71cf74323d60148d0991668e5368386408f4d841496ed2280d","confirmations":1093,"totalForged":"95000000"} */
export interface BlockInfoDto {
  /** @format int64 */
  id: string;
  version: number;
  timestamp: number;
  height: number;
  /** @format int64 */
  previousBlock: string;
  numberOfTransactions: number;
  totalAmount: number;
  totalFee: number;
  reward: number;
  payloadLength: number;
  payloadHash: string;
  generatorId: string;
  blockSignature: string;
  confirmations: number;
  /** @format int64 */
  totalForged: string;
}

export interface BaseTransaction {
  id: string;
  height: number;
  blockId: string;
  /**
   * Type of transaction. See [Transaction Types](https://github.com/Adamant-im/adamant/wiki/Transaction-Types).
   * @min 0
   * @max 9
   * @example 0
   */
  type: number;
  block_timestamp: number;
  timestamp: number;
  senderPublicKey: string;
  senderId: string;
  recipientId: string;
  recipientPublicKey: string;
  /**
   * Amount to transfer, 8 decimal points (100000000 equals to 1 ADM). For non-transfer transactions must be `0`
   * @format int64
   */
  amount: number;
  /** Fee for operation. Depends on [Transaction Type](https://github.com/Adamant-im/adamant/wiki/Transaction-Types) */
  fee: number;
  signature: string;
  signatures: string[];
  confirmations: number;
  /** @example {} */
  asset: object;
}

/**
 * An empty object
 * @example {}
 */
export type TokenTransferAsset = object;

/** @example {"id":16682447412632443000,"height":10527806,"blockId":2635215585577611300,"type":0,"block_timestamp":59979295,"timestamp":59979276,"senderPublicKey":"632816f2c44a08f282e85532443d73286cadc6d9820d5d25c9d50d8e01c668e0","senderId":"U17362714543155685887","recipientId":"U17819800352812315500","recipientPublicKey":"28994b2cd075fd442e6ce78fa8c07966ed122932ff07411fed3c918e495586e2","amount":100000000,"fee":50000000,"signature":"1db7e9111eaca790b73d51c32572739c46fcba3962aff55ca47ecf9a8c9fcb82c323de39ed60bc87d81a1245d43b5351b9dd44ad70128d78536250168b64c408","signatures":[],"confirmations":18431929,"asset":{}} */
export type TokenTransferTransaction = BaseTransaction & {
  /**
   * Always equal to `0`
   * @min 0
   * @max 0
   * @example 0
   */
  type: number;
  /** An empty object */
  asset: TokenTransferAsset;
};

/** @example {"chat":{"message":"748e4e9cffc969dfa4c1d7b9b708cb171c9e","own_message":"96904970891b838c9a3ab1b9a6f31ec194ec94ffaa95d0cd","type":1}} */
export interface ChatMessageAsset {
  chat: {
    /** Encrypted message */
    message?: string;
    /** Nonce */
    own_message?: string;
    /** Type of chat message (1 - Basic Encrypted Message, 2 - Rich Content Message, 3 - Signal Message). See details https://github.com/Adamant-im/adamant/wiki/Message-Types */
    type?: number;
  };
}

/** @example {"id":17242227802580636000,"height":7583081,"blockId":10363608465961390000,"type":8,"block_timestamp":64874935,"timestamp":64874929,"senderPublicKey":"b34d48d8d70b3a91f766df34789abf0cad62da7207e171d997508a460217c5d3","senderId":"U13267906643444995032","recipientId":"U9203183357885757380","recipientPublicKey":"741d3d1f52e609eef981e9ab370ec1e7c3ff70cafad94691937a2bb6d84bbff2","amount":0,"fee":100000,"signature":"8803346cf43457aba3480311ee489706ec66493fa043c4d1732682eb86e88d96f36a7e87c1d0d00dd3963f75e763e5554df402ee0aa79bd59bd55185a6e49a03","signatures":[],"confirmations":23229462,"asset":{"chat":{"message":"2f045f1d4a5198843999e2948b0cc78806","own_message":"a7cd3fa21e543dcc9f0564387d83c4d862137a2da37f29d4","type":1}}} */
export type ChatMessageTransaction = BaseTransaction & {
  /**
   * Always equal to `8`
   * @min 8
   * @max 8
   * @example 8
   */
  type: number;
  asset: ChatMessageAsset;
};

/**
 * ADAMANT address
 * @example "U8916295525136600565"
 */
export type AdamantAddress = string;

export interface ChatParticipant {
  /** ADAMANT address */
  address: AdamantAddress;
  /** 256 bit public key of ADAMANT address in hex format */
  publicKey: PublicKey;
}

/** @example {"type":0,"amount":0,"senderId":"U14236667426471084862","senderPublicKey":"8cd9631f9f634a361ea3b85cbd0df882633e39e7d26d7bc615bbcf75e41524ef","signature":"b3982d603be8f0246fa663e9f012bf28b198cd28f82473db1eb4a342d890f7a2a2c1845db8d256bb5bce1e64a9425822a91e10bf960a2e0b55e20b4841e4ae0b","timestamp":63228852} */
export interface RegisterTransactionBase {
  type: number;
  amount: number;
  senderId: string;
  senderPublicKey: string;
  signature: string;
  timestamp: number;
}

export type RegisterChatMessageTransaction = RegisterTransactionBase & {
  /**
   * Always equal to `8`
   * @min 8
   * @max 8
   * @example 8
   */
  type: number;
  recipientId: string;
  asset: ChatMessageAsset;
};

/** @example {"username":"galaxy","address":"U17457189553820283321","publicKey":"7e26562594685ba12c0bb99ae80692947828afb71962d54634795d78b3ea7023","vote":"248994436803629","votesWeight":"83910064952101","producedblocks":269879,"missedblocks":567,"rate":10,"rank":10,"approval":0.76,"productivity":99.79} */
export interface DelegateDto {
  /** Unique delegate's nickname */
  username: string;
  /** Delegate address */
  address: string;
  /** Delegate Public Key */
  publicKey: string;
  /** Vote weight (obsolete, not used) */
  vote: string;
  /** Vote weight (Fair Delegate System) */
  votesWeight: string;
  /** Count of produced blocks */
  producedlocks?: number;
  /** Count of missed blocks */
  missedblocks: number;
  /** Current position in the Delegates List */
  rate: number;
  /** Current position in the Delegates List */
  rank: number;
  /** Share of votes of all votes in the system */
  approval: number;
  /** Productivity / Uptime of a delegate. If `0`, delegate is not active now */
  productivity: number;
}

/** @example {"type":2,"amount":0,"senderId":"U3031563782805250428","senderPublicKey":"a339974effc141f302bd3589c603bdc9468dd66bcc424b60025b36999eb69ca3","signature":"c2e4a3ef7f0d363611a2b22b96feff269f1a0cbb61741a2ce55756bb9324826092fd9bff6348145e3cc384c097f101a493b9136da5236292ecf8b1ed6657dd01","timestamp":166805250,"asset":{"delegate":{"username":"kpeo","publicKey":"a339974effc141f302bd3589c603bdc9468dd66bcc424b60025b36999eb69ca3"}}} */
export type RegisterNewDelegateTransaction = RegisterTransactionBase & {
  /**
   * Should be always equal to `2`
   * @min 2
   * @max 2
   * @example 2
   */
  type: number;
  asset: {
    delegate: {
      username: string;
      /** 256 bit public key of ADAMANT address in hex format */
      publicKey: PublicKey;
    };
  };
};

export interface QueuedTransaction {
  /** @example "U14236667426471084862" */
  recipientId: string;
  /** @example 0 */
  amount: number;
  /**
   * See [Transaction Types](https://github.com/Adamant-im/adamant/wiki/Transaction-Types)
   * @min 0
   * @max 9
   * @example 3
   */
  type: number;
  /** @example "U14236667426471084862" */
  senderId: string;
  /** @example "8cd9631f9f634a361ea3b85cbd0df882633e39e7d26d7bc615bbcf75e41524ef" */
  senderPublicKey: string;
  /** @example 63394407 */
  timestamp?: number;
  /** @example "7f4f5d240fc66da1cbdb3fe291d6fcec006848236355aebe346fcd1e3ba500caeac1ed0af6f3d7f912a889a1bbedc1d7bab17b6ebd36386b81df78189ddf7c07" */
  signature: string;
  /** @example "13616514419605573351" */
  id: string;
  /** @example 5000000000 */
  fee: number;
  /** @example 1 */
  relays: number;
  /**
   * Date and time in ISO 8601 format
   * @example "2019-09-06T10:33:28.054Z"
   */
  receivedAt: string;
}

/** @example {"delegate":{"address":"U3031563782805250428","username":"kpeo","publicKey":"a339974effc141f302bd3589c603bdc9468dd66bcc424b60025b36999eb69ca3"}} */
export interface RegisterDelegateAsset {
  delegate: {
    /** ADAMANT address */
    address: AdamantAddress;
    username: string;
    /** 256 bit public key of ADAMANT address in hex format */
    publicKey: PublicKey;
  };
}

export type RegisterDelegateTransactionDto = QueuedTransaction & {
  asset: RegisterDelegateAsset;
  /**
   * Always equal to `2`
   * @min 2
   * @max 2
   * @example 2
   */
  type: number;
  /**
   * Always equal to `300000000000`
   * @min 300000000000
   * @max 300000000000
   * @example 300000000000
   */
  fee?: number;
};

export type SearchDelegateDto = DelegateDto & {
  /**
   * Number of accounts who voted for delegate
   * @example 12
   */
  voters_cnt: number;
  /**
   * Epoch timestamp of when delegate was registered
   * @example 45523238
   */
  register_timestamp: number;
};

/** @example {"username":"leg","address":"U12609717384103730908","publicKey":"559418798f67a81b7f893aa8eab1218b9838a6b0bcd2bc8968c6d490ae0d5d77","balance":"506697"} */
export interface VoterDto {
  /** Voter's delegate username. `null` if address is not a delegate. */
  username: string | null;
  /** Voter's ADAMANT address */
  address: string;
  /** Voter's ADAMANT public key */
  publicKey: string;
  /** ADM balance of voter's ADAMANT wallet. Integer amount of 1/10^8 ADM tokens (1 ADM = 100000000) */
  balance: string;
}

/** @example {"votes":["-c0c580c3fb89409f32181fef58935f286f0c1bbf61bd727084ed915b3a4bc95b","ac903ab58135cd5f0613a929d876953214d224034b73c33e63bc153d669447f4"]} */
export interface VoteForDelegateAsset {
  votes?: string[];
}

export type RegisterVoteForDelegateTransaction = RegisterTransactionBase & {
  asset: VoteForDelegateAsset;
  /**
   * ADAMANT address of account who votes. Same as `senderId`
   * @example "U14236667426471084862"
   */
  recipientId: string;
  /**
   * Should be always equal to `3`
   * @min 3
   * @max 3
   * @example 3
   */
  type: number;
  /**
   * ADAMANT address of account who votes. Same as `recipientId`
   * @example "U14236667426471084862"
   */
  senderId: string;
};

export type RegisterVotesTransactionDto = QueuedTransaction & {
  asset: VoteForDelegateAsset;
  /**
   * Always equal to `3`
   * @min 3
   * @max 3
   * @example 3
   */
  type: number;
  /** @example true */
  success: boolean;
  /** @example 61762271 */
  nodeTimestamp: number;
};

/** @example {"ip":"194.32.79.175","port":36666,"state":2,"os":"linux4.15.0-36-generic","version":"0.4.0","broadhash":"3dfdf6c7bbaf7537eac9c70432f7ba1cae835b9b15e4ecd97e147616dde67e62","height":10146365,"clock":null,"updated":1562424199553,"nonce":"jxXV6g0sHJhmDubq"} */
export interface PeerDto {
  /** IPv4 address of node */
  ip: string;
  /** Port number of ADAMANT node. `36666` for mainnet or `36667` for testnet */
  port: string;
  /** State of the peer. Available values: Connected (2), Disconnected, Banned */
  state: number;
  /** Node's operating system */
  os: string;
  /** ADAMANT node software version */
  version: string;
  /** Broadhash on the peer node. Broadhash is established as an aggregated rolling hash of the past five blocks present in the database. */
  broadhash: string;
  /** Current node's blockchain height */
  height: number;
  clock: string | null;
  /** Unix timestamp based in ms, when peer updated */
  updated: number;
  /** Unique Identifier for the peer. Random string. */
  nonce: string;
}

/** @example {"build":"","commit":"b07aaf9580dffb5cc95cc65f303f6f1e5fca7d9c","version":"0.5.2"} */
export interface NodeVersion {
  build: string;
  commit: string;
  version: string;
}

/** @example {"send":50000000,"vote":5000000000,"delegate":300000000000,"old_chat_message":500000,"chat_message":100000,"state_store":100000,"profile_update":5000000,"avatar_upload":10000000} */
export interface TransactionTypesFeesDto {
  /** Token transfer, type 0 */
  send: number;
  /** Voting for delegate, type 3 */
  vote: number;
  /** Registration of a new delegate, type 2 */
  delegate: number;
  /** Sending a message (not used for now) */
  old_chat_message: number;
  /** Sending a message, type 8 */
  chat_message: number;
  /** Storing data in KVS, type 9 */
  state_store: number;
  profile_update: number;
  avatar_upload: number;
}

/** @example {"broadhash":"4a28272c915f74d118120bb47db547a18a7512e1d48092c48be86939a6d45b89","epoch":"2017-09-02T17:00:00.000Z","height":10145334,"fee":50000000,"milestone":1,"nethash":"bd330166898377fb28743ceef5e43a5d9d0a3efd9b3451fb7bc53530bb0a6d64","reward":45000000,"supply":10198040075000000} */
export interface NetworkStatus {
  /** Broadhash is established as an aggregated rolling hash of the past five blocks present in the database */
  broadhash: string;
  /** Time when blockchain epoch starts. Value `2017-09-02T17:00:00.000Z` is for mainnet. */
  epoch: string;
  height: number;
  fee: number;
  /** Current slot height, which determines reward a delegate will get for forging a block. */
  milestone: number;
  /** The `nethash` describes e.g. the Mainnet or the Testnet, that the node is connecting to. */
  nethash: string;
  /** The reward a delegate will get for forging a block. Integer amount of 1/10^8 ADM tokens (1 ADM = 100000000). */
  reward: number;
  /** Total current supply of ADM tokens in the network. Integer amount of 1/10^8 ADM tokens (1 ADM = 100000000). */
  supply: number;
}

/** @example {"enabled":true,"port":36668} */
export interface WsClient {
  enabled: boolean;
  port: number;
}

/** @example {"state":{"key":"eth:address","value":"0x2391EEaEc07B927D2BA4Fa5cB3cE4b490Fa6fffC","type":0}} */
export interface KVSTransactionAsset {
  state: {
    key?: string;
    value?: string;
    /**
     * @min 0
     * @max 0
     */
    type?: number;
  };
}

/** @example {"id":11325216963059857000,"height":3377231,"blockId":14121859709526400000,"type":9,"block_timestamp":23943500,"timestamp":23943500,"senderPublicKey":"ac903ab58135cd5f0613a929d876953214d224034b73c33e63bc153d669447f4","senderId":"U5517006347330072401","recipientId":null,"recipientPublicKey":null,"amount":0,"fee":100000,"signature":"4c3bcca1f6c921cef7ce07f4e641f668c5c0660bb6432335d5e2117c7a4d8378b352e7fa4fac3126bd7228f5b9ac5d57100bb161da02f7efc16df9f7e602b10d","signatures":[],"confirmations":7856415,"asset":{"state":{"key":"eth:address","value":"0x2391EEaEc07B927D2BA4Fa5cB3cE4b490Fa6fffC","type":0}}} */
export type KVSTransaction = BaseTransaction & {
  /**
   * Always equal to `9`
   * @min 9
   * @max 9
   * @example 9
   */
  type: number;
  /** There is no recipient for this type of transaction */
  recipientId?: null;
  /** There is no recipient for this type of transaction */
  recipientPublicKey?: null;
  asset: KVSTransactionAsset;
};

export type RegisterKVSTransaction = RegisterTransactionBase & {
  /**
   * Should be always equal to `9` (Store in KVS transaction type)
   * @min 9
   * @max 9
   * @example 9
   */
  type: number;
  asset: KVSTransactionAsset;
};

/** @example {"id":14674137414602658000,"height":31536741,"blockId":15921349202793791000,"type":2,"block_timestamp":166805152,"timestamp":166805152,"senderPublicKey":"a339974effc141f302bd3589c603bdc9468dd66bcc424b60025b36999eb69ca3","senderId":"U3031563782805250428","recipientId":null,"recipientPublicKey":null,"amount":0,"fee":300000000000,"relays":1,"signature":"1833a86e24d57ad6dbd30c47924500a03096fd06076fafe5bca4f23ab4629268f3b1a58a1ce275356bc0b79f64a11b8abe9bec6c3d55202d6393327f9278910b","signatures":[],"confirmations":427,"asset":{"delegate":{"username":"kpeo","publicKey":"a339974effc141f302bd3589c603bdc9468dd66bcc424b60025b36999eb69ca3","address":"U3031563782805250428"}}} */
export type RegisterDelegateTransaction = BaseTransaction & {
  /**
   * Always equal to `2`
   * @min 2
   * @max 2
   * @example 2
   */
  type: number;
  /** There is no recipient for this type of transaction */
  recipientId?: null;
  /** There is no recipient for this type of transaction */
  recipientPublicKey?: null;
  asset: any;
};

/** @example {"id":9888167852341778000,"height":10488572,"blockId":16481510969712464000,"type":3,"block_timestamp":59782601,"timestamp":59782601,"senderPublicKey":"9560562121cdc41112a0b288101079346d9c67f5bbff1f4d5a29483258c9477a","senderId":"U9221911598904803004","recipientId":"U9221911598904803004","recipientPublicKey":"9560562121cdc41112a0b288101079346d9c67f5bbff1f4d5a29483258c9477a","amount":0,"fee":5000000000,"signature":"fe199a4a5790186c1c482c6f5c0de5b7baa0a66e4b97abcb96f47e197880ea8333dc57e1b497e32eabdb157ac834dbd85d58d7c550e8aabe208af79026279c04","signatures":[],"confirmations":745088,"asset":{"votes":["-c0c580c3fb89409f32181fef58935f286f0c1bbf61bd727084ed915b3a4bc95b"]},"votes":{"added":[],"deleted":["c0c580c3fb89409f32181fef58935f286f0c1bbf61bd727084ed915b3a4bc95b"]}} */
export type VoteForDelegateTransaction = BaseTransaction & {
  votes: {
    /** List of Upvoted delegates */
    added?: string[];
    /** List of Downvoted delegates */
    deleted?: string[];
  };
  /**
   * Always equal to `3`
   * @min 3
   * @max 3
   * @example 3
   */
  type: number;
  asset: VoteForDelegateAsset;
};

export type AnyTransaction =
  | TokenTransferTransaction
  | RegisterDelegateTransaction
  | VoteForDelegateTransaction
  | ChatMessageTransaction
  | KVSTransaction;

export type RegisterTokenTransferTransaction = RegisterTransactionBase & {
  /** Can be `type 0 — Token transfer` or `type 8 — Chat/Message`. */
  type: number;
  recipientId: string;
  /** Amount of token to transfer */
  amount: number;
};

export type RegisterAnyTransaction =
  | RegisterVoteForDelegateTransaction
  | RegisterTokenTransferTransaction
  | RegisterKVSTransaction
  | RegisterChatMessageTransaction
  | RegisterNewDelegateTransaction;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://unusual.adamant.im/api";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title ADAMANT OpenAPI Specification
 * @version 0.7.0
 * @baseUrl https://unusual.adamant.im/api
 *
 * Schema JSON is located [here](/schema.json).
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  accounts = {
    /**
     * @description Get account information by ADAMANT address or by Public Key
     *
     * @tags Account
     * @name AccountsList
     * @request GET:/accounts
     */
    accountsList: (
      query?: {
        address?: string;
        publicKey?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetAccountInfoResponseDto, any>({
        path: `/accounts`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get account balance
     *
     * @tags Account
     * @name GetBalanceList
     * @request GET:/accounts/getBalance
     */
    getBalanceList: (
      query: {
        address: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetAccountBalanceResponseDto, any>({
        path: `/accounts/getBalance`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get account Public Key
     *
     * @tags Account
     * @name GetPublicKeyList
     * @request GET:/accounts/getPublicKey
     */
    getPublicKeyList: (
      query: {
        address: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetAccountPublicKeyResponseDto, any>({
        path: `/accounts/getPublicKey`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Create new account
     *
     * @tags Account
     * @name PostAccounts
     * @request POST:/accounts/new
     */
    postAccounts: (data: CreateNewAccountRequestBody, params: RequestParams = {}) =>
      this.request<CreateNewAccountResponseDto, any>({
        path: `/accounts/new`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Current votes of specific ADAMANT account
     *
     * @tags Delegates and Voting
     * @name DelegatesList
     * @request GET:/accounts/delegates
     */
    delegatesList: (
      query: {
        /** @example "U777355171330060015" */
        address: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetAccountVotesResponseDto, any>({
        path: `/accounts/delegates`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Vote for delegates
     *
     * @tags Delegates and Voting
     * @name DelegatesCreate
     * @request POST:/accounts/delegates
     */
    delegatesCreate: (data: RegisterVoteForDelegateTransaction, params: RequestParams = {}) =>
      this.request<RegisterVotesResponseDto, any>({
        path: `/accounts/delegates`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  blocks = {
    /**
     * @description Get block information by ID
     *
     * @tags Blocks
     * @name GetBlocks
     * @request GET:/blocks/get
     */
    getBlocks: (
      query: {
        /** Block ID */
        id: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetBlockInfoResponseDto, any>({
        path: `/blocks/get`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * @description Get list of blocks
     *
     * @tags Blocks
     * @name BlocksList
     * @request GET:/blocks
     */
    blocksList: (
      query?: {
        /**
         * How much blocks to get, integer. Default is `100`.
         * @format int32
         * @min 1
         * @max 100
         * @default 100
         */
        limit?: number;
        /**
         * Height offset value for results. Default is `0`.
         * @format int32
         * @default 0
         */
        offset?: number;
        /** Delegate's public key of ADAMANT address who generated the block */
        generatorPublicKey?: string;
        /** Get block of specific node's height */
        height?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetBlocksResponseDto, any>({
        path: `/blocks`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Broadhash is established as an aggregated rolling hash of the past five blocks present in the database.
     *
     * @tags Nodes and Blockchain
     * @name GetBroadhashList
     * @request GET:/blocks/getBroadhash
     */
    getBroadhashList: (params: RequestParams = {}) =>
      this.request<GetBroadhashResponseDto, any>({
        path: `/blocks/getBroadhash`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns time when blockchain epoch starts. Value `2017-09-02T17:00:00.000Z` is for mainnet.
     *
     * @tags Nodes and Blockchain
     * @name GetEpochList
     * @request GET:/blocks/getEpoch
     */
    getEpochList: (params: RequestParams = {}) =>
      this.request<GetEpochResponseDto, any>({
        path: `/blocks/getEpoch`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns current node's blockchain height
     *
     * @tags Nodes and Blockchain
     * @name GetHeightList
     * @request GET:/blocks/getHeight
     */
    getHeightList: (params: RequestParams = {}) =>
      this.request<GetHeightResponseDto, any>({
        path: `/blocks/getHeight`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns current fee value for `type 0` (token transfer) transactions. Integer amount of 1/10^8 ADM tokens (1 ADM = 100000000).
     *
     * @tags Nodes and Blockchain
     * @name GetFeeList
     * @request GET:/blocks/getFee
     */
    getFeeList: (params: RequestParams = {}) =>
      this.request<GetTokenTransferFeeResponseDto, any>({
        path: `/blocks/getFee`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns current fee values for different transaction types
     *
     * @tags Nodes and Blockchain
     * @name GetFeesList
     * @request GET:/blocks/getFees
     */
    getFeesList: (params: RequestParams = {}) =>
      this.request<GetTransactionTypesFeesResponseDto, any>({
        path: `/blocks/getFees`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description The nethash describes e.g. the Mainnet or the Testnet, that the node is connecting to.
     *
     * @tags Nodes and Blockchain
     * @name GetNethashList
     * @request GET:/blocks/getNethash
     */
    getNethashList: (params: RequestParams = {}) =>
      this.request<GetNethashResponseDto, any>({
        path: `/blocks/getNethash`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Return current slot height, which determines reward a delegate will get for forging a block.
     *
     * @tags Nodes and Blockchain
     * @name GetMilestoneList
     * @request GET:/blocks/getMilestone
     */
    getMilestoneList: (params: RequestParams = {}) =>
      this.request<GetMilestoneResponseDto, any>({
        path: `/blocks/getMilestone`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns reward — the reward a delegate will get for forging a block. Integer amount of 1/10^8 ADM tokens (1 ADM = 100000000). Depends on the slot height.
     *
     * @tags Nodes and Blockchain
     * @name GetRewardList
     * @request GET:/blocks/getReward
     */
    getRewardList: (params: RequestParams = {}) =>
      this.request<GetRewardResponseDto, any>({
        path: `/blocks/getReward`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns total current supply of ADM tokens in network. Integer amount of 1/10^8 ADM tokens (1 ADM = 100000000). Total supply increases with every new forged block.
     *
     * @tags Nodes and Blockchain
     * @name GetSupplyList
     * @request GET:/blocks/getSupply
     */
    getSupplyList: (params: RequestParams = {}) =>
      this.request<GetTokensTotalSupplyResponseDto, any>({
        path: `/blocks/getSupply`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns blockchain network information in a single request
     *
     * @tags Nodes and Blockchain
     * @name GetStatusList
     * @request GET:/blocks/getStatus
     */
    getStatusList: (params: RequestParams = {}) =>
      this.request<GetNetworkInfoResponseDto, any>({
        path: `/blocks/getStatus`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  chatrooms = {
    /**
     * @description Get list of Chats
     *
     * @tags Chats
     * @name ChatroomsDetail
     * @request GET:/chatrooms/{address}
     */
    chatroomsDetail: (address: string, params: RequestParams = {}) =>
      this.request<GetChatRoomsResponseDto, any>({
        path: `/chatrooms/${address}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Get messages between two accounts
     *
     * @tags Chats
     * @name ChatroomsDetail2
     * @request GET:/chatrooms/{ownAddress}/{partnerAddress}
     * @originalName chatroomsDetail
     * @duplicate
     */
    chatroomsDetail2: (
      ownAddress: string,
      partnerAddress: string,
      query?: {
        /**
         * Limit number of messages
         * @format int32
         */
        limit?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetChatMessagesResponseDto, any>({
        path: `/chatrooms/${ownAddress}/${partnerAddress}`,
        method: "GET",
        query: query,
        ...params,
      }),
  };
  chats = {
    /**
     * @description Returns list of transactions with `type = 8` (deprecated, use `/chatrooms` instead)
     *
     * @tags Chats
     * @name GetChats
     * @request GET:/chats/get
     */
    getChats: (
      query: {
        /**
         * ADAMANT address
         * @example "U839357947177758191"
         */
        address: string;
        /**
         * Order by field
         * @example "timestamp:desc"
         */
        orderBy?: string;
        /**
         * Filter transactions starting from specified block `height`
         * @example 6184187
         */
        fromHeight?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetChatTransactionsResponseDto, any>({
        path: `/chats/get`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Broadcast transactions of `type 8 — Сhat/Message`
     *
     * @tags Chats
     * @name ProcessCreate
     * @request POST:/chats/process
     */
    processCreate: (data: CreateNewChatMessageRequestBody, params: RequestParams = {}) =>
      this.request<CreateNewChatMessageResponseDto, any>({
        path: `/chats/process`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  delegates = {
    /**
     * @description Retrieves list of registered ADAMANT delegates
     *
     * @tags Delegates and Voting
     * @name DelegatesList
     * @request GET:/delegates
     */
    delegatesList: (
      query?: {
        /**
         * Number of delegates to retrieve, integer. Default is `101` (active delegates).
         * @format int32
         * @min 1
         * @default 101
         */
        limit?: number;
        /**
         * Height offset value for results. Default is `0`.
         * @format int32
         * @default 0
         */
        offset?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetDelegatesResponseDto, any>({
        path: `/delegates`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Register new delegate
     *
     * @tags Delegates and Voting
     * @name DelegatesCreate
     * @request POST:/delegates
     */
    delegatesCreate: (data: RegisterNewDelegateTransaction, params: RequestParams = {}) =>
      this.request<RegisterDelegateResponseDto, any>({
        path: `/delegates`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get delegate info by `username` or `publicKey`
     *
     * @tags Delegates and Voting
     * @name GetDelegates
     * @request GET:/delegates/get
     */
    getDelegates: (
      query?: {
        /** @example "lynx" */
        username?: string;
        /** @example "ef5e78a3d02e6d82f4ac0c5b8923c1b86185bd17c27c9ac027c20ec62db79a84" */
        publicKey?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetDelegateResponseDto, any>({
        path: `/delegates/get`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Search delegates by `username`
     *
     * @tags Delegates and Voting
     * @name SearchList
     * @request GET:/delegates/search
     */
    searchList: (
      query: {
        /** Partial or full username of a delegate */
        q: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<SearchDelegateResponseDto, any>({
        path: `/delegates/search`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get total count of delegates
     *
     * @tags Delegates and Voting
     * @name CountList
     * @request GET:/delegates/count
     */
    countList: (params: RequestParams = {}) =>
      this.request<GetDelegatesCountResponseDto, any>({
        path: `/delegates/count`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get forging activity of a delegate
     *
     * @tags Delegates and Voting
     * @name ForgingGetForgedByAccountList
     * @request GET:/delegates/forging/getForgedByAccount
     */
    forgingGetForgedByAccountList: (
      query: {
        /**
         * Delegate's publicKey
         * @example "a9407418dafb3c8aeee28f3263fd55bae0f528a5697a9df0e77e6568b19dfe34"
         */
        generatorPublicKey: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetDelegateStatsResponseDto, any>({
        path: `/delegates/forging/getForgedByAccount`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns list of next forgers
     *
     * @tags Delegates and Voting
     * @name GetNextForgersList
     * @request GET:/delegates/getNextForgers
     */
    getNextForgersList: (params: RequestParams = {}) =>
      this.request<GetNextForgersResponseDto, any>({
        path: `/delegates/getNextForgers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get list of delegate's voters
     *
     * @tags Delegates and Voting
     * @name VotersList
     * @request GET:/delegates/voters
     */
    votersList: (
      query: {
        /**
         * Delegate's ADAMANT public key
         * @example "a9407418dafb3c8aeee28f3263fd55bae0f528a5697a9df0e77e6568b19dfe34"
         */
        publicKey: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetVotersResponseDto, any>({
        path: `/delegates/voters`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  peers = {
    /**
     * @description Get list of connected peer nodes
     *
     * @tags Nodes and Blockchain
     * @name PeersList
     * @request GET:/peers
     */
    peersList: (
      query?: {
        /**
         * Limit number of nodes. Default is `100`.
         * @format int32
         * @min 1
         * @max 100
         * @default 100
         */
        limit?: number;
        /**
         * Height offset value for results. Default is `0`.
         * @format int32
         * @default 0
         */
        offset?: number;
        /**
         * Filter results by Operating System
         * @example "linux4.15.0-36-generic"
         */
        os?: string;
        /**
         * Filter results by IP
         * @example "194.32.79.175"
         */
        ip?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetPeersResponseDto, any>({
        path: `/peers`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns node software information
     *
     * @tags Nodes and Blockchain
     * @name VersionList
     * @request GET:/peers/version
     */
    versionList: (params: RequestParams = {}) =>
      this.request<GetNodeVersionResponseDto, any>({
        path: `/peers/version`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  loader = {
    /**
     * @description Returns information of node's loading process
     *
     * @tags Nodes and Blockchain
     * @name StatusList
     * @request GET:/loader/status
     */
    statusList: (params: RequestParams = {}) =>
      this.request<GetLoadingStatusResponseDto, any>({
        path: `/loader/status`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns information of the node sync process with other peers
     *
     * @tags Nodes and Blockchain
     * @name StatusSyncList
     * @request GET:/loader/status/sync
     */
    statusSyncList: (params: RequestParams = {}) =>
      this.request<GetSyncStatusResponseDto, any>({
        path: `/loader/status/sync`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get ping status
     *
     * @tags Nodes and Blockchain
     * @name StatusPingList
     * @request GET:/loader/status/ping
     */
    statusPingList: (params: RequestParams = {}) =>
      this.request<GetPingStatusResponseDto, any>({
        path: `/loader/status/ping`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  node = {
    /**
     * @description Returns both ADAMANT blockchain network information and Node information in a single request.
     *
     * @tags Nodes and Blockchain
     * @name StatusList
     * @request GET:/node/status
     */
    statusList: (params: RequestParams = {}) =>
      this.request<GetNodeStatusResponseDto, any>({
        path: `/node/status`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  states = {
    /**
     * @description Fetch data from KVS. As a result you'll get a list of transactions of `type = 9` with KVS data, stored in `asset.state` field.
     *
     * @tags KVS
     * @name GetStates
     * @request GET:/states/get
     */
    getStates: (
      query?: {
        /** @example "eth:address" */
        key?: string;
        /**
         * Array of keys, comma-separated in string format
         * @example ["eth:address","doge:address","dash:address","btc:address"]
         */
        keyIds?: string[];
        /** @example "U14236667426471084862" */
        senderId?: string;
        /**
         * Array of ADAMANT addresses, comma-separated in string format
         * @example ["U3461022864428928223","U17790659840463725618","U43512412354440829"]
         */
        senderIds?: string[];
        /** @example "timestamp:desc" */
        orderBy?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetKVSResponseDto, any>({
        path: `/states/get`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a KVS transaction (`type 9`)
     *
     * @tags KVS
     * @name PostStates
     * @request POST:/states/get
     */
    postStates: (data: SetKVSRequestBody, params: RequestParams = {}) =>
      this.request<SetKVSResponseDto, any>({
        path: `/states/get`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  transactions = {
    /**
     * @description Returns list of transactions
     *
     * @tags Transactions
     * @name TransactionsList
     * @request GET:/transactions
     */
    transactionsList: (
      query?: {
        /**
         * Filter results by min `amount` property
         * @example 100000000000001
         */
        minAmount?: number;
        /**
         * Filter results starting from specific `height`
         * @example 7585271
         */
        fromHeight?: number;
        /**
         * Limit number of transactions in the result
         * @example 10
         */
        limit?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetTransactionsResponseDto, any>({
        path: `/transactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Broadcast [any type](https://github.com/Adamant-im/adamant/wiki/Transaction-Types) of transaction
     *
     * @tags Transactions
     * @name TransactionsCreate
     * @request POST:/transactions
     */
    transactionsCreate: (data: RegisterTransactionRequestBody, params: RequestParams = {}) =>
      this.request<RegisterTransactionResponseDto, any>({
        path: `/transactions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get transaction by ID
     *
     * @tags Transactions
     * @name GetTransactions
     * @request GET:/transactions/get
     */
    getTransactions: (
      query?: {
        /**
         * Transaction ID
         * @example "12154642911137703318"
         */
        id?: string;
        /** @example 1 */
        returnAsset?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetTransactionByIdResponseDto, any>({
        path: `/transactions/get`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get `confirmed`, `uncofirmed` and `queued` transactions count
     *
     * @tags Transactions
     * @name CountList
     * @request GET:/transactions/count
     */
    countList: (params: RequestParams = {}) =>
      this.request<GetTransactionsCountResponseDto, any>({
        path: `/transactions/count`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get queued transactions count
     *
     * @tags Transactions
     * @name QueuedList
     * @request GET:/transactions/queued
     */
    queuedList: (params: RequestParams = {}) =>
      this.request<GetQueuedTransactionsResponseDto, any>({
        path: `/transactions/queued`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get queued transaction by ID
     *
     * @tags Transactions
     * @name QueuedGetList
     * @request GET:/transactions/queued/get
     */
    queuedGetList: (
      query?: {
        /**
         * Transaction ID
         * @example "12154642911137703318"
         */
        id?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetQueuedTransactionsResponseDto, any>({
        path: `/transactions/queued/get`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get unconfirmed transactions
     *
     * @tags Transactions
     * @name UnconfirmedList
     * @request GET:/transactions/unconfirmed
     */
    unconfirmedList: (params: RequestParams = {}) =>
      this.request<GetUnconfirmedTransactionsResponseDto, any>({
        path: `/transactions/unconfirmed`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get unconfirmed transaction by ID
     *
     * @tags Transactions
     * @name UnconfirmedGetList
     * @request GET:/transactions/unconfirmed/get
     */
    unconfirmedGetList: (
      query?: {
        /**
         * Transaction ID
         * @example "12154642911137703318"
         */
        id?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<GetUnconfirmedTransactionByIdResponseDto, any>({
        path: `/transactions/unconfirmed/get`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Broadcast transactions of `type 0 — Token transfer` or `type 8 — Chat/Message`. See [Transaction Types](https://github.com/Adamant-im/adamant/wiki/Transaction-Types)
     *
     * @tags Transactions
     * @name ProcessCreate
     * @request POST:/transactions/process
     */
    processCreate: (data: TransferTokenRequestBody, params: RequestParams = {}) =>
      this.request<TransferTokenResponseDto, any>({
        path: `/transactions/process`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
