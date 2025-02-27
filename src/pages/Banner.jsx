import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import Slide from '../components/Slide';
import bgimg1 from '../assets/1685518151043.png';
import bgimg2 from '../assets//s.avif';
import bgimg3 from '../assets/ss.avif';
import AOS from 'aos';
import 'aos/dist/aos.css';
const Banner = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="container  pb-10 mx-auto">
      {/* Swiper Section */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        <SwiperSlide className="relative">
          <Slide image={bgimg1} />

          <div className="space-y-4 max-w-screen-sm  absolute top-24 left-14 md:left-28 transform ">
            <h3 className="text-2xl md:text-5xl font-bold text-white space-y-4">
              Sparkling{' '}
              <span className="text-green-600 text-3xl md:text-6xl">Clean</span>
              <br />
              <span className="pt-2"> Every Time</span>
            </h3>
            <p className="mt-2 font-normal text-white text-sm md:text-xl">
              We can't wait to help you refresh your space. We'll respond to
              your request within 24 hours to set up your free on-site estimate.
            </p>
            <button className="btn btn-warning mt-2">OUR SERVICE</button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <Slide image={bgimg2} />

          <div className="space-y-4 max-w-screen-sm  absolute top-32 left-14 md:left-28 transform ">
            <h3 className="text-2xl md:text-5xl font-semibold text-white">
              Cleaning with a personal touch
            </h3>
            <p className="mt-2 font-normal text-white text-sm md:text-xl">
              Hire Us! We are a Professional cleaning company offering service
            </p>
            <button className="btn btn-warning mt-2">OUR SERVICE</button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <Slide image={bgimg3} />

          <div className="space-y-4 max-w-screen-sm  absolute top-32 left-14 md:left-28 transform">
            <h3 className="text-2xl md:text-5xl font-semibold text-white">
              We Are Here With Expert Cleaner
            </h3>
            <p className="mt-2 font-normal text-white text-sm md:text-xl">
              Hire Us! We are a Professional cleaning company offering service
            </p>
            <button className="btn btn-warning mt-2">OUR SERVICE</button>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Content Section */}
      <div
        className="mt-10 text-center w-full"
        data-aos="fade-up"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="1000"
      >
        <h2 className="text-3xl font-bold ">
          Professional House Cleaning Services
        </h2>
        <p className="mt-4 text-lg  max-w-lg mx-auto">
          We provide top-notch cleaning services to ensure your home is spotless
          and welcoming. Our experienced team uses eco-friendly products to give
          you the best results without compromising on quality.
        </p>
      </div>
    </div>
  );
};

export default Banner;
