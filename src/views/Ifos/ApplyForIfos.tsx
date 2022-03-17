import React from 'react'
import Page from 'components/layout/Page'
import Details from './components/Details'

const ApplyForIfos = () => {
  return (
    <Page>
      {/* Apply for IFO */}
      <div className="rbs-card md:w-4/6 mt-15 py-10">
        <div className="p-0 md:py-5 md:px-10 flex flex-col items-center">
          <div className="text-primary text-2xl font-bold mb-5">
            Want To Launch Your Own IFO?
          </div>
          <div className="text-black leading-7 text-lg ">
            Launch your project with RobiniaSwap, Binance Smart Chain’s fastest growing
            AMM project and liquidity provider, to bring your token directly to the most
            active and rapidly growing community on BSC.
          </div>
          <div className="mx-5 my-5 py-4 rounded-full bg-secondary w-60 text-center text-white cursor-pointer shadow-lg">
            Apply to Launch Your IFO
          </div>
        </div>
      </div>

      {/* Tımeline */}
      <div className="relative wrap overflow-hidden p-5 h-full mt-20 px-5 md:px-10 lg:px-20">
        <div className="text-center text-2xl font-bold mb-10">How does it work?</div>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-center w-full relative">
          <div className="order-1 w-5/12" />
          <div className="z-20 flex items-center order-1 bg-secondary shadow-xl w-14 h-14 rounded-full mb-5 md:mb-0">
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
              background: 'rgba(242, 255,255, 0.85)',
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
          <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-14 h-14 rounded-full mb-5 md:mb-0">
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
              background: 'rgba(4, 106, 56, 0.85)',
              backdropFilter: 'blur(100px)',
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
          <div className="z-20 flex items-center order-1 bg-green-500 shadow-xl w-14 h-14 rounded-full mb-5 md:mb-0">
            <h1 className="mx-auto font-semibold text-xl text-white">3</h1>
          </div>
          <div
            className="order-3 rounded-3xl shadow-xl w-full md:w-5/12 p-10"
            style={{
              background: 'rgba(16, 185, 129, 0.85)',
              backdropFilter: 'blur(100px)',
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
      <div className="mb-20 mx-1">
        <Details />
      </div>
    </Page>
  )
}

export default ApplyForIfos
