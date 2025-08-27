import React, { useState, useRef, useEffect } from "react";
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
import { useLocation } from "react-router";
import LoginModal from "../../assets/js/popup/login";
import Features from "../../components/Features";
import MoreProduct from "../../components/MoreProduct";
import ProductSelectComponent from "../../components/productSelectComponent";
import AddToCartButtonsContainer from "../../components/AddToCartButtonsContainer";
import AddToCartPopUp from "../../components/AddToCartPopUp";
import GymVideo from "../../components/GymVideo";

function PureGoWheyProtein() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ProductFlavor = searchParams.get("flavor");
  const canonicalUrl = window.location.href;
  const [currentProduct, setCurrentProduct] = useState("1kg-Chocolate");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState("1kg");
  const [activeFlavor, setActiveFlavor] = useState("Chocolate");
  const [opacity, setOpacity] = useState(1);
  const imageRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("1kg-Chocolate");
  const [cartDataClick, setCartDataClick] = useState(false);
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
    "1kg-Chocolate": [
      "/assets/images/products/whey-protein/whey-protein-chocolate-1.webp",
      "/assets/images/products/whey-protein/whey-protein-chocolate-3.webp",
      "/assets/images/products/whey-protein/whey-protein-chocolate-4.webp",
      "/assets/images/products/whey-protein/whey-protein-chocolate-2.webp",
    ],
    "1kg-Mocha Coffee": [
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-1.webp",
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-3.webp",
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-4.webp",
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-2.webp",
    ],
    "1kg-Mawa Kulfi": [
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-1.webp",
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-3.webp",
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-4.webp",
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-2.webp",
    ],
    "1kg-Mango": [
      "/assets/images/products/whey-protein/whey-protein-mango-1.webp",
      "/assets/images/products/whey-protein/whey-protein-mango-3.webp",
      "/assets/images/products/whey-protein/whey-protein-mango-4.webp",
      "/assets/images/products/whey-protein/whey-protein-mango-2.webp",
    ],
    "2kg-Chocolate": [
      "/assets/images/products/whey-protein/whey-protein-chocolate-2kg-1.webp",
      "/assets/images/products/whey-protein/whey-protein-chocolate-2kg-3.webp",
      "/assets/images/products/whey-protein/whey-protein-chocolate-2kg-4.webp",
      "/assets/images/products/whey-protein/whey-protein-chocolate-2kg-2.webp",
    ],
    "2kg-Mocha Coffee": [
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-2kg-1.webp",
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-2kg-3.webp",
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-2kg-4.webp",
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-2kg-2.webp",
    ],
    "2kg-Mawa Kulfi": [
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-2kg-1.webp",
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-2kg-3.webp",
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-2kg-4.webp",
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-2kg-2.webp",
    ],
    "2kg-Mango": [
      "/assets/images/products/whey-protein/whey-protein-mango-2kg-1.webp",
      "/assets/images/products/whey-protein/whey-protein-mango-2kg-3.webp",
      "/assets/images/products/whey-protein/whey-protein-mango-2kg-4.webp",
      "/assets/images/products/whey-protein/whey-protein-mango-2kg-2.webp",
    ],
  };

  const products = [
    {
      key: "1kg-Chocolate",
      data: {
        id: "67e7749163f930dcc6a2715d",
        img: "/assets/images/products/whey-protein/whey-protein-chocolate-1.webp",
        name: "Whey Protein 1kg Chocolate",
        price: "3080",
        discount: "1539.5",
        size: "1kg",
        dis_point: "50%",
      },
    },
    {
      key: "1kg-Mocha Coffee",
      data: {
        id: "67e774c463f930dcc6a27161",
        img: "/assets/images/products/whey-protein/whey-protein-mochacoffee-1.webp",
        name: "Whey Protein 1kg Mocha Coffee",
        price: "3270",
        discount: "1635",
        size: "1kg",
        dis_point: "50%",
      },
    },
    {
      key: "1kg-Mawa Kulfi",
      data: {
        id: "67e774a963f930dcc6a2715f",
        img: "/assets/images/products/whey-protein/whey-protein-mawakulfi-1.webp",
        name: "Whey Protein 1kg Mawa Kulfi",
        price: "3270",
        discount: "1635",
        size: "1kg",
        dis_point: "50%",
      },
    },
    {
      key: "1kg-Mango",
      data: {
        id: "68316295f91df040c479acc8",
        img: "/assets/images/products/whey-protein/whey-protein-mango-1.webp",
        name: "Whey Protein 1kg Mango",
        price: "3270",
        discount: "1635",
        size: "1kg",
        dis_point: "50%",
      },
    },
    {
      key: "2kg-Chocolate",
      data: {
        id: "68219edf28bd0ff3b2083fa6",
        img: "/assets/images/products/whey-protein/whey-protein-chocolate-1.webp",
        name: "Whey Protein 2kg Chocolate",
        price: "5750",
        discount: "2847.5",
        size: "2kg",
        dis_point: "50%",
      },
    },
    {
      key: "2kg-Mocha Coffee",
      data: {
        id: "68219f0d28bd0ff3b2083fad",
        img: "/assets/images/products/whey-protein/whey-protein-mochacoffee-1.webp",
        name: "Whey Protein 2kg Mocha Coffee",
        price: "6150",
        discount: "3075",
        size: "2kg",
        dis_point: "50%",
      },
    },
    {
      key: "2kg-Mawa Kulfi",
      data: {
        id: "68219ef928bd0ff3b2083fa8",
        img: "/assets/images/products/whey-protein/whey-protein-mawakulfi-1.webp",
        name: "Whey Protein 2kg Mawa Kulfi",
        price: "6150",
        discount: "3075",
        size: "2kg",
        dis_point: "50%",
      },
    },
    {
      key: "2kg-Mango",
      data: {
        id: "683162bef91df040c479ace4",
        img: "/assets/images/products/whey-protein/whey-protein-mango-1.webp",
        name: "Whey Protein 2kg Mango",
        price: "6150",
        discount: "3075",
        size: "2kg",
        dis_point: "50%",
      },
    },
  ];

  const sizeOptions = [
    { id: "1kg", label: "1kg" },
    { id: "2kg", label: "2kg" },
  ];

  const flavorOptions = [
    { id: "Chocolate", label: "Chocolate" },
    { id: "Mocha Coffee", label: "Mocha Coffee" },
    { id: "Mango", label: "Mango" },
    { id: "Mawa Kulfi", label: "Mawa Kulfi" },
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

  // const handleSelectProduct = (id) => {
  //   setOpacity(0.3);
  //   setTimeout(() => {
  //     setSelectedProduct(id);
  //     setCurrentProduct(`${id}`);
  //     setActiveImageIndex(0);
  //     setOpacity(1);
  //   }, 500);
  // };

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

  useEffect(() => {
    if (ProductFlavor) {
      if (ProductFlavor.split(" ")[2]) {
        let Flavor =
          ProductFlavor.split(" ")[1] + " " + ProductFlavor.split(" ")[2];
        let activesize = ProductFlavor.split(" ")[0];
        setActiveFlavor(Flavor);
        setActiveSize(activesize);
        setCurrentProduct(`${activesize}-${Flavor}`);
      } else if (ProductFlavor.split(" ")[1]) {
        let activesize = ProductFlavor.split(" ")[0];
        setActiveFlavor(ProductFlavor.split(" ")[1]);
        setActiveSize(activesize);
        setCurrentProduct(`${activesize}-${ProductFlavor.split(" ")[1]}`);
      } else {
        setActiveFlavor(ProductFlavor);
        setCurrentProduct(`${activeSize}-${ProductFlavor}`);
      }
    }
  }, []);

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
    {
      title: "No Colors:",
      description:
        "Pure Go Whey Protein does not contain any COLOR or PRESERVATIVES.",
    },
    {
      title: "No Added Sugar:",
      description: "Pure Go Whey Protein does not Contain any Added SUGAR.",
    },
    {
      title: "Contains Sucralose:",
      description:
        "It also contains SUCRALOSE as a sweetening agent and may taste bitter due to its natural properties.",
    },
    {
      title: "Trustified Certified:",
      description:
        "Blind Testing for Protein & Macro Accuracy, Tested for Amino Spiking & Heavy Metals.",
    },
  ];

  const additionalData = [
    {
      label: "Total Fat",
      value: "0.76",
    },
    {
      label: "Saturated Fat",
      value: "0.60",
    },
    {
      label: "Cholesterol",
      value: "0.02",
    },
    {
      label: "Total Carbohydrate",
      value: "4.02",
    },
    {
      label: "Protein",
      value: "28.00",
    },
    {
      label: "Total Sugars",
      value: "0",
    },
    {
      label: "Sodium",
      value: "135.0",
    },
  ];

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

  const [changeATC, setChangeATC] = useState(false);

  const handleChangeCart = async () => {
    setChangeATC(true);
  };

  const handleChangeATC = async () => {
    if (changeATC) {
      setChangeATC(false);
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
        <title>Top Whey Protein Powder for Muscle Growth & Recovery</title>
        <meta
          name="description"
          content="Find the best whey protein powder to support muscle growth, boost recovery, and enhance performance. Shop top picks now!"
        />
        <meta
          name="keyword"
          content="whey protein isolate, best protein powder for women, plant based protein powder, protein powder for weight loss, best protein powder for weight loss, isolate protein, whey isolate protein powder, best whey protein powder, best whey protein, mass gainer protein powder, best protein powder for muscle gain, protein, bcaa, eaa, isolate, concentrate, whey protein, protein powder, best protein powder, whey protein powder, whey isolate, plant based protein, bcaa powder"
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:image"
          content="https://www.purego.gomzilifesciences.in/assets/process.env.PUBLIC_URL + '/assets/images/nutrition-logo.png"
        />
        <link rel="canonical" href={canonicalUrl} />
        {/* Preconnect to Facebook CDN */}
        <link rel="preconnect" href="https://connect.facebook.net" />
        <script>
          { `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '3713420712287031');
            fbq('track', 'PageView');
          `}
        </script>
        <noscript>
          { `<img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=3713420712287031&ev=PageView&noscript=1"
          />`}
        </noscript>
      </Helmet>
      {/* <LoaderComponent /> */}
      {showModal && <LoginModal onClose={closeModal} />}
      {fadingItem && <ProductSelectComponent fadingItem={fadingItem} />}
      <AddToCartPopUp
        clickATC={clickATC}
        setClickATC={setClickATC}
        changeATC={changeATC}
        handleChangeCart={handleChangeCart}
        handleChangeATC={handleChangeATC}
      />
      <NutritionHeader
        cartDataClick={cartDataClick}
        handleCartOpen={handleCartOpen}
        openModal={openModal}
        changeATC={changeATC}
        handleChangeATC={handleChangeATC}
      />
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
                              <h5 className="stock-status text-center d-flex align-items-center">
                                ({price?.discount} OFF)
                              </h5>
                            </>
                          );
                        })()}
                      </h2>
                    </div>
                    <p>
                      Pure Go Whey Protein is a Mixture of Whey Isolate, Whey
                      Concentrate, Skimmed Milk powder, Soy protein isolate and
                      plant protein. It is packed with 24g of 100% High Quality
                      whey protein per serving (30g scoop). The benchmark and
                      premium source of protein powders.
                    </p>
                    <div>
                      <SelectableList
                        items={sizeOptions}
                        activeItem={activeSize}
                        onItemClick={handleSelectSize}
                        title="Size"
                      />
                      <SelectableList
                        items={flavorOptions}
                        activeItem={activeFlavor}
                        onItemClick={handleSelectFlavor}
                        title="Flavor"
                      />
                    </div>
                    {/* <div className="d-flex">
                      <div
                        className="pe-3 me-3"
                        style={{ borderRight: "1px solid #ccc" }}
                      >
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
                    </div> */}
                    {/* <div className="row border-top pt-3 mt-4 mx-0">
                      <div
                        className="col-4 product-detail py-2 px-md-2 px-1 text-center ps-0"
                        onClick={() => handleSelectProduct("1kg-Chocolate")}
                      >
                        <div
                          className={`product-box ${
                            selectedProduct === "1kg-Chocolate" ? "select" : ""
                          }`}
                        >
                          <h4 className="product-box-title my-md-3">
                            1 KG Chocolate
                          </h4>
                        </div>
                      </div>
                      <div
                        className="col-4 product-detail py-2 px-md-2 px-1 text-center"
                        onClick={() => handleSelectProduct("1kg-Mawa Kulfi")}
                      >
                        <div
                          className={`product-box ${
                            selectedProduct === "1kg-Mawa Kulfi" ? "select" : ""
                          }`}
                        >
                          <h4 className="product-box-title my-md-3">
                            1 KG Mawa Kulfi
                          </h4>
                        </div>
                      </div>
                      <div
                        className="col-4 product-detail py-2 px-md-2 px-1 text-center"
                        onClick={() => handleSelectProduct("1kg-Mocha Coffee")}
                      >
                        <div
                          className={`product-box ${
                            selectedProduct === "1kg-Mocha Coffee" ? "select" : ""
                          }`}
                        >
                          <h4 className="product-box-title my-md-3">
                            1 KG Mocha Coffee
                          </h4>
                        </div>
                      </div>
                    </div> */}
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
                      <button
                        className="nav-link active"
                        id="description-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#description"
                        role="tab"
                        aria-controls="description"
                        aria-selected="true"
                      >
                        Description
                      </button>
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
                        <h4 className="title">INGREDIENTS:</h4>
                        <p>
                          Protein Blend(Whey protein concentrate, Whey protein
                          Isolate, Whey powder){activeFlavor === "Chocolate" ?", Cocoa Powder":""}, {activeFlavor} Flavor, Soy Lecithin-INS 322 (i), xanthangum-INS 415,
                          Sucralose - INS
                        </p>
                        <h4 className="title">ALLERGEN ADVICE:</h4>
                        <p>
                          This product contains lactose and is not recommended
                          for those with lactose.
                        </p>
                        <h4 className="title">TASTE ADVICE:</h4>
                        <p>
                          For a thick, creamy and delicious shake use nonfat
                          milk/skimmed milk {activeFlavor === "Chocolate" ?", chocolate chips and nuts":activeFlavor === "Mocha Coffee"?", Mocha coffee flavor": activeFlavor === "Mango"?", Mango flavor":activeFlavor === "Mawa Kulfi"?", Mawa Kulfi flavor":""} can be
                          added as per calorie intake.
                        </p>
                        <h4 className="title">RECOMMENDED DURATION OF USE:</h4>
                        <p>
                          Use the product for at least 30 days for effective
                          results or as suggested by your healthcare
                          professional. chips and nuts can be added as per
                          calorie intake.
                        </p>
                        <h4 className="title">RECOMMENDED USE:</h4>
                        <p>FOUR SERVING PER DAY.</p>
                        <h4 className="title">STORAGE:</h4>
                        <p>
                          Store under 25°C Temperature, dry and hygienic place.
                          Keep away from direct sunlight. Keep out of reach of
                          children.
                        </p>
                        <h4 className="title">CAUTION:</h4>
                        <p>
                          Consult a healthcare practitioner prior to use if you
                          are pregnant or you have liver disease or if you've
                          been instructed to follow a low-protein diet. Not to
                          exceed the recommended daily usage.
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
                            {additionalData.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <th scope="row">{data.label}</th>
                                  <td>{data.value}</td>
                                </tr>
                              );
                            })}
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
        {/* <MoreProduct
          setCartDataClick={setCartDataClick}
          cartDataClick={cartDataClick}
          handleChangeCart={handleChangeCart}
          changeATC={changeATC}
          handleChangeATC={handleChangeATC}
        /> */}
        <GymVideo />
        <HowToUse
          src1={
            currentProductData.name === "Whey Protein 1kg Mawa Kulfi"
              ? "production/files/FILE-step-1-4fdcb85a-3191-4a19-a673-3e21a1a7d4ec.mp4"
              : currentProductData.name === "Whey Protein 1kg Chocolate" ||
                currentProductData.name === "Whey Protein 1kg Mocha Coffee"
                ? "production/files/FILE-mocha-coffee-1-0efabada-3df5-4b4a-9a5d-1b733f183113.mp4"
                : "production/files/FILE-step-1-4fdcb85a-3191-4a19-a673-3e21a1a7d4ec.mp4"
          }
          src2="production/files/FILE-mocha-coffee-2-b80c20b6-ddd9-4e21-bef7-1098ba85d725.mp4"
          src3="production/files/FILE-mocha-coffee-3-ad97dd8c-dc93-4f45-b37c-02478f0d31fc.mp4"
          src4={
            currentProductData.name === "Whey Protein 1kg Mawa Kulfi"
              ? "production/files/FILE-step-4-bffa9a47-e9fe-485a-9541-5e3d9158e096.mp4"
              : currentProductData.name === "Whey Protein 1kg Chocolate" ||
                currentProductData.name === "Whey Protein 1kg Mocha Coffee"
                ? "production/files/FILE-mocha-coffee-4-f2b28315-8582-490e-a4bb-2092f4b4608a.mp4"
                : "production/files/FILE-step-4-bffa9a47-e9fe-485a-9541-5e3d9158e096.mp4"
          }
          step1="Add 300 ml of water/milk"
          step2="Mix 1 scoop of Protein"
        />
        <Review />
        <section className="inner-shop-details-area pt-0 pb-5">
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

export default PureGoWheyProtein;
