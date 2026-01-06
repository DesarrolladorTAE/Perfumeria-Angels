import React, { useEffect } from 'react';
import Link from 'next/link';
import { BlogTwoData } from '@/data/blog';
import BlogTwoBGOne from '../../../public/assets/images/pattern/pattern-1.png';

const BlogTwo = () => {

    useEffect(() => {

        if ($(".blog-one__carousel").length) {
            $(".blog-one__carousel").owlCarousel({
              loop: true,
              margin: 30,
              nav: false,
              smartSpeed: 500,
              autoHeight: false,
              autoplay: true,
              dots: true,
              autoplayTimeout: 10000,
              navText: [
                '<span class="icon-left-arrow"></span>',
                '<span class="icon-right-arrow"></span>'
              ],
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 1
                },
                800: {
                  items: 2
                },
                1024: {
                  items: 3
                },
                1200: {
                  items: 3
                }
              }
            });
        }
          
    }, []);

    return (
        <>
            <section className="blog-one blog-two">
                <div className="blog-two-pattern" style={{backgroundImage: `url(${BlogTwoBGOne.src})`}}></div>
                <div className="container">
                    <div className="section-title text-center">
                        <h2 className="section-title__title">Our largest Blog</h2>
                        <p className="section-title__text">phis are bound to ensue; and equal blame belongs to those who fail in
                            their <br /> duty through weakness of will, which is the same as through.</p>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="blog-one__carousel owl-theme owl-carousel">
                                {BlogTwoData.map((item, i) => (
                                    <div key={i} className="blog-one__single">
                                        <div className="blog-one__img">
                                            <div className="blog-one__img-box">
                                                <img src={item.image} alt={item.alt} />
                                                <Link href={item.link}><i className="icon-link"></i></Link>
                                            </div>
                                        </div>
                                        <div className="blog-one__content">
                                            <h3 className="blog-one__title"><a href={item.link}>{item.heading}</a></h3>
                                            <div className="blog-one__bottom">
                                                <p className="blog-one__catagori">{item.category}</p>
                                                <ul className="blog-one__meta list-unstyled">
                                                    <li><Link href={item.link}><i className="icon-conversation"></i><span>({item.comment_count})</span></Link></li>
                                                    <li><Link href={item.link}><i className="icon-like"></i><span>({item.like_count})</span></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BlogTwo;