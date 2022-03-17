import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal } from '@macist-m/robinia-uikit'
import ModalActions from 'components/ModalActions'
import TokenInput from 'components/TokenInput'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'
import{ convertCakeToShares,getDecimalAmount}  from '../../helpers'

interface WithdrawModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  isAutoVault?:boolean
  pricePerFullShare?:BigNumber
  userShares?:BigNumber
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onConfirm, onDismiss, max, tokenName = '' ,isAutoVault,pricePerFullShare,userShares}) => {
  const [val, setVal] = useState('')
  const [shareValue,setSharesVal] =useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
      getDecimalAmount(new BigNumber(e.currentTarget.value), 18)
      const {sharesAsBigNumber}= convertCakeToShares(getDecimalAmount(new BigNumber(e.currentTarget.value), 18),pricePerFullShare)

      setSharesVal(sharesAsBigNumber.toNumber().toFixed(0).toString())
    },
    [setVal,setSharesVal,pricePerFullShare],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
    // const {sharesAsBigNumber}= convertCakeToShares(getDecimalAmount(new BigNumber(fullBalance), 18),pricePerFullShare)
    setSharesVal("")
  }, [fullBalance, setVal,setSharesVal])

  return (
    <Modal title={`Withdraw ${tokenName}`} onDismiss={onDismiss}>
      <TokenInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <Button variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button
          disabled={pendingTx || parseFloat(val) <= 0 || val === ""}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm((isAutoVault) ? shareValue : val )
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default WithdrawModal
