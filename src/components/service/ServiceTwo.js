import React, {useEffect} from 'react';
import Link from 'next/link';
import { ServiceTwoData } from '@/data/service';
import ServiceTwoBGOne from '../../../public/assets/images/backgrounds/services-two-bg-1.jpg';
import ServiceTwoBGTwo from '../../../public/assets/images/backgrounds/services-two-bg-2.jpg';

const ServiceTwo = () => {
    useEffect(() => {

        if ($(".services-two__carousel").length) {
            $(".services-two__carousel").owlCarousel({
              loop: true,
              margin: 30,
              nav: false,
              smartSpeed: 500,
              autoHeight: false,
              autoplay: true,
              dots: true,
              autoplayTimeout: 10000,
              navText: [
                '<span class="icon-left-arrow"></span>',
                '<span class="icon-right-arrow"></span>'
              ],
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 1
                },
                800: {
                  items: 2
                },
                1024: {
                  items: 3
                },
                1200: {
                  items: 3
                }
              }
            });
        }
      
    }, []);
    return (
        <>
            <section className="services-two">
                <div className="services-two-bg-1" style={{backgroundImage: `url(${ServiceTwoBGOne.src})`}}></div>
                <div className="services-two-bg-2" style={{backgroundImage: `url(${ServiceTwoBGTwo.src})`}}></div>
                <div className="container">
                    <div className="section-title text-center">
                        <h2 className="section-title__title">Our Best Service</h2>
                        <p className="section-title__text">phis are bound to ensue; and equal blame belongs to those who fail in
                            their <br /> duty through weakness of will, which is the same as through.</p>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="services-two__carousel owl-theme owl-carousel">
                                {ServiceTwoData.map((item, i) => (
                                <div key={i} className="services-two__single">
                                    <div className="services-two__icon">
                                        <span className={item.icon}></span>
                                    </div>
                                    <h3 className="services-two__title"><Link href={item.link}>{item.heading}</Link></h3>
                                    <p className="services-two__text">{item.description}</p>
                                    <a href={item.link} className="services-two__read-more">Read More <span className="icon-plus-sign"></span></a>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ServiceTwo;