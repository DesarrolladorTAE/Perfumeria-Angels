import React from 'react';
import Link from "next/link";

const AboutTwo = () => {
    return (
        <>
            <section className="about-two">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6">
                            <div className="about-two__left wow slideInLeft" data-wow-delay="100ms" data-wow-duration="2500ms">
                                <div className="about-two__img">
                                    <img src="/assets/images/resources/about-two-img-1.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="about-two__content">
                                <div className="section-title text-left">
                                    <h2 className="section-title__title">Work Solutions Made by
                                        About This Gorne Us.</h2>
                                    <p className="section-title__text">End to ensue; and equal blame belongs to those who fail
                                        in their duty blame to those through belongs to those through d equal blame belongs
                                        to those who
                                        weakness of will.</p>
                                </div>
                                <ul className="list-unstyled about-two__points">
                                    <li>
                                        <div className="icon">
                                            <i className="fa fa-check"></i>
                                        </div>
                                        <div className="text">
                                            <p>Business referred to as service solution.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fa fa-check"></i>
                                        </div>
                                        <div className="text">
                                            <p>This right said agittal plane business.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fa fa-check"></i>
                                        </div>
                                        <div className="text">
                                            <p>Business tincidunt dui ut ornare lectus.</p>
                                        </div>
                                    </li>
                                </ul>
                                <Link href="/about" className="thm-btn about-two__btn">About More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutTwo;