import React, { useEffect } from 'react'
import VideoBGOne from '../../../public/assets/images/backgrounds/video-one-bg.jpg';

const VideoOne = () => {

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
            <section className="video-one">
                <div className="video-one-bg" style={{backgroundImage: `url(${VideoBGOne.src})`}}></div>
                <div className="container">
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
            </section>
        </>
    )
}

export default VideoOne