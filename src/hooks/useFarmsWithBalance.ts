import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import multicall from 'utils/multicall'
import { getMasterChefAddress } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/masterchef.json'
import { autoFarmStaked, userAutoFarmStakes, autoFarmPending, autoFarmTotalShares, autoFarmTotalBalance } from 'utils/callHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { farmsConfig } from 'config/constants'
import { FarmConfig } from 'config/constants/types'
import useRefresh from './useRefresh'
import { useCluster } from './useContract'

export interface FarmWithBalance extends FarmConfig {
  balance: BigNumber
}

const useFarmsWithBalance = () => {
  const [farmsWithBalances, setFarmsWithBalances] = useState<FarmWithBalance[]>([])
  const { account } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalances = async () => {
      const calls = farmsConfig.map((farm) => ({
        address: getMasterChefAddress(),
        name: 'pendingBuzz',
        params: [farm.pid, account],
      }))

      const rawResults = await multicall(masterChefABI, calls)
      const results = farmsConfig.map((farm, index) => ({ ...farm, balance: new BigNumber(rawResults[index]) }))

      setFarmsWithBalances(results)
    }

    if (account) {
      fetchBalances()
    }
  }, [account, fastRefresh])

  return farmsWithBalances
}
export const useClusterBalance = (contract) => {
  const [clusterBalance, setClusterBalance] = useState(new BigNumber(0))
  const { account } = useWallet()
  const { fastRefresh } = useRefresh()
    const cluster = useCluster(contract)

  useEffect(() => {
    const fetchBalances = async () => {

      const _balance = await userAutoFarmStakes(cluster,account);
      const pending = await autoFarmPending(cluster)
      const totalShares = await autoFarmTotalShares(cluster)
      const shares = _balance.shares;
      console.log(`Share : ${shares.toString()}`)
      const sharePrice = new BigNumber(pending).times(new BigNumber(10).pow(18)).dividedBy(new BigNumber(totalShares))

      const userBal = new BigNumber(shares).times(getBalanceNumber(new BigNumber(sharePrice)))
      setClusterBalance(userBal);
    }

    if (account) {
      fetchBalances()
    }
  }, [account, fastRefresh, cluster])

  return clusterBalance
}
export default useFarmsWithBalance
