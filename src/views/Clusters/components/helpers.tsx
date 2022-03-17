import BigNumber from 'bignumber.js'
import { BIG_TEN } from 'utils/bigNumber'
// import { DeserializedPool } from 'state/types'
// import { getApy } from 'utils/compoundApyHelpers'
import { getBalanceNumber, getFullDisplayBalance} from 'utils/formatBalance'

export const getDecimalAmount = (amount: BigNumber, decimals = 18) => {
    return new BigNumber(amount).times(BIG_TEN.pow(decimals))
  }
export const convertSharesToCake = (
  shares: BigNumber,
  cakePerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(cakePerFullShare, decimals)
  const amountInCake = new BigNumber(shares.multipliedBy(sharePriceNumber))
  const cakeAsNumberBalance = getBalanceNumber(amountInCake, decimals)
  const cakeAsBigNumber = getDecimalAmount(new BigNumber(cakeAsNumberBalance), decimals)
  const cakeAsDisplayBalance = getFullDisplayBalance(amountInCake, decimals)
  return { cakeAsNumberBalance, cakeAsBigNumber, cakeAsDisplayBalance }
}

export const convertCakeToShares = (
  cake: BigNumber,
  cakePerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(cakePerFullShare, decimals)
  const amountInShares = new BigNumber(cake.dividedBy(sharePriceNumber))
  const sharesAsNumberBalance = getBalanceNumber(amountInShares, decimals)
  const sharesAsBigNumber = getDecimalAmount(new BigNumber(sharesAsNumberBalance), decimals)
  const sharesAsDisplayBalance = getFullDisplayBalance(amountInShares, decimals)
  return { sharesAsNumberBalance, sharesAsBigNumber, sharesAsDisplayBalance }
}

const AUTO_VAULT_COMPOUND_FREQUENCY = 24
const MANUAL_POOL_AUTO_COMPOUND_FREQUENCY = 0

//  export const getAprData = (pool: DeserializedPool, performanceFee: number) => {
//    const { isAutoVault, apr } = pool

//     //  Estimate & manual for now. 288 = once every 5 mins. We can change once we have a better sense of this
//    const autoCompoundFrequency = isAutoVault ? AUTO_VAULT_COMPOUND_FREQUENCY : MANUAL_POOL_AUTO_COMPOUND_FREQUENCY

//    if (isAutoVault) {
//      const autoApr = getApy(apr, AUTO_VAULT_COMPOUND_FREQUENCY, 365, performanceFee) * 100
//      return { apr: autoApr, autoCompoundFrequency }
//    }
//    return { apr, autoCompoundFrequency }
//  }
 export const getAutoAprData = (apr: number, performanceFee: number) => {

    // console.log(apr)
    // console.log(performanceFee)
   //  Estimate & manual for now. 288 = once every 5 mins. We can change once we have a better sense of this
    const autoCompoundFrequency = AUTO_VAULT_COMPOUND_FREQUENCY
    const autoApr = getApy(apr, AUTO_VAULT_COMPOUND_FREQUENCY, 365, performanceFee) * 100
    const autoApr1 = getApy(apr, AUTO_VAULT_COMPOUND_FREQUENCY, 1, performanceFee) * 100
    const autoApr7 = getApy(apr, AUTO_VAULT_COMPOUND_FREQUENCY, 7, performanceFee) * 100
    const autoApr30 = getApy(apr, AUTO_VAULT_COMPOUND_FREQUENCY, 30, performanceFee) * 100
    return { apr: autoApr, autoCompoundFrequency ,autoApr1,autoApr7,autoApr30}


}
export const getAutoAprDataWithDay = (apr: number, performanceFee: number,day: number) => {

  // console.log(apr)
  // console.log(performanceFee)
 //  Estimate & manual for now. 288 = once every 5 mins. We can change once we have a better sense of this
  const autoCompoundFrequency = AUTO_VAULT_COMPOUND_FREQUENCY
  const autoApr = getApy(apr, AUTO_VAULT_COMPOUND_FREQUENCY, day, performanceFee) * 100
  return { apr: autoApr, autoCompoundFrequency }


}
export const getApy = (apr: number, compoundFrequency = 1, days = 365, performanceFee = 0) => {
  const daysAsDecimalOfYear = days / 365
  const aprAsDecimal = apr / 100

  const timesCompounded = 365 * compoundFrequency
  let apyAsDecimal = (apr / 100) * daysAsDecimalOfYear
  if (timesCompounded > 0) {
    apyAsDecimal = (1 + (aprAsDecimal / timesCompounded)) ** (timesCompounded * daysAsDecimalOfYear) - 1
  }
  if (performanceFee) {

    const performanceFeeAsDecimal = performanceFee / 10000
    const takenAsPerformanceFee = apyAsDecimal * performanceFeeAsDecimal
    apyAsDecimal -= takenAsPerformanceFee
  }
  if(apyAsDecimal < 0){
    apyAsDecimal*=-1
  }
  return apyAsDecimal
}
export const getCakeVaultEarnings = (
  account: string,
  cakeAtLastUserAction: BigNumber,
  userShares: BigNumber,
  pricePerFullShare: BigNumber,
  earningTokenPrice: number,
  tokenTaxRate:string,
) => {
  const hasAutoEarnings =
    account && cakeAtLastUserAction && cakeAtLastUserAction.gt(0) && userShares && userShares.gt(0)
  const { cakeAsBigNumber } = convertSharesToCake(userShares, pricePerFullShare)

  const excludeTax = cakeAtLastUserAction
  // if(new BigNumber(tokenTaxRate).toNumber() > 0){
  //   excludeTax = cakeAtLastUserAction.minus(cakeAtLastUserAction.times(new BigNumber(tokenTaxRate).toNumber()/10000))
  // }
  const autoCakeProfit = cakeAsBigNumber.minus(excludeTax)
  // alert(-autoCakeProfit.gte(0))
  const autoCakeToDisplay = autoCakeProfit.gte(0) ? getBalanceNumber(autoCakeProfit, 18) : 0

  // console.log(`cakeAsBigNumber:${cakeAsBigNumber}`)
  // console.log(`cakeAtLastUserAction:${cakeAtLastUserAction}`)
  // console.log(`excludeTax:${excludeTax}`)
  // console.log(`userShares:${userShares}`)
  // console.log(`pricePerFullShare:${pricePerFullShare}`)
  // console.log(`earningTokenPrice:${earningTokenPrice}`)
  // console.log(`autoCakeProfit:${autoCakeProfit}`)

  // console.log(`autoCakeToDisplay:${autoCakeToDisplay}`)
  const autoUsdProfit = autoCakeProfit.times(earningTokenPrice)

  const autoUsdToDisplay = autoUsdProfit.gte(0) ? getBalanceNumber(autoUsdProfit, 18) : 0
  return { hasAutoEarnings, autoCakeToDisplay, autoUsdToDisplay ,cakeAsBigNumber}
}

// export const getPoolBlockInfo = (pool: DeserializedPool, currentBlock: number) => {
//   const { startBlock, endBlock, isFinished } = pool
//   const shouldShowBlockCountdown = Boolean(!isFinished && startBlock && endBlock)
//   const blocksUntilStart = Math.max(startBlock - currentBlock, 0)
//   const blocksRemaining = Math.max(endBlock - currentBlock, 0)
//   const hasPoolStarted = blocksUntilStart === 0 && blocksRemaining > 0
//   const blocksToDisplay = hasPoolStarted ? blocksRemaining : blocksUntilStart
//   return { shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay }
// }
