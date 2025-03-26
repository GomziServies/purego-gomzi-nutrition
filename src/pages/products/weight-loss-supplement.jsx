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
import NutritionReviewSection from "../../components/partials/review/nutrition-review";
import { axiosInstance } from "../../assets/js/config/api";
import HowToUse from "../../components/howToUse";

function PureGoPreWorkout() {
  const canonicalUrl = window.location.href;

  const [selectedImage, setSelectedImage] = useState(
    process.env.PUBLIC_URL +
    "/assets/images/products/pre-workout/pre-workout-1.webp"
  );

  const addProductInCart = async (product_id) => {
    try {
      const response = await axiosInstance.post("/order-cart/add-item", {
        item_id: product_id,
        quantity: 1,
        item_type: "PURE_GO_MEAL_PRODUCT",
      });
      if (response.data.response === "OK") {
        window.location.href = "/add-to-cart";
      }
    } catch (error) {
      console.error(error);
    }
  };

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
                  <h2 className="title">Pre Workout</h2>
                  <nav aria-label="Breadcrumbs" className="breadcrumb-trail">
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item trail-item trail-begin">
                        <a href="/">
                          <span>Home</span>
                        </a>
                      </li>
                      <li className="breadcrumb-item trail-item trail-end">
                        <span>Pre Workout</span>
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
                    <h2 className="price">₹440.00</h2>
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
                    <button
                      onClick={() =>
                        addProductInCart("674b01f227420607a74da20c")
                      }
                      className="cart-btn"
                    >
                      add to cart
                    </button>
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
                              <th scope="row">L-CITRULLINE</th>
                              <td>2.26 gm</td>
                            </tr>
                            <tr>
                              <th scope="row">L-ARGININE</th>
                              <td>0.45 gm</td>
                            </tr>
                            <tr>
                              <th scope="row">L-TAURINE</th>
                              <td>0.36 gm</td>
                            </tr>
                            <tr>
                              <th scope="row">B-ALANINE</th>
                              <td>0.36 gm</td>
                            </tr>
                            <tr>
                              <th scope="row">CAFFEINE ANHYDROUS</th>
                              <td>0.18 gm</td>
                            </tr>
                            <tr>
                              <th scope="row">GREEN TEA EXTRACT</th>
                              <td>0.10 gm</td>
                            </tr>
                            <tr>
                              <th scope="row">GREEN COFFEE EXTRACT</th>
                              <td>0.10 gm</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <HowToUse
          src1="step-1.mp4"
          src2="step-2.mp4"
          src3="step-3.mp4"
          src4="step-4.mp4"
          step1="Add 300 ml of water/milk"
          step2="Mix 1 scoop of Protein"
        />
        <section className="inner-shop-details-area">
          <div className="container">
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
                      <NutritionReviewSection product_id="660e4e81d8ff4f8d9f2a51da" />
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
