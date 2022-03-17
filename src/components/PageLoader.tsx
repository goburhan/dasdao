import React from 'react'
import styled from 'styled-components'
import { Spinner } from '@macist-m/robinia-uikit'
import Page from './layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    </Wrapper>
  )
}

export default PageLoader
