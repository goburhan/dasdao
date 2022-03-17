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
import { useApprove ,useVaultApprove ,useCheckVaultApprovalStatus} from 'hooks/useApprove'
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
  vaultData?:any
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, ethereum, account ,vaultData }) => {
  const TranslateString = useI18n()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses, tokenAddresses, isTokenOnly, depositFeeBP } = useFarmFromPid(farm.pid)
  const { allowance, tokenBalance, stakedBalance, earnings } = useFarmUser(pid)

  const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const tokenAddress = tokenAddresses[process.env.REACT_APP_CHAIN_ID]
  const lpName = farm.lpSymbol.toUpperCase()
  const { isVaultApproved, setLastUpdated } = useCheckVaultApprovalStatus()

  const cakePriceBusd = usePriceCakeBusd()
  const { hasAutoEarnings, autoCakeToDisplay, autoUsdToDisplay,cakeAsBigNumber } = getCakeVaultEarnings(
    account,
    vaultData.robiniaAtLastUserAction,
    vaultData.userShares,
    vaultData.pricePerFullShare,
    cakePriceBusd.toNumber(),
    vaultData.tokenTaxRate,
  )
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const lpContract = useMemo(() => {
    if (isTokenOnly) {
      return getContract(ethereum as provider, tokenAddress)
    }
    return getContract(ethereum as provider, lpAddress)
  }, [ethereum, lpAddress, tokenAddress, isTokenOnly])

  const { onApprove } = useApprove(lpContract)
  const { handleVaultApprove } = useVaultApprove()

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])
  const vaultApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await handleVaultApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [handleVaultApprove])
  const renderApprovalOrStakeButton = () => {
    if(farm.isAutoVault){
      return isVaultApproved ? (
        <StakeAction
          stakedBalance={cakeAsBigNumber}
          tokenBalance={tokenBalance}
          tokenName={lpName}
          pid={pid}
          depositFeeBP={depositFeeBP}
          isAutoVault={farm.isAutoVault}
          pricePerFullShare={vaultData.pricePerFullShare}
          userShares={vaultData.userShares}
        />
      ) : (
        <Button mt="8px" fullWidth disabled={requestedApproval} onClick={(farm.isAutoVault) ? vaultApprove :handleApprove}>
          {TranslateString(999, 'Approve Contract')}
        </Button>
      )
    }
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={lpName}
        pid={pid}
        depositFeeBP={depositFeeBP}
      />
    ) : (
      <Button mt="8px" fullWidth disabled={requestedApproval} onClick={(farm.isAutoVault) ? vaultApprove :handleApprove}>
        {TranslateString(999, 'Approve Contract')}
      </Button>
    )
  }

  return (
    <Action>
      <Flex>
        <Text bold textTransform="uppercase" color="secondary" fontSize="16px" pr="3px">
          {/* TODO: Is there a way to get a dynamic value here from useFarmFromSymbol? */}
          RV2
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="16px">
          {TranslateString(999, 'Earned')}
        </Text>

      </Flex>
      {(farm.isAutoVault) ?
       <div style={{minHeight:"50px"}}>
       <Flex>
       {(hasAutoEarnings) &&
       <Text bold color="primary" fontSize="21px" pr="3px">
        {autoCakeToDisplay} RV2
       </Text>
       }
       </Flex>

       <UnstakingFeeCountdownRow/>

       </div>
      :
      <>
      <HarvestAction earnings={earnings} pid={pid} />
      <Flex>
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="3px">
          {lpName}
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {TranslateString(999, 'Staked')}
        </Text>
      </Flex>
      </>
      }

      {!account ? <UnlockButton mt="8px" fullWidth /> : renderApprovalOrStakeButton()}
    </Action>
  )
}

export default CardActions
