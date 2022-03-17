import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import {
  fetchFarmUserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
  updateUserPendingReward,
  fetchCakeVaultUserData,
} from 'state/actions'
import { unstake, sousUnstake,sousLPUnstake,sousEmegencyUnstake,unstakevault ,unstakecluster} from 'utils/callHelpers'
import { useMasterchef, useSousChef ,useLpDelegateFarmContract,useCakeVaultContract, useCluster} from './useContract'

const useUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

const SYRUPIDS = [5, 6, 3, 1, 22, 23]

export const useSousUnstake = (sousId) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)
  const isOldSyrup = SYRUPIDS.includes(sousId)

  const handleUnstake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        const txHash = await unstake(masterChefContract, 0, amount, account)
        console.info(txHash)
      } else if (isOldSyrup) {
        const txHash = await sousEmegencyUnstake(sousChefContract, amount, account)
        console.info(txHash)
      } else {
        const txHash = await sousUnstake(sousChefContract, amount, account)
        console.info(txHash)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
      dispatch(updateUserPendingReward(sousId, account))
    },
    [account, dispatch, isOldSyrup, masterChefContract, sousChefContract, sousId],
  )

  return { onUnstake: handleUnstake }
}
export const useSousLPUnstake = (pid,contractAddres,sousId) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()
  const sousChefContract = useLpDelegateFarmContract(contractAddres)
  const isOldSyrup = SYRUPIDS.includes(sousId)

  const handleUnstake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        const txHash = await unstake(masterChefContract, 0, amount, account)
        console.info(txHash)
      } else if (isOldSyrup) {
        const txHash = await sousEmegencyUnstake(sousChefContract, amount, account)
        console.info(txHash)
      } else {
        const txHash = await sousLPUnstake(sousChefContract, pid, amount, account)
        console.info(txHash)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
      dispatch(updateUserPendingReward(sousId, account))
    },
    [account, dispatch, isOldSyrup, masterChefContract, sousChefContract, sousId ,pid],
  )

  return { onLpUnstake: handleUnstake }
}
export const useVaultUnstake = () => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const cakeVaultContract = useCakeVaultContract()

  const handleVaultUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstakevault(cakeVaultContract, amount, account)
      dispatch(fetchCakeVaultUserData({account}))
      console.info(txHash)
    },
    [account, dispatch, cakeVaultContract],
  )

  return { handleVaultUnstake }
}
export const useClusterUnstake = (address) => {
  // const dispatch = useDispatch()
  const { account } = useWallet()
  const cakeClusterContract = useCluster(address)

  const handleClusterUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstakecluster(cakeClusterContract, amount, account)
      // dispatch(fetchCakeClusterUserData({account}))
      console.info(txHash)
    },
    [account, cakeClusterContract],
  )

  return { handleClusterUnstake }
}
export default useUnstake
