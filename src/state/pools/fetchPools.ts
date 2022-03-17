import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import cakeABI from 'config/abi/cake.json'
import wbnbABI from 'config/abi/weth.json'
import delegateFarmAbi from 'config/abi/delegateFarm.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getWbnbAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchPoolsBlockLimits = async () => {
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0)
  const callsStartBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: poolConfig.contractAddress[CHAIN_ID],
      name: 'startBlock',
    }
  })
  const callsEndBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: poolConfig.contractAddress[CHAIN_ID],
      name: 'bonusEndBlock',
    }
  })

  const starts = await multicall(sousChefABI, callsStartBlock)
  const ends = await multicall(sousChefABI, callsEndBlock)

  return poolsWithEnd.map((cakePoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: cakePoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsTotalStatking = async () => {
  const nonBnbPools = poolsConfig.filter((p) => p.stakingTokenName !== QuoteToken.BNB)
  const bnbPool = poolsConfig.filter((p) => p.stakingTokenName === QuoteToken.BNB)
  /*
  const callsNonBnbPools = nonBnbPools.map((poolConfig) => {
    return {
      address: poolConfig.stakingTokenAddress,
      name: 'balanceOf',
      params: [poolConfig.contractAddress[CHAIN_ID]],
    }
  })

  const callsBnbPools = bnbPool.map((poolConfig) => {
    return {
      address: getWbnbAddress(),
      name: 'balanceOf',
      params: [poolConfig.contractAddress[CHAIN_ID]],
    }
  }) */
  const callsNonBnbPools = nonBnbPools.map((poolConfig) => {
    return {
      address: poolConfig.contractAddress[CHAIN_ID],
      name : 'totalStakedAmount',
      params: []
    }
  })
  const nonBnbPoolsTotalStaked = await multicall(delegateFarmAbi, callsNonBnbPools)
  // const bnbPoolsTotalStaked = await multicall(wbnbABI, callsBnbPools)

  return [
    ...nonBnbPools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(nonBnbPoolsTotalStaked[index]).toJSON(),
    })),
    /*
    ...bnbPool.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(bnbPoolsTotalStaked[index]).toJSON(),
    })), */
  ]
}

export const fetchPoolsDepositFees = async () => {
  const pools = poolsConfig.filter((p) => p.stakingTokenName !== QuoteToken.BNB)

  const callsPools = pools.map((poolConfig) => {
    return {
      address : poolConfig.contractAddress[CHAIN_ID],
      name : 'depositFeeBP',
      params : []
    }
  })

  const poolCalls = await multicall(delegateFarmAbi,callsPools);
  return [
    ...pools.map((p,index) => ({
      sousId : p.sousId,
      depositFee : new BigNumber(poolCalls[index]).toJSON()
    }))
  ]
}

export const fetchPoolsWithdrawalFees = async () => {
  const pools = poolsConfig.filter((p) => p.stakingTokenName !== QuoteToken.BNB)

  const callsPools = pools.map((poolConfig) => {
    return {
      address : poolConfig.contractAddress[CHAIN_ID],
      name : 'getWithdrawalFeeLevels',
      params : []
    }
  })

  const poolCalls = await multicall(delegateFarmAbi,callsPools);

  return [
    ...pools.map((p,index) => ({
      sousId : p.sousId,
      withdrawalFeeLevels : poolCalls[index]
    }))
  ]
}
