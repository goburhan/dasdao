import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, IconButton, AddIcon, MinusIcon, useModal,Text } from '@macist-m/robinia-uikit'
import useI18n from 'hooks/useI18n'
import useStake,{ useVaultStake } from 'hooks/useStake'
import {usePriceCakeBusd} from 'state/hooks'
import useUnstake,{useVaultUnstake} from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'


interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  depositFeeBP?: number
  isAutoVault?:boolean
  pricePerFullShare?:any
  userShares?:any
}
const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

const StakeAction: React.FC<FarmCardActionsProps> = ({ stakedBalance, tokenBalance, tokenName, pid, depositFeeBP ,isAutoVault ,pricePerFullShare,userShares}) => {
  const TranslateString = useI18n()
  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)
  const { handleVaultStake } = useVaultStake()
  const { handleVaultUnstake } = useVaultUnstake()
  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const cakePriceUsd = usePriceCakeBusd()

  const displayBalance = rawStakedBalance.toLocaleString()
  const stakedUSDValue = rawStakedBalance*cakePriceUsd.toNumber()
  if(isAutoVault){
    console.log(stakedBalance.toNumber())
  }
  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={(isAutoVault) ? handleVaultStake :onStake} tokenName={tokenName} depositFeeBP={depositFeeBP} />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal userShares={userShares} pricePerFullShare={pricePerFullShare} isAutoVault={isAutoVault} max={stakedBalance} onConfirm={(isAutoVault) ? handleVaultUnstake :onUnstake} tokenName={tokenName} />,
  )

  const renderStakingButtons = () => {
    return rawStakedBalance === 0 ? (
      <Button onClick={onPresentDeposit}>{TranslateString(999, 'Stake')}</Button>
    ) : (
      <IconButtonWrapper>
        <IconButton variant="tertiary" onClick={onPresentWithdraw} mr="6px">
          <MinusIcon color="primary" />
        </IconButton>
        <IconButton variant="tertiary" onClick={onPresentDeposit}>
          <AddIcon color="primary" />
        </IconButton>
      </IconButtonWrapper>
    )
  }

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex alignItems="center">
      <Heading color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>
      <Flex alignItems="center">
      {displayBalance}
      {rawStakedBalance !== 0 ?
      <Text fontSize='14px' color='white'> ({stakedUSDValue.toLocaleString()} $)</Text>
      : null}

        </Flex>
      </Heading>
      {(isAutoVault) &&
      <Text marginLeft={1} color="white" bold fontSize='14px'>compounding</Text>
      }
      </Flex>

      {renderStakingButtons()}
    </Flex>
  )
}

export default StakeAction
