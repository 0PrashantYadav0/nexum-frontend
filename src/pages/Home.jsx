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

export default function Home() {
  SwiperCore.use([Navigation, Autoplay]);
  const { currentUser } = useSelector((state) => state.user);


  return (
    <>
      <div className="py-4">
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
                className='lg:h-[600px] md:h-[500px] sm:h-[400px] h-[300px]'
              ></div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  background: `url(${photo4}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='lg:h-[600px] md:h-[500px] sm:h-[400px] h-[300px]'
              ></div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style={{
                  background: `url(${photo3}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='lg:h-[600px] md:h-[500px] sm:h-[400px] h-[300px]'
              ></div>
            </SwiperSlide>
      </Swiper>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="text-center mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Enhancing Job Accessibility with NEXUM</h1>
              <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Revolutionizing Job Search</p>
              <div className="flex mt-6 justify-center">
                <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
              </div>
            </div>
            <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
              <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Accessibility</h2>
                  <p className="leading-relaxed text-base">NEXUM's online platform enables easy access to job opportunities from anywhere with internet, removing geographical constraints and expanding options beyond local markets.</p>
                  <Link to={'/workers'} className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Efficiency</h2>
                  <p className="leading-relaxed text-base">NEXUM streamlines job searching with quick online searches and applications, saving time and effort compared to offline methods involving physical travel.</p>
                  <Link to={'/workers'} className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Transparency and Feedback</h2>
                  <p className="leading-relaxed text-base">NEXUM provides clear job details and facilitates communication between employers and job seekers, fostering trust and ensuring better job matches.</p>
                  <Link to={'/workers'} className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            <Link to={currentUser ? '/profile' : '/sign-in'}>{currentUser ? "Profile" : "Get Started"}</Link>
            </button>
          </div>
        </section>
      </div>
      <div className="w-full flex p-12 gap-4 md:flex-row flex-col">
        <img src={photo2} alt="photo" className="h-[50vh] rounded-2xl" />
        <div className="bg-blue-100 p-6 rounded-2xl">
          <h3 className="h3 mb-4">Join NEXUM and Empower Daily Wage Workers!</h3>
          <p className="text-lg text-gray-800 mb-4">At NEXUM, we're committed to providing job opportunities to daily wage workers, empowering them to earn a sustainable livelihood. Join us in our mission to create meaningful employment and support local communities.</p>
          <Link to={'/workers'} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Hire workers</Link>
        </div>
      </div>
    </>
  );
}
