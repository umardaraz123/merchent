
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react'
import { MdOutlineEmojiEvents } from "react-icons/md";
import { PiHairDryerThin } from "react-icons/pi";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { IoRestaurantSharp } from "react-icons/io5";
import { CiShoppingBasket } from "react-icons/ci";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { MdOutlineWaterfallChart } from "react-icons/md";
import { MdOutlineCardTravel } from "react-icons/md";
import { MdSurfing } from "react-icons/md";
import { TbChartBarPopular } from "react-icons/tb";
import { Link } from 'react-router-dom';

const MainCategories = () => {

    const categories = [
        {
        name:'Activities & Events',
        link:'activities-and-events',
        image : MdOutlineEmojiEvents,
    },
    {
        name:'Beauty & Wellness',
        link:'baeauty-and-wellness',
        image :PiHairDryerThin,
    },
    {
        name:'Family',
        link:'family',
        image :MdOutlineFamilyRestroom,
    },
    {
        name:'Restaurants',
        link:'restaurants',
        image :IoRestaurantSharp,
    },
    {
        name:'Groceries',
        link:'groceries',
        image :CiShoppingBasket,
    },
    {
        name:'Home & Autos',
        link:'home-and-autos',
        image :HiOutlineHomeModern,
    },
    {
        name:'Shopping',
        link:'shopping',
        image :MdOutlineShoppingCartCheckout,
    },
    {
        name:'Niagara',
        link:'niagara',
        image :MdOutlineWaterfallChart,
    },
    {
        name:'Travel',
        link:'travel',
        image :MdOutlineCardTravel,
    },
    {
        name:'Things To Do',
        link:'things-to-do',
        image :MdSurfing,
    },
    {
        name:'Popular',
        link:'popular',
        image :TbChartBarPopular,
    },
    // {
    //     name:'Home Services',
    //     link:'home-services',
    //     image :image12,
    // },
   

]
const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    // autoplay: true,  // Auto-scroll
    // autoplaySpeed: 2000,  // Time in milliseconds for auto-scroll
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
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='main-categories'>
        <div className="container">
            <div className="categories">
            <Slider {...settings}>
                {categories?.map((cat,id)=> <Link to={`categories/${cat?.link}`} className="item" key={id}>
                   <div className="image">
                    <cat.image />
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

export default MainCategories