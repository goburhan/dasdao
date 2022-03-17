import styled from 'styled-components'

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1280px;
  padding-left: 6px;
  padding-right: 6px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

export default Container
