import React from 'react'
import { BrandOneData } from '@/data/brand';
import { Swiper, SwiperSlide } from "swiper/react";

const BrandOne = () => {
    return (
        <>
            <section className="brand-one">
                <div className="container">
                    <Swiper
                        spaceBetween={100}
                        slidesPerView={5}
                        autoplay={{delay:   5000}}
                        breakpoints={{
                            "0": {
                                spaceBetween: 30,
                                slidesPerView: 2
                            },
                            375: {
                                spaceBetween: 30,
                                slidesPerView: 2
                            },
                            575: {
                                spaceBetween: 30,
                                slidesPerView: 3
                            },
                            767: {
                                spaceBetween: 50,
                                slidesPerView: 4
                            },
                            991: {
                                spaceBetween: 50,
                                slidesPerView: 5
                            },
                            1199: {
                                spaceBetween: 100,
                                slidesPerView: 5
                            }
                        }}
                        className="thm-swiper__slider swiper-container">
                        <div className="swiper-wrapper">
                            {BrandOneData.map((item, i) => (
                                <SwiperSlide key={i} className="swiper-slide">
                                    <a href={item.link}><img src={item.image} alt={item.alt} /></a>
                                    <div className="brand-one__overly">
                                        <a href={item.link}><img src={item.image_overlay} alt={item.alt} /></a>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </div>
                    </Swiper>
                </div>
            </section>
        </>
    )
}

export default BrandOne;