import React from 'react'
import BigNumber from 'bignumber.js/bignumber'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { BLOCKS_PER_YEAR } from 'config'
import Container from 'components/layout/Container'
import styled from 'styled-components'
import { getCakeAddress } from 'utils/addressHelpers'
import { QuoteToken } from 'config/constants/types'
import CardValue from './CardValue'

import {
  useFarms,
  usePriceCakeBusd,
  useTotalValue,
  usePriceBnbBusd,
  usePriceEthBnb,
} from '../../../state/hooks'

const CakeStats = () => {
  const totalValue = useTotalValue()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms()
  const eggPrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const EthPrice = usePriceEthBnb()
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0)
  const cakeSupply = getBalanceNumber(circSupply)
  const marketCap = eggPrice.times(circSupply)


  let eggPerBlock = 0
  if (farms && farms[0] && farms[0].eggPerBlock) {
    eggPerBlock = new BigNumber(farms[0].eggPerBlock)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }
  const x = []
  farms.map((farm) => {
    // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
    //   return farm
    // }
    const cakeRewardPerBlock = new BigNumber(farm.eggPerBlock || 1)
      .times(new BigNumber(farm.poolWeight))
      .div(new BigNumber(10).pow(18))
    const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

    let apy = eggPrice.times(cakeRewardPerYear)

    let totalValuex = new BigNumber(farm.lpTotalInQuoteToken || 0)

    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      totalValuex = totalValuex.times(bnbPrice)
    }
    if (farm.quoteTokenSymbol === QuoteToken.ETH) {
      totalValuex = totalValue.times(EthPrice)
    }

    if (totalValuex.comparedTo(0) > 0) {
      apy = apy.div(totalValuex)
    }

    x.push(apy)
    return null
  })
  const topAPY = x.reduce(function (accumulatedValue, currentValue) {
    return Math.max(accumulatedValue, currentValue)
  })

  const Stats = styled.div`
    background: rgba(255, 255, 255, 0.16);
    border-radius: 25px;
    padding: 15px;
    min-height:184px;
    text-align:center;
    div {
      width: 100%;
      display: flex;

    }
  `
  const Text = styled.text`
  font-size:48px;
  color:white;
 `

  return (
    <Stats>
      <div className="text-2xl  text-white font-bold ml-5 mb-5">DASDAO PRICE</div>
      <Container >
        <Text  >{eggPrice.toFixed(3)}</Text>
      
      </Container>

      
    

   
    </Stats>
    // <StyledCakeStats>
    //   <CardBody>
    //     <Heading size="xl" mb="24px">
    //       {TranslateString(534, 'Egg Stats')}
    //     </Heading>
    //     <Row>
    //       <Text fontSize="14px">{TranslateString(10005, 'Market Cap')}</Text>
    //       <CardValue fontSize="14px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
    //     </Row>
    //     <Row>
    //       <Text fontSize="14px">{TranslateString(536, 'Total Minted')}</Text>
    //       {totalSupply && <CardValue fontSize="14px" value={getBalanceNumber(totalSupply)} decimals={0} />}
    //     </Row>
    //     <Row>
    //       <Text fontSize="14px">{TranslateString(538, 'Total Burned')}</Text>
    //       <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} decimals={0} />
    //     </Row>
    //     <Row>
    //       <Text fontSize="14px">{TranslateString(10004, 'Circulating Supply')}</Text>
    //       {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} decimals={0} />}
    //     </Row>
    //     <Row>
    //       <Text fontSize="14px">{TranslateString(540, 'New EGG/block')}</Text>
    //       <Text bold fontSize="14px">{eggPerBlock}</Text>
    //     </Row>
    //   </CardBody>
    // </StyledCakeStats>
  )
}

export default CakeStats
