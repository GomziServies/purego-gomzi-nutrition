/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faInstagram,
  faYoutube,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function HomeNutritionFooter() {
  const [visibleCount, setVisibleCount] = useState(2);

  const moreKeyword = () => {
    setVisibleCount((prevCount) => prevCount + 40);
  };

  return (
    <>
      <footer className="footer-area">
        <div className="footer-instagram">
          <div className="container">
            <div className="row g-0 instagram-active">
              <div className="col-2">
                <div className="footer-insta-item">
                  <a href="assets/img/others/instagram_post01.jpg" className="popup-image"><img src={process.env.PUBLIC_URL + '/assets/images/instagram_post01.jpg'} alt="img" /></a>
                </div>
              </div>
              <div className="col-2">
                <div className="footer-insta-item">
                  <a href="assets/img/others/instagram_post02.jpg" className="popup-image"><img src={process.env.PUBLIC_URL + '/assets/images/instagram_post02.jpg'} alt="img" /></a>
                </div>
              </div>
              <div className="col-2">
                <div className="footer-insta-item">
                  <a href="assets/img/others/instagram_post03.jpg" className="popup-image"><img src={process.env.PUBLIC_URL + '/assets/images/instagram_post03.jpg'} alt="img" /></a>
                </div>
              </div>
              <div className="col-2">
                <div className="footer-insta-item">
                  <a href="assets/img/others/instagram_post04.jpg" className="popup-image"><img src={process.env.PUBLIC_URL + '/assets/images/instagram_post04.jpg'} alt="img" /></a>
                </div>
              </div>
              <div className="col-2">
                <div className="footer-insta-item">
                  <a href="assets/img/others/instagram_post05.jpg" className="popup-image"><img src={process.env.PUBLIC_URL + '/assets/images/instagram_post05.jpg'} alt="img" /></a>
                </div>
              </div>
              <div className="col-2">
                <div className="footer-insta-item">
                  <a href="assets/img/others/instagram_post06.jpg" className="popup-image"><img src={process.env.PUBLIC_URL + '/assets/images/instagram_post06.jpg'} alt="img" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-top-wrap">
          <div className="container">
            <div className="footer-widgets-wrap">
              <div className="row">
                <div className="col-lg-4 col-md-7">
                  <div className="footer-widget">
                    <div className="footer-about">
                      <div className="footer-logo logo">
                        <a href="index.html"><img src={process.env.PUBLIC_URL + '/assets/images/white_logo.png'} alt="Logo" /></a>
                      </div>
                      <div className="footer-text">
                        <p>Making beauty especially relating complot especial common questions tend to recur through posts or queries standards vary orem donor command tei.</p>
                      </div>
                      <div className="footer-social">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-pinterest-p"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-5 col-sm-6">
                  <div className="footer-widget">
                    <h4 className="fw-title">About Us</h4>
                    <ul className="list-wrap">
                      <li><a href="#">About Company</a></li>
                      <li><a href="#">Affiliate Program</a></li>
                      <li><a href="#">Customer Spotlight</a></li>
                      <li><a href="#">Reseller Program</a></li>
                      <li><a href="shop.html">Our Shop</a></li>
                      <li><a href="#">Price & Plans</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-5 col-sm-6">
                  <div className="footer-widget">
                    <h4 className="fw-title">Support</h4>
                    <ul className="list-wrap">
                      <li><a href="#">Knowledge Base</a></li>
                      <li><a href="blog.html">Blog</a></li>
                      <li><a href="#">Developer API</a></li>
                      <li><a href="#">FAQ</a></li>
                      <li><a href="#">Team</a></li>
                      <li><a href="contact.html">Contact</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-5">
                  <div className="footer-widget">
                    <h4 className="fw-title">CONTACT US</h4>
                    <div className="footer-contact-wrap">
                      <p>547,548, First Floor, Rjd Textiles Park, Hazira Rd, Ichchhapor, Pal, Surat, Gujarat 394510</p>
                      <ul className="list-wrap">
                        <li className="phone"><i className="fas fa-phone"></i> +91 63540 51487</li>
                        <li className="mail"><i className="fas fa-envelope"></i> sales@gomzilifesciences.in</li>
                        <li className="website"><i className="fas fa-globe"></i> www.purego.gomzilifesciences.in</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-shape one">
            <img src={process.env.PUBLIC_URL + '/assets/images/footer_shape01.png'} alt="img" className="wow fadeInLeft" data-wow-delay=".3s" data-wow-duration="1s" />
          </div>
          <div className="footer-shape two">
            <img src={process.env.PUBLIC_URL + '/assets/images/footer_shape02.png'} alt="img" className="wow fadeInRight" data-wow-delay=".3s" data-wow-duration="1s" />
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomeNutritionFooter;
