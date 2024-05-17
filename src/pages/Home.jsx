import React from "react";
import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.png";
import photo3 from "../assets/photo3.png";
import photo4 from "../assets/photo4.png";
import { useSelector } from "react-redux";
import { Navigation, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import MainHeader from "../components/MainHeader";
import Bar from "../components/Bar";
import TextBox from "../components/TextBox";

SwiperCore.use([Navigation, Autoplay]);

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  const styles = {
    container: {
      backgroundColor: '#f4f4f9',
      color: '#333',
      fontFamily: "'Roboto', sans-serif",
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      margin: '5rem',
      maxWidth: '1200px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    slideImage: {
      backgroundSize: 'cover',
      borderRadius: '0.75rem',
      height: '300px',
    },
    largeText: {
      fontSize: '3.75rem',
      fontWeight: 700,
      textAlign: 'center',
      color: '#2d3748',
    },
    centeredText: {
      paddingTop: '2rem',
      paddingBottom: '3rem',
      textAlign: 'center',
    },
  };

  return (
    <>
      <MainHeader />
      <Bar buttontext={currentUser ? "Explore more" : "Get Started"} to={currentUser ? "/workers" : "/sign-in"} />
      
      <div style={styles.container}>
        <Swiper navigation autoplay={{ delay: 2500, disableOnInteraction: false }}>
          {[photo1, photo2, photo3, photo4].map((photo, index) => (
            <SwiperSlide key={index}>
              <div
                style={{ ...styles.slideImage, background: `url(${photo}) center no-repeat` }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <TextBox />

      <div style={styles.centeredText}>
        <p style={styles.largeText}>
          Do you want to hire or get hired?
        </p>
      </div>
    </>
  );
}
