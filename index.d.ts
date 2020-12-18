// tslint:disable:interface-name
declare module 'binance-api-node' {
  export default function (options?: {
    apiKey: string
    apiSecret: string
    getTime?: () => number | Promise<number>
  }): Binance

  export enum ErrorCodes {
    UNKNOWN = -1000,
    DISCONNECTED = -1001,
    UNAUTHORIZED = -1002,
    TOO_MANY_REQUESTS = -1003,
    UNEXPECTED_RESP = -1006,
    TIMEOUT = -1007,
    INVALID_MESSAGE = -1013,
    UNKNOWN_ORDER_COMPOSITION = -1014,
    TOO_MANY_ORDERS = -1015,
    SERVICE_SHUTTING_DOWN = -1016,
    UNSUPPORTED_OPERATION = -1020,
    INVALID_TIMESTAMP = -1021,
    INVALID_SIGNATURE = -1022,
    ILLEGAL_CHARS = -1100,
    TOO_MANY_PARAMETERS = -1101,
    MANDATORY_PARAM_EMPTY_OR_MALFORMED = -1102,
    UNKNOWN_PARAM = -1103,
    UNREAD_PARAMETERS = -1104,
    PARAM_EMPTY = -1105,
    PARAM_NOT_REQUIRED = -1106,
    NO_DEPTH = -1112,
    TIF_NOT_REQUIRED = -1114,
    INVALID_TIF = -1115,
    INVALID_ORDER_TYPE = -1116,
    INVALID_SIDE = -1117,
    EMPTY_NEW_CL_ORD_ID = -1118,
    EMPTY_ORG_CL_ORD_ID = -1119,
    BAD_INTERVAL = -1120,
    BAD_SYMBOL = -1121,
    INVALID_LISTEN_KEY = -1125,
    MORE_THAN_XX_HOURS = -1127,
    OPTIONAL_PARAMS_BAD_COMBO = -1128,
    INVALID_PARAMETER = -1130,
    BAD_API_ID = -2008,
    DUPLICATE_API_KEY_DESC = -2009,
    INSUFFICIENT_BALANCE = -2010,
    CANCEL_ALL_FAIL = -2012,
    NO_SUCH_ORDER = -2013,
    BAD_API_KEY_FMT = -2014,
    REJECTED_MBX_KEY = -2015,
  }

  export interface Account {
    balances: AssetBalance[]
    buyerCommission: number
    canDeposit: boolean
    canTrade: boolean
    canWithdraw: boolean
    makerCommission: number
    sellerCommission: number
    takerCommission: number
    updateTime: number
  }
  export interface TradeFee {
    symbol: string
    maker: number
    taker: number
  }
  export interface TradeFeeResult {
    tradeFee: TradeFee[]
    success: boolean
  }
  export interface AggregatedTrade {
    aggId: number
    symbol: string
    price: string
    quantity: string
    firstId: number
    lastId: number
    timestamp: number
    isBuyerMaker: boolean
    wasBestPrice: boolean
  }

  export interface AssetBalance {
    asset: string
    free: string
    locked: string
  }

  export interface DepositAddress {
    address: string
    addressTag: string
    asset: string
    success: boolean
  }

  export interface WithrawResponse {
    id: string
    msg: string
    success: boolean
  }

  export enum DepositStatus {
    PENDING = 0,
    SUCCESS = 1,
  }

  export interface DepositHistoryResponse {
    depositList: {
      insertTime: number
      amount: number
      asset: string
      address: string
      txId: string
      status: DepositStatus
    }[]
    success: boolean
  }

  export enum WithdrawStatus {
    EMAIL_SENT = 0,
    CANCELLED = 1,
    AWAITING_APPROVAL = 2,
    REJECTED = 3,
    PROCESSING = 4,
    FAILURE = 5,
    COMPLETED = 6,
  }

  export interface WithdrawHistoryResponse {
    withdrawList: {
      id: string
      amount: number
      transactionFee: number
      address: string
      asset: string
      txId: string
      applyTime: number
      status: WithdrawStatus
    }[]
    success: boolean
  }

  export interface AssetDetail {
    success: boolean
    assetDetail: {
      [asset: string]: {
        minWithdrawAmount: number
        depositStatus: boolean
        withdrawFee: number
        withdrawStatus: boolean
        depositTip?: string
      }
    }
  }

  export interface Binance {
    accountInfo(options?: { useServerTime: boolean }): Promise<Account>
    tradeFee(): Promise<TradeFeeResult>
    aggTrades(options?: {
      symbol: string
      fromId?: string
      startTime?: number
      endTime?: number
      limit?: number
    }): Promise<AggregatedTrade[]>
    allBookTickers(): Promise<{ [key: string]: Ticker }>
    book(options: { symbol: string; limit?: number }): Promise<OrderBook>
    exchangeInfo(): Promise<ExchangeInfo>
    order(options: NewOrder): Promise<Order>
    orderTest(options: NewOrder): Promise<Order>
    orderOco(options: NewOcoOrder): Promise<OcoOrder>
    ping(): Promise<boolean>
    prices(): Promise<{ [index: string]: string }>
    avgPrice(options?: { symbol: string }): Promise<AvgPriceResult | AvgPriceResult[]>
    time(): Promise<number>
    trades(options: { symbol: string; limit?: number }): Promise<TradeResult[]>
    capitalConfigs(): Promise<CapitalConfig[]>
    ws: WebSocket
    myTrades(options: {
      symbol: string
      limit?: number
      fromId?: number
      useServerTime?: boolean
    }): Promise<MyTrade[]>
    getOrder(options: {
      symbol: string
      orderId: number
      useServerTime?: boolean
    }): Promise<QueryOrderResult>
    cancelOrder(options: {
      symbol: string
      orderId: number
      useServerTime?: boolean
    }): Promise<CancelOrderResult>
    cancelOpenOrders(options: {
      symbol: string
      useServerTime?: boolean
    }): Promise<CancelOrderResult[]>
    openOrders(options: { symbol?: string; useServerTime?: boolean }): Promise<QueryOrderResult[]>
    allOrders(options: { symbol?: string; useServerTime?: boolean }): Promise<QueryOrderResult[]>
    allOrdersOCO(options: {
      timestamp: number
      fromId?: number
      startTime?: number
      endTime?: number
      limit?: number
      recvWindow: number
    }): Promise<QueryOrderResult[]>
    dailyStats(options?: { symbol: string }): Promise<DailyStatsResult | DailyStatsResult[]>
    candles(options: CandlesOptions): Promise<CandleChartResult[]>
    tradesHistory(options: {
      symbol: string
      limit?: number
      fromId?: number
    }): Promise<TradeResult[]>
    depositAddress(options: { asset: string }): Promise<DepositAddress>
    withdraw(options: {
      asset: string
      network?: string
      transactionFeeFlag?: boolean
      withdrawOrderId?: string
      address: string
      amount: number
      name?: string
    }): Promise<WithrawResponse>
    assetDetail(): Promise<AssetDetail>
    withdrawHistory(options: {
      asset: string
      status?: number
      startTime?: number
      endTime?: number
    }): Promise<WithdrawHistoryResponse>
    depositHistory(options: {
      asset: string
      status?: number
      startTime?: number
      endTime?: number
    }): Promise<DepositHistoryResponse>
    futuresPing(): Promise<boolean>
    futuresTime(): Promise<number>
    futuresExchangeInfo(): Promise<ExchangeInfo>
    futuresBook(options: { symbol: string; limit?: number }): Promise<OrderBook>
    futuresCandles(options: CandlesOptions): Promise<CandleChartResult[]>
    futuresAggTrades(options?: {
      symbol: string
      fromId?: string
      startTime?: number
      endTime?: number
      limit?: number
    }): Promise<AggregatedTrade[]>
    futuresTrades(options: { symbol: string; limit?: number }): Promise<FuturesTradeResult[]>
    futuresUserTrades(options: {
      symbol: string
      startTime?: number
      endTime?: number
      fromId?: number
      limit?: number
    }): Promise<FuturesUserTradeResult[]>
    futuresDailyStats(options?: { symbol: string }): Promise<DailyStatsResult | DailyStatsResult[]>
    futuresPrices(): Promise<{ [index: string]: string }>
    futuresAllBookTickers(): Promise<{ [key: string]: Ticker }>
    futuresMarkPrice(): Promise<MarkPriceResult>
    futuresAllForceOrders(options?: {
      symbol?: string
      startTime?: number
      endTime?: number
      limit?: number
    }): Promise<AllForceOrdersResult[]>
    futuresFundingRate(options: {
      symbol: string
      startTime?: number
      endTime?: number
      limit?: number
    }): Promise<FundingRateResult[]>
    futuresOrder(options: NewFuturesOrder): Promise<FuturesOrder>
    futuresCancelOrder(options: {
      symbol: string
      orderId: number
      useServerTime?: boolean
    }): Promise<CancelFuturesOrderResult>
    futuresOpenOrders(options: {
      symbol?: string
      useServerTime?: boolean
    }): Promise<QueryOrderResult>
    futuresPositionRisk(options?: { recvWindow: number }): Promise<PositionRiskResult[]>
    futuresBalance(): Promise<BalanceResult[]>
    futuresAccountInformation(): Promise<AccountInformationV2Result>
    futuresChangeLeverage(options: {
      symbol: string,
      leverage: number,
      recvWindow?: number,
      timestamp?: number,
    }): Promise<ChangeLeverageResult>
    futuresChangeMarginType(options: {
      symbol: string,
      marginType: MarginType,
      recvWindow?: number,
      timestamp?: number,
    }): Promise<ChangeMarginType>
    futuresGetOrder(options: {
      symbol: string
      orderId?: number
      origClientOrderId?: string
      recvWindow?: number,
      timestamp?: number,
    }): Promise<QueryFuturesOrderResult>
    futuresChangePositionMode(options: {
      dualSidePosition: string,
      recvWindow?: number,
      timestamp?: number,
    }): Promise<ChangeMarginType>

  }

  export interface HttpError extends Error {
    code: number
    url: string
  }

  export type UserDataStreamEvent = OutboundAccountInfo | ExecutionReport | BalanceUpdate | OutboundAccountPosition

  export interface WebSocket {
    depth: (
      pair: string | string[],
      callback: (depth: Depth) => void,
    ) => ReconnectingWebSocketHandler
    partialDepth: (
      options: { symbol: string; level: number } | { symbol: string; level: number }[],
      callback: (depth: PartialDepth) => void,
    ) => ReconnectingWebSocketHandler
    ticker: (
      pair: string | string[],
      callback: (ticker: Ticker) => void,
    ) => ReconnectingWebSocketHandler
    allTickers: (callback: (tickers: Ticker[]) => void) => ReconnectingWebSocketHandler
    candles: (
      pair: string | string[],
      period: string,
      callback: (ticker: Candle) => void,
    ) => ReconnectingWebSocketHandler
    trades: (
      pairs: string | string[],
      callback: (trade: Trade) => void,
    ) => ReconnectingWebSocketHandler
    aggTrades: (
      pairs: string | string[],
      callback: (trade: Trade) => void,
    ) => ReconnectingWebSocketHandler
    user: (callback: (msg: UserDataStreamEvent) => void) => Function
    marginUser: (callback: (msg: OutboundAccountInfo | ExecutionReport) => void) => Function
    futuresUser: (callback: (msg: OutboundAccountInfo | ExecutionReport) => void) => Function
  }

  export type ReconnectingWebSocketHandler = (options?: {
    keepClosed: boolean
    fastClose: boolean
    delay: number
  }) => void

  export enum CandleChartInterval {
    ONE_MINUTE = '1m',
    THREE_MINUTES = '3m',
    FIVE_MINUTES = '5m',
    FIFTEEN_MINUTES = '15m',
    THIRTY_MINUTES = '30m',
    ONE_HOUR = '1h',
    TWO_HOURS = '2h',
    FOUR_HOURS = '4h',
    SIX_HOURS = '6h',
    EIGHT_HOURS = '8h',
    TWELVE_HOURS = '12h',
    ONE_DAY = '1d',
    THREE_DAYS = '3d',
    ONE_WEEK = '1w',
    ONE_MONTH = '1M',
  }

  export type MarginType =
    'ISOLATED' | 'CROSSED'

  export type RateLimitType = 'REQUEST_WEIGHT' | 'ORDERS'

  export type RateLimitInterval = 'SECOND' | 'MINUTE' | 'DAY'

  export interface ExchangeInfoRateLimit {
    rateLimitType: RateLimitType
    interval: RateLimitInterval
    intervalNum: number
    limit: number
  }

  export type ExchangeFilterType = 'EXCHANGE_MAX_NUM_ORDERS' | 'EXCHANGE_MAX_ALGO_ORDERS'

  export interface ExchangeFilter {
    filterType: ExchangeFilterType
    limit: number
  }

  export type SymbolFilterType =
    | 'PRICE_FILTER'
    | 'PERCENT_PRICE'
    | 'LOT_SIZE'
    | 'MIN_NOTIONAL'
    | 'MAX_NUM_ORDERS'
    | 'MAX_ALGO_ORDERS'

  export interface SymbolPriceFilter {
    filterType: SymbolFilterType
    minPrice: string
    maxPrice: string
    tickSize: string
  }

  export interface SymbolPercentPriceFilter {
    filterType: SymbolFilterType
    multiplierDown: string
    multiplierUp: string
    avgPriceMins: number
  }

  export interface SymbolLotSizeFilter {
    filterType: SymbolFilterType
    minQty: string
    maxQty: string
    stepSize: string
  }

  export interface SymbolMinNotionalFilter {
    applyToMarket: boolean
    avgPriceMins: number
    filterType: SymbolFilterType
    minNotional: string
  }

  export interface SymbolMaxNumOrdersFilter {
    filterType: SymbolFilterType
    limit: number
  }

  export interface SymbolMaxAlgoOrdersFilter {
    filterType: SymbolFilterType
    limit: number
  }

  export type SymbolFilter =
    | SymbolPriceFilter
    | SymbolPercentPriceFilter
    | SymbolLotSizeFilter
    | SymbolMinNotionalFilter
    | SymbolMaxNumOrdersFilter
    | SymbolMaxAlgoOrdersFilter

  export interface Symbol {
    baseAsset: string
    baseAssetPrecision: number
    baseCommissionPrecision: number
    filters: SymbolFilter[]
    icebergAllowed: boolean
    isMarginTradingAllowed: boolean
    isSpotTradingAllowed: boolean
    ocoAllowed: boolean
    orderTypes: OrderType[]
    quoteAsset: string
    quoteCommissionPrecision: number
    quoteOrderQtyMarketAllowed: boolean
    quotePrecision: number
    status: string
    symbol: string
  }

  export interface ExchangeInfo {
    timezone: string
    serverTime: number
    rateLimits: ExchangeInfoRateLimit[]
    exchangeFilters: ExchangeFilter[]
    symbols: Symbol[]
  }

  export interface OrderBook {
    lastUpdateId: number
    asks: Bid[]
    bids: Bid[]
  }

  export interface NewOrder {
    icebergQty?: string
    newClientOrderId?: string
    price?: string
    quantity?: string
    recvWindow?: number
    side: OrderSide
    stopPrice?: string
    symbol: string
    timeInForce?: TimeInForce
    useServerTime?: boolean
    type: OrderType
    newOrderRespType?: NewOrderRespType
    quoteOrderQty?: string
  }

  export interface NewFuturesOrder {
    symbol: string
    side: OrderSide
    positionSide?: PositionSide
    type: FuturesType
    quantity?: string
    reduceOnly?: 'true' | 'false'
    price?: number
    timeInForce?: TimeInForce
    newClientOrderId?: string
    stopPrice?: number
    closePosition?: 'true' | 'false'
    activationPrice?: number
    callbackRate?: number
    workingType?: WorkingType
    newOrderRespType?: NewOrderRespType
    recvWindow?: number
    timestamp?: number
  }


  export type OrderStatus =
    | 'CANCELED'
    | 'EXPIRED'
    | 'FILLED'
    | 'NEW'
    | 'PARTIALLY_FILLED'
    | 'PENDING_CANCEL'
    | 'REJECTED'

  export type FuturesType =
    | 'LIMIT'
    | 'MARKET'
    | 'STOP'
    | 'TAKE_PROFIT'
    | 'STOP_MARKET'
    | 'TAKE_PROFIT_MARKET'
    | 'TRAILING_STOP_MARKET'

  export type WorkingType = 'MARK_PRICE' | 'CONTRACT_PRICE'

  export interface NewOcoOrder {
    symbol: string
    listClientOrderId?: string
    side: OrderSide
    quantity: string
    limitClientOrderId?: string
    price: string
    limitIcebergQty?: string
    stopClientOrderId?: string
    stopPrice: string
    stopLimitPrice?: string
    stopIcebergQty?: string
    stopLimitTimeInForce?: TimeInForce
    newOrderRespType?: NewOrderRespType
    recvWindow?: number
    useServerTime?: boolean
  }

  export interface OrderFill {
    price: string
    qty: string
    commission: string
    commissionAsset: string
  }

  export interface Order {
    clientOrderId: string
    cummulativeQuoteQty: string
    executedQty: string
    icebergQty?: string
    orderId: number
    orderListId: number
    origQty: string
    price: string
    side: OrderSide
    status: OrderStatus
    stopPrice?: string
    symbol: string
    timeInForce: TimeInForce
    transactTime: number
    type: OrderType
    fills?: OrderFill[]
  }

  export type PositionSide = 'BOTH' | 'LONG' | 'SHORT'


  export interface FuturesOrder {
    clientOrderId: string,
    cumQty: string,
    cumQuote: string,
    executedQty: string,
    orderId: number,
    avgPrice: string,
    origQty: string,
    price: string,
    reduceOnly: boolean,
    side: OrderSide,
    positionSide: PositionSide,
    status: OrderStatus,
    stopPrice: string,        // please ignore when order type is TRAILING_STOP_MARKET
    closePosition: boolean,   // if Close-All
    symbol: string,
    timeInForce: string,
    type: string,
    origType: string,
    activatePrice: string,    // activation price, only return with TRAILING_STOP_MARKET order
    priceRate: string,         // callback rate, only return with TRAILING_STOP_MARKET order
    updateTime: number,
    workingType: string,
  }

  export interface OcoOrder {
    orderListId: number
    contingencyType: ContingencyType
    listStatusType: ListStatusType
    listOrderStatus: ListOrderStatus
    listClientOrderId: string
    transactionTime: number
    symbol: string
    orders: Order[]
    orderReports: Order[]
  }

  export type OrderSide = 'BUY' | 'SELL'



  export type OrderType =
    | 'LIMIT'
    | 'LIMIT_MAKER'
    | 'MARKET'
    | 'STOP_LOSS'
    | 'STOP_LOSS_LIMIT'
    | 'TAKE_PROFIT'
    | 'TAKE_PROFIT_LIMIT'

  export type ListOrderStatus = 'EXECUTING' | 'ALL_DONE' | 'REJECT'

  export type ListStatusType = 'RESPONSE' | 'EXEC_STARTED' | 'ALL_DONE'

  export type ContingencyType = 'OCO'

  export type NewOrderRespType = 'ACK' | 'RESULT' | 'FULL'

  export type TimeInForce = 'GTC' | 'IOC' | 'FOK'

  export enum OrderRejectReason {
    ACCOUNT_CANNOT_SETTLE = 'ACCOUNT_CANNOT_SETTLE',
    ACCOUNT_INACTIVE = 'ACCOUNT_INACTIVE',
    DUPLICATE_ORDER = 'DUPLICATE_ORDER',
    INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
    MARKET_CLOSED = 'MARKET_CLOSED',
    NONE = 'NONE',
    ORDER_WOULD_TRIGGER_IMMEDIATELY = 'ORDER_WOULD_TRIGGER_IMMEDIATELY',
    PRICE_QTY_EXCEED_HARD_LIMITS = 'PRICE_QTY_EXCEED_HARD_LIMITS',
    UNKNOWN_ACCOUNT = 'UNKNOWN_ACCOUNT',
    UNKNOWN_INSTRUMENT = 'UNKNOWN_INSTRUMENT',
    UNKNOWN_ORDER = 'UNKNOWN_ORDER',
  }

  export type ExecutionType = 'NEW' | 'CANCELED' | 'REPLACED' | 'REJECTED' | 'TRADE' | 'EXPIRED'

  export interface Depth {
    eventType: string
    eventTime: number
    symbol: string
    firstUpdateId: number
    finalUpdateId: number
    bidDepth: BidDepth[]
    askDepth: BidDepth[]
  }

  export interface BidDepth {
    price: string
    quantity: string
  }

  export interface PartialDepth {
    symbol: string
    level: number
    bids: Bid[]
    asks: Bid[]
  }

  export interface Bid {
    price: string
    quantity: string
  }

  export interface Ticker {
    eventType: string
    eventTime: number
    symbol: string
    priceChange: string
    priceChangePercent: string
    weightedAvg: string
    prevDayClose: string
    curDayClose: string
    closeTradeQuantity: string
    bestBid: string
    bestBidQnt: string
    bestAsk: string
    bestAskQnt: string
    open: string
    high: string
    low: string
    volume: string
    volumeQuote: string
    openTime: number
    closeTime: number
    firstTradeId: number
    lastTradeId: number
    totalTrades: number
  }

  export interface Candle {
    eventType: string
    eventTime: number
    symbol: string
    startTime: number
    closeTime: number
    firstTradeId: number
    lastTradeId: number
    open: string
    high: string
    low: string
    close: string
    volume: string
    trades: number
    interval: string
    isFinal: boolean
    quoteVolume: string
    buyVolume: string
    quoteBuyVolume: string
  }

  export interface Trade {
    eventType: string
    eventTime: number
    symbol: string
    price: string
    quantity: string
    maker: boolean
    isBuyerMaker: boolean
    tradeId: number
  }

  export interface Balances {
    [key: string]: {
      available: string
      locked: string
    }
  }

  export interface OutboundAccountInfo {
    balances: Balances
    makerCommissionRate: number
    takerCommissionRate: number
    buyerCommissionRate: number
    sellerCommissionRate: number
    canTrade: boolean
    canWithdraw: boolean
    canDeposit: boolean
    lastAccountUpdate: number
    eventType: 'account'
    eventTime: number
  }

  export interface BalanceUpdate {
    asset: string
    balanceDelta: number
    clearTime: number
    eventTime: number
    eventType: 'balanceUpdate'
  }

  export interface OutboundAccountPosition {
    balances: AssetBalance[]
    eventTime: number
    eventType: 'outboundAccountPosition'
    lastAccountUpdate: number
  }

  export interface ExecutionReport {
    commission: string // Commission amount
    commissionAsset: string | null // Commission asset
    creationTime: number // Order creation time
    eventTime: number
    eventType: 'executionReport'
    executionType: ExecutionType // Current execution type
    icebergQuantity: string // Iceberg quantity
    isBuyerMaker: boolean // Is this trade the maker side?
    isOrderWorking: boolean // Is the order on the book?
    lastQuoteTransacted: string // Last quote asset transacted quantity (i.e. lastPrice * lastQty);
    lastTradeQuantity: string // Last executed quantity
    newClientOrderId: string // Client order ID
    orderId: number // Order ID
    orderListId: number // OrderListId
    orderRejectReason: OrderRejectReason // Order reject reason; will be an error code.
    orderStatus: OrderStatus // Current order status
    orderTime: number // Transaction time
    orderType: OrderType // Order type
    originalClientOrderId: string | null // Original client order ID; This is the ID of the order being canceled
    price: string // Order price
    priceLastTrade: string // Last executed price
    quantity: string // Order quantity
    quoteOrderQuantity: string // Quote Order Qty
    side: OrderSide // Side
    stopPrice: string // Stop price
    symbol: string // Symbol
    timeInForce: TimeInForce // Time in force
    totalQuoteTradeQuantity: string // Cumulative quote asset transacted quantity
    totalTradeQuantity: string // Cumulative filled quantity
    tradeId: number // Trade ID
  }

  export interface FuturesTradeResult {
    buyer: boolean
    commission: string
    commissionAsset: string
    id: number
    maker: boolean
    orderId: number
    price: string
    qty: string
    quoteQty: string
    realizedPnl: string
    side: OrderSide
    time: number
    symbol: string
  }

  export interface FuturesUserTradeResult {
    buyer: boolean
    commission: string
    commissionAsset: string
    id: number
    maker: boolean
    orderId: number
    price: string
    qty: string
    quoteQty: string
    realizedPnl: string
    side: OrderSide
    positionSide: PositionSide
    time: number
    symbol: string
  }
  export interface TradeResult {
    id: number
    price: string
    qty: string
    time: number
    isBuyerMaker: boolean
    isBestMatch: boolean
  }

  export interface MyTrade {
    id: number
    symbol: string
    orderId: number
    orderListId: number
    price: string
    qty: string
    quoteQty: string
    commission: string
    commissionAsset: string
    time: number
    isBuyer: boolean
    isMaker: boolean
    isBestMatch: boolean
  }

  export interface QueryOrderResult {
    clientOrderId: string
    cummulativeQuoteQty: string
    executedQty: string
    icebergQty: string
    isWorking: boolean
    orderId: number
    origQty: string
    price: string
    side: OrderSide
    status: OrderStatus
    stopPrice: string
    symbol: string
    time: number
    timeInForce: TimeInForce
    type: string
    updateTime: number
  }

  export interface QueryFuturesOrderResult {
    avgPrice: string
    clientOrderId: string
    cumQuote: string
    executedQty: string
    orderId: string
    origQty: string
    origType: FuturesType
    price: string
    side: OrderSide
    positionSide: PositionSide
    status: OrderStatus
    stopPrice: string
    closePosition: boolean
    symbol: string
    time: number
    timeInForce: TimeInForce
    type: FuturesType
    activatePrice: string
    priceRate: string
    updateTime: number
    workingType: WorkingType
  }

  export interface CancelOrderResult {
    symbol: string
    origClientOrderId: string
    orderId: number
    clientOrderId: string
    price: string
    origQty: string
    executedQty: string
    cummulativeQuoteQty: string
    status: OrderStatus
    timeImForce: TimeInForce
    type: string
    side: OrderSide
  }

  export interface CancelFuturesOrderResult {
    clientOrderId: string,
    cumQty: string,
    cumQuote: string,
    executedQty: string,
    orderId: number,
    origQty: string,
    origType: FuturesType,
    price: string,
    reduceOnly: boolean,
    side: OrderSide,
    positionSide: PositionSide,
    status: OrderStatus,
    stopPrice: string,                // please ignore when order type is TRAILING_STOP_MARKET
    closePosition: boolean,   // if Close-All
    symbol: string,
    timeInForce: TimeInForce,
    type: FuturesType,
    activatePrice: string,            // activation price, only return with TRAILING_STOP_MARKET order
    priceRate: string,                 // callback rate, only return with TRAILING_STOP_MARKET order
    updateTime: number,
    workingType: WorkingType
  }

  export interface AvgPriceResult {
    mins: number
    price: string
  }

  export interface DailyStatsResult {
    symbol: string
    priceChange: string
    priceChangePercent: string
    weightedAvgPrice: string
    prevClosePrice: string
    lastPrice: string
    lastQty: string
    bidPrice: string
    bidQty: string
    askPrice: string
    askQty: string
    openPrice: string
    highPrice: string
    lowPrice: string
    volume: string
    quoteVolume: string
    openTime: number
    closeTime: number
    firstId: number // First tradeId
    lastId: number // Last tradeId
    count: number // Trade count
  }

  export interface CandlesOptions {
    symbol: string
    interval: CandleChartInterval
    limit?: number
    startTime?: number
    endTime?: number
  }

  export interface CandleChartResult {
    openTime: number
    open: string
    high: string
    low: string
    close: string
    volume: string
    closeTime: number
    quoteVolume: string
    trades: number
    baseAssetVolume: string
    quoteAssetVolume: string
  }

  export interface MarkPriceResult {
    symbol: string
    markPrice: string
    lastFundingRate: string
    nextFundingTime: number
    time: number
  }

  export interface AllForceOrdersResult {
    symbol: string
    price: string
    origQty: string
    executedQty: string
    averagePrice: string
    status: string
    timeInForce: string
    type: string
    side: string
    time: number
  }

  export interface FundingRateResult {
    symbol: string
    fundingRate: string
    fundingTime: number
    time: number
  }

  export interface PositionRiskResult {
    entryPrice: string
    marginType: string
    isAutoAddMargin: string
    isolatedMargin: string
    leverage: string
    liquidationPrice: string
    markPrice: string
    maxNotionalValue: string
    positionAmt: string
    symbol: string
    unRealizedProfit: string
    positionSide: string
  }

  export interface BalanceResult {
    accountAlias: string
    asset: string
    balance: string
    crossWalletBalance: string
    crossUnPnl: string
    availableBalance: string
    maxWithdrawAmount: string
  }

  export interface AccountInformationV2Result {
    feeTier: number
    canTrade: boolean
    canDeposit: boolean
    canWithdraw: boolean
    updateTime: number
    totalInitialMargin: string
    totalMaintMargin: string
    totalWalletBalance: string
    totalUnrealizedProfit: string
    totalMarginBalance: string
    totalPositionInitialMargin: string
    totalOpenOrderInitialMargin: string
    totalCrossWalletBalance: string
    totalCrossUnPnl: string
    availableBalance: string
    maxWithdrawAmount: string
    assets: Assets[]
    positions: Positions[]
  }

  export interface Assets {
    asset: string
    walletBalance: string
    unrealizedProfit: string
    marginBalance: string
    maintMargin: string
    initialMargin: string
    positionInitialMargin: string
    openOrderInitialMargin: string
    crossWalletBalance: string
    crossUnPnl: string
    availableBalance: string
    maxWithdrawAmount: string
  }

  export interface Positions {
    symbol: string
    initialMargin: string
    maintMargin: string
    unrealizedProfit: string
    positionInitialMargin: string
    openOrderInitialMargin: string
    leverage: string
    isolated: boolean
    entryPrice: string
    maxNotional: string
    positionSide: string
  }

  export interface ChangeLeverageResult {
    leverage: number
    maxNotionalValue: string
    symbol: string
  }

  export interface ChangeMarginType {
    code: number
    msg: string
  }

  export interface CapitalConfig {
    coin: string,
    depositAllEnable: boolean,
    free: string,
    freeze: string,
    ipoable: string,
    ipoing: string,
    isLegalMoney: false,
    locked: string,
    name: string,
    networkList: NetworkList[]
    storage: string,
    trading: boolean,
    withdrawAllEnable: boolean,
    withdrawing: string
  }

  export interface NetworkList {
    addressRegex: string,
    coin: string,
    depositDesc?: string, // shown only when "depositEnable" is false.
    depositEnable: boolean,
    isDefault: boolean,
    memoRegex: string,
    minConfirm: number,  // min number for balance confirmation
    name: string,
    network: string,
    resetAddressStatus: boolean,
    specialTips: string,
    unLockConfirm: number,  // confirmation number for balance unlcok 
    withdrawDesc: string, // shown only when "withdrawEnable" is false.
    withdrawEnable: boolean,
    withdrawFee: string,
    withdrawMin: string
  }
}
