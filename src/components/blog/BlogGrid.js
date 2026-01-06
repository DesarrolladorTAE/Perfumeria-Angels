import React from 'react';
import Link from 'next/link';
import { BlogGridData } from '@/data/blog';

const BlogGrid = () => {
    return (
        <>
            <section className="blog-girde">
                <div className="container">
                    <div className="section-title text-center">
                        <h2 className="section-title__title">Our largest Blog</h2>
                        <p className="section-title__text">phis are bound to ensue; and equal blame belongs to those who fail in
                            their <br /> duty through weakness of will, which is the same as through.</p>
                    </div>
                    <div className="row">
                        {BlogGridData.map((item, i) => (
                            <div key={i} className="col-xl-4 col-lg-6 col-md-6">
                                <div className="blog-one__single">
                                    <div className="blog-one__img">
                                        <div className="blog-one__img-box">
                                            <img src={item.image} alt={item.alt} />
                                            <Link href={item.link}><i className="icon-link"></i></Link>
                                        </div>
                                    </div>
                                    <div className="blog-one__content">
                                        <h3 className="blog-one__title"><Link href={item.link}>{item.heading}</Link></h3>
                                        <div className="blog-one__bottom">
                                            <p className="blog-one__catagori">{item.category}</p>
                                            <ul className="blog-one__meta list-unstyled">
                                                <li><Link href={item.link}><i className="icon-conversation"></i><span>({item.comment_count})</span></Link></li>
                                                <li><Link href={item.link}><i className="icon-like"></i><span>({item.like_count})</span></Link></li>
                                            </ul>
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

export default BlogGrid;