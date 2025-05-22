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
import Features from "../../components/Features";
import MoreProduct from "../../components/MoreProduct";
import ProductSelectComponent from "../../components/productSelectComponent";
import BookButtonsContainer from "../../components/BookButtonsContainer";

function PureGoEaa() {
  const canonicalUrl = window.location.href;
  const [currentProduct, setCurrentProduct] = useState("250g-Watermelon");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState("250g");
  const [activeFlavor, setActiveFlavor] = useState("Watermelon");
  const [opacity, setOpacity] = useState(1);
  const imageRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [cartDataClick, setCartDataClick] = useState(false);
  const [fadingItem, setFadingItem] = useState(null);
  const [books, setBooks] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
        discount: "550",
        size: "250 g",
        dis_point: "73%",
      },
    },
  ];

  const sizeOptions = [{ id: "250g", label: "250g" }];

  const flavorOptions = [{ id: "Watermelon", label: "Watermelon" }];

  const handleSelectSize = (id) => {
    if (id === activeSize) return;
    setFadingItem(Date.now());
    setTimeout(() => {
      setActiveSize(id);
      setCurrentProduct(`${id}-${activeFlavor}`);
      setActiveImageIndex(0);
    }, 400);
  };

  const handleSelectFlavor = (id) => {
    if (id === activeFlavor) return;
    setFadingItem(Date.now());
    setTimeout(() => {
      setActiveFlavor(id);
      setCurrentProduct(`${activeSize}-${id}`);
      setActiveImageIndex(0);
    }, 400);
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

  const handleQuickBuy = async (quickProductData) => {
    try {
      const isLogin = localStorage.getItem("fg_group_user_authorization");
      if (!isLogin) {
        return openModal();
      }

      localStorage.setItem(
        "quickProductData",
        JSON.stringify(quickProductData)
      );

      window.location.href = "/check-out";
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMenu = async (data, e) => {
    e.preventDefault();
    try {
      let existingData = JSON.parse(localStorage.getItem("addItemInCart")) || {
        products: [],
      };
      const productExists = existingData.products.some(
        (product) => product.book_id === currentProductData.id
      );

      if (!productExists) {
        existingData.products.push({
          book_id: currentProductData.id,
        });
        localStorage.setItem("addItemInCart", JSON.stringify(existingData));
      }

      const isAuthenticated = localStorage.getItem(
        "fg_group_user_authorization"
      );

      if (!isAuthenticated) {
        localStorage.setItem("itemCartAdded", "true");
        setMenuOpen(false);
        setShowModal(true);
      } else {
        const response = await axiosInstance.post("/order-cart/add-item", {
          item_id: currentProductData.id,
          quantity: 1,
          item_type: "PURE_GO_MEAL_PRODUCT",
        });

        if (response.data.response === "OK") {
          setBooks(data);
          setMenuOpen(!menuOpen);
          localStorage.setItem("itemCartAdded", "false");
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const USPData = [
    {
      title: "FSSAI Approved",
      description:
        "Certified by FSSAI, ensuring safety and quality in every serving.",
    },
    {
      title: "Direct from Manufacturers",
      description:
        "Sourced straight from manufacturers for guaranteed freshness and quality.",
    },
    {
      title: "International Raw Protein Usage",
      description:
        "Uses globally sourced raw protein for consistent purity and quality.",
    },
  ];

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
        {/* Preconnect to Facebook CDN */}
        <link rel="preconnect" href="https://connect.facebook.net" />
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1144699046738070');
            fbq('track', 'PageView');
          `}
        </script>
        <noscript>
          {`<img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=1144699046738070&ev=PageView&noscript=1"
          />`}
        </noscript>
      </Helmet>
      {/* <LoaderComponent /> */}
      {showModal && <LoginModal onClose={closeModal} />}
      {fadingItem && <ProductSelectComponent fadingItem={fadingItem} />}
      <NutritionHeader />
      <button className="scroll-top scroll-to-target" data-target="html">
        <i className="fas fa-angle-up"></i>
      </button>
      <main className="main-area">
        <section className="inner-shop-details-area">
          <div className="container">
            <div className="row product-detail-main">
              <div className="col-lg-5">
                <div className="black-before">
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
                  <div className="mt-4 px-0 d-md-block d-none">
                    <img
                      src="/assets/images/government-approved.png"
                      alt="Approved By government"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-7 d-flex align-items-center mt-md-0 p-0">
                <div className="inner-shop-details-content">
                  <div className="px-0 d-md-none d-block">
                    <img
                      src="/assets/images/government-approved.png"
                      alt="Approved By government"
                    />
                  </div>
                  <div className="bg-product px-3 pb-3 pt-3">
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
                      <h2 className="price d-flex mb-0">
                        ₹{currentProductData.price}/-
                        {/* <span className="old-prices">
                          ₹{currentProductData.price}/-
                        </span> */}
                      </h2>
                      {/* <h5 className="stock-status">
                        ({currentProductData.dis_point} OFF)
                      </h5> */}
                    </div>
                    <p>
                      EAA is an advanced science-based solution that contains 13
                      Ultra amino acids as well as hydration and a vitamin
                      booster combination. EAAs aid in muscle growth and
                      regeneration while also lowering fatigue and soreness.
                    </p>
                    <div className="d-flex">
                      <div className="size-btn">
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
                    </div>
                    <div className="inner-shop-perched-info mt-3 row align-items-center ms-0">
                      <BookButtonsContainer
                        booksData={currentProductData}
                        books={books}
                        toggleMenu={toggleMenu}
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                        selectedBookId={currentProductData.id}
                      />
                      <button
                        onClick={() => handleQuickBuy(currentProductData)}
                        className="col-md-3 col-11 quick-buy-btn m-0 ms-md-3 mx-1 my-1"
                      >
                        <i class="fa-solid fa-bolt me-2"></i> Quick Buy
                      </button>
                    </div>
                    <h4 className="product-offer-title m-0 d-flex justify-content-md-start justify-content-center align-items-center text-yellow mt-3 me-2">
                      <img
                        src="/assets/images/discount.png"
                        alt="Special Offer"
                        width="24px"
                        className="me-1"
                      />
                      Hurry! Special Offer Available at Checkout.
                    </h4>
                  </div>
                  <div className="px-3">
                    <Features USPData={USPData} openModal={openModal} />
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
                        href="#0"
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
                        <h4 className="title">INGREDIENTS</h4>
                        <p>
                          EAA Blend (Essential Amino acid), Citric acid INS 330,
                          potassium Chloride INS 508, Silicon dioxide color -INS
                          122.
                        </p>
                        <h4 className="title">WHAT ARE EAA?</h4>
                        <p>
                          Essential Amino Acid Supplements are made of specific
                          Amino Acids that are considered Essential. Of the 20
                          Amino Acids, 9 are considered Essential with Leucine,
                          Valine and Isoleucine the BCAAs being amongst the most
                          well known EAAs. Remember that all BCAAs are EAAs, but
                          not all EAAs are BCAAs.
                        </p>
                        <h4 className="title">DIRECTIONS FOR EAA POWDER:</h4>
                        <p>
                          Consume 1 Scoop (05 gm) of EAA Powder with 200ml water
                          between meals, 30-45 minutes before workouts and/or
                          immediately after workouts. Combine with a sensible
                          diet and regular exercise. For best results consume 2
                          Scoop per day.
                        </p>
                        <h4 className="title">WARNINGS:</h4>
                        <p>
                          Keep out of reach of children. Do not use if pregnant
                          or nursing. Not intended for use by person under 18.
                          Consult a physician if you have been treated for or
                          diagnosed with or have a family history of any medical
                          condition. Do not use if safety seal on the package
                          has been broken.
                        </p>
                        <h4 className="title">NOT FOR MEDICINAL USE.</h4>
                        <h4 className="title">STORAGE:</h4>
                        <p>
                          Store in Cool & dry place. Keep away from direct
                          sunlight, heat & moisture. Keep the bottle tightly
                          closed.
                        </p>
                        <h4 className="title">ALLERGEN ADVICE:</h4>
                        <p>
                          This product contains EAA blend and is not recommended
                          for those with EAA blend intolerance.
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
                        href="#0"
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
        <section>
          <div className="d-md-block d-none">
            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/images/direct-by-menufacturer.webp"
              }
              alt="shape"
              width="100%"
            />
          </div>
          <div className="d-md-none d-block">
            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/images/direct-by-menufacturer-mobile.webp"
              }
              alt="shape"
              width="100%"
            />
          </div>
        </section>
        <MoreProduct
          setCartDataClick={setCartDataClick}
          cartDataClick={cartDataClick}
        />
        <HowToUse
          src1="production/files/FILE-step-1-4fdcb85a-3191-4a19-a673-3e21a1a7d4ec.mp4"
          src2="production/files/FILE-eaa-step-2-7013d98c-a798-4e1d-9c1a-7f544e4a320b.mp4"
          src3="production/files/FILE-step-3-e3d1f5ef-c77b-480a-bc5b-40d08de3b62f.mp4"
          src4="production/files/FILE-eaa-step-4-1222829e-e0b0-4e00-9ad1-31b7990da124.mp4"
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
                        href="#0"
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
