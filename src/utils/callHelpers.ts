import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const approveWithAddress = async (lpContract, spender, account) => {
  return lpContract.methods
    .approve(spender, ethers.constants.MaxUint256)
    .send({ from : account })
}

export const stake = async (masterChefContract, pid, amount, referal, account) => {
  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const stakeDelegateFarm = async (farmContract, amount, account) => {
  return farmContract.methods
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from : account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const stakeLPDelegateFarm = async (farmContract, pid , amount, account) => {
  return farmContract.methods
    .deposit(pid,new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from : account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const updatePerBlock = async (masterChefContract, perBlock, account) => {
  return masterChefContract.methods
    .updateEmissionRate(new BigNumber(perBlock))
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const sousStake = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStakeBnb = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, value: new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousUnstake = async (sousChefContract, amount, account) => {
  // shit code: hard fix for old CTK and BLK
  if (sousChefContract.options.address === '0x3B9B74f48E89Ebd8b45a53444327013a2308A9BC') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  if (sousChefContract.options.address === '0xBb2B66a2c7C2fFFB06EA60BeaD69741b3f5BF831') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  return sousChefContract.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const sousLPUnstake = async (sousChefContract,pid, amount, account) => {
  // shit code: hard fix for old CTK and BLK
  if (sousChefContract.options.address === '0x3B9B74f48E89Ebd8b45a53444327013a2308A9BC') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  if (sousChefContract.options.address === '0xBb2B66a2c7C2fFFB06EA60BeaD69741b3f5BF831') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  return sousChefContract.methods
    .withdraw(pid,new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const sousEmegencyUnstake = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .emergencyWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, referral, account) => {
  return masterChefContract.methods
    .deposit(pid, '0', referral)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvestDelegate = async(contract, account) => {
  return contract.methods
  .harvest()
  .send({from : account})
  .on('transactionHash',(tx) => {
    return tx.transactionHash
  })
}

export const soushHarvest = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit('0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const soushLpHarvest = async (sousChefContract, pid, account) => {
  return sousChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const soushHarvestBnb = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, value: new BigNumber(0) })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const vaultStake = async (cakeVaultContract, amount, account) => {
  return cakeVaultContract.methods
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const unstakevault = async (cakeVaultContract,  amount, account) => {

  if(amount === ""){
    return cakeVaultContract.methods
    .withdrawAll()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
  }
  return cakeVaultContract.methods
    .withdraw(amount)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const clusterStake = async (cakeVaultContract, amount, account) => {
  return cakeVaultContract.methods
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const unstakecluster = async (cakeVaultContract,  amount, account) => {

  if(amount === ""){
    return cakeVaultContract.methods
    .withdrawAll()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
  }
  return cakeVaultContract.methods
    .withdraw(amount)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const userAutoFarmStakes = async(autofarm, account) => {
  return autofarm.methods
  .userInfo(account)
  .call()
}

export const autoFarmPending = async(autofarm) => {
  return autofarm.methods
  .calculateTotalPendingBuzzRewards()
  .call()
}

export const autoFarmTotalShares = async(autofarm) => {
  return autofarm.methods
  .totalShares()
  .call()
}

export const autoFarmStake = async (contract, amount, account) => {
  return contract.methods
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from : account})
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const autoFarmTotalBalance = async (contract) => {
  return contract.methods
  .balanceOf()
  .call()
}

export const autoFarmStaked = async (masterChef, autoFarm, poolId) => {
  return masterChef.methods
  .userInfo(poolId, autoFarm)
  .call()
}