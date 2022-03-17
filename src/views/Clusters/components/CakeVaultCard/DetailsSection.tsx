import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from '@macist-m/robinia-uikit'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { Address } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import ApyButton from './ApyButton'

export interface ExpandableSectionProps {
  isTokenOnly?: boolean
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  tokenAddresses: Address
  apr?:string
  cakePrice?:BigNumber
  apy?:any
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  isTokenOnly,
  bscScanAddress,
  removed,
  totalValueFormated,
  lpLabel,
  quoteTokenAdresses,
  quoteTokenSymbol,
  tokenAddresses,
  apr,
  cakePrice,
  apy
}) => {
  const TranslateString = useI18n()
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })

  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text>{TranslateString(316, 'Stake')}:</Text>
        <StyledLinkExternal
          href={
            isTokenOnly
              ? `https://pancakeswap.finance/swap/${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
              : `https://pancakeswap.finance/add/${liquidityUrlPathParts}`
          }
        >
          {lpLabel}
        </StyledLinkExternal>
      </Flex>
      {!removed && (
        <Flex justifyContent="space-between">
          <Text>{TranslateString(23, 'Total Liquidity')}:</Text>
          <Text>{totalValueFormated}</Text>
        </Flex>
      )}
      <Flex justifyContent="flex-start">
        <Link external href={bscScanAddress} bold={false}>
          {TranslateString(356, 'View on BscScan')}
        </Link>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>{TranslateString(352, 'APR')}:</Text>
        <Flex alignItems="center">
       {/* <ApyButton
                lpLabel={lpLabel}
                quoteTokenAdresses={quoteTokenAdresses}
                quoteTokenSymbol={quoteTokenSymbol}
                tokenAddresses={tokenAddresses}
                cakePrice={cakePrice}
                apy={apy}
              /> */}
        <Text>{apr}%</Text>
        </Flex>

      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
