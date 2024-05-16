import React, { useEffect, useState } from "react";
import photo1 from "../assets/photo1.png"
import photo2 from "../assets/photo2.png"
import photo3 from "../assets/photo3.png"
import photo4 from "../assets/photo4.png"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigation,Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import MainHeader from "../components/MainHeader";
import Bar from "../components/Bar";
import TextBox from "../components/TextBox";

export default function Home() {
  SwiperCore.use([Navigation, Autoplay]);
  const { currentUser } = useSelector((state) => state.user);


  return (
    <>
    <MainHeader/>
    <Bar buttontext={currentUser ? "Explore more" : "Get Started"} to={currentUser? "/workers" : "/sign-in"}/> 
    <div className='bg-custom m-20 rounded-lg shadow-2xl max-md:m-8'>
      <Swiper navigation autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}>
            <SwiperSlide>
              <div
                style={{
                  background: `url(${photo1}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='lg:h-[600px] md:h-[500px] sm:h-[400px] h-[300px] rounded-lg'
              ></div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  background: `url(${photo4}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='lg:h-[600px] md:h-[500px] sm:h-[400px] h-[300px] rounded-lg'
              ></div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  background: `url(${photo3}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='lg:h-[600px] md:h-[500px] sm:h-[400px] h-[300px] rounded-lg'
              ></div>
            </SwiperSlide>
      </Swiper>
      </div>
      <TextBox/>
      <div className='pt-8 pb-12 text-center'>
          <p className='bg-text text-6xl font-bold'>
          Do you want to hire or get hired ?
          </p>
        </div>
    </>
  );
}
