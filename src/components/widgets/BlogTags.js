import React from 'react';
import Link from 'next/link';

const BlogTags = () => {
    return (
        <>
            <div className="sidebar__single sidebar__tags">
                <h3 className="sidebar__title">Tags</h3>
                <div className="sidebar__tags-list">
                    <Link href="/">Consulting</Link>
                    <Link href="/">Advice</Link>
                    <Link href="/">bank</Link>
                    <Link href="/">Marketing</Link>
                    <Link href="/">Finance</Link>
                </div>
            </div>
        </>
    )
}

export default BlogTags;