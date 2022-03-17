import { useCallback ,useState ,useEffect ,useRef} from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { updateUserAllowance, fetchFarmUserDataAsync } from 'state/actions'
import { approve, approveWithAddress } from 'utils/callHelpers'
import {getCakeVaultAddress} from 'utils/addressHelpers'
import { useMasterchef, useCake, useSousChef, useLottery, useDelegateFarmContract,useCakeVaultContract } from './useContract'
// import BigNumber from 'bignumber.js'


/**
 * Returns the previous value of the given value
 *
 * @see https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 */
export const usePreviousValue = (value: any) => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}


export const useLastUpdated = () => {
  const [lastUpdated, setStateLastUpdated] = useState(Date.now())
  const previousLastUpdated = usePreviousValue(lastUpdated)

  const setLastUpdated = useCallback(() => {
    setStateLastUpdated(Date.now())
  }, [setStateLastUpdated])

  return { lastUpdated, previousLastUpdated, setLastUpdated }
}


// Approve a Farm
export const useApprove = (lpContract: Contract) => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const masterChefContract = useMasterchef()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      dispatch(fetchFarmUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

// Approve a Pool
export const useSousApprove = (lpContract: Contract, sousId) => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const sousChefContract = useSousChef(sousId)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, sousChefContract, account)
      dispatch(updateUserAllowance(sousId, account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, sousChefContract, sousId])

  return { onApprove: handleApprove }
}

// lpContract olarak approve verilecek tokenin adresi gelmeli
export const usePoolApprove = (lpContract : Contract, delegateFarm: string, poolId) => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const delegateFarmContract = useDelegateFarmContract(delegateFarm);

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approveWithAddress(lpContract, delegateFarm, account)
      dispatch(updateUserAllowance(poolId,account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, delegateFarm, poolId])

  return { onApprove : handleApprove}
}

// Approve the lottery
export const useLotteryApprove = () => {
  const { account }: { account: string } = useWallet()
  const cakeContract = useCake()
  const lotteryContract = useLottery()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(cakeContract, lotteryContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, cakeContract, lotteryContract])

  return { onApprove: handleApprove }
}

// Approve an IFO
export const useIfoApprove = (tokenContract: Contract, spenderAddress: string) => {
  const { account } = useWallet()
  const onApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.methods
        .approve(spenderAddress, ethers.constants.MaxUint256)
        .send({ from: account })
      return tx
    } catch {
      return false
    }
  }, [account, spenderAddress, tokenContract])

  return onApprove
}

// // Approve CAKE auto pool
// export const useVaultApprove = () => {
//   // const [requestedApproval, setRequestedApproval] = useState(false)
//   // const cakeVaultContract = useCakeVaultContract()
//   // const { callWithGasPrice } = useCallWithGasPrice()
//   const cakeContract = useCake()


//   const handleVaultApprove =useCallback(async () => {
//     // alert("üf")
//     const cakeVaultAddress = getCakeVaultAddress()
//     // const tx = await callWithGasPrice(cakeContract, 'approve', [cakeVaultContract.methods.address, ethers.constants.MaxUint256])
//     const tx = await cakeContract.methods.approve(cakeVaultAddress,ethers.constants.MaxUint256)
//     // setRequestedApproval(true)
//     const receipt = await tx.wait()
//     if (receipt.status) {
//       alert("Contract Enabled")
//       // toastSuccess(t('Contract Enabled'), t('You can now stake in the %symbol% vault!', { symbol: 'CAKE' }))
//       // setLastUpdated()
//       // setRequestedApproval(false)
//     } else {
//       alert("Please try again. Confirm the transaction and make sure you are paying enough gas!")
//       // toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
//       // setRequestedApproval(false)
//     }
//   }

//   return  {handleVaultApprove}
//   )
// }
export const useVaultApprove = () => {
  const { account } = useWallet()
  const cakeContract = useCake()
  const dispatch = useDispatch()
  const cakeVaultAddress = getCakeVaultAddress()
  const handleVaultApprove = useCallback(async () => {
    try {
      const tx = await cakeContract.methods
        .approve(cakeVaultAddress, ethers.constants.MaxUint256)
        .send({ from: account })
        dispatch(fetchFarmUserDataAsync(account))
      return tx
    } catch {
      return false
    }
  }, [account, cakeVaultAddress, cakeContract,dispatch])

  return {handleVaultApprove}
}
export const useCheckVaultApprovalStatus = () => {
  const [isVaultApproved, setIsVaultApproved] = useState(false)
  const { account } = useWallet()
  const cakeContract = useCake()
  const cakeVaultAddress = getCakeVaultAddress()
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const response = await cakeContract.methods.allowance(account, cakeVaultAddress).call()
        const currentAllowance = new BigNumber(response.toString())
        // console.log(currentAllowance)
        setIsVaultApproved(currentAllowance.gt(0))
      } catch (error) {
        setIsVaultApproved(false)
      }
    }

    checkApprovalStatus()
  }, [account, cakeContract, cakeVaultAddress, lastUpdated])
  return { isVaultApproved, setLastUpdated }
}
export const useClusterApprove = (address) => {
  const { account } = useWallet()
  const dispatch = useDispatch()
  const cakeContract = useCake()
  const cakeClusterAddress = address
  const handleClusterApprove = useCallback(async () => {
    try {
      const tx = await cakeContract.methods
        .approve(cakeClusterAddress, ethers.constants.MaxUint256)
        .send({ from: account })
        dispatch(fetchFarmUserDataAsync(account))
      return tx
    } catch {
      return false
    }
  }, [account, cakeClusterAddress, cakeContract,dispatch])

  return {handleClusterApprove}
}
export const useCheckClusterApprovalStatus = (address) => {
  const [isClusterApproved, setIsClusterApproved] = useState(false)
  const { account } = useWallet()
  const cakeContract = useCake()
  const cakeClusterAddress = address
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const response = await cakeContract.methods.allowance(account, cakeClusterAddress).call()
        const currentAllowance = new BigNumber(response.toString())
        // console.log(currentAllowance)
        setIsClusterApproved(currentAllowance.gt(0))
      } catch (error) {
        setIsClusterApproved(false)
      }
    }

    checkApprovalStatus()
  }, [account, cakeContract, cakeClusterAddress, lastUpdated])
  return { isClusterApproved, setLastUpdated }
}
