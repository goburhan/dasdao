import React from 'react'

import styled from 'styled-components'
import { Text,Flex ,useModal,Skeleton} from '@macist-m/robinia-uikit'
import ChartModal from './ChartModal'
import Chart from './Chart'





export const ChartCardContainer = styled.div`
  display: flex;
  width: calc(50% - 16px);
  border-radius:17px;
  justify-content: center;
  position: relative;
  flex-direction:column;
  @media only screen and (max-width: 982px) {
    width: 100%;
    max-width:762px;
    margin-bottom:16px
  }
`;

const IconContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:${props => props.style ? props.style.border : "6px"};
    width:${props => props.style ? props.style.width : "20px"};
    height:${props => props.style ? props.style.height : "20px"};
    background-color:rgba(255,255,255,0.1);
    backdrop-filter:blur(30px);
    margin-left:${props => props.style ? props.style.marginLeft : "0"};
`
const ChartAreaContainer =styled.div`
    width:100%;
    height:160px;
    margin-left:-10px;
    margin-top:16px;

`
const ChartHeaderContainer =styled.div`
    display:flex;
    // height:74px;
    width:100%;
    align-items:center;
    flex-direction:column;
    padding:0 22px;

`
const ChartHeaderTop =styled.div`
    display:flex;
    width:100%;
    justify-content:center;
    align-items:center;
    height:28px;

`

  const Tooltiptext =styled.div`
  visibility: hidden;
  width:180px;
  padding:8px 16px;
  border-radius:16px;
  color:white;
  background-color:rgba(0,0,0,0.1);
  backdrop-filter:blur(3px);
  border:1px solid rgb(27,34,58,0.4);
  text-align: center;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
  &:after{
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #93a0c1 transparent transparent transparent;
  }
  `
  const Tooltip =styled.div`
  position: relative;
  display: inline-block;
  &:hover ${Tooltiptext} {
    visibility: visible;
    opacity: 1;
    }
`
interface ChartCardProps {
    chartData:any
    desc?:string
    prefix?:string
    title?:string
    dataKey:string
    available?:boolean
}
const ChartCard: React.FC<ChartCardProps>  = ({chartData,title,desc,prefix,dataKey,available}) => {
let curretValue
switch (dataKey) {
  case "tvl":
      curretValue =(chartData && chartData.length > 0 && chartData[chartData.length-1].tvl) ? (chartData[chartData.length-1].tvl).toLocaleString("ko-KR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) : 0
    break;
    case "stakers":
      curretValue =(chartData && chartData.length > 0 && chartData[chartData.length-1].stakers) ? (chartData[chartData.length-1].stakers).toLocaleString("ko-KR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }) : 0
    break;
    case "staked":
      curretValue =(chartData && chartData.length > 0 && chartData[chartData.length-10].staked) ? `${(chartData[chartData.length-10].staked).toLocaleString("ko-KR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}` : 0
    break;
    case "price":
      curretValue =(chartData && chartData.length > 0 && chartData[chartData.length-1].price) ? `${(chartData[chartData.length-1].price).toLocaleString("ko-KR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}` : 0
    break;
    case "runway":
      curretValue =(chartData && chartData.length > 0 && chartData[chartData.length-10].runway) ? `${(chartData[chartData.length-10].runway).toLocaleString("ko-KR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })} Days` : 0
    break;
     case "tresuary":
       curretValue =(chartData && chartData.length > 0 && chartData[chartData.length-10].totalTresuaryBalance) ? `${(chartData[chartData.length-10].totalTresuaryBalance).toLocaleString("ko-KR", {
         minimumFractionDigits: 0,
         maximumFractionDigits: 0,
       })}` : 0
     break;
     break;
     case "protokol":
       curretValue =(chartData && chartData.length > 0 && chartData[chartData.length-10].WSTBUSD) ? `${(chartData[chartData.length-10].WSTBUSD).toLocaleString("ko-KR", {
         minimumFractionDigits: 0,
         maximumFractionDigits: 0,
       })}` : 0
     break;
  default:
    curretValue = 0
    break;
}

const [onPresentChart] = useModal(
<ChartModal currentValue={curretValue} dataKey={dataKey} title={title} prefix={prefix} desc={desc} data={chartData} />,
)



// if (!(chartData && chartData.length > 0)) {
//   return <ChartCardContainer>
//     <Flex alignItems="center" justifyContent="center">
//       <img src={`${window.location.origin}/images/loading.gif`} alt="" />
//     </Flex>
//     </ChartCardContainer>
// }

  return (

        <ChartCardContainer>
        <ChartHeaderContainer>
        <ChartHeaderTop>
            <Flex alignItems="center">
                <Text color='#fff' fontSize='18px' style={{opacity:"0.8",lineHeight:1,verticalAlign:"middle"}}>
                {title}
                </Text>
                <Tooltip>
                
                <Tooltiptext>
                {desc}
                </Tooltiptext>
                </Tooltip>

            </Flex>
            {/* <IconContainer onClick={(available) ? onPresentChart : null}>
            <img  src={`${window.location.origin}/images/expandCoolBg.svg`} alt="" />
            </IconContainer> */}
        </ChartHeaderTop>
        <Flex justifyContent="center" alignItems="center">
          {(parseFloat(curretValue) > 0) ?
            <Text color='#fff' fontSize='30px' bold style={{opacity:"1",lineHeight:1,verticalAlign:"middle"}}>
            {prefix +curretValue}
            </Text>
          :
          <Skeleton height={24} width={80} />
          }

        <Text  color='#8aa3fd' fontSize='24px' bold style={{opacity:"1",lineHeight:1,verticalAlign:"middle",marginLeft:"16px"}}>
        Now
        </Text>
        </Flex>
        </ChartHeaderContainer>
        {/* {(available) ?
                <ChartAreaContainer>
                {!(chartData && chartData.length > 0) ?
                    <Flex alignItems="center" justifyContent="center">
                      <img src={`${window.location.origin}/images/loading.gif`} alt="" />
                    </Flex>
                :
                     <Chart currentValue={curretValue} dataKey={dataKey} prefix={prefix} data={chartData} />

                }

              </ChartAreaContainer>
              :
              <ChartAreaContainer>
                <Flex flexDirection="column" alignItems="center" justifyContent="center">
                  <Text fontSize='18px'>
                    Chart data will be available soon...
                  </Text>
                  </Flex>
              </ChartAreaContainer>

        }
 */}

        </ChartCardContainer>
  )
}

export default ChartCard
