import React, { useEffect } from 'react';
import Link from 'next/link';
import { ServiceOneData } from '@/data/service';

const ServiceOne = () => {
    useEffect(() => {

        if ($(".services-one__carousel").length) {
            $(".services-one__carousel").owlCarousel({
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
        <section className="services-one">
            <div className="container">
                <div className="section-title text-center">
                    <h2 className="section-title__title">Our Best Service</h2>
                    <p className="section-title__text">phis are bound to ensue; and equal blame belongs to those who fail in
                        their <br /> duty through weakness of will, which is the same as through.</p>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="services-one__carousel owl-theme owl-carousel">
                            {ServiceOneData.map((item, i) => (
                            <div key={i} className="services-one__single">
                                <div className="services-one__single-inner">
                                    <div className="services-one__icon">
                                        <span className={item.icon}></span>
                                    </div>
                                    <h3 className="services-one__title"><Link href={item.link}>{item.heading}</Link></h3>
                                    <p className="services-one__text">{item.description}</p>
                                    <div className="services-one__icon-plus">
                                        <Link href={item.link}><i className="fa fa-plus"></i></Link>
                                    </div>
                                </div>
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

export default ServiceOne;