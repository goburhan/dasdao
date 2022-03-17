import React from 'react'

import styled from 'styled-components'
import MainFooter from 'components/Partials/MainFooter'
import Container from './Container'

const PageWrapper = styled(Container)`
  min-height: calc(100vh - 88px);
  padding-top: 16px;
  padding-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`

type Props = {
  title?: string,
}

const Page: React.FC<Props> = ({ title, children }) => (
  <PageWrapper>
    {children}
    <MainFooter />
  </PageWrapper>
)

export default Page
