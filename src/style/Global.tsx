import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@macist-m/robinia-uikit'
import secondary from './robiniabg.png'
import cardbg from './cardbg.png'
import slider from './slider1.png'
import farmbg from './farmbg.png'
import ifobg from './ifobg.png'
import calloptbg from './calloptionbg.png'
import mainbg from './mainbg.png'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}



const GlobalStyle = createGlobalStyle`
  * {
  font-family: 'Barlow Semi Condensed', sans-serif;


  }
  body {
    background-image:url(${mainbg});
    background-size:cover;
    background-repeat:no-repeat;

    img {
      height: auto;
      max-width: 100%;
    }
  }
  
  .mainbg {
    background-image:url(${secondary});
    background-size: 100% 100%;
  }
  .farmbg {
    background-image:url(${farmbg});
    background-size: 100% 100% ;
    background-repeat:no-repeat;
  }

  .ifobg {
    background-image:url(${ifobg});
    background-position:  top;
    background-size: cover;
  }
  .callbg {
    background-image:url(${calloptbg});
    background-size: cover;
  }

  .delegatebg {
    background-image:url(${ifobg});
    background-size: cover;
  }

  .rbs-bg {
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(45px);
  }
  .calloption{
    background: rgba(255,255,255,0.15);
    padding: 55px;
    border-style : solid;
    border-color: rgba(200, 200, 200, 0.25);
    border-width: 2px;
    border-radius: 30px;
    backdrop-filter: blur(5px);

    
  }
  .launchpage {
    background-color:#e9f5f5;
    padding:25px;
    border-radius:30px;
  }
  .rbs-card {
    background-image:url(${cardbg});
    backdrop-filter: blur(45px);
    padding: 25px;
    border-radius: 30px;
    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.05);
    margin-left: 6px;
    margin-right: 6px;
    ${({ theme }) => theme.mediaQueries.sm} {
      margin: 0 auto;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      margin: 0 auto;
    }
  }
  
  .topslider{
    background: #064d4c;
    backdrop-filter: blur(45px);
    height:100%;
    width:100%;
    align-items:center;
    border-radius: 30px;
    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.05);
  
  }

  .slidbg{
    background-image : url(${slider});
    background-size: cover;
    border-radius: 30px;
    height:100%;
    
  }

  .statistics{
    background : rgba(255,255,255,0.15);
    backdrop-filter: blur(15px);
    padding:25px;
    border-radius:30px;
  }

  .farmstaking {
    background: rgba(0,0,0,0.05);
    backdrop-filter: blur(45px);
    padding: 15px;
    border:rgba(255,255,255,0.25) 1px solid;
    border-radius: 30px;
    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.05);
    margin-left: 6px;
    margin-right: 6px;
  }
  
  .slick-list> div {
    margin-left:0;
  }
`

export default GlobalStyle
