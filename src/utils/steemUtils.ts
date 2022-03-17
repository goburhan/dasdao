import delegate from 'config/abi/delegate.json'
import { AbiItem } from 'web3-utils'
import { createSlice } from '@reduxjs/toolkit'
import { getDelegateContractAddress } from 'utils/addressHelpers'
import DelegateFarms from 'config/constants/delegateFarms'
import BigNumber from 'bignumber.js'
import multicall from 'utils/multicall'
import { getContract, getWeb3 } from 'utils/web3';

export async function sendTransaction(amount,dest,bsc,keychain) {
    return new Promise((resolve,reject) => {
        keychain.requestTransfer('',dest,amount,`fee for ${bsc}`,'STEEM',function(res) {
            resolve(res)
        },false)
    })
}

export async function sendDelegate(from,amount,dest,keychain) {
    return new Promise((resolve,reject) => {
        keychain.requestDelegation(from,dest,amount,'SP',function(res) {
            console.log(res)
            resolve(res)
        })
    })
}

export function toSteem(amount) {
    return `${amount.toFixed(3).replace(',','.')}`
}

export function getDelegateContract(address) {
        const contract = getContract(delegate,address);
        return contract;
}
export const harvest = async (account: string) => {
    const web3 = getWeb3();
    const contract = new web3.eth.Contract((delegate as unknown) as AbiItem,getDelegateContractAddress())
    // const masterChefAdress = getDelegateContractAddress()
    // const contract = getDelegateContract(masterChefAdress)
    await contract.methods.harvest().send({from : account})
}

export const fetchDelegateUserStaked = async (account: string) => {
  const masterChefAdress = getDelegateContractAddress()

  const calls = DelegateFarms.map((farm) => {
    return {
      address: masterChefAdress,
      name: 'userInfo',
      params: [account],
    }
  })

  const rawStakedBalances = await multicall(delegate, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}
