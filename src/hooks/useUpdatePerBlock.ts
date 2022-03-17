

import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { updatePerBlock} from 'utils/callHelpers'
import { useMasterchef, useSousChef } from './useContract'

const useUpdatePerBlock = (perBlock: number) => {

    const { account } = useWallet()
    const masterChefContract = useMasterchef()

    const handlePerBlock = useCallback(
      async () => {
        const txHash = await updatePerBlock(masterChefContract, perBlock, account)
        console.log(txHash)

      },
      [account, masterChefContract, perBlock],
    )

    return { onUpdatePerBlock: handlePerBlock  }
  }




export default useUpdatePerBlock
