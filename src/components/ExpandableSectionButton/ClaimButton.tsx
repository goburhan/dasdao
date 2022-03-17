import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, ChevronUpIcon, Text } from '@macist-m/robinia-uikit'

export interface ExpandableSectionButtonProps {
  onClick?: () => void
  expanded?: boolean
}

const Wrapper = styled.div`
  display: flex;
  justify-content: right;
  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const ExpandableSectionButton: React.FC<ExpandableSectionButtonProps> = ({ onClick, expanded }) => {
  return (
    <Wrapper aria-label="Hide or show expandable content" role="button" onClick={() => onClick()}>
      <Text color="white" bold>
        {expanded ? 'Claim' : 'Claim'}
      </Text>
      {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </Wrapper>
  )
}

ExpandableSectionButton.defaultProps = {
  expanded: false,
}

export default ExpandableSectionButton
