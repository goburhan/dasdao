import { Flex, Text } from '@macist-m/robinia-uikit'
import Container from 'components/layout/Container'
import React, { Component } from 'react'
import styled from 'styled-components'
import buttonbg from './line.svg'

const Product = styled.div`
  border-radius: 25px;
  text-align: center;
`

const Title = styled.text`
  font-size: 32px;
  color: #fff;
`
const Values = styled.div`
  display: flex;
  flex-wrap:wrap;

`

const Box = styled.div`
  border: 20px solid transparent;
  border-image: url(${buttonbg}) 20 stretch;
  padding: 35px;
  max-width: 290px;
  min-width:220px;
  height: 340px;
  line-height: 1.8;
  margin-left: 10px;
  margin-top:25px;

  @media (max-width: 768px) {
   
    margin: 0 0 0 80px ;
  }
  @media (max-width: 992px) {
   
    margin: 10px 0 0 80px ;
  }

  img {
    margin-left: 35%;
  }
`
const objects = [
  {
    name: 'autowst',
    title: 'Auto WST(3,3)',
    text: ' DasdaoSwap provides the best APY to users through Auto-Compounding system.',
  },
  {
    name: 'calloption',
    title: 'Call Option',
    text: 'DasdaoSwap provides the best APY to users through Auto-Compounding system.',
  },
  {
    name: 'treasury',
    title: 'Treasury Fund',
    text:
      'Treasury Fund designed to maintain the value of WST. It activates the Buy-Burn system using the.',
  },
  {
    name: 'deflation',
    title: 'Deflation Model',
    text:
      'DasdaoSwap has more than 6 Deflation Models to control inflation. The deflation model allow.',
  },
]

export default function Products() {
  return (
    <Product>
      <Title color="white">
        Launch Your Project on Dasdao Now <br /> <br />
      </Title>

      <Text color="white" fontSize="24px">
        DasdaoSwap supports multiple blockchains through a cross-chain bridge. If you
        would like to grow with DasdaoSwap please feel free to apply for our partnership
        program.
      </Text>

      <Values>
        {objects.map((item, index) => (
          <Box>
            <img src={`/images/${item.name}.svg`} alt="rr" />
            <Title color="white">{item.title}</Title>
            <Text color="white" fontSize="16px">
              {item.text}
            </Text>
          </Box>
        ))}
      </Values>
    </Product>
  )
}
