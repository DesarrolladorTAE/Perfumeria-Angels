import React from 'react';
import Link from 'next/link';

const BlogCategory = () => {
    return (
        <>
            <div className="sidebar__single sidebar__category">
                <h3 className="sidebar__title">Categories</h3>
                <ul className="sidebar__category-list list-unstyled">
                    <li><Link href="/blog-details">Consulting <span>(12)</span></Link></li>
                    <li className="active"><Link href="/blog-details">Marketing <span>(10)</span></Link></li>
                    <li><Link href="/blog-details">Technology <span>(20)</span></Link></li>
                    <li><Link href="/blog-details">Business &amp; Finance<span>(30)</span></Link></li>
                    <li><Link href="/blog-details">Bank Cryptcy <span>(15)</span></Link></li>
                </ul>
            </div>
        </>
    )
}

export default BlogCategory;