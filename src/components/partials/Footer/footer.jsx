import React from "react";
import { Link } from "react-router-dom";

function HomeNutritionFooter() {
  return (
    <>
      <footer className="footer-area">
        <div className="footer-top-wrap">
          <div className="container">
            <div className="footer-widgets-wrap">
              <div className="row">
                <div className="col-lg-4 col-md-7">
                  <div className="footer-widget">
                    <div className="footer-about">
                      <div className="footer-logo logo">
                        <a href="/">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/white_logo.png"
                            }
                            alt="Logo"
                          />
                        </a>
                      </div>
                      <div className="footer-text">
                        <p>
                          Pure Go offers natural, effective wellness products to
                          enhance immunity, energy, and overall health. Trust
                          the power of nature.
                        </p>
                      </div>
                      <div className="footer-social">
                        <Link to="https://www.facebook.com/gajani2/">
                          <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link to="https://www.youtube.com/channel/UCLyvtq55YZORdV-SN8OQSzQ">
                          <i className="fab fa-youtube"></i>
                        </Link>
                        <Link to="https://www.instagram.com/gomzi_nutrition/?igsh=NTc4MTIwNjQ2YQ%3D%3D#">
                          <i className="fab fa-instagram"></i>
                        </Link>
                        <Link to="https://www.linkedin.com/in/dt-gautam-jani-561a50161/">
                          <i className="fab fa-linkedin-in"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-5 col-sm-6">
                  <div className="footer-widget">
                    <h4 className="fw-title">Information</h4>
                    <ul className="list-wrap">
                      <li>
                        <Link to="terms-conditions">Terms & Conditions</Link>
                      </li>
                      <li>
                        <Link to="return-and-refund-policy-customer">
                          Return & Refund
                        </Link>
                      </li>
                      <li>
                        <Link to="privacy-policy-customer">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to="cancellation-policy-customer">
                          Cancellation Policy
                        </Link>
                      </li>
                      <li>
                        <Link to="pricing-policy-customer">Pricing Policy</Link>
                      </li>
                      <li>
                        <Link to="shipping-policy-customer">
                          Shipping Policy
                        </Link>
                      </li>
                      <li>
                        <Link to="contact-us">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-5 col-sm-6">
                  <div className="footer-widget">
                    <h4 className="fw-title">Products</h4>
                    <ul className="list-wrap">
                      <li>
                        <Link to="creatine-supplements">Creatine</Link>
                      </li>
                      <li>
                        <Link to="weight-loss-supplement">Pre Workout</Link>
                      </li>
                      <li>
                        <Link to="eaa-supplements">EAA</Link>
                      </li>
                      <li>
                        <Link to="mass-gainer-protein-powder">Mass Gainer</Link>
                      </li>
                      <li>
                        <Link to="whey-protein-powder">Whey Protein</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-5">
                  <div className="footer-widget">
                    <h4 className="fw-title">CONTACT US</h4>
                    <div className="footer-contact-wrap">
                      <p>
                        547,548, First Floor, Rjd Textiles Park, Hazira Rd,
                        Ichchhapor, Pal, Surat, Gujarat 394510
                      </p>
                      <ul className="list-wrap">
                        <li className="phone">
                          <i className="fas fa-phone"></i> +91 83200 77993
                        </li>
                        <li className="mail">
                          <i className="fas fa-envelope"></i>{" "}
                          sales@gomzilifesciences.in
                        </li>
                        <li className="website">
                          <i className="fas fa-globe"></i>{" "}
                          www.purego.gomzilifesciences.in
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-shape one">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/footer_shape01.png"}
              alt="img"
              className="wow fadeInLeft"
              data-wow-delay=".3s"
              data-wow-duration="1s"
            />
          </div>
          <div className="footer-shape two">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/footer_shape02.png"}
              alt="img"
              className="wow fadeInRight"
              data-wow-delay=".3s"
              data-wow-duration="1s"
            />
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomeNutritionFooter;
