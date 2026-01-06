import React from 'react';
import TeamOne from './TeamOne';

const TeamDetails = () => {
    return (
        <>
            <section className="team-details">
              <div className="container">
                  <div className="row">
                      <div className="col-xl-4 col-lg-5">
                          <div className="team-details__img">
                              <img src="/assets/images/team/team-details-img-1.jpg" alt="" />
                          </div>
                      </div>
                      <div className="col-xl-8 col-lg-7">
                          <div className="team-details__content">
                              <div className="team-details__name-box">
                                  <h4 className="team-details__name"><span>Name:</span> Md Ripon Islam</h4>
                                  <p className="team-details__name-title">Manager</p>
                              </div>
                              <div className="team-details__about">
                                  <h4 className="team-details__about-title">About:</h4>
                                  <p className="team-details__desc">Phis are bound to ensue; and equal blame belongs to those
                                      who fail in their duty through weakness of will, which is the same as through.We
                                      have the technology and industry expertise to develop solutions that can connect
                                      people and businesses across a variety of mobile devices.</p>
                              </div>
                              <h4 className="team-details__call">Call:<a href="tel:0822155421">++0822155421</a></h4>
                              <div className="team-details__social-box">
                                  <h4 className="team-details__social-title">Follow us:</h4>
                                  <div className="team-details__social">
                                      <a href="#"><i className="fab fa-facebook"></i></a>
                                      <a href="#"><i className="fab fa-twitter"></i></a>
                                      <a href="#"><i className="fab fa-google-plus"></i></a>
                                      <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                      <a href="#"><i className="fab fa-pinterest-p"></i></a>
                                      <a href="#"><i className="fab fa-instagram"></i></a>
                                  </div>
                              </div>
                              <div className="team-details__signature">
                                  <h4 className="team-details__signature-title">Signature: </h4>
                                  <div className="team-details__sign-img">
                                      <img src="/assets/images/team/team-details-sign-1.png" alt="" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
          <TeamOne /> 
        </>
    )
}

export default TeamDetails;