import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { HeroOneData } from '@/data/hero';

// brands slider setting
const setting = {
    slidesPerView: 1,
    loop: true,
    effect: 'fade',
    spaceBetween: 30,
    pagination: {
        el: "#main-slider-pagination",
        type: "bullets",
        clickable: true
    },
    navigation: {
        nextEl: "#main-slider__swiper-button-next",
        prevEl: "#main-slider__swiper-button-prev"
    },
    autoplay: {
        delay: 5000
    },
};

const HeroOne = () => {

    const [isLoop, setIsLoop] = useState(false);
    useEffect(() => {
        setIsLoop(true);

        if ($(".video-popup").length) {
            $(".video-popup").magnificPopup({
              type: "iframe",
              mainClass: "mfp-fade",
              removalDelay: 160,
              preloader: true,
        
              fixedContentPos: false
            });
          }
          
    }, []);

    return (
        <>
            <section className="main-slider">
                <Swiper 
                    {...setting}
                    loop={isLoop}
                    modules={[Pagination, Navigation]}
                    className="swiper-container thm-swiper__slider">

                    <div className="swiper-wrapper">

                    {HeroOneData.map((item, i) => (
                        <SwiperSlide key={i} className="swiper-slide">
                            <div className="image-layer"></div>
                            <div className="main-slider-img-1">
                                <img src={item.img} alt="" />
                            </div>
                            <div className="main-slider-shape-1"></div>
                            <div className="main-slider-shape-2"></div>
                            <div className="main-slider-shape-3 zoominout"></div>
                            <div className="main-slider-shape-4 zoominout-2"></div>
                            <div className="main-slider-arrow">
                                <img className="float-bob-y" src="/assets/images/shapes/main-slider-arrow.png" alt="" />
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-7">
                                        <div className="main-slider__content">
                                            <h2>{item.heading}</h2>
                                            <p>{item.description}</p>
                                            <div className="main-slider__bottom">
                                                <a href="contact.html" className="thm-btn">Contact Us</a>
                                                <div className="main-slider__video-link">
                                                    <a href={item.video_url}
                                                        className="video-popup">
                                                        <div className="main-slider__video-icon">
                                                            <span className="fa fa-play"></span>
                                                            <i className="ripple"></i>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    </div>

                    <div className="swiper-pagination" id="main-slider-pagination"></div>

                </Swiper>
            </section>
        </>
    )
}

export default HeroOne;