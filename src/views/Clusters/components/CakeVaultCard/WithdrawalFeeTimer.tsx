import React from 'react'
import { Text } from '@macist-m/robinia-uikit'
import getTimePeriods from 'utils/getTimePeriods'


const WithdrawalFeeTimer: React.FC<{ secondsRemaining: number }> = ({ secondsRemaining }) => {

  const { days, hours, minutes } = getTimePeriods(secondsRemaining)

  return <Text  fontSize="10px" color="secondary">{`${days} days ${hours} hour ${minutes} minutes`}</Text>
}

export default WithdrawalFeeTimer
