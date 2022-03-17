import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@macist-m/robinia-uikit'
import Container from 'components/layout/Container'
import useI18n from 'hooks/useI18n'

const Title = styled(Heading).attrs({ as: 'h1'})`
  color: white;
  margin-bottom: 24px;
  font-size:80px;
`

const Blurb = styled(Text)`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`
const Second = styled(Text)`
  color: #ffffff;
  font-size: 50px;
  font-weight: 600;
`
const StyledHero = styled.div`
  padding-bottom: 40px;
  padding-top: 40px;
  margin-bottom: 32px;
`
const Hero = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>
      <Container className='mb-48 mt-80'>
        <Title>{TranslateString(500, 'IFO')}</Title>
        <Second>{TranslateString(545454, 'Initial Farm Offerin')}</Second>
        <Blurb>{TranslateString(502, 'Buy new tokens with a brand new token sale model.')}</Blurb>
      </Container>
    </StyledHero>
  )
}

export default Hero
