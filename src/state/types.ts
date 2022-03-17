import BigNumber from 'bignumber.js'
import { FarmConfig, PoolConfig } from 'config/constants/types'

export interface Farm extends FarmConfig {
  tokenAmount?: BigNumber
  // quoteTokenAmount?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: number
  depositFeeBP?: number
  eggPerBlock?: number
  lpTokenBalanceMC?:any
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
  totalAllocPoint?: BigNumber
}

export interface Pool extends PoolConfig {
  totalStaked?: BigNumber
  startBlock?: number
  endBlock?: number
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
  }
  depositFee?: BigNumber
  withdrawalFeeLevels? : BigNumber[]
}

// Slices states

export interface FarmsState {
  data: Farm[]
  cakeVault?:CakeVault
  userDataLoaded?: boolean
}

export interface PoolsState {
  data: Pool[]
}
export interface VaultUser {
  isLoading: boolean
  userShares: string
  robiniaAtLastUserAction: string
  lastDepositedTime: string
  lastUserActionTime: string
}
export interface CakeVault {
  totalShares?: string
  pricePerFullShare?: string
  totalRobiniaInVault?: string
  estimatedRobiniaBountyReward?: string
  totalPendingRobiniaHarvest?: string
  fees?: VaultFees
  userData?: VaultUser
  tokenTaxRate?:any
}
export interface VaultFees {
  performanceFee: number
  callFee: number
  withdrawalFee: number
  withdrawalFeePeriod: number
}
// Global state

export interface State {
  farms: FarmsState
  pools: PoolsState
}
