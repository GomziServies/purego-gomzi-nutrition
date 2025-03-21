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

function PureGoWheyProtein() {
  const canonicalUrl = window.location.href;

  const product = {
    chocolate: [
      "/assets/images/products/whey-protein/whey-protein-chocolate-1.webp",
      "/assets/images/products/whey-protein/whey-protein-chocolate-2.webp",
      "/assets/images/products/whey-protein/whey-protein-chocolate-3.webp",
      "/assets/images/products/whey-protein/whey-protein-chocolate-4.webp",
    ],
    mawa_kulfi: [
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-1.webp",
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-2.webp",
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-3.webp",
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-4.webp",
    ],
    mocha_coffee: [
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-1.webp",
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-2.webp",
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-3.webp",
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-4.webp",
    ],
  };

  // Default selected flavor is Chocolate
  const [selectedFlavor, setSelectedFlavor] = useState("chocolate");
  const [selectedImage, setSelectedImage] = useState(
    product[selectedFlavor][0]
  );

  return (
    <>
      <Helmet>
        <title>Top Whey Protein Powder for Muscle Growth & Recovery</title>
        <meta
          name="description"
          content="Find the best whey protein powder to support muscle growth, boost recovery, and enhance performance. Shop top picks now!"
        />
        <meta
          name="keyword"
          content="whey protein isolate, best protein powder for women, plant based protein powder, protein powder for weight loss, best protein powder for weight loss, isolate protein, whey isolate protein powder, best whey protein powder, best whey protein, mass gainer protein powder, best protein powder for muscle gain, protein, bcaa, eaa, isolate, concentrate, whey protein, protein powder, best protein powder, whey protein powder, whey isolate, plant based protein, bcaa powder"
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
                    <div className="inner-shop-details-img">
                      <img src={selectedImage} alt="Selected" />
                    </div>
                  </div>
                  <div className="inner-shop-details-nav-wrap">
                    <ul className="nav nav-tabs">
                      {product[selectedFlavor].map((image, index) => (
                        <li className="nav-item" key={index}>
                          <a
                            href="#"
                            className="nav-link"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedImage(image);
                            }}
                          >
                            <img src={image} alt="Thumbnail" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 d-flex align-items-center">
                <div className="inner-shop-details-content">
                  <h4 className="title">Whey Protein Chocolate</h4>
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
                    Pure Go Whey Protein is a Mixture of Whey Isolate, Whey
                    Concentrate, Skimmed Milk powder, Soy protein isolate and
                    plant protein. It is packed with 24g of 100% High Quality
                    whey protein per serving (30g scoop). The benchmark and
                    premium source of protein powders.
                  </p>
                  <div>
                    <h4>Flavor:</h4>
                    <button
                      className="cart-btn"
                      onClick={() => {
                        setSelectedFlavor("chocolate");
                        setSelectedImage(product.chocolate[0]);
                      }}
                    >
                      Chocolate
                    </button>
                    <button
                      className="cart-btn"
                      onClick={() => {
                        setSelectedFlavor("mawa_kulfi");
                        setSelectedImage(product.mawa_kulfi[0]);
                      }}
                    >
                      Mawa Kulfi
                    </button>
                    <button
                      className="cart-btn"
                      onClick={() => {
                        setSelectedFlavor("mocha_coffee");
                        setSelectedImage(product.mocha_coffee[0]);
                      }}
                    >
                      Mocha Coffee
                    </button>
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
                        <h4 className="title">Whey Protein</h4>
                        <p>
                          Pure Go Whey Protein is a Mixture of Whey Isolate,
                          Whey Concentrate, Skimmed Milk powder, Soy protein
                          isolate and plant protein. It is packed with 24g of
                          100% High Quality whey protein per serving (30g
                          scoop). The benchmark and premium source of protein
                          powders. Each serving delivers an excellent course of
                          naturally occurring essential amino acids and Branch
                          Chain Amino Acids (BCAA's). The protein found in
                          Performance Whey Blend help support the growth and
                          maintenance of lean muscle mass, ideal for everyone.
                        </p>
                        <h4 className="title">
                          BETTER INGREDIENTS = BETTER RESULTS
                        </h4>
                        <h4 className="title">NO COLORS:</h4>
                        <p>
                          Pure Go Whey Protein does not contain any COLOR or
                          PRESERVATIVES.
                        </p>
                        <h4 className="title">NO ADDED SUGAR:</h4>
                        <p>
                          Pure Go Whey Protein does not Contain any Added SUGAR.
                        </p>
                        <h4 className="title">CONTAINS SUCRALOSE:</h4>
                        <p>
                          It also contains SUCRALOSE as a sweetening agent and
                          may taste bitter due to its natural properties.
                        </p>
                        <h4 className="title">TRUSTIFIED CERTIFIED:</h4>
                        <p>
                          Blind Testing for Protein & Macro Accuracy, Tested for
                          Amino Spiking & Heavy Metals.
                        </p>
                        <h4 className="title">DIRECTIONS:</h4>
                        <p>
                          Add one rounded scoop (30 gm) of Whey Protein to 180 -
                          200 ml of your favorite liquid such as water, skim
                          milk or almond milk. Stir with a spoon or shake in a
                          shaker for 20-25 seconds until protein powder fully
                          dissolves.
                        </p>
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

export default PureGoWheyProtein;
