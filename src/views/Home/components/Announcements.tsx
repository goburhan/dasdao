import React from 'react'
import { Timeline } from 'react-twitter-widgets'

const Announcements = () => {
  return (
    <div className="farmstaking relative h-full">
      <div className="text-2xl text-greenmain font-bold mb-6">Announcements</div>
       {/* <div style={{marginBottom:"16px"}} className="flex items-center justify-between">
        <img src="/images/robinia-ico.svg" alt="rbs-ico" width="55px" />
        <div className="s">
          <div className="s">RobiniaSwap #RBS</div>
          <div className="text-gray-400 mt-1">@RobiniaSwap</div>
        </div>
        <img src="/images/twitter.svg" alt="twitter-ico" />
      </div> */}
      {/* <div className="text-lg text-center mt-4">Details about RobiniaSwap v2</div>
      <div className="my-2">
        <img src="/images/twit-pic.png" alt="twit-pic" className="w-full" />
        <div className="bg-white flex flex-col justify-center py-5 px-5" style={{ borderRadius: '0px 0px 40px 40px' }}>
          <div className="font-bold mb-1">Details about RobiniaSwap v2</div>
          <div className="s">After careful consideration, the dev team dec..</div>
        </div>
      </div>
      <div className="text-right mt-4"> */}
        {/* <div className="text-sm text-gray-400">Aug 22, 2021</div>
      </div> */}
           <Timeline
            dataSource={{
            sourceType: 'profile',
            screenName: 'robiniaswap',
          }}
          options={{
            height: '300',
            chrome: 'noheader, nofooter , transparent , noborders , noscrollbar',
            width: '100%',


          }

        }

        />
    </div>
  )
}

export default Announcements
