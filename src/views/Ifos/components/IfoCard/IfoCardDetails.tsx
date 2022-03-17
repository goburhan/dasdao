import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, LinkExternal, Link } from '@macist-m/robinia-uikit'
import useI18n from 'hooks/useI18n'

export interface IfoCardDetailsProps {
  launchDate: string
  launchTime: string
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  projectSiteUrl: string
  raisingAmount: BigNumber
  totalAmount: BigNumber
}

const StyledIfoCardDetails = styled.div`
  margin-bottom: 24px;
`

const Item = styled.div`
  align-items: center;
  color: #ffff;
  display: flex;
`

const Display = styled(Text)`
  flex: 1;
  color:#aeaeae;
`

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({
  launchDate,
  launchTime,
  saleAmount,
  raiseAmount,
  cakeToBurn,
  projectSiteUrl,
  raisingAmount,
  totalAmount,
}) => {
  const TranslateString = useI18n()

  return (
    <>
      <StyledIfoCardDetails>
        <Item >
          <Display>{TranslateString(582, 'Launch Time')}</Display>
          <div className='text-white'>
            {launchDate},
            <Link
              href="https://www.timeanddate.com/worldclock/singapore/singapore"
              target="blank"
              rel="noopener noreferrer"
              ml="4px"
              style={{ display: 'inline' , color:"white"}}
            >
              {launchTime}
            </Link>
          </div>
        </Item>
        <Item>
          <Display>{TranslateString(584, 'For Sale')}</Display>
          <div>{saleAmount}</div>
        </Item>
        <Item>
          <Display>{TranslateString(999, 'To raise (USD)')}</Display>
          <div className='text-white'>{raiseAmount}</div>
        </Item>
        <Item>
          <Display>{TranslateString(586, 'RBS to burn (USD)')}</Display>
          <div>{cakeToBurn}</div>
        </Item>
        <Item>
          <Display>{TranslateString(999, 'Total raised (% of target)')}</Display>
          <div>{`${totalAmount.div(raisingAmount).times(100).toFixed(2)}%`}</div>
        </Item>
      </StyledIfoCardDetails>
      <LinkExternal href={projectSiteUrl} style={{ margin: 'auto' ,color:"white" }}>
        {TranslateString(412, 'View project site')}
      </LinkExternal>
    </>
  )
}

export default IfoCardDetails
