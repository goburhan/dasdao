import React from 'react'
import { ThemeProvider } from 'styled-components'
import Page from 'components/layout/Page'
import Socials from 'components/Partials/Socials'
import FarmStakingCard from './components/FarmStakingCard'
import TopSliderCard from './components/TopSliderCard'
import CakeStats from './components/CakeStats'
import TopFarms from './components/TopFarms'
import Welcome from './components/Welcome'
import Announcements from './components/Announcements'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../../style/slider-dots.css'
import Statistics from './components/Statistics'
import Products from './components/Products'
import Stats from './components/Stats'
import Dashboard from './Dashboard'

const theme = {

  mobile: "768px",
  laptops: "992px",
  tablet: "1024px",
  bigscreen: "1400px"
};

const Home: React.FC = () => {
  return (
    <Page >
      <div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 gap-8">
        <div className='col-span-12 '>
          <Welcome/>
        </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 lg:mt-12">
            <FarmStakingCard />
          </div>
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 lg:mt-12">
            <Announcements />
          </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6  ">
            <TopSliderCard />
          </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 ">
            <CakeStats />
          </div>
       
          <div className=" lg:col-start-1 col-span-12 mb-20 lg:mt-32">
            <Products />
          </div>

          <div className=" lg:col-start-1 col-span-12 mb-20 lg:mt-32">
            <Dashboard />
          </div>
        
        </div>

      </div>
    </Page>
  )
}

export default Home
