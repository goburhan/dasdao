import React, { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Page from 'components/layout/Page'
import { Text, Flex } from '@macist-m/robinia-uikit'
import CardValue from 'views/Home/components/CardValue'
import { BLOCKS_PER_YEAR, BSC_BLOCK_TIME } from 'config'
import { getBalanceNumber } from 'utils/formatBalance'
import {
  useFarmFromPid,
  usePriceCakeBusd,
  useCakeVault,
  useFetchCakeVault,
} from 'state/hooks'
import {
  useTotalSupply,
  useBurnedBalance,
  useCustomTokenBalance,
} from 'hooks/useTokenBalance'
import useBlock from 'hooks/useBlock'
import Web3 from 'web3'
import { getCakeAddress } from 'utils/addressHelpers'
import { getAutoAprDataWithDay } from 'views/Farms/helpers'
import moment from 'moment'
import ChartCard from './ChartCard'
import TresuaryTokens from './TresuaryTokens'

const Box = styled.div`
  background: rgba(255, 255, 255, 0.16);
  border-radius: 25px;
  padding: 45px;
  justify-content: space-around;
  margin: 10px 10px 10px 10px;

  text-align: center;
  display: flex;
  flex-wrap: wrap;
`

const Value = styled.div`
  padding: 15px;
  margin-top: 16%;
  color: white;
  font-size: 32px;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media (max-width: 566px) {
    font-size: 20px;
  }
`
const Box2 = styled(Box)`
  height: 200px;
  padding:15px;
`


//

const CustomFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  flex-wrap: wrap;
  @media only screen and (max-width: 952px) {
    padding: 0 16px;
  }
`
const Container = styled.div`
  width: 100%;
  flex-direction: column;
  padding: 35px;
  border-radius: 23px;
  backdrop-filter: blur(30px);
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid;
  border-color: rgba(255, 255, 255, 0.5);
  margin-bottom: 16px;
`

const TitleContainer = styled.div`
  min-width: calc(25% - 8px);
  @media only screen and (max-width: 762px) {
    width: 100%;
  }
`
const Dashboard: React.FC = () => {
  const { account }: { account: string } = useWallet()
  const [chartData, setChartData] = useState(null)
  const currentBlock = useBlock()
  const startBlock = currentBlock - 28880 * 60

  const fecthUrl = `https://api.wisteriaswap.com/getHistory/${startBlock}/${currentBlock}`
  const tvlDesc =
    'Total Value Locked, is the dollar amount of all WST staked in the protocol. This metric is often used as growth or health indicator in DeFi projects.'
  const tresuaryDesc =
    'Market Value of Treasury Assets, is the sum of the value (in dollars) of all assets held by the treasury.'
  const priceDesc = 'Market Value of Wst token.'
  const stakersDesc = 'Stakers, is the total number of WST token holders.'
  const stakedDesc = 'WST Staked, is the ratio of WST to WST. (staked vs unstaked)'
  const runwayDesc =
    'Runway, is the number of days WST emissions can be sustained at a given rate. Lower APY = longer runway'
  const protokolDesc =
    'Protocol Owned Liquidity, is the amount of LP the treasury owns and controls. The more POL the better for the protocol and its users.'
  useFetchCakeVault(account)
  const farm = useFarmFromPid(2)
  const cakePrice = usePriceCakeBusd()
  const {
    fees: { performanceFee },
  } = useCakeVault()

  const cakeRewardPerBlock = new BigNumber(farm.eggPerBlock || 1)
    .times(new BigNumber(farm.poolWeight))
    .div(new BigNumber(10).pow(18))
  const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

  let apy = cakePrice.times(cakeRewardPerYear)
  const totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0)
  if (totalValue.comparedTo(0) > 0) {
    apy = apy.div(totalValue)
  }
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const exacutedBalance = useCustomTokenBalance(
    '0xaAdFf17d56d80312b392Ced903f3E8dBE5c3ece7',
    '0xf808b408e464FcaA2a28C673ca7F5C16f6e775aB',
  )
  const circSupply = totalSupply
    ? totalSupply.minus(burnedBalance).minus(exacutedBalance)
    : new BigNumber(0)

  const marketCap = getBalanceNumber(cakePrice.times(circSupply)).toLocaleString(
    'ko-KR',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  )
  const farmApy = getAutoAprDataWithDay(
    apy.times(100).toNumber(),
    performanceFee,
    365,
  ).apr.toLocaleString('ko-KR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const getTimeStamp = (block) => {
    const secodsfromNow = (currentBlock - block) * BSC_BLOCK_TIME
    const currentTimestamp = Math.floor(Date.now() / 1000)

    const blockTimestamp = currentTimestamp - secodsfromNow

    return moment.unix(blockTimestamp).format('MMM Do')
  }
  const tresuaryChartData = []
  let tvlData = []
  if (chartData !== null && chartData.length > 0) {
    tvlData = chartData.map((item) => {
      const wstCount = parseInt(Web3.utils.fromWei(item.tvl))
      const price = item.wisteriaPrice ? parseFloat(item.wisteriaPrice) : 0
      const volume = (wstCount * 100) / getBalanceNumber(circSupply)

      const timestamp = getTimeStamp(item.endBlock)
      let fund = 0
      const tresuary = item.treasuryTokens
        ? item.treasuryTokens.map((token) => {
            let tokenTotalBalance = token.tokenPrice
              ? token.tokenPrice * parseInt(Web3.utils.fromWei(token.totalBalance))
              : 0
            const tresuaryToken = TresuaryTokens.find(
              (x) => x.address === token.tokenAddress,
            )
            const tokenName = tresuaryToken ? tresuaryToken.name : token.tokenAddress
            if (tokenName === 'WSTBNB' || tokenName === 'WSTBUSD') {
              tokenTotalBalance =
                (parseFloat(Web3.utils.fromWei(token.totalBalance)) * 100) /
                parseFloat(Web3.utils.fromWei(token.totalSupply))
            }
            fund = tokenTotalBalance + fund
            return { [tokenName]: tokenTotalBalance }
          })
        : []
      const sampleObj = {
        ETH: 0,
        BTCB: 0,
        CAKE: 0,
        BNB: 0,
        BUSD: 0,
        USDT: 0,
        WSTBUSD: 100,
        WSTBNB: 100,
        timestamp,
        totalTresuaryBalance: fund,
      }
      const resuaryObj = Object.assign(sampleObj, ...tresuary)
      tresuaryChartData.push(resuaryObj)

      const totalFund = fund

      const realCirculatingSupply = item.circulatingSupply
        ? parseInt(Web3.utils.fromWei(item.circulatingSupply))
        : parseInt(Web3.utils.fromWei(item.totalSupply))
      const runway = totalFund > 0 ? (totalFund - realCirculatingSupply) / 1440 : 0
      let volumeAsNumber
      try {
        volumeAsNumber = parseInt(Web3.utils.fromWei(item.volume))
      } catch (error) {
        volumeAsNumber = parseInt(Web3.utils.fromWei('0'))
      }
      const tvlAsNumber = wstCount * cakePrice.toNumber()

      return {
        volume: volumeAsNumber,
        tvl: tvlAsNumber,
        staked: volume,
        block: item.endBlock,
        stakers: item.stakers,
        timestamp,
        price,
        runway,
        totalTresuaryBalance: totalFund,
        tresuary,
      }
    })
  }

  useEffect(() => {
    fetch(fecthUrl)
      .then((response) => response.json())
      .then((data) => setChartData(data))
  }, [fecthUrl])

  return (
    // <Page>
    // <Container>
    // <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap">
    //     <TitleContainer>
    //     <Flex alignItems="center" justifyContent="center" flexDirection="column" >
    //                 <Text fontSize='22px' color="secondary">WST price</Text>
    //                 <Text bold fontSize='25px' color="#fff" >${cakePrice.toNumber().toFixed(2)}</Text>
    //             </Flex>
    //     </TitleContainer>
    //     <TitleContainer>
    //     <Flex alignItems="center" justifyContent="center" flexDirection="column"  >
    //                 <Text fontSize='22px' color="secondary">
    //                 Market Cap
    //                 </Text>
    //                 <Text bold fontSize='25px' color="#fff">
    //                     ${marketCap}
    //                 </Text>
    //             </Flex>
    //     </TitleContainer>
    //     <TitleContainer>
    //     <Flex alignItems="center" justifyContent="center" flexDirection="column">
    //                 <Text fontSize='22px' color="secondary">
    //                     Apy
    //                 </Text>
    //                 <Text bold fontSize='25px' color="#fff">{farmApy}%</Text>
    //             </Flex>
    //     </TitleContainer>
    //     {/* <TitleContainer>
    //     <Flex alignItems="center" justifyContent="center" flexDirection="column">
    //                 <Text fontSize='22px' color="secondary">
    //                 Backing per $WST
    //                 </Text>
    //                 <Text bold fontSize='25px' color="#fff">$258</Text>
    //             </Flex>
    //     </TitleContainer> */}

    //         </Flex>
    // </Container>

    // <Flex alignItems="center" flexDirection="column" justifyContent="center">
    //     <CustomFlexContainer>
    //         <ChartCard available={false}  dataKey="tvl" title='Total Value Locked' desc={tvlDesc} prefix="$" chartData={tvlData}/>
    //         <ChartCard available={false} prefix='$' dataKey="price" title='WST Price' desc={priceDesc} chartData={tvlData}/>
    //     </CustomFlexContainer>
    //     <CustomFlexContainer>
    //         <ChartCard available={false} prefix='$' dataKey="tresuary" title="Tresuary Balance" desc={tresuaryDesc} chartData={tresuaryChartData}/>
    //         <ChartCard available={false} prefix='%' dataKey="staked" title="WST Staked" desc={stakedDesc} chartData={tvlData}/>
    //     </CustomFlexContainer>
    //     <CustomFlexContainer>
    //       <ChartCard available={false} prefix='' dataKey="runway" title="Runway" desc={runwayDesc} chartData={tvlData}/>
    //       <ChartCard available={false} prefix='%' dataKey="protokol" title="Protocol Owned Liquidity" desc={protokolDesc} chartData={tresuaryChartData}/>
    //     </CustomFlexContainer>

    // </Flex>

    // </Page>
    <div className="grid grid-cols-12">
      <Box className="col-span-12">
        <Text color="white">
          DASDAO PRICE
          <Text bold fontSize="25px" color="#fff">
            ${cakePrice.toNumber().toFixed(2)}
          </Text>
        </Text>

        <Text color="white">
          Market Cap
          <Text bold fontSize="25px" color="#fff">
            ${marketCap}
          </Text>
        </Text>

        <Text color="white">
          APY
          <Text bold fontSize="25px" color="#fff">
            {farmApy}%
          </Text>
        </Text>
      </Box>

      <Box2 className="col-span-6">
        <Text fontSize='30px' >Total Value Locked</Text>
        <Value>
          <ChartCard
            available={false}
            dataKey="tvl"
            desc={tvlDesc}
            prefix="$"
            chartData={tvlData}
          />
        </Value>
      </Box2>

      <Box2 className="col-span-6">
        <Text fontSize='30px'>DasDao Price</Text>
        <Value>
          <ChartCard
            available={false}
            prefix="$"
            dataKey="price"
            desc={priceDesc}
            chartData={tvlData}
          />
        </Value>
      </Box2>
      <Box2 className="col-span-6">
        <Text fontSize='30px'>Treasury Balance</Text>
        <Value>
          <ChartCard
            available={false}
            prefix="$"
            dataKey="tresuary"
            desc={tresuaryDesc}
            chartData={tresuaryChartData}
          />
        </Value>
      </Box2>
      <Box2 className="col-span-6">
        <Text fontSize='30px'> DasDao Stake</Text>
        <Value>
          <ChartCard
            available={false}
            prefix="%"
            dataKey="staked"
            desc={stakedDesc}
            chartData={tvlData}
          />
        </Value>
      </Box2>
      <Box2 className="col-span-6">
        <Text fontSize='30px'> Runway</Text>
        <Value>
          <ChartCard
            available={false}
            prefix=""
            dataKey="runway"
            desc={runwayDesc}
            chartData={tvlData}
          />
        </Value>
      </Box2>
      <Box2 className="col-span-6">
        <Text fontSize='30px'>Protocol Owned Liquidity</Text>
        <Value>
          <ChartCard
            available={false}
            prefix="%"
            dataKey="protokol"
            desc={protokolDesc}
            chartData={tresuaryChartData}
          />
        </Value>
      </Box2>
    </div>
  )
}

export default Dashboard
