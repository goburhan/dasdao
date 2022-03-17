import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal } from '@macist-m/robinia-uikit'
import ModalActions from 'components/ModalActions'
import Label from 'components/Label'
import TokenInput from '../../../components/TokenInput'
import useI18n from '../../../hooks/useI18n'
import { getFullDisplayBalance, getBasePoint } from '../../../utils/formatBalance'

interface WithdrawModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  withdrawalFeeLevels? : BigNumber[]
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onConfirm, onDismiss, max, withdrawalFeeLevels, tokenName = '' }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const withdrawFees = withdrawalFeeLevels.map((f,index) => {
    let bn = 0
    console.log(f)
    if(index === 0) {
      bn = 28800
    } else if (index === 1) {
      bn = 57600
    } else if (index === 2) {
      bn = 86400
    }
    return {
          fee : `${f.toNumber() / 100} %`,
          blockNumber : bn
    }
  })
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal title={`Withdraw ${tokenName}`} onDismiss={onDismiss}>
    <Label text={`Withdrawing before 28800 blocks (1 day) : ${withdrawFees[0].fee}`} />
    <Label text={`Withdrawing after 28800 to 57600 blocks (2 days) : ${withdrawFees[1].fee}`} />
    <Label text={`Withdrawing after 57600 to 86400 blocks (3 days) : ${withdrawFees[2].fee}`} />
    <Label text='Withdrawing after 86400 blocks (3 days) : 0 %' />
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
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
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
