import React ,{useEffect,useState} from "react";
import { Text } from "@macist-m/robinia-uikit";
import { AreaChart,Area,ResponsiveContainer,XAxis, YAxis,Tooltip} from 'recharts';
import styled from 'styled-components'


export interface ChartProps {
    data?: any
    prefix?:string
    dataKey:string
    currentValue?:string
  }

  const TooltipContainer = styled.div`
  width:fit-content;
  padding:8px 16px;
  max-width:220px;
  border-radius:16px;
  color:white;
  background-color:rgba(0,0,0,0.1);
  backdrop-filter:blur(3px);
  border:1px solid rgb(27,34,58,0.4);

`
  const Chart: React.FC<ChartProps> = ({data,prefix,dataKey,currentValue}) => {


     const getIntroOfPage = (label) => {
        // if (label === 'Page A') {
        //   return "December 22";
        // }
        // if (label === 'Page B') {
        //   return "Page B is about women's dress";
        // }
        // if (label === 'Page C') {
        //   return "Page C is about women's bag";
        // }
        // if (label === 'Page D') {
        //   return 'Page D is about household goods';
        // }
        // if (label === 'Page E') {
        //   return 'Page E is about food';
        // }
        // if (label === 'Page F') {
        //   return 'Page F is about baby food';
        // }
        return "December 22 - 2022";
      };
      const abbrNum = (number)=>{
            // 2 decimal places => 100, 3 => 1000, etc
                    // Enumerate number abbreviations
            const abbrev = [ "k", "m", "b", "t" ];
            const decPlaces = 10 ** 2
            // Math.pow(10,decPlaces);


            let temp;
            // Go through the array backwards, so we do the largest first
            for (let i=abbrev.length-1; i>=0; i--) {

                // Convert array index to "1000", "1000000", etc
                const size = 10 ** ((i+1)*3)
                // Math.pow(10,(i+1)*3);

                // If the number is bigger or equal do the abbreviation
                if(size <= number) {
                    // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                  
                    // This gives us nice rounding to a particular decimal place.
                    
                    temp = Math.round(number*decPlaces/size)/decPlaces;

                    // Handle special case where we round up to the next abbreviation
                    if((number === 1000) && (i < abbrev.length - 1)) {
                      temp = 1;
                        i++;
                    }

                    // Add the letter for the abbreviation
                    temp += abbrev[i];

                    // We are done... stop
                    break;
                }
            }
            if(prefix){
              return prefix + temp
            }
            return temp;
      }
        const CustomTooltip = ({ active, payload, label }: any) => {
            if (active && payload && payload.length) {
              return (
                <TooltipContainer>

                  <Text style={{opacity:0.8}}>{label}</Text>
                  <Text fontSize="12px" style={{opacity:0.8}}>Data as of UTC +00:00</Text>
                  {(dataKey === "tresuary") &&
                    payload.map(item=>
                      item.value > 0 ?
                      <Text fontSize="14px" color="#fff" bold>{`${item.name}: ${prefix}${item.value.toLocaleString("ko-KR", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                        })}`}</Text> : null
                    )

                  }
                    {(dataKey === "protokol") &&
                payload.map(item=>
                  item.value > 0 ?
                  <Text fontSize="14px" color="#fff" bold>{`${item.name}: ${prefix}${item.value.toLocaleString("ko-KR", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                    })}`}</Text> : null
                )
                  }
                  {(dataKey !== "tresuary" && dataKey !== "protokol") &&
                  <Text fontSize="18px" color="#fff" bold>{`${prefix}${payload[0].value.toLocaleString("ko-KR", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                    })}`}</Text>
                  }

                </TooltipContainer>
              );
            }

            return null;
          };




  return (
    <ResponsiveContainer  width="100%" height="100%">
     <AreaChart width={404} data={data}>
      <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f7f4ce" stopOpacity={0.1}/>
            <stop offset="100%" stopColor="#d1aaff" stopOpacity={1}/>
          </linearGradient>
        </defs>
        <XAxis interval={220} dataKey="timestamp"  padding={{right:12}}  tickLine={false}    axisLine={false} tick={
            {fill:"#fff",opacity:"0.8"}
        } />
        <YAxis interval="preserveEnd" tickFormatter={abbrNum}  tickLine={false} axisLine={false} tick={
            {fill:"#fff",opacity:"0.8"}
        } />

        <Tooltip content={<CustomTooltip/>} />
        {(dataKey === "tresuary") &&
              <>
               <Area type="monotone" dataKey="BTCB" stroke="#8884d8" fill="#8884d8" strokeWidth={3} />
               <Area type="monotone" dataKey="BNB" stroke="#82ca9d" fill="#82ca9d" strokeWidth={3} />
               <Area type="monotone" dataKey="BUSD" stroke="#ffc658" fill="#ffc658" strokeWidth={3} />
               <Area type="monotone" dataKey="USDT" stroke="#f7f4ce" fill="url(#colorUv)" strokeWidth={3} />
               <Area type="monotone" dataKey="ETH" stroke="#f7f4ce" fill="url(#colorUv)" strokeWidth={3} />
               <Area type="monotone" dataKey="CAKE" stroke="#f7f4ce" fill="url(#colorUv)" strokeWidth={3} />
              </>



      }
      {(dataKey === "protokol") &&
        <>
        <Area type="monotone" dataKey="WSTBNB"  stroke="#f7f4ce" fill="url(#colorUv)" strokeWidth={3} />
        <Area type="monotone" dataKey="WSTBUSD"  stroke="#f7f4ce" fill="#091728" strokeWidth={3} />
       </>
       }
        {(dataKey !== "protokol" && dataKey !== "tresuary" ) &&
        <Area type="monotone" dataKey={dataKey} stroke="#f7f4ce" fill="url(#colorUv)" strokeWidth={3} />
       }



    </AreaChart>
  </ResponsiveContainer>
  );
}

export default Chart;
