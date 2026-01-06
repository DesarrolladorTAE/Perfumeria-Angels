import Link from 'next/link';
import React from 'react';
import { PricingOneData } from '@/data/pricing';

const PricingOne = () => {
    return (
        <>
            <section className="pricing-one">
                <div className="container">
                    <div className="section-title text-center">
                        <h2 className="section-title__title">Our Pricing Table</h2>
                        <p className="section-title__text">phis are bound to ensue; and equal blame belongs to those who fail in
                            their <br /> duty through weakness of will, which is the same as through.</p>
                    </div>
                    <div className="row">
                        {PricingOneData.map((item, i) => (
                            <div key={i} className={`col-xl-4 col-lg-4 wow ${item.animation}`} data-wow-delay={item.delay}>
                                <div className="pricing-one__single">
                                    <p className="pricing-one__pacage-name">{item.heading}</p>
                                    <div className="pricing-one__price-box">
                                        <h5 className="pricing-one__price">{item.price} <span>{item.duration}</span></h5>
                                    </div>
                                    <ul className="list-unstyled pricing-one__list">
                                        <li><span className={item.feature_one_icon}></span>{item.feature_one}</li>
                                        <li><span className={item.feature_two_icon}></span>{item.feature_two}</li>
                                        <li><span className={item.feature_three_icon}></span>{item.feature_three}</li>
                                        <li><span className={item.feature_four_icon}></span>{item.feature_four}</li>
                                        <li><span className={item.feature_five_icon}></span>{item.feature_five}</li>
                                    </ul>
                                    <Link href={item.button_url} className="thm-btn pricing-one__btn">{item.button_label}</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default PricingOne;