import React from 'react'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from '@macist-m/robinia-uikit'
import Chart from './Chart'


interface ChartModalProps {
  onDismiss?: () => void
  title:string,
  desc:string,
  data:any,
  prefix?:string
  dataKey:string
  currentValue?:string
}

const ChartAreaContainer = styled.div`
      width:100%;
      height:160px;
      min-width:640px;
      @media only screen and (max-width: 762px) {
        min-width:100%;
      }
`
const DescArea = styled.div`
  max-width:662px;
  padding:16px;
  border-radius:16px;
  width:100%;
  background-color:#1d2346ad;
  margin-top:16px;


`


const ChartModal: React.FC<ChartModalProps> = ({
  onDismiss,
   title,
   desc,
   data,
   prefix,
   dataKey,
   currentValue
}) => {


  return (
    <Modal title={title} onDismiss={onDismiss}>
        <Flex marginBottom={3} alignItems="center">
        <Text color='#fff' fontSize='30px' bold style={{opacity:"1",lineHeight:1,verticalAlign:"middle"}}>
        {prefix+currentValue}
        </Text>
        <Text  color='#8aa3fd' fontSize='17px' bold style={{opacity:"1",lineHeight:1,verticalAlign:"middle",marginLeft:"16px"}}>
        Now
        </Text>
        </Flex>
      <ChartAreaContainer>
        <Chart currentValue={currentValue} dataKey={dataKey} prefix={prefix}  data={data} />
      </ChartAreaContainer>
      <DescArea>
      <Text>{desc}</Text>
      </DescArea>

    </Modal>
  )
}

export default ChartModal
