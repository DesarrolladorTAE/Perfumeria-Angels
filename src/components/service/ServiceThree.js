import React from 'react';
import Link from 'next/link';
import { ServiceThreeData } from '@/data/service';

const ServiceThree = () => {
    return (
        <>
            <section className="service-page">
                <div className="container">
                    <div className="section-title text-center">
                        <h2 className="section-title__title">Our Best Service</h2>
                        <p className="section-title__text">phis are bound to ensue; and equal blame belongs to those who fail in
                            their <br /> duty through weakness of will, which is the same as through.</p>
                    </div>
                    <div className="row">
                        {ServiceThreeData.map((item, i) => (
                            <div key={i} className="col-xl-4 col-lg-6 col-md-6">
                                <div key={i} className="services-two__single">
                                    <div className="services-two__icon">
                                        <span className={item.icon}></span>
                                    </div>
                                    <h3 className="services-two__title"><Link href={item.link}>{item.heading}</Link></h3>
                                    <p className="services-two__text">{item.description}</p>
                                    <Link href={item.link} className="services-two__read-more">Read More <span className="icon-plus-sign"></span></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ServiceThree;