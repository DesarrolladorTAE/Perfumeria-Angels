import React, { useEffect } from 'react';
import { TeamOneData } from '@/data/team';
import BackgroundOne from '../../../public/assets/images/backgrounds/team-one-bg-1.jpg';
import BackgroundTwo from '../../../public/assets/images/backgrounds/team-one-bg-2.jpg';

const TeamOne = () => {
    useEffect(() => {

        if ($(".team-one__carousel").length) {
            $(".team-one__carousel").owlCarousel({
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
                  items: 4
                }
              }
            });
        }
          
    }, []);
    return (
        <>
            <section className="team-one">
                <div className="team-one-bg-1" style={{backgroundImage: `url(${BackgroundOne.src})`}}></div>
                <div className="team-one-bg-2" style={{backgroundImage: `url(${BackgroundTwo.src})`}}></div>
                <div className="container">
                    <div className="section-title text-center">
                        <h2 className="section-title__title">Our Team Member</h2>
                        <p className="section-title__text">phis are bound to ensue; and equal blame belongs to those who fail in
                            their <br /> duty through weakness of will, which is the same as through.</p>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="team-one__carousel owl-theme owl-carousel">
                                {TeamOneData.map((item, i) => (
                                <div key={i} className="team-one__single">
                                    <div className="team-one__img">
                                        <img src={item.image} alt={item.alt} />
                                        <div className="team-one__hover">
                                            <div className="team-one__social">
                                                <a href={item.facebook}><i className="fab fa-facebook"></i></a>
                                                <a href={item.pinterest}><i className="fab fa-pinterest-p"></i></a>
                                                <a href={item.twitter}><i className="fab fa-twitter"></i></a>
                                            </div>
                                            <div className="team-one__details">
                                                <h3 className="team-one__name">{item.name}</h3>
                                                <p className="team-one__title">{item.position}</p>
                                            </div>
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

export default TeamOne;