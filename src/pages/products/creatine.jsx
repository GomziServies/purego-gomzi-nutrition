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
import { Link } from "react-router-dom";

function PureGoCreatine() {
  const canonicalUrl = window.location.href;

  const [selectedImage, setSelectedImage] = useState(
    process.env.PUBLIC_URL + "/assets/images/products/creatine/creatine-1.webp"
  );

  return (
    <>
      <Helmet>
        <title>Best Creatine Supplements for Muscle Growth & Strength</title>
        <meta
          name="description"
          content="Discover the best creatine supplements to boost muscle growth, enhance strength, and improve performance. Shop top picks today!"
        />
        <meta
          name="keyword"
          content="creatine, creatine monohydrate, micronised, muscle building, best creatine, best creatine for men, best creatine monohydrate, creatine powder, creatine monohydrate powder, best protein powder for muscle gain, best muscle building supplements, muscle building supplements, creatine for women, creatine supplements, micronized creatine, bodybuilding supplements, best creatine for muscle growth, best creatine supplement, muscle growth supplements, micronized creatine monohydrate, best protein powder for muscle growth"
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
                        "/assets/images/products/creatine/creatine-1.webp",
                        "/assets/images/products/creatine/creatine-2.webp",
                        "/assets/images/products/creatine/creatine-3.webp",
                        "/assets/images/products/creatine/creatine-4.webp",
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
                  <h4 className="title">Creatine Monohydrate</h4>
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
                    Creatine monohydrate works by increasing the body's stores
                    of phosphocreatine, a molecule that helps regenerate
                    adenosine triphosphate, the primary energy source for muscle
                    contractions during high-intensity activities like
                    weightlifting and sprinting.
                  </p>
                  <div>
                    <h4>Flavor:</h4>
                    <button className="cart-btn">Lemon</button>
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
                    <Link to="/add-to-cart" className="cart-btn">
                      add to cart
                    </Link>
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
                        <h4 className="title">Pure Go Creatine Monohydrate</h4>
                        <p>
                          Creatine monohydrate works by increasing the body's
                          stores of phosphocreatine, a molecule that helps
                          regenerate adenosine triphosphate, the primary energy
                          source for muscle contractions during high-intensity
                          activities like weightlifting and sprinting.
                        </p>
                        <h4 className="title">
                          When To Consume Creatine Monohydrate?
                        </h4>
                        <p>
                          Creatine is a compelling intra and post-exercise
                          supplements. This implies that you ought to be
                          consuming these during your exercise center meeting or
                          following. This is because they are viable in
                          assisting with building and fixing muscle harms from
                          serious meetings. These impact the top around 30 to an
                          hour post utilization. In turn, you should drink your
                          supplements during that window to help build muscle
                          and improve muscle recovery. This will assist with
                          muscle irritation post-exercise.
                        </p>
                        <h4 className="title">
                          Precautions To Take When Consuming Creatine Powder:
                        </h4>
                        <ul className="product-desc-list list-wrap">
                          <li>
                            Following precautions must be taken when using
                            creatine supplements either as pre-workout or
                            post-workout.
                          </li>
                          <li>
                            Creatine supplements might obstruct blood glucose
                            levels during and after medical procedures. You may
                            likewise be at expanded risk if you have persistent
                            liquor addiction or fanned-chain ketoaciduria.
                          </li>
                          <li>
                            Also, if you're pregnant or breastfeeding, don't
                            indulge in creatine intake. These ought to be
                            utilised warily previously or during exercises that
                            require engine coordination, like driving.
                          </li>
                          <li>
                            Creatine powder could likewise cause stomach issues,
                            including sickness, loose bowels, and swelling.
                          </li>
                          <li>
                            You should likewise peruse the mark of the item
                            cautiously to guarantee that you defeat results and
                            face no difficulties in the later stages.
                          </li>
                          <li>
                            It is important to consult a doctor before you begin
                            with any kind of intake as he can guide you on your
                            dosage and intake frequency based on your medical
                            conditions.
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

export default PureGoCreatine;
