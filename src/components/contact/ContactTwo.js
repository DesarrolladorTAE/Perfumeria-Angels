import React from 'react';

const ContactTwo = () => {
    return (
        <>
            <section className="contact-two">
                <div className="container">
                    <div className="section-title text-center">
                        <h2 className="section-title__title">Our Contact Us</h2>
                        <p className="section-title__text">End to ensue; and equal blame belongs to those who fail in their <br />
                            duty through weakness of will.</p>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <form className="contact-two__form">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="contact-two__form-input">
                                            <input type="text" placeholder="Name*" name="name" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="contact-two__form-input">
                                            <input type="email" placeholder="Email*" name="email" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="contact-two__form-input">
                                            <input type="text" placeholder="Phone*" name="phone" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                        <div className="contact-two__form-input">
                                            <input type="text" placeholder="Subjects*" name="Subjects" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="contact-two__form-input">
                                            <textarea name="message" placeholder="Your Comment*"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12">
                                        <button type="submit" className="thm-btn contact-two__btn">Send</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactTwo;