import React, { useEffect } from 'react';
import Link from 'next/link';

const SkillOne = () => {
    useEffect(() => {

        // Popular Causes Progress Bar
        if ($(".count-bar").length) {
            $(".count-bar").appear(
            function () {
                var el = $(this);
                var percent = el.data("percent");
                $(el).css("width", percent).addClass("counted");
            },
            {
                accY: -50
            }
            );
        }

        //Progress Bar / Levels
        if ($(".progress-levels .progress-box .bar-fill").length) {
            $(".progress-box .bar-fill").each(
            function () {
                $(".progress-box .bar-fill").appear(function () {
                var progressWidth = $(this).attr("data-percent");
                $(this).css("width", progressWidth + "%");
                });
            },
            {
                accY: 0
            }
            );
        }

        //Fact Counter + Text Count
        if ($(".count-box").length) {
            $(".count-box").appear(
            function () {
                var $t = $(this),
                n = $t.find(".count-text").attr("data-stop"),
                r = parseInt($t.find(".count-text").attr("data-speed"), 10);

                if (!$t.hasClass("counted")) {
                $t.addClass("counted");
                $({
                    countNum: $t.find(".count-text").text()
                }).animate(
                    {
                    countNum: n
                    },
                    {
                    duration: r,
                    easing: "linear",
                    step: function () {
                        $t.find(".count-text").text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $t.find(".count-text").text(this.countNum);
                    }
                    }
                );
                }
            },
            {
                accY: 0
            }
            );
        }
          
    }, []);
    return (
        <>
            <section className="skill-one">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6">
                            <div className="skill-one__left">
                                <div className="section-title text-left">
                                    <h2 className="section-title__title">Will Make Your Business
                                        Skill Look Amazing.</h2>
                                    <p className="section-title__text">End to ensue; and equal blame belongs to those who fail
                                        in their duty through weakness of will.</p>
                                </div>
                                <div className="progress-levels">
                                    {/* Skill Box */}
                                    <div className="progress-box">
                                        <div className="inner count-box">
                                            <div className="text">Business referred</div>
                                            <div className="bar">
                                                <div className="bar-innner">
                                                    <div className="skill-percent">
                                                        <span className="count-text" data-speed="3000" data-stop="77">0</span>
                                                        <span className="percent">%</span>
                                                    </div>
                                                    <div className="bar-fill" data-percent="77"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Skill Box */}
                                    <div className="progress-box">
                                        <div className="inner count-box">
                                            <div className="text">Creative Agency</div>
                                            <div className="bar">
                                                <div className="bar-innner">
                                                    <div className="skill-percent">
                                                        <span className="count-text" data-speed="3000" data-stop="45">0</span>
                                                        <span className="percent">%</span>
                                                    </div>
                                                    <div className="bar-fill" data-percent="45"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Skill Box */}
                                    <div className="progress-box last-child">
                                        <div className="inner count-box">
                                            <div className="text">Business referred</div>
                                            <div className="bar">
                                                <div className="bar-innner">
                                                    <div className="skill-percent">
                                                        <span className="count-text" data-speed="3000" data-stop="85">0</span>
                                                        <span className="percent">%</span>
                                                    </div>
                                                    <div className="bar-fill" data-percent="85"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link href="/about" className="thm-btn skill-one__btn">Skill More</Link>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="skill-one__right wow slideInRight" data-wow-delay="100ms"
                                data-wow-duration="2500ms">
                                <div className="skill-one__img">
                                    <img src="/assets/images/resources/skill-one-img-1.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SkillOne;