import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, IconButton, AddIcon, MinusIcon, useModal,Text } from '@macist-m/robinia-uikit'
import useI18n from 'hooks/useI18n'
import useStake,{ useClusterStake, } from 'hooks/useStake'
import { useClusterBalance } from 'hooks/useFarmsWithBalance'
// import  from 'hooks/useStake'
import useUnstake,{useClusterUnstake} from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'


interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  depositFeeBP?: number
  isCluster?:boolean
  clusterAddress?:string
  timeLeft?:string
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

const StakeAction: React.FC<FarmCardActionsProps> = ({ stakedBalance, tokenBalance, tokenName, pid, depositFeeBP ,isCluster ,clusterAddress,timeLeft}) => {
  const TranslateString = useI18n()
  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)
  const { handleClusterStake } = useClusterStake(clusterAddress)
  const { handleClusterUnstake } = useClusterUnstake(clusterAddress)
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const userBalance = useClusterBalance("0xc31385BC855BC99e6F8097D45a2fd7e798Ac73DB")
  const displayBalance = getBalanceNumber(new BigNumber(userBalance)).toFixed(3)
  console.log(new BigNumber(userBalance).toNumber())
  console.log(getBalanceNumber(new BigNumber(userBalance)).toFixed(3))
  if(isCluster){
    console.log(stakedBalance)
  }
  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={(isCluster) ? handleClusterStake :onStake} tokenName={tokenName} depositFeeBP={depositFeeBP} />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={(isCluster) ? handleClusterUnstake :onUnstake} tokenName={tokenName} />,
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
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
        <Heading color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>{new BigNumber(userBalance).toNumber() === 0 ? 0 : displayBalance}
        </Heading>
        {(isCluster) &&
        <Text marginLeft={1} color="secondary" bold fontSize='12px'>compounding</Text>
        }
        </Flex>

        {renderStakingButtons()}
      </Flex>
      <Flex marginTop={2} justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
        <Heading color='text'>Time Left
        </Heading>
        </Flex>
        <Flex alignItems="center">
        <Heading color='#fff'>{timeLeft}
        </Heading>
        </Flex>

      </Flex>
    </>
  )
}

export default StakeAction
