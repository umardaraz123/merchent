import React from 'react'

import { Link } from 'react-router-dom';
import banner1 from '../../src/images/banner-1.jpg';
import banner2 from '../../src/images/banner-2.jpg';
import banner3 from '../../src/images/img7.jpg';
import { FaArrowRightLong } from "react-icons/fa6";
const Offers = () => {
  return (
    <div className='offer-banner-wrapper'>
        <div className="container">
            <p className="title-main mb-4">
                Hot Offers
            </p>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="offer-banner">
                        <img alt="Image"  src={banner1}  />
                        <div className="data">
                            <div className="text">Smart Offer</div>
                            <div className="title">
                            Save 20% on <br />
                            Woman Bag
                            </div>
                            <Link className='see-all' to="/ending-soon">Shop Now <FaArrowRightLong /></Link>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="offer-banner">
                        <img alt="Image"  src={banner2}  />
                        <div className="data">
                            <div className="text">Sale Off</div>
                            <div className="title">
                            Great Summer
 <br />
 Collection
                            </div>
                           <Link className='see-all' to="/ending-soon">Shop Now <FaArrowRightLong /></Link>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="offer-banner">
                        <img alt="Image"  src={banner3} />
                        <div className="data">
                            <div className="text">New Arrivals</div>
                            <div className="title">
                            Shop Today’s
 <br />
 Deals & Offers
                            </div>
                           <Link className='see-all' to="/ending-soon">Shop Now <FaArrowRightLong /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Offers