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

function PureGoShaker() {
  const canonicalUrl = window.location.href;
  const [currentProduct, setCurrentProduct] = useState("500ml-Black");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState("500ml");
  const [activeFlavor, setActiveFlavor] = useState("Black");
  const [opacity, setOpacity] = useState(1);
  const imageRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [fadingItem, setFadingItem] = useState(null);
  const [addToCartProducts, setAddToCartProducts] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [clickATC, setClickATC] = useState(false);

  const handleCartOpen = async () => {
    setClickATC(true);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const productImages = {
    "500ml-Black": [
      "/assets/images/products/shaker-bottle/shaker-bottle-1.webp",
      "/assets/images/products/shaker-bottle/shaker-bottle-3.webp",
      "/assets/images/products/shaker-bottle/shaker-bottle-4.webp",
      "/assets/images/products/shaker-bottle/shaker-bottle-2.webp",
    ],
  };

  const products = [
    {
      key: "500ml-Black",
      data: {
        id: "68316330f91df040c479ad1e",
        img: "/assets/images/products/bcaa/bcaa-orange-1.webp",
        name: "Shaker Bottle 500ml",
        price: "180",
        discount: "135",
        size: "500ml",
        dis_point: "60%",
      },
    },
  ];

  const sizeOptions = [{ id: "500ml", label: "500ml" }];

  const flavorOptions = [{ id: "Black", label: "Black" }];

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

  // const addProductInCart = async (product_id) => {
  //   try {
  //     const isLogin = localStorage.getItem("fg_group_user_authorization");
  //     if (!isLogin) {
  //       return openModal();
  //     }
  //     const response = await axiosInstance.post("/order-cart/add-item", {
  //       item_id: product_id,
  //       quantity: 1,
  //       item_type: "PURE_GO_MEAL_PRODUCT",
  //     });
  //     if (response.data.response === "OK") {
  //       window.location.href = "/add-to-cart";
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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

  let DiscountCalculate = (name, mainprice) => {
    let Demo = {};

    if (mainprice > 1500) {
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
          Buy PureGo Shaker Bottle - Perfect for Protein Shakes & Supplements
        </title>
        <meta
          name="description"
          content="Mix your protein shakes effortlessly with the Gomzi Nutrition Shaker Bottle. Leak-proof, durable, and easy to carry for fitness enthusiasts on the go."
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
                    {/* <Features USPData={USPData} openModal={openModal} /> */}
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
                        <h4 className="title">
                          PureGo Shaker Bottle: Your Perfect Workout Companion
                        </h4>
                        <p>
                          Elevate your fitness game with the Gomzi Nutrition
                          Shaker. Designed to be the ultimate companion for your
                          active lifestyle, this shaker bottle is engineered for
                          performance and convenience.
                        </p>
                        <h4 className="title">Key Features:</h4>
                        <p>
                          Leak-Proof Design: Say goodbye to spills and messes
                          with our advanced leak-proof lid.
                        </p>
                        <p>
                          Mix Perfectly: The built-in mixer ball ensures a
                          smooth and lump-free blend every time.
                        </p>
                        <p>
                          Wide Mouth: Effortlessly add scoops, ice, or fruits
                          for a personalized shake.
                        </p>
                        <p>
                          Durable and BPA-Free: Crafted from high-quality
                          materials for long-lasting use and safety.
                        </p>
                        <p>
                          Stylish and Ergonomic: The sleek design fits
                          comfortably in your hand and gym bag. Experience the
                          Gomzi difference with a shaker bottle that's as
                          committed to your fitness goals as you are.
                        </p>
                        <h4 className="title mt-4">Product Highlights:</h4>
                        <p>
                          Ideal for mixing protein shakes, pre-workout
                          supplements, and other powdered drinks. Easy to clean
                          and dishwasher safe.
                        </p>
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
        {/* <MoreProduct
          setCartDataClick={setCartDataClick}
          cartDataClick={cartDataClick}
        /> */}
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

export default PureGoShaker;
