"use client"

import React, {useEffect} from 'react'
import { heroSlides } from '../data/data'
import "./hero.css"
import AOS from "aos"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import HeroSlide from '../components/HeroSlide'

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: false,
    });
  }, []);
  return (
    <section id="hero-slider" className='hero-slider'>
      <div className="container-md" data-aos="fade-in">
        <div className="row">
          <div className='col-12'>
            <Swiper
              slidesPerView={"auto"}
              speed={500}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination= {{
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true,
              }}
              navigation={{
                nextEl: ".custom-swiper-button-next",
                prevEl: ".custom-swiper-button-prev"
              }}
              modules={[Autoplay, Pagination, Navigation]}
              loop={true}
              className='sliderFeaturedPosts'>
              {
                heroSlides.map(slide=>(
                  <SwiperSlide>
                    <HeroSlide slide={slide}/>
                  </SwiperSlide>
                ))
              }
              <div className="custom-swiper-button-next">
                <span className="bi-chevron-right"></span>
              </div>
              <div className="custom-swiper-button-prev">
                <span className="bi-chevron-left"></span>
              </div>
              <div className="swiper-pagination"></div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}
