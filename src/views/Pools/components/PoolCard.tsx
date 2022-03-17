import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Image ,Flex, Text, Skeleton,MinusIcon} from '@macist-m/robinia-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import Label from 'components/Label'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove, usePoolApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useSousStake, usePoolStake ,usePoolLPStake} from 'hooks/useStake'
import { useSousUnstake ,useSousLPUnstake} from 'hooks/useUnstake'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber, getBasePoint } from 'utils/formatBalance'
import { useSousHarvest ,useSousLpHarvest } from 'hooks/useHarvest'
import Balance from 'components/Balance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types';
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
// import CompoundModal from './CompoundModal'
// import CardTitle from './CardTitle'
import CardHeading from './CardHeading'
// import OldSyrupTitle from './OldSyrupTitle'
import HarvestButton from './HarvestButton'
import CardFooter from './CardFooter'

interface PoolWithApy extends Pool {
  apy: BigNumber
  totalStakedUSD?: any
}

interface HarvestProps {
  pool: PoolWithApy
  totalStakedUSD? : any
}
const FCard = styled.div`
  align-self: baseline;
  background: rgba(255,255,255,0.12);
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
const Action = styled.div`

padding:8px 0px;
`
const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`
const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
  const {
    sousId,
    image,
    tokenName,
    stakingTokenName,
    stakingTokenAddress,
    projectLink,
    harvest,
    apy,
    tokenDecimals,
    poolCategory,
    totalStaked,
    totalStakedUSD,
    startBlock,
    endBlock,
    isFinished,
    userData,
    stakingLimit,
    contractAddress,
    depositFee,
    withdrawalFeeLevels,
    isLp,
    pancakePoolId
  } = pool
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingTokenAddress)
  const { account } = useWallet()
  const block = useBlock()

  /* const { onApprove } = useSousApprove(stakingTokenContract, sousId) */
  const { onApprove } = usePoolApprove(stakingTokenContract, contractAddress[56], 1)
  // const { onStake } = useSousStake(sousId, isBnbPool)
  const { onStake } = usePoolStake(9999, contractAddress[56])
  const { onLpStake} =  usePoolLPStake(pancakePoolId,99991, contractAddress[56])
  const { onUnstake } = useSousUnstake(sousId)
  const { onLpUnstake} =  useSousLPUnstake(pancakePoolId,contractAddress[56],sousId)
  const { onReward } = useSousHarvest(sousId, isBnbPool)
  const { onLpReward} =  useSousLpHarvest(pancakePoolId,contractAddress[56],sousId)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)
  const earningEther = earnings.div(10**18)

  const blocksUntilStart = Math.max(startBlock - block, 0)
  const blocksRemaining = Math.max(endBlock - block, 0)
  const isOldSyrup = stakingTokenName === QuoteToken.SYRUP
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool
  const isCardActive = isFinished && accountHasStakedBalance
  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={(isLp) ? onLpStake : onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
    />,
  )


  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={(isLp) ? onLpUnstake : onUnstake} tokenName={stakingTokenName} withdrawalFeeLevels={withdrawalFeeLevels} />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])
 const poolApy =apy && apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return (
    <FCard>
      {isFinished && sousId !== 0 && <PoolFinishedSash />}
      <CardHeading
        lpLabel={tokenName}
        multiplier={`${pool.multiplier}x`}
        depositFee={getBasePoint(new BigNumber(depositFee))}
        farmImage={tokenName.toLocaleLowerCase()}
        tokenSymbol={tokenName}
      />
        {!isFinished && (
        <Flex justifyContent="space-between" alignItems="center">
          <Text color="#aeaeae" bold>
            {TranslateString(352, 'APR')}:
          </Text>

            {apy ?

              <Text bold color='white' style={{ display: 'flex', alignItems: 'center' }}>
              {poolApy}%
              </Text>


             :
              <Skeleton height={24} width={80} />
            }

        </Flex>
      )}
      <Flex justifyContent="space-between">
        <Text color="#aeaeae" bold>
          {TranslateString(318, 'Earn')}:
        </Text>
        <Text bold color='white'>RV2</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text style={{ fontSize: '20px' }} color="#aeaeae">
          {TranslateString(10001, 'Deposit Fee')}:
        </Text>
        <Text bold color='white' style={{ fontSize: '20px' }}>
          {getBasePoint(new BigNumber(depositFee))}%
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text style={{ fontSize: '20px' }} color="#aeaeae">
          {TranslateString(10006, 'Withdraw')}:
        </Text>
        <Text bold color='white' style={{ fontSize: '20px' }}>
          0-3%
        </Text>
      </Flex>
      {/* <CardActionsContainer farm={pool} ethereum={ethereum} account={account} /> */}
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
      <Flex justifyContent="space-between" alignItems="center">
        <Text bold textTransform="uppercase" color="white" fontSize="17px" pr="3px">
        {isFinished || isOldSyrup || !apy || apy?.isNaN() || !apy?.isFinite() ? (
            '-'
          ) : (
            <Balance fontSize="18px" isDisabled={isFinished} value={getBalanceNumber(earnings)} decimals={8} unit=" RV2" />
          )}
          </Text>
        {account && harvest && !isOldSyrup && (
              <Button
                disabled={!earnings.toNumber() || pendingTx}
                onClick={(isLp) ?async () => {
                  setPendingTx(true)
                  await onLpReward()
                  setPendingTx(false)
                } : async () => {
                  setPendingTx(true)
                  await onReward()
                  setPendingTx(false)
                }}
              >
              {pendingTx ? 'Collecting' : 'Harvest'}
              </Button>
            )}
      </Flex>
      </Action>
      <Action>
      <Flex>
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="3px">
          {tokenName}
        </Text>
        <Text bold textTransform="uppercase" color="white" fontSize="12px">
          {TranslateString(999, 'Staked')}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        {account && !needsApproval &&
              <Text bold textTransform="uppercase" color="primary" fontSize="17px" pr="3px">
                 <Balance fontSize="18px" isDisabled={isFinished} value={getBalanceNumber(stakedBalance)} decimals={4} />
            </Text>
        }
          {!account && <UnlockButton mt="8px" fullWidth/>}
          {account &&
            (needsApproval && !isOldSyrup ? (
              <div style={{ flex: 1 }}>
                <Button disabled={isFinished || requestedApproval} onClick={handleApprove} fullWidth>
                  {`Approve ${stakingTokenName}`}
                </Button>
              </div>
            ) : (
              <IconButtonWrapper>
                <IconButton
                  disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                  onClick={
                    isOldSyrup
                      ? async () => {
                          setPendingTx(true)
                          await onUnstake('0')
                          setPendingTx(false)
                        }
                      : onPresentWithdraw
                  }
                  variant="tertiary"
                  mr="6px"
                >
                 <MinusIcon color="primary" />
                </IconButton>
                {!isOldSyrup && (
                  <IconButton variant="tertiary" disabled={isFinished && sousId !== 0} onClick={onPresentDeposit}>
                    <AddIcon color="primary" />
                  </IconButton>
                )}
              </IconButtonWrapper>
            ))}
      </Flex>
      </Action>

        {/* <StyledDetails>
          <div style={{ flex: 1 }}>{TranslateString(736, 'RV2 Earned')}:</div>
          {isFinished || isOldSyrup || !apy || apy?.isNaN() || !apy?.isFinite() ? (
            '-'
          ) : (
            <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(earnings)} decimals={8} unit=" RV2" />
          )}
        </StyledDetails>
        <StyledDetails>
          <div style={{ flex: 1 }}>{TranslateString(736, 'APY')}:</div>
          {isFinished || isOldSyrup || !apy || apy?.isNaN() || !apy?.isFinite() ? (
            '-'
          ) : (
            <Balance fontSize="14px" isDisabled={isFinished} value={apy?.toNumber()} decimals={2} unit="%" />
          )}
        </StyledDetails>
        <StyledDetails>
          <div style={{ flex: 1 }}>
            <span role="img" aria-label={stakingTokenName}>
              🥞{' '}
            </span>
            {TranslateString(384, 'Your Stake')}:
          </div>
          <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(stakedBalance)} />
        </StyledDetails>
        <StyledDetails>
          <div style={{ flex: 1 }}>
            Deposit Fee:
          </div>
          <Balance fontSize="14px" isDisabled={isFinished} value={getBasePoint(new BigNumber(depositFee))} decimals={2} unit="%"/>
        </StyledDetails> */}
      <CardFooter
        projectLink={projectLink}
        totalStaked={totalStakedUSD}
        blocksRemaining={blocksRemaining}
        isFinished={isFinished}
        blocksUntilStart={blocksUntilStart}
        poolCategory={poolCategory}
        tokenName={tokenName}
      />
    </FCard>
  )
}

const PoolFinishedSash = styled.div`
  background-image: url('/images/pool-finished-sash.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 135px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 135px;
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
  box-sizing: border-box;
`

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  display: flex;
  font-size: 14px;
`

export default PoolCard
