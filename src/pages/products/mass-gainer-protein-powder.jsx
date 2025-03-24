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

function PureGoMassGainer() {
  const canonicalUrl = window.location.href;

  const [selectedImage, setSelectedImage] = useState(
    process.env.PUBLIC_URL +
    "/assets/images/products/mass-gainer/mass-gainer-1.webp"
  );

  return (
    <>
      <Helmet>
        <title>Best Mass Gainer Protein Powder for Muscle & Weight Gain</title>
        <meta
          name="description"
          content="Boost muscle growth and healthy weight gain with the best mass gainer protein powder. Find top-quality options for fast results!"
        />
        <meta
          name="keyword"
          content="whey protein powder, whey protein, protein powder, chocolate flavour, best protein powder, whey powder, whey protein isolate, best protein powder for women, plant based protein powder, protein powder for weight loss, best protein powder for weight loss, whey isolate protein powder, isolate protein, best whey protein powder, best whey protein, mass gainer protein powder, chocolate protein powder, best protein powder for muscle gain, protein supplements, protein powder for women"
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
                        "/assets/images/products/mass-gainer/mass-gainer-1.webp",
                        "/assets/images/products/mass-gainer/mass-gainer-2.webp",
                        "/assets/images/products/mass-gainer/mass-gainer-3.webp",
                        "/assets/images/products/mass-gainer/mass-gainer-4.webp",
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
                  <h4 className="title">Lean Whey Gainer</h4>
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
                    Achieve Your Bulking Goals with Pure Go Mass Gainer Powder.
                    Our specially formulated blend is designed to support muscle
                    growth, weight gain, and overall performance for
                    bodybuilders and fitness enthusiasts seeking to pack on size
                    and strength effectively.
                  </p>
                  <div>
                    <h4>Flavor:</h4>
                    <button className="cart-btn">Chocolate</button>
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
                    <a href="/add-to-cart" className="cart-btn">
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
                        <h4 className="title">Pure Go Mass Gainer Powder</h4>
                        <p>
                          Achieve Your Bulking Goals with Pure Go Mass Gainer
                          Powder. Our specially formulated blend is designed to
                          support muscle growth, weight gain, and overall
                          performance for bodybuilders and fitness enthusiasts
                          seeking to pack on size and strength effectively.
                        </p>
                        <h4 className="title">
                          Performance-Enhancing Formula:
                        </h4>
                        <p>
                          Our meticulously crafted blend provides an optimal
                          combination of nutrients for maximum results. Each
                          serving delivers a powerful 17.5 grams of premium
                          protein, including a blend of fast and slow-digesting
                          proteins, ensuring sustained amino acid delivery for
                          muscle recovery and growth. The strategic mix of
                          carbohydrates and healthy fats provides the necessary
                          energy for intense workouts and promotes weight gain
                          effectively.
                        </p>
                        <h4 className="title mb-2">Key Benefits:</h4>
                        <div>
                          <h6 className="sub-title d-contents">
                            Muscle Growth:{" "}
                          </h6>
                          <p className="sub-title ms-2">
                            Our meticulously crafted blend provides an optimal
                            combination of nutrients for maximum results. Each
                            serving delivers a powerful 17.5 grams of premium
                            protein, including a blend of fast and
                            slow-digesting proteins, ensuring sustained amino
                            acid delivery for muscle recovery and growth. The
                            strategic mix of carbohydrates and healthy fats
                            provides the necessary energy for intense workouts
                            and promotes weight gain effectively.
                          </p>
                        </div>
                        <div>
                          <h6 className="sub-title d-contents">
                            Healthy Metabolism:{" "}
                          </h6>
                          <p className="sub-title ms-2">
                            Fortified with essential vitamins and minerals, our
                            mass gainer supports overall health and metabolism,
                            ensuring optimal function during intense training.
                          </p>
                        </div>
                        <div className="mb-3">
                          <h6 className="sub-title d-contents">
                            Reduced Muscle Loss:{" "}
                          </h6>
                          <p className="sub-title ms-2">
                            By providing a steady supply of nutrients, our
                            formula helps minimize muscle breakdown, preserving
                            hard-earned gains and promoting muscle retention
                            effectively.
                          </p>
                        </div>
                        <h4 className="title mb-2">Ideal Usage:</h4>
                        <div>
                          <h6 className="sub-title d-contents">
                            Pre-Workout:{" "}
                          </h6>
                          <p className="sub-title ms-2">
                            Consume a serving approximately 30 minutes before
                            your workout to prime your body with essential
                            nutrients for optimal performance.
                          </p>
                        </div>
                        <div>
                          <h6 className="sub-title d-contents">
                            Post-Workout:{" "}
                          </h6>
                          <p className="sub-title ms-2">
                            Replenish your muscles immediately after your
                            workout to kickstart the recovery process and
                            support muscle repair and growth effectively.
                          </p>
                        </div>
                        <div className="mb-3">
                          <h6 className="sub-title d-contents">
                            Between Meals:{" "}
                          </h6>
                          <p className="sub-title ms-2">
                            Use as a convenient and nutritious snack between
                            meals to increase calorie intake and promote weight
                            gain efficiently.
                          </p>
                        </div>
                        <h4 className="title">How to Consume:</h4>
                        <p>
                          Simply mix that can1 heaping scoop (approximately 80
                          grams) with 180-200ml of water or milk in a shaker
                          bottle or blender until smooth and creamy. Enjoy the
                          delicious and nutritious shake as part of your daily
                          routine to fuel your gains effectively.
                        </p>
                        <h4 className="title">Safe and Trusted:</h4>
                        <p>
                          Our commitment to delivering clean and safe
                          supplements means our formula is free from artificial
                          colors, GMOs, banned substances, and amino spiking,
                          ensuring only the highest quality ingredients for your
                          fitness goals.
                        </p>
                        <h4 className="title">
                          Your Ultimate Workout Partner:
                        </h4>
                        <p>
                          Trust Pure Go Mass Gainer Powder to fuel your gains
                          and elevate your performance to the next level. With
                          our uncompromising commitment to quality and taste,
                          each shake mixes effortlessly and tastes consistently
                          delicious, providing you with the perfect workout
                          companion every time. By highlighting these points in
                          a more engaging and effective manner, potential
                          customers are more likely to understand the benefits
                          of Pure Go Mass Gainer Powder and feel motivated to
                          incorporate it into their fitness routine.
                        </p>
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
                              <th scope="row">Energy (kcal)</th>
                              <td>262.5</td>
                            </tr>
                            <tr>
                              <th scope="row">Total Protein (g)</th>
                              <td>17.5</td>
                            </tr>
                            <tr>
                              <th scope="row">Carbohydrates (g)</th>
                              <td>73.2</td>
                            </tr>
                            <tr>
                              <th scope="row">Added Sugar (g)</th>
                              <td>0</td>
                            </tr>
                            <tr>
                              <th scope="row">Dietary Fibre (g)</th>
                              <td>1.15</td>
                            </tr>
                            <tr>
                              <th scope="row">Total Fat (g)</th>
                              <td>1.09</td>
                            </tr>
                            <tr>
                              <th scope="row">Saturated fatty acid (mg)</th>
                              <td>0.47</td>
                            </tr>
                            <tr>
                              <th scope="row">Polyunsaturated fatty acid (g)</th>
                              <td>0.38</td>
                            </tr>
                            <tr>
                              <th scope="row">Monounsaturated fatty acid (mg)</th>
                              <td>0.97</td>
                            </tr>
                            <tr>
                              <th scope="row">Trans Fatty Acid (g)</th>
                              <td>0.07</td>
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

export default PureGoMassGainer;
