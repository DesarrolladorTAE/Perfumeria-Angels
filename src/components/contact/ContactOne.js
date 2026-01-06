import React from 'react';
import ContactOneBgOne from '../../../public/assets/images/backgrounds/contact-one-bg.jpg';

const ContactOne = () => {
    return (
        <>
            <section className="contact-one pd-100-0-100">
                <div className="container">
                    <div className="contact-one__inner" style={{backgroundImage: `url(${ContactOneBgOne.src})`}}>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6">
                                <div className="contact-one__content wow fadeInUp" data-wow-delay="100ms">
                                    <div className="section-title text-left">
                                        <h2 className="section-title__title">Will Change The Way To
                                            Contact Business.</h2>
                                        <p className="section-title__text">End to ensue; and equal blame belongs to those who
                                            fail in their duty through weakness of will.</p>
                                    </div>
                                    <form className="contact-one__form">
                                        <div className="row">
                                            <div className="col-xl-6">
                                                <div className="contact-one__form-input">
                                                    <input type="text" placeholder="Name*" name="name" />
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="contact-one__form-input">
                                                    <input type="email" placeholder="Email*" name="email" />
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="contact-one__form-input">
                                                    <input type="text" placeholder="Phone*" name="phone" />
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="contact-one__form-input">
                                                    <input type="text" placeholder="Subjects*" name="Subjects" />
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <button type="submit" className="thm-btn contact-one__btn">Send Request</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactOne;