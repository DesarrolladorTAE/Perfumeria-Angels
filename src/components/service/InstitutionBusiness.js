import React from 'react';
import Link from 'next/link';

const InstitutionBusiness = () => {
    return (
        <>
            <section className="service-details">
                <div className="container">
                    <div className="service-details__top">
                        <div className="row">
                            <div className="col-xl-5 col-lg-5">
                                <div className="service-details__top-left">
                                    <div className="section-title text-left">
                                        <h2 className="section-title__title">Institution Business</h2>
                                        <p className="section-title__text">Lhis are bound to ensue; and equal blame belongs to
                                            those who fail in their duty through weakness of will, which
                                            is the same as through.</p>
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
                                    <Link href="/about" className="thm-btn service-details__btn">About More</Link>
                                </div>
                            </div>
                            <div className="col-xl-7 col-lg-7">
                                <div className="service-details__top-right">
                                    <div className="service-details__top-img">
                                        <img src="/assets/images/services/service-details-img-1.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12">
                                <div className="service-details__top-text-box">
                                    <p className="service-details__top-text">"Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                        cillum dolore eu fugiat nulla pariatur. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="service-details__bottom">
                        <div className="row">
                            <div className="col-xl-5 col-lg-5">
                                <div className="service-details__bottom-left">
                                    <div className="service-details__bottom-img">
                                        <img src="/assets/images/services/service-details-img-2.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-7 col-lg-7">
                                <div className="service-details__bottom-right">
                                    <p className="service-details__bottom-text-1">"But I must explain to you how all this
                                        mistaken idea of denouncing pleasure and <br /> praising pain was born and I will give
                                        you a complete account of the <br /> system, and expound the actual teachings of the
                                        great.</p>
                                    <p className="service-details__bottom-text-2">Lexplorer of the truth, the master-builder of
                                        human happiness. No one rejects, <br /> dislikes, or avoids pleasure itself, KLKL</p>
                                    <div className="service-details__signature-box">
                                        <div className="row">
                                            <div className="col-xl-7 col-lg-6">
                                                <div className="service-details__signature-content">
                                                    <p className="service-details__signature-text">Ttempor incididunt ut labore
                                                        et dolore veniam, quis nostrud eullamconisi ut aliquip ex ea commodo
                                                        consequa.</p>
                                                    <div className="service-details__signature">
                                                        <img src="/assets/images/services/service-details-sign.png" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-5 col-lg-6">
                                                <div className="service-details__signature-img">
                                                    <img src="/assets/images/services/service-details-img-3.jpg" alt="" />
                                                </div>
                                            </div>
                                        </div>
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

export default InstitutionBusiness;