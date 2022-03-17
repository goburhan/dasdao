import React, { useState, useEffect } from 'react'
import { useModal, Button, Text } from '@macist-m/robinia-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import { useERC20 } from 'hooks/useContract'
import { useIfoAllowance } from 'hooks/useAllowance'
import { useIfoApprove } from 'hooks/useApprove'
import { IfoStatus } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import LabelButton from './LabelButton'
import ContributeModal from './ContributeModal'

export interface Props {
  address: string
  currency: string
  currencyAddress: string
  contract: Contract
  status: IfoStatus
  raisingAmount: BigNumber
  tokenDecimals: number
}

const IfoCardContribute: React.FC<Props> = ({
  address,
  currency,
  currencyAddress,
  contract,
  status,
  raisingAmount,
  tokenDecimals,
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [offeringTokenBalance, setOfferingTokenBalance] = useState(new BigNumber(0))
  const [userInfo, setUserInfo] = useState({ amount: 0, claimed: false })
  const [harvestedPeriod, setUserHarvestedPeriod] = useState({
    period1:false,
    period2:false,
    period3:false,
    period4:false
  })

  const { account } = useWallet()
  const contractRaisingToken = useERC20(currencyAddress)
  const allowance = useIfoAllowance(contractRaisingToken, address, pendingTx)
  const onApprove = useIfoApprove(contractRaisingToken, address)
  const [onPresentContributeModal] = useModal(
    <ContributeModal currency={currency} contract={contract} currencyAddress={currencyAddress} />,
  )

  useEffect(() => {
    const fetch = async () => {
      const balance = new BigNumber(await contract.methods.getOfferingAmount(account).call())
      const userinfo = await contract.methods.userInfo(account).call()
      const period1 =await contract.methods.hasHarvested(account,0).call()
      const period2 =await contract.methods.hasHarvested(account,1).call()
      const period3 =await contract.methods.hasHarvested(account,2).call()
      const period4 =await contract.methods.hasHarvested(account,3).call()
      setUserHarvestedPeriod({
        period1,
        period2,
        period3,
        period4
      })
      setUserInfo(userinfo)
      setOfferingTokenBalance(balance.div(4))
    }

    if (account) {
      fetch()
    }
  }, [account, contract.methods, pendingTx])

  if (allowance === null) {
    return null
  }

  const claim = async (harvestPeriod: number) => {
    setPendingTx(true)
    await contract.methods.harvest(harvestPeriod).send({ from: account })
    setPendingTx(false)
  }
  const isFinished = status === 'finished'
  const percentOfUserContribution = new BigNumber(userInfo.amount).div(raisingAmount).times(100)

  if (allowance <= 0) {
    return (
      <Button
        fullWidth
        disabled={pendingTx || isFinished}
        onClick={async () => {
          try {
            setPendingTx(true)
            await onApprove()
            setPendingTx(false)
          } catch (e) {
            setPendingTx(false)
            console.error(e)
          }
        }}
      >
        Approve
      </Button>
    )
  }

  return (
    <>
      <LabelButton
        disabled={pendingTx || harvestedPeriod.period1}
        buttonLabel={isFinished ? 'Claim first' : 'Contribute'}
        label={isFinished ? 'Your tokens to claim' : `Your contribution (${currency})`}
        value={
          // eslint-disable-next-line no-nested-ternary
          isFinished
            ? harvestedPeriod.period1
              ? 'Claimed'
              : getBalanceNumber(offeringTokenBalance, tokenDecimals).toFixed(4)
            : getBalanceNumber(new BigNumber(userInfo.amount)).toFixed(4)
        }
        onClick={isFinished ? () => claim(0) : onPresentContributeModal}
      />
      {(isFinished) ?

        <>
        <LabelButton
        disabled={pendingTx || harvestedPeriod.period2}
        buttonLabel={isFinished ? 'Claim Second' : 'Contribute'}
        label={isFinished ? 'Your tokens to claim' : `Your contribution (${currency})`}
        value={
          // eslint-disable-next-line no-nested-ternary
          isFinished
            ? harvestedPeriod.period2
              ? 'Claimed'
              : getBalanceNumber(offeringTokenBalance, tokenDecimals).toFixed(4)
            : getBalanceNumber(new BigNumber(userInfo.amount)).toFixed(4)
        }
        onClick={isFinished ? () => claim(1) : onPresentContributeModal}
      />
          <LabelButton
        disabled={pendingTx || harvestedPeriod.period3}
        buttonLabel={isFinished ? 'Claim Third' : 'Contribute'}
        label={isFinished ? 'Your tokens to claim' : `Your contribution (${currency})`}
        value={
          // eslint-disable-next-line no-nested-ternary
          isFinished
            ? harvestedPeriod.period3
              ? 'Claimed'
              : getBalanceNumber(offeringTokenBalance, tokenDecimals).toFixed(4)
            : getBalanceNumber(new BigNumber(userInfo.amount)).toFixed(4)
        }
        onClick={isFinished ? () => claim(2) : onPresentContributeModal}
      />
          <LabelButton
        disabled={pendingTx || harvestedPeriod.period4}
        buttonLabel={isFinished ? 'Claim Fourth' : 'Contribute'}
        label={isFinished ? 'Your tokens to claim' : `Your contribution (${currency})`}
        value={
          // eslint-disable-next-line no-nested-ternary
          isFinished
            ? harvestedPeriod.period4
              ? 'Claimed'
              : getBalanceNumber(offeringTokenBalance, tokenDecimals).toFixed(4)
            : getBalanceNumber(new BigNumber(userInfo.amount)).toFixed(4)
        }
        onClick={isFinished ? () => claim(3) : onPresentContributeModal}
      />
        </>
        : null

      }

      <Text fontSize="14px" color="textSubtle">
        {isFinished
          ? `You'll be refunded any excess tokens when you claim`
          : `${percentOfUserContribution.toFixed(5)}% of total`}
      </Text>
    </>
  )
}

export default IfoCardContribute
