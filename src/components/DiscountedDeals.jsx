
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { FaLongArrowAltRight } from "react-icons/fa";
import image1 from '../../src/images/scarf.jpg';
import image2 from '../../src/images/shoes.jpg';
import image3 from '../../src/images/Jumpsuites.jpg';
import image4 from '../../src/images/hats.jpg';
import image5 from '../../src/images/t-shirt.jpg';
import image6 from '../../src/images/bags.jpg';
import image7 from '../../src/images/sandan.jpg';
import image8 from '../../src/images/img8.jpg';
import { Link } from 'react-router-dom';

import React from 'react'


const DiscountedDeals = () => {

    const categories = [
        {
        name:'Scarf cap',
        image : image1,
    },
    {
        name:'Shoes',
        image :image2,
    },
    {
        name:'Jumpsuites',
        image :image3,
    },
    {
        name:'Hats',
        image :image4,
    },
    {
        name:'T-shirt',
        image :image5,
    },
    {
        name:'Bags',
        image :image6,
    },
    {
        name:'Sandan',
        image :image7,
    },
    {
        name:'Pillowcase',
        image :image8,
    },
    
   

]
const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,  // Auto-scroll
    autoplaySpeed: 2000,  // Time in milliseconds for auto-scroll
    arrows: false,  // Hides arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  return (
    <div className='discounted-deals'>
        <div className="container">
        
          <div className="mb-4 d-flex align-items-center justify-content-between" >
              <span className="title-main"> Most Discounted Deals </span> <Link className='see-all' to="/deals">See all deals <FaLongArrowAltRight /> </Link>
            </div>
            <div className="deals">
            <Slider {...settings}>
                {categories?.map((cat,id)=> <Link to={'/deals'} className="item" key={id}>
                   <div className="image">
                    <img alt="Image"  src={cat?.image} />
                   </div>
                   <div className="title">{cat?.name}</div>
                </Link>
            )}
                </Slider>
            </div>
        </div>
    </div>
  )
}

export default DiscountedDeals