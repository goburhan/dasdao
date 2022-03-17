/* eslint-disable no-param-reassign */
import { createSlice,createAsyncThunk,PayloadAction} from '@reduxjs/toolkit'
import farmsConfig from 'config/constants/farms'
import fetchFarms from './fetchFarms'
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
} from './fetchFarmUser'
import { fetchPublicVaultData, fetchVaultFees } from './fetchVaultPublic'
import fetchVaultUser from './fetchVaultUser'
import { FarmsState, Farm ,CakeVault,VaultFees,VaultUser} from '../types'

const initialState: FarmsState = { data: [...farmsConfig],
  userDataLoaded: false
  ,
  cakeVault: {
    totalShares: null,
    pricePerFullShare: null,
    totalRobiniaInVault: null,
    estimatedRobiniaBountyReward: null,
    totalPendingRobiniaHarvest: null,
    tokenTaxRate:null,
    fees: {
      performanceFee: null,
      callFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    },
    userData: {
      isLoading: true,
      userShares: null,
      robiniaAtLastUserAction: null,
      lastDepositedTime: null,
      lastUserActionTime: null,
    },
  },
}
export const fetchFarmsPublicDataAsync = () => async (dispatch) => {
  const farms = await fetchFarms()
  dispatch(setFarmsPublicData(farms))
}
export const fetchFarmUserDataAsync = (account) => async (dispatch) => {
  const userFarmAllowances = await fetchFarmUserAllowances(account)
  const userFarmTokenBalances = await fetchFarmUserTokenBalances(account)
  const userStakedBalances = await fetchFarmUserStakedBalances(account)
  const userFarmEarnings = await fetchFarmUserEarnings(account)

  const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
    return {
      index,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],
    }
  })

  dispatch(setFarmUserData({ arrayOfUserDataObjects }))
}
export const fetchCakeVaultPublicData = createAsyncThunk<CakeVault>('cakeVault/fetchPublicData', async () => {

  const publicVaultInfo = await fetchPublicVaultData()
  return publicVaultInfo
})

export const fetchCakeVaultFees = createAsyncThunk<VaultFees>('cakeVault/fetchFees', async () => {
  const vaultFees = await fetchVaultFees()
  return vaultFees
})

export const fetchCakeVaultUserData = createAsyncThunk<VaultUser, { account: string }>(
  'cakeVault/fetchUser',
  async ({ account }) => {
    const userData = await fetchVaultUser(account)
    console.log(userData)
    return userData
  },
)
export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setFarmsPublicData: (state, action) => {
      const liveFarmsData: Farm[] = action.payload
      state.data = state.data.map((farm) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === farm.pid)
        return { ...farm, ...liveFarmData }
      })
    },
    setFarmUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
    updateFarmsUserData: (state, action) => {
      const { field, value, pid } = action.payload
      const index = state.data.findIndex((p) => p.pid === pid)

      if (index >= 0) {
        state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
      }
    },
  },
  extraReducers: (builder) => {
    // Vault public data that updates frequently
    builder.addCase(fetchCakeVaultPublicData.fulfilled, (state, action: PayloadAction<CakeVault>) => {
      state.cakeVault = { ...state.cakeVault, ...action.payload }
    })
    // Vault fees
    builder.addCase(fetchCakeVaultFees.fulfilled, (state, action: PayloadAction<VaultFees>) => {
      const fees = action.payload
      state.cakeVault = { ...state.cakeVault, fees }
    })
    // Vault user data
    builder.addCase(fetchCakeVaultUserData.fulfilled, (state, action: PayloadAction<VaultUser>) => {
      const userData = action.payload
      userData.isLoading = false
      state.cakeVault = { ...state.cakeVault, userData }
    })
  },
})

// Actions
export const { setFarmsPublicData, setFarmUserData ,} = farmsSlice.actions

// Thunks


export default farmsSlice.reducer
