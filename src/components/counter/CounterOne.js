import React from 'react';
import CountUp from 'react-countup';

const CounterOne = () => {
    return (
        <>
            <section className="counter-one">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <ul className="list-unstyled counter-one__list">
                                <li className="counter-one__single">
                                    <div className="counter-one__single-inner">
                                        <div className="counter-one__icon">
                                            <span className="icon-happiness"></span>
                                        </div>
                                        <div className="counter-one__content">
                                            
                                            <h3 className="odometer"><CountUp end={53} /></h3>
                                            <span className="counter-one__letter">K</span>
                                            <p className="counter-one__text">Happy Clients</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="counter-one__single">
                                    <div className="counter-one__single-inner">
                                        <div className="counter-one__icon">
                                            <span className="icon-completed-task"></span>
                                        </div>
                                        <div className="counter-one__content">
                                            <h3 className="odometer"><CountUp end={2366} /></h3>
                                            <span className="counter-one__letter">+</span>
                                            <p className="counter-one__text">Projects Complited</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="counter-one__single">
                                    <div className="counter-one__single-inner">
                                        <div className="counter-one__icon">
                                            <span className="icon-partner"></span>
                                        </div>
                                        <div className="counter-one__content">
                                            <h3 className="odometer"><CountUp end={541} /></h3>
                                            <span className="counter-one__letter">+</span>
                                            <p className="counter-one__text">Business Partners</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="counter-one__single">
                                    <div className="counter-one__single-inner">
                                        <div className="counter-one__icon">
                                            <span className="icon-award-1"></span>
                                        </div>
                                        <div className="counter-one__content">
                                            <h3 className="odometer"><CountUp end={754} /></h3>
                                            <span className="counter-one__letter">+</span>
                                            <p className="counter-one__text">Awards Winning</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CounterOne;