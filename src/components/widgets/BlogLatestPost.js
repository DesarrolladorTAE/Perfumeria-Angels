import React from 'react';
import Link from 'next/link';

const BlogLatestPost = () => {
    return (
        <>
            <div className="sidebar__single sidebar__post">
                <h3 className="sidebar__title">Recent Post</h3>
                <div className="sidebar__post-box">
                    <div className="sidebar__post-single">
                        <div className="sidebar-post__img">
                            <img src="/assets/images/blog/lp-1-1.jpg" alt="" />
                        </div>
                        <div className="sidebar__post-content-box">
                            <h3><Link href="/blog-details">Nemo enim ipsam voluptatem quia voluptas sit aspernatur </Link></h3>
                        </div>
                    </div>
                    <div className="sidebar__post-single">
                        <div className="sidebar-post__img">
                            <img src="/assets/images/blog/lp-1-2.jpg" alt="" />
                        </div>
                        <div className="sidebar__post-content-box">
                            <h3><Link href="/blog-details">Nemo enim ipsam voluptatem quia voluptas sit aspernatur </Link></h3>
                        </div>
                    </div>
                    <div className="sidebar__post-single">
                        <div className="sidebar-post__img">
                            <img src="/assets/images/blog/lp-1-3.jpg" alt="" />
                        </div>
                        <div className="sidebar__post-content-box">
                            <h3><Link href="/blog-details">Nemo enim ipsam voluptatem quia voluptas sit aspernatur </Link></h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogLatestPost;