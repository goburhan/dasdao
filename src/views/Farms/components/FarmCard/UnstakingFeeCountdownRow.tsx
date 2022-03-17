import React from 'react'
import { Flex, Text,} from '@macist-m/robinia-uikit'
// import { useWeb3React } from '@web3-react/core'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useWithdrawalFeeTimer from 'views/Farms/hooks/useWithdrawalFeeTimer'
import { useCakeVault } from 'state/hooks'
import WithdrawalFeeTimer from './WithdrawalFeeTimer'


interface UnstakingFeeCountdownRowProps {
  isTableVariant?: boolean
}

const UnstakingFeeCountdownRow: React.FC<UnstakingFeeCountdownRowProps> = ({ isTableVariant }) => {
  const { account } = useWallet()
  const {
    userData: { lastDepositedTime, userShares },
    fees: { withdrawalFee, withdrawalFeePeriod },
  } = useCakeVault()
  const feeAsDecimal = withdrawalFee / 100 || '-'


  const { secondsRemaining, hasUnstakingFee } = useWithdrawalFeeTimer(
    parseInt(lastDepositedTime, 10),
    userShares,
    withdrawalFeePeriod,
  )

  // The user has made a deposit, but has no fee
  const noFeeToPay = lastDepositedTime && !hasUnstakingFee && userShares.gt(0)

  // Show the timer if a user is connected, has deposited, and has an unstaking fee
  const shouldShowTimer = account && lastDepositedTime && hasUnstakingFee

  const getRowText = () => {
    if (noFeeToPay) {
      return 'Unstaking Fee'
    }
    if (shouldShowTimer) {
      return 'unstaking fee until'
    }
    return 'unstaking fee if withdrawn within 72h'
  }

  return (
    <>
    <Flex
      alignItems='center'
      justifyContent="space-between"
      flexDirection='row'
    >
      <Text>{noFeeToPay ? '0' : feeAsDecimal}% {getRowText()}</Text>
      {(shouldShowTimer) &&
        <WithdrawalFeeTimer secondsRemaining={secondsRemaining} />
    }
    </Flex>


    </>
  )
}

export default UnstakingFeeCountdownRow
