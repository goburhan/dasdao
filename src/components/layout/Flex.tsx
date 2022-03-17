import styled from 'styled-components'

const FlexLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 90%;
    max-width: 90%;
    width: 100%;
    ${({ theme }) => theme.mediaQueries.xs} {
      min-width: 80%;
      max-width: 80%;
      width: 100%;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      min-width: 40%;
      max-width: 40%;
      width: 100%;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      min-width: 40%;
      max-width: 40%;
      width: 100%;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      min-width: 280px;
      max-width: 30%;
      width: 100%;
    }
    margin: 0 8px;
    margin-bottom: 32px;
  }
`

export default FlexLayout
