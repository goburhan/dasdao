import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton } from '@macist-m/robinia-uikit'
import { BLOCKS_PER_YEAR} from 'config'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import { useCakeVault } from 'state/hooks'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { fetchPublicVaultData } from 'state/farms/fetchVaultPublic'
import { getBalanceNumber} from 'utils/formatBalance'
import { QuoteToken } from 'config/constants/types'
import { getAutoAprData } from 'views/Farms/helpers'
import cardBg from './kartbg.svg'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
// import EstimateButton from './EstimateButton'
import ApyButton from '../FarmCard/ApyButton'

export interface FarmWithStakedValueX extends Farm {
  apy?: BigNumber
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


const FCardSolo = styled.div`
  background: #153130;
  backdrop-filter:blur(30px);
  padding: 30px;
  border:solid rgba(255, 255, 255,0.1) 2px;
  border-radius:16px;
`
const Divider = styled.div`
  background-color: rgba(255,255,255,0.1);
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface FarmCardProps {
  farm: FarmWithStakedValueX
  removed: boolean
  cakePrice?: BigNumber
  bnbPrice?: BigNumber
  ethPrice?: BigNumber
  ethereum?: provider
  account?: string
}

const CakeVaultCard: React.FC<FarmCardProps> = ({ farm, removed, cakePrice,ethPrice ,bnbPrice, ethereum, account }) => {
  const TranslateString = useI18n()

  const [showExpandableSection, setShowExpandableSection] = useState(false)
  // if(farm.isAutoVault){

  // }
  fetchPublicVaultData()

  const {
    userData: { userShares, isLoading: isVaultUserDataLoading ,robiniaAtLastUserAction, lastUserActionTime},
    fees: { performanceFee },
    totalRobiniaInVault,
    pricePerFullShare,
    totalPendingRobiniaHarvest,
    tokenTaxRate,
  } = useCakeVault()
  const accountHasSharesStaked = userShares && userShares.gt(0)
  // alert(accountHasSharesStaked)
  const isLoading = !farm.userData || isVaultUserDataLoading
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100
  // const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  // const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  // console.log(`totalPendingRobiniaHarvest:${totalPendingRobiniaHarvest}`)

  const vaultData = {
    userShares,
    robiniaAtLastUserAction,
    lastUserActionTime,
    pricePerFullShare,
    tokenTaxRate,
  }

  const farmImage = farm.isTokenOnly
    ? farm.tokenSymbol.toLowerCase()
    : `${farm.tokenSymbol.toLowerCase()}-${farm.quoteTokenSymbol.toLowerCase()}`

  const totalValue: BigNumber = useMemo(() => {
    //   if(farm.isTokenOnly){

    //    return cakePrice.times(farm.lpTotalInQuoteToken)
    //  }
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if(farm.isAutoVault){
      return cakePrice.times(getBalanceNumber(totalRobiniaInVault, 18))
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
  }, [bnbPrice, cakePrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol,ethPrice,farm.isAutoVault,totalRobiniaInVault])
  // console.log(performanceFeeAsDecimal)
  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    : '-'

  const lpLabel =(farm.isAutoVault) ? "Auto RV2" : farm.lpSymbol
  const earnLabel = 'RV2'
  const farmAPY =
    farm.apy &&
    farm.apy.div(totalValue).times(100).toNumber().toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    console.log(`APR: ${farmAPY}`)
    // farm.isAutoVault ?
    // (farm.apy.times(new BigNumber(100)).toNumber()*performanceFeeAsDecimal).toLocaleString(undefined, {
    //   minimumFractionDigits: 2,
    //   maximumFractionDigits: 2,
    // })
    // :
  const cakeRewardPerBlock = new BigNumber(farm.eggPerBlock || 1)
    .times(new BigNumber(farm.poolWeight).minus(new BigNumber(0.1)))
    .div(new BigNumber(10).pow(18))
  const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)
  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, risk } = farm
  const AutoApr = getAutoAprData(farm.apy.div(new BigNumber(totalValue)).times(new BigNumber(100)).toNumber(),performanceFee)
  const AutoAprAsPerchantage = AutoApr.apr.toLocaleString("ko-KR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  const AutoAprAsPerchantage1 = AutoApr.autoApr1.toLocaleString("ko-KR", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  })
  const AutoAprAsPerchantage2 = AutoApr.autoApr7.toLocaleString("ko-KR", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  })
  const AutoAprAsPerchantage3 = AutoApr.autoApr30.toLocaleString("ko-KR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })


  return (
    <FCardSolo>
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
        <>
                <Flex justifyContent="space-between" alignItems="center">
                <Text color="#fff" bold>
                {TranslateString(351, 'APY')}
                </Text>
                <Text bold style={{ display: 'flex', alignItems: 'center' ,justifyContent:'flex-end',textAlign:'right'}}>
                {farm.apy ? (

                <>
                {/* {farm.isAutoVault ? null :
                <EstimateButton
                lpLabel={earnLabel}
                cakePrice={cakePrice}
                apy={farm.apy}
                cakeRewardPerYear={cakeRewardPerYear}
                totalValue={totalValue}
                />} */}

                {AutoAprAsPerchantage}%
                </>
                ) : (
                <Skeleton height={24} width={80} />
                )}
                </Text>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                <Text color="#fff" bold>
                {TranslateString(351, 'Daily')}
                </Text>
                <Text bold style={{ display: 'flex', alignItems: 'center' ,justifyContent:'flex-end',textAlign:'right'}}>
                {farm.apy ? (

                  <> {farm.isAutoVault ? null :
                  <ApyButton
                    lpLabel={lpLabel}
                    quoteTokenAdresses={quoteTokenAdresses}
                    quoteTokenSymbol={quoteTokenSymbol}
                    tokenAddresses={tokenAddresses}
                    cakePrice={cakePrice}
                    apy={farm.apy}
                  />}

                  {AutoAprAsPerchantage1}%
                  </>
                ) : (
                  <Skeleton height={24} width={80} />
                )}
                </Text>
               </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                    <Text color="#fff" bold>
                    {TranslateString(351, '7 days')}
                    </Text>
                    <Text bold style={{ display: 'flex', alignItems: 'center' ,justifyContent:'flex-end',textAlign:'right'}}>
                    {farm.apy ? (

                      <> {farm.isAutoVault ? null :
                      <ApyButton
                        lpLabel={lpLabel}
                        quoteTokenAdresses={quoteTokenAdresses}
                        quoteTokenSymbol={quoteTokenSymbol}
                        tokenAddresses={tokenAddresses}
                        cakePrice={cakePrice}
                        apy={farm.apy}
                      />}

                      {AutoAprAsPerchantage2}%
                      </>
                    ) : (
                      <Skeleton height={24} width={80} />
                    )}
                    </Text>
                </Flex>
                </>
      )}
      <Flex justifyContent="space-between">
        <Text color="#fff" bold>
          {TranslateString(318, 'Earn')}:
        </Text>
        <Text bold>{earnLabel}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text color="#fff" bold>
           RV2 Price:
        </Text>
      <Text bold>{cakePrice.toNumber().toFixed(3)}$</Text>
      </Flex>

      <Flex justifyContent="space-between">
        <Text style={{ fontSize: '20px' }} color="#fff">
          {(farm.isAutoVault) ?
          TranslateString(10008, 'Performance Fee')
          :
          TranslateString(10001, 'Deposit Fee')
          }

        </Text>
        <Text bold style={{ fontSize: '20px' }}>
          {(farm.isAutoVault) ?
          performanceFeeAsDecimal
          :
          farm.depositFeeBP / 100
          }
          %
        </Text>
      </Flex>
      <CardActionsContainer vaultData={vaultData} farm={farm} ethereum={ethereum} account={account} />
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
          apr={farmAPY}
          cakePrice={cakePrice}
          apy={farm.apy}
        />
      </ExpandingWrapper>
    </FCardSolo>
  )
}

export default CakeVaultCard
