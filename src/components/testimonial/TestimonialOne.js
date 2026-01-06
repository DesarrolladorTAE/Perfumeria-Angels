import React, { useEffect } from 'react';
import { TestimonialOneData } from '@/data/testimonial';

const TestimonialOne = () => {

    useEffect(() => {

        if ($(".testimonial-one__carousel").length) {
            $(".testimonial-one__carousel").owlCarousel({
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
                  items: 2
                },
                1200: {
                  items: 2
                }
              }
            });
        }
          
    }, []);

    return (
        <>
            <section className="testimonial-one">
                <div className="container">
                    <div className="section-title text-center">
                        <h2 className="section-title__title">Our Testimonial </h2>
                        <p className="section-title__text">phis are bound to ensue; and equal blame belongs to those who fail in
                            their <br /> duty through weakness of will, which is the same as through.</p>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="testimonial-one__carousel owl-theme owl-carousel">
                                {TestimonialOneData.map((item, i) => (
                                <div key={i} className="testimonial-one__single">
                                    <div className="testimonial-one__client-img">
                                        <img src={item.image} alt={item.alt} />
                                        <div className="testimonial-one__quote">
                                            <span className="fas fa-quote-left"></span>
                                        </div>
                                    </div>
                                    <p className="testimonial-one__text">{item.description}</p>
                                    <div className="testimonial-one__client-info">
                                        <h3 className="testimonial-one__client-name">{item.name}</h3>
                                        <p className="testimonial-one__client-title">{item.position}</p>
                                    </div>
                                    <div className="testimonial-one__quote-2">
                                        <span className="fas fa-quote-left"></span>
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

export default TestimonialOne;