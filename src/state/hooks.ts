import BigNumber from 'bignumber.js'
import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import { getAutoAprData } from 'views/Farms/helpers'
import { BLOCKS_PER_YEAR} from 'config'
import { fetchFarmsPublicDataAsync, fetchPoolsPublicDataAsync, fetchPoolsUserDataAsync,fetchCakeVaultFees,fetchCakeVaultPublicData,fetchCakeVaultUserData } from './actions'
import { State, Farm, Pool } from './types'
import { QuoteToken } from '../config/constants/types'


const ZERO = new BigNumber(0)

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchCakeVaultPublicData)
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])
}

// Farms
export const useFetchCakeVault = (account) => {
  // const { account } = useWallet()
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCakeVaultPublicData())
  }, [dispatch, fastRefresh])

   useEffect(() => {
     dispatch(fetchCakeVaultUserData({ account }))
   }, [dispatch, fastRefresh, account])

  useEffect(() => {
    dispatch(fetchCakeVaultFees())
  }, [dispatch])
}
export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const usePoolss = (): Pool[] => {
  const pools = useSelector((state: State) => state.pools.data)
  console.log(pools)
  return pools;
}
export const usePoolsWithFarms = (account): Pool[] =>{
  const pools = usePools(account)
  const farms = useFarms()
  const farmsInsideOfPools = []
  farms.forEach((x,index)=>{
     const pool =  pools.find(z => z.nativeFarmId === x.pid)
     if(pool){
       farmsInsideOfPools.push({...x,pool})
      }
  })

  return farmsInsideOfPools
}
export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}
export const useAutoFarmApy = (pid): number => {
  const farm = (useFarmFromPid(pid))
  const {
    fees: { performanceFee }
  } = useCakeVault()

  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const EthPrice = usePriceEthBnb()
  const cakeRewardPerBlock = new BigNumber(farm.eggPerBlock || 1)
          .times(new BigNumber(farm.poolWeight))
          .div(new BigNumber(10).pow(18))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)
        // alert(cakeRewardPerBlock)
        let apy = cakePrice.times(cakeRewardPerYear)
        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0)

        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          totalValue = totalValue.times(bnbPrice)
        }
        if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          totalValue = totalValue.times(EthPrice)
        }

        if (totalValue.comparedTo(0) > 0) {
          apy = apy.div(totalValue)
        }
       const AutoApy = getAutoAprData(apy.times(new BigNumber(100)).toNumber(),performanceFee)
       const apyFinal = AutoApy.apr
  return apyFinal
}
export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}

export const usePoolUser = (pid) => {
  useSelector((state: State) => console.log(state))
}

// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolFromPid = (sousId): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return pool
}

// Prices

export const usePriceBnbBusd = (): BigNumber => {

  const pid = 2 // BUSD-BNB LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}
export const usePriceEthBnb = () : BigNumber => {
  //  const BnbPrice = usePriceBnbBusd()
  //  const pid = 29
  //  const farm = useFarmFromPid(pid)
  //  const EthPrice = new BigNumber(farm.tokenPriceVsQuote).multipliedBy(BnbPrice)
   return ZERO
}
export const useLpPrice = (pid): BigNumber => {
  const farm = useFarmFromPid(pid)
  const bnbPrice = usePriceBnbBusd();
  const cakePrice = usePriceCakeBusd();
  const ethPrice = usePriceEthBnb()
  let val;
  if(!farm.quoteTokenSymbol){
    return new BigNumber(0)
  }

  if (farm.quoteTokenSymbol === QuoteToken.BNB) {
    val =new BigNumber(farm.lpTotalInQuoteToken || 0).times(bnbPrice)
    if(!farm.lpTokenBalanceMC){
      return val
    }
    const x = farm.lpTokenBalanceMC.div(new BigNumber(10).pow(18))
    val = new BigNumber(val).div(x)
  }
  else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
    val = new BigNumber(farm.tokenPriceVsQuote).multipliedBy(cakePrice);
  }else if(farm.quoteTokenSymbol === QuoteToken.ETH){
    val = new BigNumber(farm.tokenPriceVsQuote).multipliedBy(ethPrice)
  }else if(farm.stabilCoinFarm){
    val = farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote).times(2) : ZERO
  }
  return val
}
export const usePriceBSTEEMBnb = () : BigNumber => {
  const BnbPrice = usePriceBnbBusd()
  const pid = 4
  const farm = useFarmFromPid(pid)
  const BSTEEMPrice = new BigNumber(farm.tokenPriceVsQuote).multipliedBy(BnbPrice)
  console.log(BSTEEMPrice.toNumber())
  return BSTEEMPrice
}
export const usePriceCakeBusd = (): BigNumber => {
  // const pid = 1 // CAKE-BNB LP
  // const bnbPriceUSD = usePriceBnbBusd()
  // const farm = useFarmFromPid(pid)
  // return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
  const pid = 1 // EGG-BUSD LP
  const bnbPrice = usePriceBnbBusd()
  const farm = useFarmFromPid(pid)
  const buzzPrice = new BigNumber(farm.tokenPriceVsQuote).multipliedBy(bnbPrice)
  return buzzPrice
}

export const useRealCakeBusd = (): BigNumber => {
  const pid = 5;
  const farm = useFarmFromPid(pid);
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePoolsTotalValue = (): BigNumber => {
    const pools = usePoolss();
    const farms = useFarms();
    const bnbPrice = usePriceBnbBusd();
    const cakePrice = usePriceCakeBusd();
    const ethPrice = usePriceEthBnb()
    const farmsInsideOfPools = []
    farms.forEach((x,index)=>{
       const pool =  pools.find(z => z.nativeFarmId === x.pid)
       if(pool){
         farmsInsideOfPools.push({...x,pool})
        }
    })

    let value = new BigNumber(0);
    farmsInsideOfPools.forEach(farm =>{

      let lpPrice ;
      if (farm.lpTotalInQuoteToken || farm.isTokenOnly) {
      if (farm.quoteTokenSymbol === QuoteToken.BNB) {
        let val =new BigNumber(farm.lpTotalInQuoteToken || 0).times(bnbPrice)
        const x = farm.lpTokenBalanceMC.div(new BigNumber(10).pow(18))
        val = new BigNumber(val).div(x)
        lpPrice = val
      }else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
        let val =new BigNumber(farm.lpTotalInQuoteToken || 0).times(cakePrice)
        const x = farm.lpTokenBalanceMC.div(new BigNumber(10).pow(18))
        val = new BigNumber(val).div(x)
        lpPrice = val
      }else if(farm.quoteTokenSymbol === QuoteToken.ETH){
        let val =new BigNumber(farm.lpTotalInQuoteToken || 0).times(ethPrice)
        const x = farm.lpTokenBalanceMC.div(new BigNumber(10).pow(18))
        val = new BigNumber(val).div(x)
        lpPrice = val
      } else{
        let val =new BigNumber(farm.lpTotalInQuoteToken || 0).times(new BigNumber(1))
        if(farm.lpTokenBalanceMC){
          const x = farm.lpTokenBalanceMC.div(new BigNumber(10).pow(18))

          val = new BigNumber(val).div(x)
        }
        lpPrice = val
        console.log(`${farm.pool.tokenName}:${val}`)

     }

      const poolTotalValue = lpPrice.times(farm.pool.totalStaked).div(new BigNumber(10).pow(farm.pool.tokenDecimals))
      value = value.plus(poolTotalValue)
    }
  }
    )
    // for(let i = 0; i<farmsInsideOfPools.length;i++) {
    //   const pool = pools[i];
    //   const nativeFarmId = pool.nativeFarmId
    //   if(pool.stakingTokenName) {
    //     const lpPrice = useLpPrice(nativeFarmId)
    //      const val = lpPrice.times(pool.totalStaked)
    //     // if(pool.stakingTokenName === QuoteToken.CAKE) {
    //     //   val = cakePrice.times(pool.totalStaked).div(new BigNumber(10).pow(pool.tokenDecimals));
    //     // } else if (pool.stakingTokenName === QuoteToken.BNB) {
    //     //   val = bnbPrice.times(pool.totalStaked).div(new BigNumber(10).pow(pool.tokenDecimals));
    //     // } else if (pool.stakingTokenName === QuoteToken.ETH) {
    //     //   val = ethPrice.times(pool.totalStaked).div(new BigNumber(10).pow(pool.tokenDecimals));
    //     // } else {
    //     //   val = pool.totalStaked;
    //     // }

    //     value = value.plus(val)
    //   }
    // }

    return value;
}

export const useTotalValue = (): BigNumber => {
  const farms = useFarms();
  const poolTVL = usePoolsTotalValue();
  const bnbPrice = usePriceBnbBusd();
  const cakePrice = usePriceCakeBusd();
  const ethPrice = usePriceEthBnb()
  let value = new BigNumber(0);
  for (let i = 0; i < farms.length; i++) {
    const farm = farms[i]

    if (farm.lpTotalInQuoteToken || farm.isTokenOnly) {
      let val;

      if (farm.quoteTokenSymbol === QuoteToken.BNB) {
        val = (bnbPrice.times(farm.lpTotalInQuoteToken));
      }else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
        val = (cakePrice.times(farm.lpTotalInQuoteToken));
      }else if(farm.quoteTokenSymbol === QuoteToken.ETH){
        val = ethPrice.times(farm.lpTotalInQuoteToken)
      }
      // else if(farm.isTokenOnly){
      //   console.log(farm)
      //   val = cakePrice.times(farm.tokenAmount);
      // }
      else{
        val = (farm.lpTotalInQuoteToken);
      }

      value = value.plus(val);
    }
  }

  value = value.plus(poolTVL);
// console.log(value)
  return value;
}
export const useCakeVault = () => {
  const {
    totalShares: totalSharesAsString,
    pricePerFullShare: pricePerFullShareAsString,
    totalRobiniaInVault: totalRobiniaInVaultAsString,
    estimatedRobiniaBountyReward: estimatedRobiniaBountyRewardAsString,
    totalPendingRobiniaHarvest: totalPendingRobiniaHarvestAsString,
    fees: { performanceFee, callFee, withdrawalFee, withdrawalFeePeriod },
    tokenTaxRate,

    userData: {
      isLoading,
      userShares: userSharesAsString,
      robiniaAtLastUserAction: robiniaAtLastUserActionAsString,
      lastDepositedTime,
      lastUserActionTime,
    },
  } = useSelector((state: State) => state.farms.cakeVault)

  const estimatedRobiniaBountyReward = useMemo(() => {
    return new BigNumber(estimatedRobiniaBountyRewardAsString)
  }, [estimatedRobiniaBountyRewardAsString])

  const totalPendingRobiniaHarvest = useMemo(() => {
    return new BigNumber(totalPendingRobiniaHarvestAsString)
  }, [totalPendingRobiniaHarvestAsString])

  const totalShares = useMemo(() => {
    return new BigNumber(totalSharesAsString)
  }, [totalSharesAsString])

  const pricePerFullShare = useMemo(() => {
    return new BigNumber(pricePerFullShareAsString)
  }, [pricePerFullShareAsString])

  const totalRobiniaInVault = useMemo(() => {
    return new BigNumber(totalRobiniaInVaultAsString)
  }, [totalRobiniaInVaultAsString])

  const userShares = useMemo(() => {
    return new BigNumber(userSharesAsString)
  }, [userSharesAsString])

  const robiniaAtLastUserAction = useMemo(() => {
    return new BigNumber(robiniaAtLastUserActionAsString)
  }, [robiniaAtLastUserActionAsString])

  return {
    totalShares,
    pricePerFullShare,
    totalRobiniaInVault,
    estimatedRobiniaBountyReward,
    totalPendingRobiniaHarvest,
    tokenTaxRate,
    fees: {
      performanceFee,
      callFee,
      withdrawalFee,
      withdrawalFeePeriod,
    },
    userData: {
      isLoading,
      userShares,
      robiniaAtLastUserAction,
      lastDepositedTime,
      lastUserActionTime,
    },
  }
}
