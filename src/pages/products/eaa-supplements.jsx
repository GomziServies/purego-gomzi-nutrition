import React, { useState, useRef } from "react";
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
import NutritionReviewSection from "../../components/partials/review/nutrition-review";
import { axiosInstance } from "../../assets/js/config/api";
import HowToUse from "../../components/howToUse";
import SelectableList from "../../components/SelectableList";
import Review from "../../components/review";
import ProductPhotoSection1 from "../../components/ProductPhotoSection1";
import LoginModal from "../../assets/js/popup/login";

function PureGoEaa() {
  const canonicalUrl = window.location.href;
  const [currentProduct, setCurrentProduct] = useState("250g-Watermelon");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState("250g");
  const [activeFlavor, setActiveFlavor] = useState("Watermelon");
  const [opacity, setOpacity] = useState(1);
  const imageRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const productImages = {
    "250g-Watermelon": [
      "/assets/images/products/eaa/eaa-1.webp",
      "/assets/images/products/eaa/eaa-2.webp",
      "/assets/images/products/eaa/eaa-3.webp",
      "/assets/images/products/eaa/eaa-4.webp",
    ],
  };

  const products = [
    {
      key: "250g-Watermelon",
      data: {
        id: "67e7742d63f930dcc6a27159",
        img: "/assets/images/products/eaa/eaa-1.webp",
        name: "EAA Powder",
        price: "2099",
        discount: "490",
        size: "250 g",
        dis_point: "15%",
      },
    },
  ];

  const sizeOptions = [{ id: "250g", label: "250g" }];

  const flavorOptions = [{ id: "Watermelon", label: "Watermelon" }];

  const handleSelectSize = (id) => {
    setOpacity(0.3);
    setTimeout(() => {
      setActiveSize(id);
      setCurrentProduct(`${id}-${activeFlavor}`);
      setActiveImageIndex(0);
      setOpacity(1);
    }, 500);
  };

  const handleSelectFlavor = (id) => {
    setOpacity(0.3);
    setTimeout(() => {
      setActiveFlavor(id);
      setCurrentProduct(`${activeSize}-${id}`);
      setActiveImageIndex(0);
      setOpacity(1);
    }, 500);
  };

  const currentProductData =
    products.find((product) => product.key === currentProduct)?.data || {};

  const addProductInCart = async (product_id) => {
    try {
      const isLogin = localStorage.getItem("fg_group_user_authorization");
      if (!isLogin) {
        return openModal();
      }
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
        <meta
          property="og:image"
          content="https://www.purego.gomzilifesciences.in/assets/process.env.PUBLIC_URL + '/assets/images/nutrition-logo.png"
        />
        <link rel="canonical" href={{ canonicalUrl }} />
      </Helmet>
      {/* <LoaderComponent /> */}
      {showModal && <LoginModal onClose={closeModal} />}
      <NutritionHeader />
      <button className="scroll-top scroll-to-target" data-target="html">
        <i className="fas fa-angle-up"></i>
      </button>
      <main className="main-area fix">
        <section className="inner-shop-details-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div
                  className="product-image-container"
                  ref={imageRef}
                  style={{
                    opacity: opacity,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                >
                  <ProductPhotoSection1
                    images={productImages[currentProduct]}
                    activeImageIndex={activeImageIndex}
                    setActiveImageIndex={setActiveImageIndex}
                  />
                </div>
              </div>
              <div className="col-lg-7 d-flex align-items-center">
                <div className="inner-shop-details-content">
                  <h4 className="title">{currentProductData.name}</h4>
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
                    <h2 className="price d-flex">
                      ₹{currentProductData.discount}/-
                      <span className="old-prices">
                        ₹{currentProductData.price}/-
                      </span>
                    </h2>
                    <h5 className="stock-status">76%</h5>
                  </div>
                  <p>
                    EAA is an advanced science-based solution that contains 13
                    Ultra amino acids as well as hydration and a vitamin booster
                    combination. EAAs aid in muscle growth and regeneration
                    while also lowering fatigue and soreness.
                  </p>
                  <div>
                    <SelectableList
                      items={sizeOptions}
                      activeItem={activeSize}
                      onItemClick={handleSelectSize}
                      title="Size"
                    />
                  </div>
                  <div>
                    <SelectableList
                      items={flavorOptions}
                      activeItem={activeFlavor}
                      onItemClick={handleSelectFlavor}
                      title="Flavor"
                    />
                  </div>
                  <div className="inner-shop-perched-info mt-3">
                    <button
                      onClick={() => addProductInCart(products[0].data.id)}
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
                              <th scope="row">CALORIES</th>
                              <td>6.12 Kcal</td>
                            </tr>
                            <tr>
                              <th scope="row">TOTAL CARBOHYDRATE</th>
                              <td>0.20 gm</td>
                            </tr>
                            <tr>
                              <th scope="row">TOTAL SUGAR</th>
                              <td>0</td>
                            </tr>
                            <tr>
                              <th scope="row">ADDED SUGAR</th>
                              <td>0</td>
                            </tr>
                            <tr>
                              <th scope="row">PROTEIN</th>
                              <td>0</td>
                            </tr>
                            <tr>
                              <th scope="row">TOTAL FAT</th>
                              <td>0</td>
                            </tr>
                            <tr>
                              <th scope="row">
                                ESSENTIAL AMINO ACIDS (EAA BLEND)
                              </th>
                              <td>7.8 gm</td>
                            </tr>
                            <tr>
                              <th scope="row">L-LEUCINE</th>
                              <td>1.73 gm</td>
                            </tr>
                            <tr>
                              <th scope="row">L-ISOLEUCINE</th>
                              <td>0.86 gm</td>
                            </tr>
                            <tr>
                              <th scope="row">L-VALINE</th>
                              <td>0.86 gm</td>
                            </tr>
                            <tr>
                              <th scope="row">L-LYSINE</th>
                              <td>288.88 mg</td>
                            </tr>
                            <tr>
                              <th scope="row">L-THREONINE</th>
                              <td>288.88 mg</td>
                            </tr>
                            <tr>
                              <th scope="row">L-PHENYLALANINE</th>
                              <td>150.22 mg</td>
                            </tr>
                            <tr>
                              <th scope="row">L-HISTIDINE</th>
                              <td>115.55 mg</td>
                            </tr>
                            <tr>
                              <th scope="row">L-TRYPTOPHAN</th>
                              <td>86.66 mg</td>
                            </tr>
                            <tr>
                              <th scope="row">DL-METHIONINE</th>
                              <td>52 mg</td>
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
          src2="eaa-step-2.mp4"
          src3="step-3.mp4"
          src4="eaa-step-4.mp4"
          step1="Add 300 ml of water"
          step2="Mix 1 scoop of EAA"
        />
        <Review />
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
                      <NutritionReviewSection
                        product_id={products[0].data.id}
                      />
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
