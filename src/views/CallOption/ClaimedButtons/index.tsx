import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Text, Toggle } from '@macist-m/robinia-uikit'
import useI18n from 'hooks/useI18n'

const ClaimButton = ({ claimedOnly, setClaimedOnly }) => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <Wrapper>
      
      <ButtonMenu  activeIndex={isExact ? 0 : 1} size="sm"  variant="subtle">
        <ButtonMenuItem className='mr-4' as={Link} to={`${url}`}>
          {TranslateString(10006, 'Claimable')}
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to={`${url}/history`}>
          {TranslateString(10007, 'Claimed')}
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default ClaimButton

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`


const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;

  ${Text} {
    margin-left: 12px;
  }
`
