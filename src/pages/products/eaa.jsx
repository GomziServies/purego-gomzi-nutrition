import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import NutritionHeader from "../../components/partials/Header/nutritionsheader";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/css/animate.min.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/default.css";
import "../../assets/css/jquery-ui.css";
import "../../assets/css/magnific-popup.css";
import "../../assets/css/odometer.css";
import "../../assets/css/slick.css";
import "../../assets/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import HomeNutritionFooter from "../../components/partials/Footer/footer";
import LoaderComponent from "../../components/PageLoader";

function PureGoEaa() {
  const canonicalUrl = window.location.href;

  const [selectedImage, setSelectedImage] = useState(
    process.env.PUBLIC_URL + "/assets/images/products/eaa/eaa-1.webp"
  );

  return (
    <>
      <Helmet>
        <title>Best EAA Supplements for Muscle Recovery & Performance</title>
        <meta
          name="description"
          content="Boost muscle recovery, endurance, and performance with the best EAA supplements. Shop top-quality essential amino acids now!"
        />
        <meta
          name="keyword"
          content="eaa, muscle recovery, electrolyte, eaa protein, supplements, eaa supplements, muscular growth, metabolism, protein powder, best collagen supplements, best probiotic for women, best protein powder, probiotics for women, vitamins, mass gainer, fat burner, electrolytes, testosterone supplements, weight loss supplements, best magnesium supplement, berberine supplement, best weight loss supplements, fiber supplement, electrolyte powder, best testosterone booster, BCAA Supplement"
        />
        <meta
          property="og:url"
          content="https://purego.gomzilifesciences.in/"
        />
        <link rel="canonical" href={{ canonicalUrl }} />
      </Helmet>
      <LoaderComponent />
      <NutritionHeader />
      <button className="scroll-top scroll-to-target" data-target="html">
        <i className="fas fa-angle-up"></i>
      </button>
      <main className="main-area fix">
        <section className="breadcrumb-area breadcrumb-bg">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-10">
                <div className="breadcrumb-content text-center">
                  <h2 className="title">Shop Details</h2>
                  <nav aria-label="Breadcrumbs" className="breadcrumb-trail">
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item trail-item trail-begin">
                        <a href="index.html">
                          <span>Home</span>
                        </a>
                      </li>
                      <li className="breadcrumb-item trail-item trail-end">
                        <span>Shop Details</span>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="video-shape one">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/video_shape01.png"}
              alt="shape"
            />
          </div>
          <div className="video-shape two">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/video_shape02.png"}
              alt="shape"
            />
          </div>
        </section>
        <section className="inner-shop-details-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="inner-shop-details-flex-wrap">
                  <div className="inner-shop-details-img-wrap">
                    {/* Show here a big image */}
                    <div className="inner-shop-details-img">
                      <img src={selectedImage} alt="Selected" />
                    </div>
                  </div>
                  <div className="inner-shop-details-nav-wrap">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      {[
                        "/assets/images/products/eaa/eaa-1.webp",
                        "/assets/images/products/eaa/eaa-2.webp",
                        "/assets/images/products/eaa/eaa-3.webp",
                        "/assets/images/products/eaa/eaa-4.webp",
                      ].map((image, index) => (
                        <li
                          className="nav-item"
                          role="presentation"
                          key={index}
                        >
                          <a
                            href="#"
                            className="nav-link"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedImage(process.env.PUBLIC_URL + image);
                            }}
                          >
                            <img
                              src={process.env.PUBLIC_URL + image}
                              alt="Thumbnail"
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 d-flex align-items-center">
                <div className="inner-shop-details-content">
                  <h4 className="title">EAA</h4>
                  <div className="inner-shop-details-meta">
                    <ul className="list-wrap">
                      <li>
                        Brands : <a href="shop.html">Pure-Go</a>
                      </li>
                      <li className="inner-shop-details-review">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                        <span>(4.5)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="inner-shop-details-price">
                    <h2 className="price">₹2999.00</h2>
                    <h5 className="stock-status">- IN Stock</h5>
                  </div>
                  <p>
                    EAA is an advanced science-based solution that contains 13
                    Ultra amino acids as well as hydration and a vitamin booster
                    combination. EAAs aid in muscle growth and regeneration
                    while also lowering fatigue and soreness.
                  </p>
                  <div>
                    <h4>Flavor:</h4>
                    <button className="cart-btn">Watermelon</button>
                  </div>
                  <div className="inner-shop-details-list">
                    <ul className="list-wrap">
                      <li>
                        Type : <span>Supplement</span>
                      </li>
                      <li>
                        CO : <span>Pure-Go</span>
                      </li>
                    </ul>
                  </div>
                  <div className="inner-shop-perched-info">
                    <div className="sd-cart-wrap d-flex me-3">
                      <form action="#" className="d-flex">
                        <div>
                          <input
                            type="button"
                            value="-"
                            className="plus-minus w-25 me-2"
                          />
                        </div>
                        <div className="quickview-cart-plus-minus">
                          <input type="text" value="1" />
                        </div>
                        <div className="quickview-cart-plus-minus w-25">
                          <input
                            type="button"
                            value="+"
                            className="px-1 w-25"
                          />
                        </div>
                      </form>
                    </div>
                    <a href="cart.html" className="cart-btn">
                      add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="product-desc-wrap">
                  <ul className="nav nav-tabs" id="myTabTwo" role="tablist">
                    <li className="nav-item">
                      <a
                        href="#"
                        className="nav-link active"
                        id="description-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#description"
                        role="tab"
                        aria-controls="description"
                        aria-selected="true"
                      >
                        Description
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContentTwo">
                    <div
                      className="tab-pane fade show active"
                      id="description"
                      role="tabpanel"
                      aria-labelledby="description-tab"
                    >
                      <div className="product-desc-content">
                        <h4 className="title">Pure Go EAA</h4>
                        <p>
                          EAA is an advanced science-based solution that
                          contains 13 Ultra amino acids as well as hydration and
                          a vitamin booster combination. EAAs aid in muscle
                          growth and regeneration while also lowering fatigue
                          and soreness. This formula contains taurine, which
                          aids in muscle re-energizing and mending, as well as
                          citrulline, which aids in the oxygenation and
                          elimination of toxins from muscles.
                        </p>
                        <p>
                          This drink has a smooth and creamy texture thanks to
                          Ultra Granulation Technology. 13 Ultra Amino acids
                          help in muscle recovery Muscle Hydrating Electrolytes
                          help Hydrate Muscle Fibres for Proper Muscle & Nerve
                          Function Added Vitamin booster blend that aids Muscle
                          Growth and Health, Enhances Metabolism EAA is
                          vegetarian, caffeine and banned substance free with no
                          added sugar.
                        </p>
                        <h4 className="title">
                          What Are The Benefits Of Consuming Intra-Training
                          Drinks?
                        </h4>
                        <p>
                          Intra-training supplements are those energy drinks
                          that are consumed during training/workouts. They
                          contain ingredients that are readily absorbed by the
                          body to offer immediate effect with the aim to provide
                          delay intra-workout fatigue, hydration, optimize
                          muscle recovery and enhance performance.
                        </p>
                        <h4 className="title">How EAA Benefits?</h4>
                        <p>
                          Amino acids are organic substances that include
                          nitrogen, carbon, hydrogen, and oxygen, as well as a
                          variable side chain group. To develop and operate
                          properly, our bodies require 20 distinct amino acids,
                          out of which 9 are essential. Our bodies cannot
                          produce these 9 amino acids; thus, they must be
                          supplied through diet or supplementation, hence are
                          considered essential amino acids. The best EAA
                          supplement in India helps in increasing energy and
                          endurance, provides better muscle recovery, boosts
                          exercise and athletic performance, and better
                          hydration to the muscles.
                        </p>
                        <h4 className="title">How Does EAA Help?</h4>
                        <p>
                          EAA is an advanced science-based formula designed with
                          a complete spectrum of 9 essential amino acids with
                          added hydration and a vitamin booster blend. EAAs help
                          in muscle development and repair, as well as reducing
                          muscle fatigue and soreness. This formula contains
                          taurine, which aids in re-energizing and muscle
                          healing, as well as citrulline, which helps oxygenate
                          and eliminate toxins from muscles. The electrolytes
                          combination will aid in the hydration of muscle fibers
                          as well as healthy nerve and muscle function. The
                          Vitamin Booster combination promotes muscular growth
                          and metabolism. Designed with Ultra Granulation
                          Technology this drink has a smooth and creamy texture,
                          is banned substance free, and is available in
                          delicious flavor.
                        </p>
                        <h4 className="title">Who Can Opt For EAA?</h4>
                        <p>
                          EAA can be consumed during intra-training/ workout by
                          anyone who participates in sports, is body-building,
                          fitness enthusiast looking to improve performance and
                          recovery.
                        </p>
                        <h4 className="title">How To Use:</h4>
                        <p>
                          Add 1 scoop ( 10 gm ) of EAA in 400 - 420 ml of water
                          or your favorite drink. Mix well. Drink!
                        </p>
                        <h4 className="title">When To Use:</h4>
                        <p>During workouts or training</p>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="information"
                      role="tabpanel"
                      aria-labelledby="information-tab"
                    >
                      <div className="product-desc-content">
                        <table className="table table-sm">
                          <tbody>
                            <tr>
                              <th scope="row">Calories</th>
                              <td>110</td>
                            </tr>
                            <tr>
                              <th scope="row">Total Fat</th>
                              <td>1kg</td>
                            </tr>
                            <tr>
                              <th scope="row">Saturated Fat</th>
                              <td>0.5g</td>
                            </tr>
                            <tr>
                              <th scope="row">Cholesterol</th>
                              <td>40mg</td>
                            </tr>
                            <tr>
                              <th scope="row">Total Carbohydrate</th>
                              <td>2g</td>
                            </tr>
                            <tr>
                              <th scope="row">Protein</th>
                              <td>24g</td>
                            </tr>
                            <tr>
                              <th scope="row">Total Sugars</th>
                              <td>2g</td>
                            </tr>
                            <tr>
                              <th scope="row">Sodium</th>
                              <td>100mg</td>
                            </tr>
                            <tr>
                              <th scope="row">Calcium</th>
                              <td>140 mg</td>
                            </tr>
                            <tr>
                              <th scope="row">Potassium</th>
                              <td>160 mg</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="product-desc-wrap">
                  <ul className="nav nav-tabs" id="myTabTwo" role="tablist">
                    <li className="nav-item">
                      <a
                        href="#"
                        className="nav-link active"
                        id="description-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#description"
                        role="tab"
                        aria-controls="description"
                        aria-selected="true"
                      >
                        Additional information
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContentTwo">
                    <div
                      className="tab-pane fade show active"
                      id="information"
                      role="tabpanel"
                      aria-labelledby="information-tab"
                    >
                      <div className="product-desc-content">
                        <table className="table table-sm">
                          <tbody>
                            <tr>
                              <th scope="row">Calories</th>
                              <td>110</td>
                            </tr>
                            <tr>
                              <th scope="row">Total Fat</th>
                              <td>1kg</td>
                            </tr>
                            <tr>
                              <th scope="row">Saturated Fat</th>
                              <td>0.5g</td>
                            </tr>
                            <tr>
                              <th scope="row">Cholesterol</th>
                              <td>40mg</td>
                            </tr>
                            <tr>
                              <th scope="row">Total Carbohydrate</th>
                              <td>2g</td>
                            </tr>
                            <tr>
                              <th scope="row">Protein</th>
                              <td>24g</td>
                            </tr>
                            <tr>
                              <th scope="row">Total Sugars</th>
                              <td>2g</td>
                            </tr>
                            <tr>
                              <th scope="row">Sodium</th>
                              <td>100mg</td>
                            </tr>
                            <tr>
                              <th scope="row">Calcium</th>
                              <td>140 mg</td>
                            </tr>
                            <tr>
                              <th scope="row">Potassium</th>
                              <td>160 mg</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="product-desc-wrap">
                  <ul className="nav nav-tabs" id="myTabTwo" role="tablist">
                    <li className="nav-item">
                      <a
                        href="#"
                        className="nav-link active"
                        id="review-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#review"
                        role="tab"
                        aria-controls="review"
                        aria-selected="false"
                      >
                        Reviews
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContentTwo">
                    <div
                      className="tab-pane fade show active"
                      id="review"
                      role="tabpanel"
                      aria-labelledby="review-tab"
                    >
                      <div className="product-desc-content">
                        <div className="add-review">
                          <h4 className="title">Add a review</h4>
                          <form action="#">
                            <p>
                              Your email address will not be published.Required
                              fields are marked
                              <span>*</span>
                            </p>
                            <div className="from-grp">
                              <label for="name">
                                Your name <span>*</span>
                              </label>
                              <input type="text" id="name" />
                            </div>
                            <div className="from-grp">
                              <label for="email">
                                Your email <span>*</span>
                              </label>
                              <input type="text" id="email" />
                            </div>
                            <div className="from-grp checkbox-grp">
                              <input type="checkbox" id="checkbox" />
                              <label for="checkbox">
                                Don't show your email address
                              </label>
                            </div>
                            <div className="form-rating">
                              <label>your rating</label>
                              <ul className="list-wrap">
                                <li>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                </li>
                              </ul>
                            </div>
                            <div className="from-grp">
                              <label for="comment">
                                Write Your review <span>*</span>
                              </label>
                              <textarea
                                id="comment"
                                cols="30"
                                rows="10"
                              ></textarea>
                            </div>
                            <button className="btn">Submit Now</button>
                          </form>
                        </div>
                        <div className="reviews-comment">
                          <div className="review-info">
                            <div className="review-content">
                              <ul className="review-rating list-wrap">
                                <li>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                </li>
                              </ul>
                              <div className="review-meta">
                                <h6>
                                  Chenai Simon <span>-May 12, 2024</span>
                                </h6>
                              </div>
                              <p>
                                There are many variations of passages of lorem
                                ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable. If you are going to use a passage of
                                lorem ipsum.
                              </p>
                            </div>
                          </div>
                          <div className="review-info">
                            <div className="review-content">
                              <ul className="review-rating list-wrap">
                                <li>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="far fa-star"></i>
                                </li>
                              </ul>
                              <div className="review-meta">
                                <h6>
                                  Finn Castaneda <span>-June 17, 2024</span>
                                </h6>
                              </div>
                              <p>
                                There are many variations of passages of lorem
                                ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable. If you are going to use a passage of
                                lorem ipsum.
                              </p>
                            </div>
                          </div>
                          <div className="review-info">
                            <div className="review-content">
                              <ul className="review-rating list-wrap">
                                <li>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="far fa-star"></i>
                                </li>
                              </ul>
                              <div className="review-meta">
                                <h6>
                                  Bayley Robertson <span>-May 28, 2024</span>
                                </h6>
                              </div>
                              <p>
                                There are many variations of passages of lorem
                                ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or
                                randomised words which don't look even slightly
                                believable. If you are going to use a passage of
                                lorem ipsum.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <HomeNutritionFooter />
    </>
  );
}

export default PureGoEaa;
