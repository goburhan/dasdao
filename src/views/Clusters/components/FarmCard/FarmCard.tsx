import React, { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton } from '@macist-m/robinia-uikit'
import { communityFarms } from 'config/constants'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import { useCluster } from 'hooks/useContract'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { getBalanceNumber} from 'utils/formatBalance'
import { QuoteToken } from 'config/constants/types'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'



export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
  harvestInterval?:number
  clusterData?:any
}

const RainbowLight = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 6s linear infinite;
  border-radius: 16px;
  filter: blur(0px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;
  background: #153130;
  backdrop-filter: blur(40px);
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 25px;
  position: relative;
  text-align: center;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  bnbPrice?: BigNumber
  ethPrice?: BigNumber
  ethereum?: provider
  account?: string
}
const chainId = process.env.REACT_APP_CHAIN_ID
const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, cakePrice,ethPrice ,bnbPrice, ethereum, account }) => {
  const TranslateString = useI18n()
  const cluster = useCluster(farm.clusterAddresses[chainId])
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const [clusterBalance,setClusterBalance]=useState(new BigNumber(0))
  const [timeLock,setTimeLock]=useState("")
  const [timeLeft,setTimeLeft]=useState("")
  const [userClusterInfo,setUserClusterInfo]=useState({
    buzzAtLastUserAction:"0",
    shares:"0",
    pricePerFullShare:"0",
  })
  // setTimeLock((farm.clusterData.timeLock / ((60**2)*24)).toFixed(0).toString())
  // if(farm.isAutoVault){

  // }
  console.log(farm)
 const convertSeconds = (val) =>{
  let seconds = parseInt(val, 10);

  const days = Math.floor(seconds / (3600*24));
  seconds  -= days*3600*24;
  const hrs   = Math.floor(seconds / 3600);
  seconds  -= hrs*3600;
  const mnts = Math.floor(seconds / 60);
  seconds  -= mnts*60;

  return `${days} days, ${hrs} hours ,${mnts} min `;
 }
  useEffect(()=>{
    if(farm.clusterData){
      setClusterBalance(farm.clusterData.clusterBalance)
      setTimeLock((farm.clusterData.timeLock / ((60**2)*24)).toFixed(0).toString())
    }
    const getTimeLeft = async () =>{
      const res = await cluster.methods.withdrawTime(account).call()
      const timeLeftString = convertSeconds(res)
      setTimeLeft(timeLeftString)
    }
    const getUserInfo = async () =>{
      const res = await cluster.methods.userInfo(account).call()
      const userData = {
        buzzAtLastUserAction:new BigNumber(res.buzzAtLastUserAction.toString()).toJSON(),
        shares:new BigNumber(res.shares.toString()).toJSON(),
        pricePerFullShare:new BigNumber(farm.clusterData.pricePerFullShare.toString()).toJSON()
      }
      console.log(userData)
      setUserClusterInfo(userData)
    }
    if(account && farm.clusterData){
      getTimeLeft()
      getUserInfo()
    }
  },[cluster,account,farm.clusterData])

  const farmImage = farm.isTokenOnly
    ? farm.tokenSymbol.toLowerCase()
    : `${farm.tokenSymbol.toLowerCase()}-${farm.quoteTokenSymbol.toLowerCase()}`

  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if(farm.isCluster){
      return  new BigNumber(clusterBalance.toNumber()*cakePrice.toNumber())
    }
    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.ETH) {
      return ethPrice.times(farm.lpTotalInQuoteToken)
    }
    // if(farm.isTokenOnly){

    //   return bnbPrice.times(farm.lpTotalInQuoteToken)
    // }
    return farm.lpTotalInQuoteToken
  }, [bnbPrice, cakePrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol,ethPrice,farm.isCluster,clusterBalance])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    : '-'

  const lpLabel =(farm.isAutoVault) ? "Auto RV2" : farm.lpSymbol
  const earnLabel = 'RV2'
  const farmAPY = farm.apy.div(totalValue).times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, risk } = farm

  return (
    <FCard>
      {farm.tokenSymbol === 'xxxxx' && <StyledCardAccent />}
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        risk={risk}
        depositFee={farm.depositFeeBP}
        farmImage={farmImage}
        tokenSymbol={farm.tokenSymbol}
        isAutoVault={farm.isAutoVault}
      />
      {!removed && (
        <Flex justifyContent="space-between" alignItems="center">
          <Text color="#aeaeae" bold>
            {(farm.isAutoVault) ?
            TranslateString(351, 'APY')
            :
            TranslateString(352, 'APR')
            }
          </Text>
          <Text bold style={{ display: 'flex', alignItems: 'center' ,color:"white"}}>
            {farm.apy ? (

              <> {farm.isAutoVault ? null :
              <ApyButton
                lpLabel={lpLabel}
                quoteTokenAdresses={quoteTokenAdresses}
                quoteTokenSymbol={quoteTokenSymbol}
                tokenAddresses={tokenAddresses}
                cakePrice={cakePrice}
                apy={farm.apy.div(totalValue)}
              />}

                {farmAPY}%
              </>
            ) : (
              <Skeleton height={24} width={80} />
            )}
          </Text>
        </Flex>
      )}
      <Flex justifyContent="space-between">
        <Text color="#aeaeae" bold>
          {TranslateString(318, 'Earn')}:
        </Text>
        <Text color='white' bold>{earnLabel}</Text>
      </Flex>
      <Flex justifyContent="space-between" >
        <Text style={{ fontSize: '20px' }} color="#aeaeae">
          {(farm.isAutoVault) ?
          TranslateString(10007, 'Performans Fee')
          :
          TranslateString(10001, 'Deposit Fee')
          }

        </Text>
        <Text bold style={{ fontSize: '20px',color:"white" }}>

         { farm.depositFeeBP / 100
          }
          %
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text color="#aeaeae" bold>
          Vesting time:
        </Text>
        <Text color='white' bold>{timeLock} days</Text>
      </Flex>
      <CardActionsContainer clusterData={userClusterInfo} timeLeft={timeLeft} farm={farm} ethereum={ethereum} account={account} />
      <Divider />
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          removed={removed}
          isTokenOnly={farm.isTokenOnly}
          bscScanAddress={
            farm.isTokenOnly
              ? `https://bscscan.com/token/${farm.tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
              : `https://bscscan.com/token/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`
          }
          totalValueFormated={totalValueFormated}
          lpLabel={lpLabel}
          quoteTokenAdresses={quoteTokenAdresses}
          quoteTokenSymbol={quoteTokenSymbol}
          tokenAddresses={tokenAddresses}
        />
      </ExpandingWrapper>
    </FCard>
  )
}

export default FarmCard
