import React, { useEffect } from 'react';
import Link from 'next/link';
import { ProjectOneData } from '@/data/project';

const ProjectOne = () => {
    useEffect(() => {

        if ($(".img-popup").length) {
            var groups = {};
            $(".img-popup").each(function () {
              var id = parseInt($(this).attr("data-group"), 10);
        
              if (!groups[id]) {
                groups[id] = [];
              }
        
              groups[id].push(this);
            });
        
            $.each(groups, function () {
              $(this).magnificPopup({
                type: "image",
                closeOnContentClick: true,
                closeBtnInside: false,
                gallery: {
                  enabled: true
                }
              });
            });
        }
      
    }, []);
    return (
        <>
            <section className="project-one">
                <div className="project-one__container">
                    <div className="section-title text-center">
                        <h2 className="section-title__title">Our Best Projects</h2>
                        <p className="section-title__text">phis are bound to ensue; and equal blame belongs to those who fail in
                            their <br /> duty through weakness of will, which is the same as through.</p>
                    </div>
                    <div className="row">
                        {ProjectOneData.map((item, i) => (
                            <div key={i} className="col-xl-4 col-lg-6 col-md-6">
                                <div className="project-one__single">
                                    <div className="project-one__img">
                                        <img src={item.image} alt="" />
                                        <div className="project-one__hover">
                                            <a href={item.image_popup} className="img-popup"><span className="icon-plus-sign"></span></a>
                                            <Link href={item.link}><span className="icon-link"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProjectOne;