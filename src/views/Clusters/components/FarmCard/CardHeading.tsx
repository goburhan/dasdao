import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image } from '@macist-m/robinia-uikit'
import { AutoStaking, CommunityTag, CoreTag, NoFeeTag, RiskTag } from 'components/Tags'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  risk?: number
  depositFee?: number
  farmImage?: string
  tokenSymbol?: string
  isAutoVault?:boolean
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  farmImage,
  tokenSymbol,
  depositFee,
  isAutoVault,
}) => {


  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <Image src={`/images/farms/${farmImage}.png`} alt={tokenSymbol} width={80} height={80} />
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px" color='white'>{lpLabel}</Heading>
        {(isAutoVault) ?
        <AutoStaking/> :
        <Flex justifyContent="center">
        {depositFee === 0 ? <NoFeeTag /> : null}
        {/* {isCommunityFarm ? <CommunityTag /> : <CoreTag />} */}
        {/* <RiskTag risk={risk} /> */}
        <MultiplierTag variant="primary">{multiplier}</MultiplierTag>
      </Flex>
        }

      </Flex>
    </Wrapper>
  )
}

export default CardHeading
