import React, { useState, useRef } from 'react'
import Listing from '../components/Listing'
import MainCategories from '../components/MainCategories'
import DiscountedDeals from '../components/DiscountedDeals'
import EndingSoon from '../components/EndingSoon'
import Offers from '../components/Offers'
import { IoIosSearch } from "react-icons/io";
import DealsNear from '../components/DealsNear'
import Adds from '../components/Adds'
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentSearch, setCurrentSearch] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const ticketInputRef = useRef();

  return (
    <div>
      <div className="main-search-wrapper">
        <div className="search-fields">
             
            <div className="search-wrapper">
              <IoIosSearch />
              <input ref={ticketInputRef} type="text" className='input' placeholder='Search for items' onKeyDown={(e) => e.key === 'Enter' && setCurrentSearch(ticketInputRef.current.value)} />
            </div>
         
            <div className="search-btn" onClick={() => setCurrentSearch(ticketInputRef.current.value.trim())}>
              <IoIosSearch />
              </div>
            </div>
      </div>
      <MainCategories />
      <Listing search={currentSearch} location={currentLocation} />
      <DiscountedDeals />
      <Adds />
      {/* <Offers /> */}
      <EndingSoon />
      <DealsNear />
    </div>
  )
}

export default Home