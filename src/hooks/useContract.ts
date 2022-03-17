import { useEffect, useState } from 'react'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import useWeb3 from 'hooks/useWeb3'
import { getMasterChefAddress, getCakeAddress, getLotteryAddress, getLotteryTicketAddress, getDelegateContractAddress ,getCakeVaultAddress, getLockedSaleAddress, getRbsTokenAddress, getBusdAddress} from 'utils/addressHelpers'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'
import ifo from 'config/abi/ifo.json'
import erc20 from 'config/abi/erc20.json'
import rabbitmintingfarm from 'config/abi/rabbitmintingfarm.json'
import pancakeRabbits from 'config/abi/pancakeRabbits.json'
import lottery from 'config/abi/lottery.json'
import lotteryTicket from 'config/abi/lotteryNft.json'
import masterChef from 'config/abi/masterchef.json'
import delegate from 'config/abi/delegate.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import delegateFarm from 'config/abi/delegateFarm.json'
import lockedsale from 'config/abi/lockedsale.json'
import lPdelegateFarm from 'config/abi/lPdelegateFarm.json'
import cakeVault from 'config/abi/cakeVault.json'
import cluster from 'config/abi/cluster.json'

const useContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions) => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address, contractOptions))

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
}

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoContract = (address: string) => {
  const ifoAbi = (ifo as unknown) as AbiItem
  return useContract(ifoAbi, address)
}

export const useERC20 = (address: string) => {
  const erc20Abi = (erc20 as unknown) as AbiItem
  return useContract(erc20Abi, address)
}

export const useCake = () => {
  return useERC20(getCakeAddress())
}

export const useRabbitMintingFarm = (address: string) => {
  const rabbitMintingFarmAbi = (rabbitmintingfarm as unknown) as AbiItem
  return useContract(rabbitMintingFarmAbi, address)
}

export const usePancakeRabbits = (address: string) => {
  const pancakeRabbitsAbi = (pancakeRabbits as unknown) as AbiItem
  return useContract(pancakeRabbitsAbi, address)
}

export const useLottery = () => {
  const abi = (lottery as unknown) as AbiItem
  return useContract(abi, getLotteryAddress())
}

export const useLotteryTicket = () => {
  const abi = (lotteryTicket as unknown) as AbiItem
  return useContract(abi, getLotteryTicketAddress())
}

export const useMasterchef = () => {
  const abi = (masterChef as unknown) as AbiItem
  return useContract(abi, getMasterChefAddress())
}
export const useCluster = (address) => {
  const abi = (cluster as unknown) as AbiItem
  return useContract(abi, address)
}
export const useDelegateContract = () => {
  const abi = (delegate as unknown) as AbiItem
  return useContract(abi, getDelegateContractAddress())
}

export const useSousChef = (id) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const rawAbi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  const abi = (rawAbi as unknown) as AbiItem
  return useContract(abi, config.contractAddress[process.env.REACT_APP_CHAIN_ID])
}

export const useDelegateFarmContract = (address: string) => {
  const delegateFarmAbi = (delegateFarm as unknown) as AbiItem
  return useContract(delegateFarmAbi, address)
}
export const useLpDelegateFarmContract = (address: string) => {
  const lPdelegateFarmAbi = (lPdelegateFarm as unknown) as AbiItem
  return useContract(lPdelegateFarmAbi, address)
}
export const useCakeVaultContract = () => {
  const cakeVaultAbi = (cakeVault as unknown) as AbiItem
  return useContract(cakeVaultAbi, getCakeVaultAddress())
}

export const useLockedSale = (address : string) => {
  const abi = (lockedsale as unknown) as AbiItem
  return useContract(abi, getLockedSaleAddress())
}


export const useRbs = () => {
  return useERC20(getRbsTokenAddress())
}
export const useBusd = () => {
  return useERC20(getBusdAddress())
}
export const useTokenContract = (address) => {
  return useERC20(address)
}

export default useContract
