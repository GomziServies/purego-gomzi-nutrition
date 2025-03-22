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

function PureGoPreWorkout() {
  const canonicalUrl = window.location.href;

  const [selectedImage, setSelectedImage] = useState(
    process.env.PUBLIC_URL +
      "/assets/images/products/pre-workout/pre-workout-1.webp"
  );

  return (
    <>
      <Helmet>
        <title>Best Weight Loss Supplements for Fast & Effective Results</title>
        <meta
          name="description"
          content="Discover the best weight loss supplements to burn fat, boost metabolism, and achieve your fitness goals faster. Shop now!"
        />
        <meta
          name="keyword"
          content="preworkout, fat burner, amino acid, workout, fruit punch, weight loss supplement, bodybuilding supplement, best pre workout, best weight loss supplements, best fat burner for men, protein powder for weight loss, best protein powder for weight loss, best fat burner for women, pre workout powder, best fat burner, best supplements for weight loss female, best pre workout for men, fat burner for women"
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
                        "/assets/images/products/pre-workout/pre-workout-1.webp",
                        "/assets/images/products/pre-workout/pre-workout-2.webp",
                        "/assets/images/products/pre-workout/pre-workout-3.webp",
                        "/assets/images/products/pre-workout/pre-workout-4.webp",
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
                  <h4 className="title">Pre Workout</h4>
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
                    It will suppress your appetite and provide you with a higher
                    energy level in order to keep the adrenaline levels up. It
                    will also boost your metabolism and burn calories for you.
                  </p>
                  <div>
                    <h4>Flavor:</h4>
                    <button className="cart-btn">Fruit Punch</button>
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
                        <h4 className="title">Pure Go Pre Workout</h4>
                        <p>
                          It will suppress your appetite and provide you with a
                          higher energy level in order to keep the adrenaline
                          levels up. It will also boost your metabolism and burn
                          calories for you. For permanent weight loss, it is
                          recommended to use a fat burner which helps to reduce
                          fat faster. Ignite The Fat Burner Pre-Workout is a
                          sophisticated and comprehensive pre-workout fat burner
                          supplement.
                        </p>
                        <p>
                          Delivering intense energy, supercharged strength, and
                          power, heightened focus, vein-popping pump and
                          endurance, and superior workouts with enhanced
                          thermogenic and fat-burning properties are just a few
                          of the benefits of its uniquely developed formula. For
                          athletes of all levels, Ignite The Fat Burner
                          Pre-Workout is a highly stimulating and effective
                          pre-workout fat-burning supplement that can assist
                          maximize workout performance, burning fat more
                          quickly, and pushing your body beyond previous
                          boundaries.
                        </p>
                        <h4 className="title">BENEFITS:</h4>
                        <ul className="product-desc-list list-wrap">
                          <li>
                            Experience real results & better performance with
                            fat burning ingredients.
                          </li>
                          <li>
                            Clinically proven & versatile supplement solution.
                          </li>
                          <li>Controls Appetite & Hunger.</li>
                        </ul>
                        <h4 className="title mt-4">Caution:</h4>
                        <ul className="product-desc-list list-wrap">
                          <li>
                            Not for use by persons under the age of 18 years.
                          </li>
                          <li>
                            Consult your doctor in case you are taking any
                            medication.
                          </li>
                          <li>
                            This product is not intended to diagnose, treat,
                            cure or prevent any disease.
                          </li>
                          <li>Do not exceed recommended serving size.</li>
                          <li>Store in a cool and dry place.</li>
                          <li>Keep out of reach of children.</li>
                          <li>
                            This product is not to be used as a substitute for a
                            varied diet. Not recommended for children, pregnant
                            or lactating women. and people sensitive to
                            caffeine.
                          </li>
                        </ul>
                        <h4 className="title mt-4">Direction For Use?</h4>
                        <ul className="product-desc-list list-wrap">
                          <li>
                            Take 5g (scoop for beginners) once a day with 200 -
                            220 ml chilled water for an adult or as per
                            Healthcare Expert.
                          </li>
                          <li>
                            Take 10g (scoop for professionals) once a day with
                            380 - 400 ml for an adult or as per Healthcare
                            Expert.
                          </li>
                        </ul>
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
                        Reviews (3)
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
                                Don’t show your email address
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
                                randomised words which don’t look even slightly
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
                                randomised words which don’t look even slightly
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
                                randomised words which don’t look even slightly
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

export default PureGoPreWorkout;
