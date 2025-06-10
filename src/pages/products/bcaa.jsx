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
import AddToCartButtonsContainer from "../../components/AddToCartButtonsContainer";
import AddToCartPopUp from "../../components/AddToCartPopUp";
import GymVideo from "../../components/GymVideo";

function PureGoBCAA() {
  const canonicalUrl = window.location.href;
  const [currentProduct, setCurrentProduct] = useState("250g-Orange");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState("250g");
  const [activeFlavor, setActiveFlavor] = useState("Orange");
  const [opacity, setOpacity] = useState(1);
  const imageRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [cartDataClick, setCartDataClick] = useState(false);
  const [fadingItem, setFadingItem] = useState(null);
  const [addToCartProducts, setAddToCartProducts] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [clickATC, setClickATC] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const productImages = {
    "250g-Orange": [
      "/assets/images/products/bcaa/bcaa-orange-1.webp",
      "/assets/images/products/bcaa/bcaa-orange-3.webp",  
      "/assets/images/products/bcaa/bcaa-orange-4.webp",
      "/assets/images/products/bcaa/bcaa-orange-2.webp",
      // "/assets/images/products/bcaa/demo.mp4",
    ],
    "250g-Cranberry": [
      "/assets/images/products/bcaa/bcaa-cranberry-1.webp",
      "/assets/images/products/bcaa/bcaa-cranberry-3.webp",
      "/assets/images/products/bcaa/bcaa-cranberry-4.webp",
      "/assets/images/products/bcaa/bcaa-cranberry-2.webp",
      // "/assets/images/products/bcaa/demo.mp4",
    ],
  };

  const products = [
    {
      key: "250g-Orange",
      data: {
        id: "6827168ced4175d21de95c4e",
        img: "/assets/images/products/bcaa/bcaa-orange-1.webp",
        name: "BCAA Orange",
        price: "2150",
        discount: "1075",
        size: "250g",
        dis_point: "50%",
      },
    },
    {
      key: "250g-Cranberry",
      data: {
        id: "6827180aed4175d21de95cb9",
        img: "/assets/images/products/bcaa/bcaa-cranberry-1.webp",
        name: "BCAA Cranberry",
        price: "2150",
        discount: "1075",
        size: "250g",
        dis_point: "50%",
      },
    },
  ];

  const sizeOptions = [{ id: "250g", label: "250g" }];

  const flavorOptions = [
    { id: "Orange", label: "Orange" },
    { id: "Cranberry", label: "Cranberry" },
  ];

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
        (product) => product.product_id === currentProductData.id
      );

      if (!productExists) {
        existingData.products.push({
          product_id: currentProductData.id,
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
          setAddToCartProducts(data);
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
    { title: "BENEFITS:", description: "" },
    {
      title: "",
      description:
        "Experience real results & better performance with fat burning ingredients.",
    },
    {
      title: "",
      description: "Clinically proven & versatile supplement solution.",
    },
    {
      title: "",
      description: "Controls Appetite & Hunger.",
    },
    { title: "Caution:", description: "" },
    {
      title: "",
      description: "Not for use by persons under the age of 18 years.",
    },
    {
      title: "",
      description: "Consult your doctor in case you are taking any medication.",
    },
    {
      title: "",
      description:
        "This product is not intended to diagnose, treat, cure or prevent any disease.",
    },
    {
      title: "",
      description: "Do not exceed recommended serving size.",
    },
    {
      title: "",
      description: "Store in a cool and dry place.",
    },
    {
      title: "",
      description: "Keep out of reach of children.",
    },
    {
      title: "",
      description:
        "This product is not to be used as a substitute for a varied diet. Not recommended for children, pregnant or lactating women. and people sensitive to caffeine.",
    },
  ];

  const handleCartOpen = async () => {
    setClickATC(true);
  };

   let DiscountCalculate = (name, mainprice) => {
    let Demo = {};

    if (name === "Whey Mass Matrix 1kg Chocolate" || mainprice > 1570) {
      Demo.mainprice = mainprice;
      Demo.discountedprice = (mainprice * 50) / 100;
      Demo.discount = "50%";
    } else {
      Demo.mainprice = mainprice;
      Demo.discountedprice = mainprice - (mainprice * 25) / 100;
      Demo.discount = "25%";
    }
    return Demo;
  };

  return (
    <>
      <Helmet>
        <title>
          Buy PureGo BCAA Orange Flavor - Muscle Recovery & Electrolytes Support
        </title>
        <meta
          name="description"
          content="Fuel your workouts with PureGo BCAA Orange Flavor - a powerful BCAA supplement for muscle recovery, hydration, and endurance. Enjoy a refreshing electrolyte drink with every scoop."
        />
        <meta
          name="keyword"
          content="preworkout, fat burner, amino acid, workout, Orange, weight loss supplement, bodybuilding supplement, best pre workout, best weight loss supplements, best fat burner for men, protein powder for weight loss, best protein powder for weight loss, best fat burner for women, pre workout powder, best fat burner, best supplements for weight loss female, best pre workout for men, fat burner for women"
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
            fbq('init', '580401698019006');
            fbq('track', 'PageView');
          `}
        </script>
        <noscript>
          {`<img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=580401698019006&ev=PageView&noscript=1"
          />`}
        </noscript>
      </Helmet>
      {/* <LoaderComponent /> */}
      {showModal && <LoginModal onClose={closeModal} />}
      {fadingItem && <ProductSelectComponent fadingItem={fadingItem} />}
      <AddToCartPopUp clickATC={clickATC} setClickATC={setClickATC} />
      <NutritionHeader handleCartOpen={handleCartOpen} />
      <button className="scroll-top scroll-to-target" data-target="html">
        <i className="fas fa-angle-up"></i>
      </button>
      <main className="main-area">
        <section className="inner-shop-details-area">
          <div className="container">
            <div className="row">
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
                        {(() => {
                          const price = DiscountCalculate(
                            currentProductData?.name,
                            currentProductData?.price
                          );
                          return (
                            <>
                              ₹{price.discountedprice}/-
                              <span className="old-prices">
                                ₹{currentProductData.price}/-
                              </span>
                              <h5 className="stock-status d-flex align-items-center">
                                ({price?.discount} OFF)
                              </h5>
                            </>
                          );
                        })()}
                      </h2>
                    </div>
                    <p>
                      It will suppress your appetite and provide you with a
                      higher energy level in order to keep the adrenaline levels
                      up. It will also boost your metabolism and burn calories
                      for you.
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
                      <AddToCartButtonsContainer
                        addToCartProductsData={currentProductData}
                        addToCartProducts={addToCartProducts}
                        toggleMenu={toggleMenu}
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                        selectedProductId={currentProductData.id}
                      />
                      <button
                        onClick={() => handleQuickBuy(currentProductData)}
                        className="col-md-3 col-11 quick-buy-btn m-0 ms-md-3 mx-1 my-1"
                      >
                        <i className="fa-solid fa-bolt me-2"></i> Quick Buy
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
                        <h4 className="title">WHAT ARE Bcaa?</h4>
                        <p>
                          Branched chain amino acids are made of specific Amino
                          Acids that are considered Essential. Of the 20 Amino
                          Acids, 9 are considered Essential with Leucine, Valine
                          and Isoleucine the BCAAs being amongst the most well
                          known EAAs. Remember that all BCAAs are EAAs, but not
                          all EAAs are BCAAs.
                        </p>
                        <h4 className="title">INGREDIENTS:</h4>
                        <p>
                          BCAA Blend (branched chain amino acid), Citric
                          acid-INS 330, potassium Chloride INS 508, Silicon
                          dioxide INS 551, Sucralose -INS 955, Orange Flavour,
                          Sunset Yellow color -INS 122.
                        </p>
                        <h4 className="title">DIRECTIONS FOR EAA POWDER:</h4>
                        <p>
                          Consume 1 Scoop (05 gm) of EAA Powder with 200ml water
                          between meals, 30-45 minutes before workouts and/or
                          immediately after workouts. Combine with a sensible
                          diet and regular exercise. For best results consume 2
                          Scoop per day.
                        </p>
                        <h4 className="title mt-4">WARNINGS:</h4>
                        <p>
                          Keep out of reach of children. Do not use if pregnant
                          or nursing.Not intended for use by person under 18.
                          Consult a physician if you have been treated for or
                          diagnosed with or have a family history of any medical
                          condition. Do not use if safety seal on the package
                          has been broken.
                        </p>
                        <h4 className="title mt-4">NOT FOR MEDICINAL USE</h4>
                        <h4 className="title mt-4">STORAGE:</h4>
                        <p>
                          Store in Cool & dry place. Keep away from direct
                          sunlight, heat & moisture. Keep the bottle tightly
                          closed.
                        </p>
                        <h4 className="title mt-4">ALLERGEN ADVICE:</h4>
                        <p>
                          This product contains BCAA blend and is not
                          recommended for those with BCAA blend intolerance.
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
                              <th scope="row">Total Sugar</th>
                              <td>0 gm</td>
                            </tr>
                            <tr>
                              <th scope="row">PROTEIN</th>
                              <td>0 gm</td>
                            </tr>
                            <tr>
                              <th scope="row">TOTAL FAT</th>
                              <td>0 gm</td>
                            </tr>
                            <tr>
                              <th scope="row">BRANCHED CHAIN AMINO ACIDS</th>
                              <td>7.8 gm</td>
                            </tr>
                            <tr>
                              <th scope="row">L-LEUCINE</th>
                              <td>3.25mg</td>
                            </tr>
                            <tr>
                              <th scope="row">L-ISOLEUCINE</th>
                              <td>1.65mg</td>
                            </tr>
                            <tr>
                              <th scope="row">L-VALINE</th>
                              <td>1.65mg</td>
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
        <GymVideo />
        <HowToUse
          src1="production/files/FILE-step-1-4fdcb85a-3191-4a19-a673-3e21a1a7d4ec.mp4"
          src2="production/files/FILE-ignite-step-2-d59229ee-8a0f-46ea-a935-c21a1e9761fc.mp4"
          src3="production/files/FILE-step-3-e3d1f5ef-c77b-480a-bc5b-40d08de3b62f.mp4"
          src4="production/files/FILE-ignite-step-4-2f2777f2-1fd3-46ad-b295-9da2620e319b.mp4"
          step1="Add 300 ml of water"
          step2="Mix 1 scoop of Pre Workout"
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

export default PureGoBCAA;
