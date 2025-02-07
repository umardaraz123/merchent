import React from 'react'
import Listing from '../components/Listing'
import MainCategories from '../components/MainCategories'
import DiscountedDeals from '../components/DiscountedDeals'
import EndingSoon from '../components/EndingSoon'
import Offers from '../components/Offers'
import DealsNear from '../components/DealsNear'

const Home = () => {
  return (
    <div>
      <MainCategories />
      <Listing />
      <DiscountedDeals />
      {/* <Offers /> */}
      <EndingSoon />
      <DealsNear />
    </div>
  )
}

export default Home