import React from 'react';
import Link from 'next/link';

const Breadcrumb = ({heading = "About Us", currentPage = "About"}) => {
    return (
        <>
            <section className="page-header">
                <div className="page-header-bg" style={{backgroundImage: `url(/assets/images/backgrounds/page-header-bg.jpg)`}}></div>
                <div className="container">
                    <div className="page-header__inner">
                        <h2>{heading}</h2>
                        <ul className="thm-breadcrumb list-unstyled">
                            <li><Link href="/">Home</Link></li>
                            <li><span>/</span></li>
                            <li className="active">{currentPage}</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Breadcrumb;