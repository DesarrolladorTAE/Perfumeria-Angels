import React from 'react';
import Link from 'next/link';

const AboutOne = () => {
    return (
        <>
            <section className="about-one">
                <div className="container">
                    <div className="about-one__inner-box">
                        <div className="about-one__inner">
                            <div className="about-one-shape-1"></div>
                            <div className="about-one-shape-2"></div>
                            <div className="about-one-shape-3"></div>
                            <div className="about-one-shape-4"></div>
                            <div className="row">
                                <div className="col-xl-6 wow slideInLeft" data-wow-delay="100ms" data-wow-duration="2500ms">
                                    <div className="about-one__img zoom-fade">
                                        <img src="/assets/images/resources/about-one-img-1.png" alt="" />
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="about-one__content">
                                        <div className="section-title text-left">
                                            <h2 className="section-title__title">Work Solutions Made by About This Gorne Us.</h2>
                                            <p className="section-title__text">End to ensue; and equal blame belongs to those
                                                who fail in their duty through weakness of will.</p>
                                        </div>
                                        <ul className="list-unstyled about-one__points">
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
                                        <Link href="about" className="thm-btn about-one__btn">About More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutOne;