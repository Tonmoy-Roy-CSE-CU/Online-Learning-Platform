import React, { Component } from 'react';
import img from './imgs.jpg'; // Background image (ensure imgs.jpg is in the same folder)

class Mainpage extends Component {
  render() {
    return (
      <div className="Mainpage">
        {/* Background Section */}
        <div className="video-background-holder">
          <div className="video-background-overlay"></div>
          <img
            className="video-background-overlay"
            src={img}
            alt="Background"
            style={{ width: '100vw' }}
          />

          <div className="video-background-content container h-100">
            <div className="d-flex h-100 text-center align-items-center">
              <div className="w-100 text-white">
                <h1 className="display-4">Our Vision</h1>
                <p className="lead mb-0">
                  Build a World Class Digital Talent Platform Powered by Talent DNA Enabling the Creation & Sustenance of Talent Ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <section id="team" className="bg-light-gray">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 data-aos="zoom-in" className="section-heading">Our Amazing Team</h2>
                <h3 className="section-subheading text-muted">Skilled Developers</h3>
              </div>
            </div>

            {/* Team Members */}
            <div className="row justify-content-center">
              {/* Tonmoy Roy */}
              <div className="col-sm-6 col-md-4 text-center">
                <div className="team-member">
                  <img
                    className="rounded-circle img-fluid"
                    src="/assets/img/Tonmoy.jpg"
                    alt="Tonmoy Roy"
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                  />
                  <h4>Tonmoy Roy</h4>
                  <p className="text-muted">Developer</p>
                </div>
              </div>

              {/* Abdulla Al Noman */}
              <div className="col-sm-6 col-md-4 text-center">
                <div className="team-member">
                  <img
                    className="rounded-circle img-fluid"
                    src="/assets/img/Me.png"
                    alt="Abdulla Al Noman"
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                  />
                  <h4>Abdulla Al Noman</h4>
                  <p className="text-muted">Developer</p>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="row">
              <div className="col-lg-8 offset-lg-2 text-center" data-aos="fade-up">
                <p className="large text-muted">
                  Our Mission is to be an Equal Opportunity Enabler levelling the Opportunity Landscape for Talent Transformation.
                  Let's Learn strives to create a Talent Ecosystem for Sustainability through comprehensive Platform based services.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* End: Team */}
      </div>
    );
  }
}

export default Mainpage;
