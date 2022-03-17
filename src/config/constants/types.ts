export type IfoStatus = 'coming_soon' | 'live' | 'finished'

export interface Ifo {
  id: string
  isActive: boolean
  address: string
  name: string
  subTitle?: string
  description?: string
  launchDate: string
  launchTime: string
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  projectSiteUrl: string
  currency: string
  currencyAddress: string
  tokenDecimals: number
  releaseBlockNumber: number
}

export enum DelegateNetwork {
  'STEEM' = 'STEEM'
}

export interface DelegateFarmConfig {
  pid? : number
  tokenSymbol? : string
  delegateToken? : DelegateNetwork
  isActive? : boolean
  lpSymbol? : string
  depositFee? : number
  delegateAddress? : string
  multiplier? : string
}

export enum QuoteToken {
  'BNB' = 'BNB',
  'CAKE' = 'CAKE',
  'SYRUP' = 'SYRUP',
  'BUSD' = 'BUSD',
  'TWT' = 'TWT',
  'UST' = 'UST',
  'BTCB' = 'BTCB',
  'ETH' = 'ETH',
  'USDT' = 'USDT',
  'RV2' = 'RV2',
  'DOT' = 'DOT',
  'RINI' = 'RINI',
  'BSCT' = 'BSCT',
  'KRWP' = 'KRWP',
  'ADA' = 'ADA',
  'BSTEEM' = 'BSTEEM',
  'BBLURT' = 'BBLURT',
  'MOON' = 'MOON',
  'CAKEBNB' = 'CAKE-BNB LP',
  'BUSDBNB' = 'BUSD-BNB LP',
  'BUSDUSDT' = 'BUSD-USDT LP',
  'CAKEUSDT' = 'CAKE-USDT LP',
  'CAKEBUSD' = 'CAKE-BUSD LP',
  'BTCBBUSD' = 'BTCB-BUSD LP',
  'USDTBNB' = 'USDT-BNB LP',
  'BTCBBNB' = 'BTCB-BNB LP',
  'BTCBETH' = 'BTCB-ETH LP',
  'ETHBNB' = 'ETH-BNB LP',
  'ETHUSDC' = 'ETH-USDC LP',
  'USDCBUSD' = 'USDC-BUSD LP',
  'USDTBUSD' = 'USDT-BUSD LP',
  'USDCUSDT' = 'USDC-USDT LP',
  'DOGEBNB' = 'DOGE-BNB LP',
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
}

export interface Address {
  97?: string
  56: string
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  tokenSymbol: string
  tokenAddresses: Address
  quoteTokenSymbol: QuoteToken
  quoteTokenAdresses: Address
  multiplier?: string
  isTokenOnly?: boolean
  delegate?: boolean
  delegateAddress?: string
  delegateToken?: string
  depositFee?:string
  isCommunity?: boolean
  risk: number
  isAutoVault?:boolean
  isCluster?:boolean
  clusterAddresses?:Address
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
  stabilCoinFarm?:boolean
}

export interface PoolConfig {
  sousId: number
  image?: string
  tokenName: string
  stakingTokenName: QuoteToken
  stakingLimit?: number
  stakingTokenAddress?: string
  contractAddress: Address
  poolCategory: PoolCategory
  projectLink: string
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  tokenDecimals: number
  isLp?:boolean
  pancakePoolId?:number
  nativeFarmId?:number
  multiplier?:number
}

export type Nft = {
  name: string
  description: string
  originalImage: string
  previewImage: string
  blurImage: string
  sortOrder: number
  bunnyId: number
}
