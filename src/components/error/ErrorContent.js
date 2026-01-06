import React from 'react';
import Link from 'next/link';

const ErrorContent = () => {
    return (
        <>
            <section className="error-page">
				<div className="container">
					<div className="row">
						<div className="col-xl-12">
							<div className="error-page__inner">
								<div className="error-page__img">
									<img src="/assets/images/resources/error-page-img-1.png" alt="" />
								</div>
								<div className="error-page__btn-box">
									<Link href="/" className="thm-btn error-page__btn">Go To Home</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
        </>
    )
}

export default ErrorContent;