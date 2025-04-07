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

function PureGoCreatine() {
  const canonicalUrl = window.location.href;
  const [currentProduct, setCurrentProduct] = useState("250g-Lemon");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState("250g");
  const [activeFlavor, setActiveFlavor] = useState("Lemon");
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
    "250g-Lemon": [
      "/assets/images/products/creatine/creatine-1.webp",
      "/assets/images/products/creatine/creatine-2.webp",
      "/assets/images/products/creatine/creatine-3.webp",
      "/assets/images/products/creatine/creatine-4.webp",
    ],
  };

  const products = [
    {
      key: "250g-Lemon",
      data: {
        id: "67e773f463f930dcc6a27155",
        img: "/assets/images/products/creatine/creatine-1.webp",
        name: "Creatine Monohydrate",
        price: "1499",
        discount: "350",
        size: "250 g",
        dis_point: "15%",
      },
    },
  ];

  const sizeOptions = [{ id: "250g", label: "250g" }];

  const flavorOptions = [{ id: "Lemon", label: "Lemon" }];

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
                    Creatine monohydrate works by increasing the body's stores
                    of phosphocreatine, a molecule that helps regenerate
                    adenosine triphosphate, the primary energy source for muscle
                    contractions during high-intensity activities like
                    weightlifting and sprinting.
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
          src2="atp-step-2.mp4"
          src3="step-3.mp4"
          src4="atp-step-4.mp4"
          step1="Add 300 ml of water"
          step2="Mix 1 scoop of Creatine Monohydrate"
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

export default PureGoCreatine;
