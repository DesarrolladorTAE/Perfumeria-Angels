import React, { useEffect } from 'react';
import ProjectDetainsBGOne from '../../../public/assets/images/backgrounds/project-details-video-bg.jpg';

const ProjectDetails = () => {
    useEffect(() => {

        if ($(".video-popup").length) {
            $(".video-popup").magnificPopup({
              type: "iframe",
              mainClass: "mfp-fade",
              removalDelay: 160,
              preloader: true,
        
              fixedContentPos: false
            });
        }
      
    }, []);
    return (
        <>
            {/* All Project Start */}
            <section className="all-project">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-5 col-lg-5">
                            <div className="all-project__left">
                                <div className="section-title text-left">
                                    <h2 className="section-title__title">All Projects</h2>
                                </div>
                                <ul className="list-unstyled all-project__list">
                                    <li>
                                        <div className="all-project__name-box">
                                            <p className="all-project__name">Project Name:</p>
                                        </div>
                                        <div className="all-project__content-box">
                                            <p className="all-project__content">Web Template Design</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="all-project__name-box">
                                            <p className="all-project__name">Category:</p>
                                        </div>
                                        <div className="all-project__content-box">
                                            <p className="all-project__content">Business</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="all-project__name-box">
                                            <p className="all-project__name">Location:</p>
                                        </div>
                                        <div className="all-project__content-box">
                                            <p className="all-project__content">London</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="all-project__name-box">
                                            <p className="all-project__name">Client Name:</p>
                                        </div>
                                        <div className="all-project__content-box">
                                            <p className="all-project__content">Theme Pvt Ltd</p>
                                        </div>
                                    </li>
                                </ul>
                                <ul className="list-unstyled all-project__points">
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
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-7">
                            <div className="all-poject__right">
                                <div className="all-project__img">
                                    <img src="/assets/images/resources/all--project-img-1.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="all-project__bottom">
                                <p className="all-project__bottom-text">"Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                    eu fugiat nulla pariatur. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* All Project End */}

            {/* Project Details Start */}
            <section className="project-details">
                <div className="container">
                    <div className="section-title text-center">
                        <h2 className="section-title__title">Porject Details</h2>
                    </div>
                    <p className="section-title__text">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure Prior to
                        moving dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Up is
                        opinion message manners correct northwar hearing husband my. Disposing commanded dashwoods cordially
                        depending at at. Its strangers who you certainty earnestly senior He joined Financial Solutions in
                        London at graduate entry level in 1987.ustralia in 1991 with Bain. </p>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="project-details__video">
                                <div className="project-details-video-bg" style={{backgroundImage: `url(${ProjectDetainsBGOne.src})`}}>
                                </div>
                                <div className="video-one__inner">
                                    <div className="video-one__video-link">
                                        <a href="https://www.youtube.com/watch?v=Get7rqXYrbQ" className="video-popup">
                                            <div className="video-one__video-icon">
                                                <span className="fa fa-play"></span>
                                                <i className="ripple"></i>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <ul className="list-unstyled project-details__list">
                                <li><span>1</span> - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <span
                                        className="red-text">eiusmod tempor incididunt ut labore</span> et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris .</li>
                                <li><span>2</span> - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                    nostrud exercitation ullamco laboris .</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/* Project Details End */}
        </>
    )
}

export default ProjectDetails;