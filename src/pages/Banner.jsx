import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import Slide from '../components/Slide';
import bgimg1 from '../assets/1685518151043.png';
import bgimg2 from '../assets/What_to_Look_For_in_a_Potential_Cleaning_Employee_1_0191b0e980.png';
import bgimg3 from '../assets/depositphotos_43207253-stock-photo-large-diverse-group-of-janitors.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
const Banner = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="container px-6 py-10 mx-auto">
      {/* Swiper Section */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            text={
              <div className="max-w-screen-sm">
                <h3 className="text-2xl md:text-5xl font-semibold text-white">
                  Cleaning with Care Every Time
                </h3>
                <p className="mt-2 font-normal text-white text-base">
                  Hire Us! We are a Professional cleaning company offering
                  service
                </p>
                <button className="btn btn-warning mt-2">OUR SERVICE</button>
              </div>
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            text={
              <div className="max-w-screen-sm">
                <h3 className="text-2xl md:text-5xl font-semibold text-white">
                  Cleaning with a personal touch
                </h3>
                <p className="mt-2 font-normal text-white text-base">
                  Hire Us! We are a Professional cleaning company offering
                  service
                </p>
                <button className="btn btn-warning mt-2">OUR SERVICE</button>
              </div>
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            text={
              <div className="max-w-screen-sm">
                <h3 className="text-2xl md:text-5xl font-semibold text-white">
                  We Are Here With Expert Cleaner
                </h3>
                <p className="mt-2 font-normal text-white text-base">
                  Over 35 Years Leading In Cleaning Industry
                </p>
                <button className="btn btn-warning mt-2">OUR SERVICE</button>
              </div>
            }
          />
        </SwiperSlide>
      </Swiper>

      {/* Content Section */}
      <div
        className="mt-10 text-center w-full"
        data-aos="fade-up"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <h2 className="text-3xl font-bold text-gray-800">
          Professional House Cleaning Services
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-lg mx-auto">
          We provide top-notch cleaning services to ensure your home is spotless
          and welcoming. Our experienced team uses eco-friendly products to give
          you the best results without compromising on quality.
        </p>
      </div>
    </div>
  );
};

export default Banner;
