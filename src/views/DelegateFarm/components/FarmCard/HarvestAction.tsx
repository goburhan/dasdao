import React, { useState, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from '@macist-m/robinia-uikit'
import useI18n from 'hooks/useI18n'
import { useHarvestDelegate } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import { getContract, getWeb3 } from 'utils/web3';
import styled from 'styled-components'
import useStake from '../../../../hooks/useStake'
import { getDelegateContract, harvest} from '../../../../utils/steemUtils';
import { getDelegateContractAddress } from '../../../../utils/addressHelpers';

interface FarmCardActionsProps {
  earning?: number
  pid?: number
  account?: string
}

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earning, pid, account }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const contract = useMemo(() => {
    return getDelegateContract(getDelegateContractAddress());
  },[])
  const rawEarningsBalance = earning
    const { onReward } = useHarvestDelegate()
  const displayBalance = rawEarningsBalance.toLocaleString()
  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Heading  color='text-disabled'>{displayBalance}</Heading>
      <BalanceAndCompound>
        <Button
          disabled={rawEarningsBalance === 0}
          onClick={async () => {
            
            setPendingTx(true)
            await onReward()
            setPendingTx(false)
          }}
        >
          {TranslateString(999, 'Harvest')}
        </Button>
      </BalanceAndCompound>
    </Flex>
  )
}

export default HarvestAction
