import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import { Image } from '@macist-m/robinia-uikit'
import { QuoteToken } from 'config/constants/types'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  bnbPrice?: BigNumber
  ethereum?: provider
  account?: string
}

const TopFarmCard: React.FC<FarmCardProps> = ({ farm, removed, cakePrice, bnbPrice, ethereum, account }) => {
  const farmImage = farm.isTokenOnly
    ? farm.tokenSymbol.toLowerCase()
    : `${farm.tokenSymbol.toLowerCase()}-${farm.quoteTokenSymbol.toLowerCase()}`

  const farmAPY =
    farm.apy &&
    farm.apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [bnbPrice, cakePrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  return (
    <div className="bg-gray-50 mx-1 xs:mx-1 sm:mx-2 rounded-3xl shadow-sm p-5 flex flex-col items-center justify-around">
      <div className="self-end">
        <div className="bg-secondary text-white px-6 py-1 text-sm text-center rounded-3xl">Hot</div>
      </div>
      <Image
        src={`/images/farms/${farmImage}.png`}
        alt={farmImage}
        width={55}
        height={55}
        marginTop="5px"
        marginBottom="15px"
      />
      <div className="font-bold text-md mb-2">{farm.lpSymbol}</div>
      <div className="text-gray-400 text-sm mb-1">Liquidity {totalValueFormated}</div>
      <div className="text-primary font-bold text-lg">{farmAPY}% APR</div>
      <Link className="bg-green2 px-16 py-2 rounded-3xl text-white cursor-pointer hover:opacity-75 mt-5" to="/farms">
        Farm
      </Link>
    </div>
  )
}

export default TopFarmCard
