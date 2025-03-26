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
import NutritionReviewSection from "../../components/partials/review/nutrition-review";
import { axiosInstance } from "../../assets/js/config/api";
import HowToUse from "../../components/howToUse";

function PureGoCreatine() {
  const canonicalUrl = window.location.href;

  const [selectedImage, setSelectedImage] = useState(
    process.env.PUBLIC_URL + "/assets/images/products/creatine/creatine-1.webp"
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
                  <h2 className="title">Creatine Monohydrate</h2>
                  <nav aria-label="Breadcrumbs" className="breadcrumb-trail">
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item trail-item trail-begin">
                        <a href="/">
                          <span>Home</span>
                        </a>
                      </li>
                      <li className="breadcrumb-item trail-item trail-end">
                        <span>Creatine Monohydrate</span>
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
                    <h2 className="price">₹350.00</h2>
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
                    <button
                      onClick={() =>
                        addProductInCart("67483a501d93a5dadbb229e4")
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
                              <th scope="row">
                                Creatine Monohydrate (Micronised)
                              </th>
                              <td>4.5 gm</td>
                            </tr>
                            <tr>
                              <th scope="row">Citric Acid</th>
                              <td>INS 330</td>
                            </tr>
                            <tr>
                              <th scope="row">Sucralose</th>
                              <td>INS 955</td>
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

export default PureGoCreatine;
