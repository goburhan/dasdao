import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import { Button, Flex, Text } from '@macist-m/robinia-uikit'
import { Farm } from 'state/types'
import { useFarmFromPid, useFarmFromSymbol, useFarmUser ,usePriceCakeBusd } from 'state/hooks'
import { getCakeVaultEarnings } from 'views/Farms/helpers'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import { useApprove ,useClusterApprove ,useCheckClusterApprovalStatus} from 'hooks/useApprove'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'


const Action = styled.div`
  padding-top: 16px;
`
export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  ethereum?: provider
  account?: string
  timeLeft?:string
  clusterData?:any
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, ethereum, account ,timeLeft,clusterData }) => {
  const TranslateString = useI18n()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses, tokenAddresses, isTokenOnly, depositFeeBP } = useFarmFromPid(farm.pid)
  const { allowance, tokenBalance, stakedBalance, earnings } = useFarmUser(pid)
  const chainId = process.env.REACT_APP_CHAIN_ID

  const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const tokenAddress = tokenAddresses[process.env.REACT_APP_CHAIN_ID]
  const lpName = farm.lpSymbol.toUpperCase()
  const { isClusterApproved, setLastUpdated } = useCheckClusterApprovalStatus(farm.clusterAddresses[chainId])

  const cakePriceBusd = usePriceCakeBusd()

  const isApproved = account && allowance && allowance.isGreaterThan(0)

      const { hasAutoEarnings, autoCakeToDisplay, autoUsdToDisplay,cakeAsBigNumber } = getCakeVaultEarnings(
        account,
        new BigNumber(clusterData.buzzAtLastUserAction),
        new BigNumber(clusterData.shares),
        new BigNumber(clusterData.pricePerFullShare),
        cakePriceBusd.toNumber(),
        "0"
      )
      console.log(autoCakeToDisplay)


  const lpContract = useMemo(() => {
    if (isTokenOnly) {
      return getContract(ethereum as provider, tokenAddress)
    }
    return getContract(ethereum as provider, lpAddress)
  }, [ethereum, lpAddress, tokenAddress, isTokenOnly])

  const { onApprove } = useApprove(lpContract)
  const { handleClusterApprove } = useClusterApprove(farm.clusterAddresses[chainId])

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])
  const clusterApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await handleClusterApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [handleClusterApprove])
  const renderApprovalOrStakeButton = () => {

    return isClusterApproved ? (
      <StakeAction
        stakedBalance={cakeAsBigNumber}
        tokenBalance={tokenBalance}
        tokenName={lpName}
        pid={pid}
        depositFeeBP={depositFeeBP}
        clusterAddress={farm.clusterAddresses[chainId]}
        isCluster
        timeLeft={timeLeft}
      />
    ) : (
      <Button mt="8px" fullWidth disabled={requestedApproval} onClick={(farm.isCluster) ? clusterApprove :handleApprove}>
        {TranslateString(999, 'Approve Contract')}
      </Button>
    )
  }

  return (
    <Action>
      <Flex>
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="3px">
          {/* TODO: Is there a way to get a dynamic value here from useFarmFromSymbol? */}
          RV2
        </Text>
        <Text bold textTransform="uppercase" color="white" fontSize="12px">
          {TranslateString(999, 'Earned')}
        </Text>

      </Flex>
      <Flex>
       {/* {(hasAutoEarnings) &&
       <Text bold color="primary" fontSize="21px" pr="3px">
        {autoCakeToDisplay} RV2
       </Text>
       } */}
       </Flex>
      <HarvestAction earnings={earnings} pid={pid} />
      <Flex>
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="3px">
          {lpName}
        </Text>
        <Text bold textTransform="uppercase" color="white" fontSize="12px">
          {TranslateString(999, 'Staked')}
        </Text>
      </Flex>


      {!account ? <UnlockButton mt="8px" fullWidth /> : renderApprovalOrStakeButton()}
    </Action>
  )
}

export default CardActions
