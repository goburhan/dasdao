import React,{useCallback} from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Heading } from '@macist-m/robinia-uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { useFarms, usePriceBnbBusd, usePools, useRealCakeBusd, usePriceCakeBusd,usePoolsWithFarms ,usePriceEthBnb } from 'state/hooks'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import Coming from './components/Coming'
import PoolCard from './components/PoolCard'
import PoolTabButtons from './components/PoolTabButtons'
import Divider from './components/Divider'


const ZERO = new BigNumber(0)
const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const farms = useFarms()
  const pools = usePools(account)
  const cakePrice = usePriceCakeBusd();
  const bnbPrice = usePriceBnbBusd()
  const ethPrice = usePriceEthBnb()
  // const realCakePrice = useRealCakeBusd();
  const block = useBlock()
  const poolsWithFarms = usePoolsWithFarms(account)

  const poolList = useCallback(
    (poolToDisplay, isFinished: boolean) => {
      // const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY = poolToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm

        const newFarm = farm.pool
        const cakeRewardPerBlock = new BigNumber(farm.eggPerBlock || 1)
          .times(new BigNumber(farm.pool.tokenPerBlock).div(farm.totalAllocPoint))
          .div(new BigNumber(10).pow(farm.pool.tokenDecimals))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = cakePrice.times(cakeRewardPerYear)

        let totalValue = new BigNumber(newFarm.totalStaked || 0)
        let val;


        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          val =new BigNumber(farm.lpTotalInQuoteToken || 0).times(bnbPrice)
            if(farm.lpTokenBalanceMC){
              const x = farm.lpTokenBalanceMC.div(new BigNumber(10).pow(18))

              val = new BigNumber(val).div(x)
            }
            console.log(`${farm.pool.tokenName}:${val}`)
        }
        else if(farm.quoteTokenSymbol === QuoteToken.ETH){

          val =new BigNumber(farm.lpTotalInQuoteToken || 0).times(ethPrice)
          if(farm.lpTokenBalanceMC){
            const x = farm.lpTokenBalanceMC.div(new BigNumber(10).pow(18))

            val = new BigNumber(val).div(x)
          }
        }
        else if(farm.stabilCoinFarm){
          console.log(farm)
          val = farm.tokenPriceVsQuote ? new BigNumber(1).times(2) : ZERO // burayı düzelt sonra
        }else if(farm.quoteTokenSymbol === QuoteToken.USDT){
          val =new BigNumber(farm.lpTotalInQuoteToken || 0).times(new BigNumber(1))
          if(farm.lpTokenBalanceMC){
            console.log(val.toNumber())
            const x = farm.lpTokenBalanceMC.div(new BigNumber(10).pow(18))

            val = new BigNumber(val).div(x)
          }
          console.log(`${farm.pool.tokenName}:${val}`)
        }
        else{
          val =new BigNumber(farm.lpTotalInQuoteToken || 0).times(new BigNumber(1))
          if(farm.lpTokenBalanceMC){
            const x = farm.lpTokenBalanceMC.div(new BigNumber(10).pow(18))

            val = new BigNumber(val).div(x)
          }


       }

        const totalPrice = val.times(totalValue)
        totalValue = val.times(new BigNumber(getBalanceNumber(totalValue)))


        if (totalValue.comparedTo(0) > 0) {
          apy = apy.div(totalValue)
        }


        // alert(poolTotalValue.toNumber())
        return { ...newFarm, apy ,totalStakedUSD:totalPrice,isFinished: farm.pool.sousId === 0 ? false : farm.pool.isFinished || block > farm.pool.endBlock}
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <PoolCard
          key={farm.sousId}
          pool={farm}

          // bnbPrice={bnbPrice}
          // cakePrice={cakePrice}
          // ethPrice={EthPrice}
          // account={account}
        />
      ))
    },
    [bnbPrice, cakePrice,block,ethPrice],
  )
  return (
    <Page>
      <PoolTabButtons />
      <Divider />
      <FlexLayout>
        <Route exact path={`${path}`}>
          <>
          {poolList(poolsWithFarms, false)}

          </>
        </Route>
        {/* <Route path={`${path}/history`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool) => (
            <PoolCard key={pool.sousId} pool={pool} />
          ))}
        </Route> */}
      </FlexLayout>
    </Page>
  )
}

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
  padding: 48px 0;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
  img {
    height: auto;
    max-width: 100%;
  }
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
  }
`

export default Farm
