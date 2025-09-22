
import React, { useEffect } from 'react'
import Slider from 'react-slick';

import { MdShoppingCartCheckout } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { Link, useLocation } from 'react-router-dom';
import { GrMapLocation } from "react-icons/gr";
import { SiTildapublishing } from "react-icons/si";
import { IoTimeOutline } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import image1 from '../../src/images/screem1.jpg';

const BlogDetail = ({ params,isAuthenticated, setRedirectTo  }) => {
  const {blogid} =useParams()

  const location = useLocation();
  useEffect(()=>{
        if (!isAuthenticated) {
        setRedirectTo(location.pathname);
        }
  },[isAuthenticated, location, setRedirectTo])


  return (
    <div className="blog-detail-page">
      <div className="container">
       <div className="main-content">
        <div className="main-image">
            <img src={image1} alt='main-image' />
        </div>
        <div className="flex-top">
            <div className="item">
            <SiTildapublishing /> <span>12 March 2024</span>
            </div>
            <div className="item">
            <IoTimeOutline /> <span>14 Minutes read</span>
            </div>
        </div>
        <h2 className="title">
        Best Halloween Events
        </h2>
        <p className="subtitle"> 
        The Haunted Corn Maze - Calgary, Alberta
        </p>
        <p className="text">
        For a Halloween adventure under the stars, try the Haunted Corn Maze in Calgary. Wander through acres of winding paths, with only a flashlight to guide you. As you try to find your way out, you will encounter hidden scares and surprises, making it a thrilling experience for brave souls.
        </p>
        <p className="subtitle"> 
        Ghosts and Spirits of Old Montreal - Montreal, Quebec
        </p>
        <p className="text">
        This ghost tour through Old Montreal explores the city’s most haunted locations, from historic buildings to eerie alleyways. Guides share tales of famous ghost sightings, supernatural legends, and true crime stories that add a creepy edge to Montreals rich history. The tour is a unique way to celebrate Halloween and learn about the citys haunted past.
        </p>
        <p className="subtitle">
        he Dark Carnival - Edmonton, Alberta
        </p>
        <p className="text">
        The Dark Carnival in Edmonton combines circus performances with Halloween thrills for a truly unique experience. Guests are treated to acrobatics, fire-eating, and sideshow acts, all with a spooky twist. Costumes are encouraged, and the immersive atmosphere makes it feel like stepping into a haunted carnival.
        </p>
     
       <p className="subtitle">
       Check Event Dates and Times
       </p>
       <p className="text">
       Halloween events can vary in dates, with some starting as early as late September and others only open in October. Be sure to check specific dates, as many events sell out quickly.
       </p>
       
       <p className="subtitle">
       Consider Age Recommendations
       </p>
       <p className="text">
       Some events are designed for young children and families, while others, like haunted houses, may be better suited for teens and adults. Check age recommendations to ensure everyone enjoys the event safely.


       </p>
       <p className="subtitle">
       Dress for the Weather
       </p>
       <p className="text">
       In many parts of Canada, October nights can get chilly. Dress in layers and bring warm clothing if you’re attending outdoor events, especially if you’ll be spending a lot of time outside.

       </p>
       <p className="subtitle">
       Conclusion:
       </p>
       <p className="text">
       Halloween in Canada offers something for everyone, from terrifying haunted houses to pumpkin festivals and ghost tours. Whether you are looking to be scared or to enjoy a family-friendly day out, these events across Canada will help you celebrate Halloween in style. Pack your costumes, grab your trick-or-treat bags, and get ready for a Halloween season filled with fun and frights!
       </p>
       </div>
      </div>
    </div>
  )
}

export default BlogDetail