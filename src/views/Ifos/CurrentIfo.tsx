import React from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Button, LinkExternal, Flex, Image } from '@macist-m/robinia-uikit'
import { ifosConfig } from 'config/constants'
import MainFooter from 'components/Partials/MainFooter'
import useI18n from 'hooks/useI18n'
import IfoCard from './components/IfoCard'
import Title from './components/Title'
import IfoCards from './components/IfoCards'
import Details from './components/Details'

const LaunchIfoCallout = styled(BaseLayout)`
  border-top: 2px solid ${({ theme }) => theme.colors.textSubtle};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  padding: 32px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
`

const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = ifosConfig.filter((ifo) => ifo.isActive)

const Ifo = () => {
  const TranslateString = useI18n()

  return (
    <div>
    <IfoCards>
      {activeIfo.map(item=>
        <IfoCard key={item.id} ifo={item} />
      )
        }
      </IfoCards>

      <div className="statistics md:w-full mt-15 py-10 ">
        <img src='/images/ifo.png' alt='ifo' className='lg:ml-80'/>
        <div className="p-0 md:py-5 md:px-10 flex flex-col items-center">
          <div className="text-greenmain text-2xl font-bold mb-5">
            Want To Launch Your Own IFO?
          </div>
          <div className="text-gray leading-7 text-lg text-gray-900">
            Launch your project with RobiniaSwap, Binance Smart Chain’s fastest growing
            AMM project and liquidity provider, to bring your token directly to the most
            active and rapidly growing community on BSC.
          </div>
          <div className="mx-5 my-5 py-4 rounded-full bg-green2 w-72 text-center text-white cursor-pointer shadow-lg">
            Apply to Launch Your IFO
          </div>
        </div>
      </div>

      {/* Tımeline */}
      <div className="relative wrap overflow-hidden p-5 h-full mt-20 px-5 md:px-10 lg:px-20 ">
        <div className="text-center text-2xl font-bold mb-10">How does it work?</div>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-center w-full relative">
          <div className="order-1 w-5/12" />
          <div className="z-20 flex items-center order-1 bg-blurred2 shadow-xl w-14 h-14 rounded-full mb-5 md:mb-0">
            <h1 className="mx-auto font-semibold text-xl text-white">1</h1>
          </div>

          <img
            src="/images/timeline-leafs.svg"
            alt="timeline-leafs"
            className="h-full absolute z-1 hidden lg:block"
            style={{ left: '50%', top: '50%', marginTop: 29, marginLeft: -18 }}
          />

          <div
            className="order-1  rounded-3xl shadow-xl w-full md:w-5/12 p-10"
            style={{
              background: 'rgba(0, 0, 0, 0.25)',
              backdropFilter: 'blur(25px)',
            }}
          >
            <h3 className="mb-3 font-bold text-gray-50 text-xl">
              Get Your RV2-BNB LPs
            </h3>
            <p className="text-md leading-snug tracking-wide text-gray-100 ">
              Stake RV2-BNB in the liquidity pool to get LP tokens. You’ll spend them
              buy IFO sale tokens
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-col md:flex-row-reverse justify-between items-center w-full relative">
          <div className="order-1 w-5/12" />
          <div className="z-20 flex items-center order-1 bg-blurred2 shadow-xl w-14 h-14 rounded-full mb-5 md:mb-0">
            <h1 className="mx-auto font-semibold text-xl text-white">2</h1>
          </div>

          <img
            src="/images/timeline-leafs.svg"
            alt="timeline-leafs"
            className="h-full absolute z-1 transform rotate-180 mt-3 hidden lg:block"
            style={{ left: '50%', top: '50%', marginLeft: -26 }}
          />

          <div
            className="order-2  rounded-3xl shadow-xl w-full md:w-5/12 p-10"
            style={{
              background: 'rgba(0, 0, 0, 0.25)',
              backdropFilter: 'blur(25px)',
            }}
          >
            <h3 className="mb-3 font-bold text-gray-100 text-xl">Commit LP Tokens</h3>
            <p className="text-md font-medium leading-snug tracking-wide text-gray-100">
              When the IFO sales are live, you can “commit” your LP tokens to buy the
              tokens being sold. We recommend committing to the Basic Sale first, but you
              can do both if you like.
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-center w-full">
          <div className="order-1 w-5/12" />
          <div className="z-20 flex items-center order-1 bg-blurred2 shadow-xl w-14 h-14 rounded-full mb-5 md:mb-0">
            <h1 className="mx-auto font-semibold text-xl text-white">3</h1>
          </div>
          <div
            className="order-3 rounded-3xl shadow-xl w-full md:w-5/12 p-10"
            style={{
              background: 'rgba(0, 0, 0, 0.25)',
              backdropFilter: 'blur(25px)',
            }}
          >
            <h3 className="mb-3 font-bold text-gray-100 text-xl">
              Claim your tokens and achivement
            </h3>
            <p className="text-md font-medium leading-snug tracking-wide text-gray-100">
              When the IFO sales are live, you can “commit” your LP tokens to buy the
              tokens being sold. We recommend committing to the Basic Sale first, but you
              can do both if you like.
            </p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className=" mt-24 ">
        <div className='mb-48 text-center text-4xl text-white'>
          Frequently asking questions
        </div>
        <div className='mb-44'>
        <Details />
        </div>

        <MainFooter/>
      </div>

    </div>
  )
}

export default Ifo
