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

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const productImages = {
    "1kg-Chocolate": [
      "/assets/images/products/whey-protein/whey-protein-chocolate-1.webp",
      "/assets/images/products/whey-protein/whey-protein-chocolate-2.webp",
      "/assets/images/products/whey-protein/whey-protein-chocolate-3.webp",
      "/assets/images/products/whey-protein/whey-protein-chocolate-4.webp",
    ],
    "1kg-Mocha Coffee": [
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-1.webp",
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-2.webp",
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-3.webp",
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-4.webp",
    ],
    "1kg-Mawa Kulfi": [
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-1.webp",
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-2.webp",
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-3.webp",
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-4.webp",
    ],
    "2kg-Chocolate": [
      "/assets/images/products/whey-protein/whey-protein-chocolate-2kg-1.webp",
      "/assets/images/products/whey-protein/whey-protein-chocolate-2kg-2.webp",
      "/assets/images/products/whey-protein/whey-protein-chocolate-2kg-3.webp",
      "/assets/images/products/whey-protein/whey-protein-chocolate-2kg-4.webp",
    ],
    "2kg-Mocha Coffee": [
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-2kg-1.webp",
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-2kg-2.webp",
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-2kg-3.webp",
      "/assets/images/products/whey-protein/whey-protein-mochacoffee-2kg-4.webp",
    ],
    "2kg-Mawa Kulfi": [
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-2kg-1.webp",
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-2kg-2.webp",
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-2kg-3.webp",
      "/assets/images/products/whey-protein/whey-protein-mawakulfi-2kg-4.webp",
    ],
  };

  const products = [
    {
      key: "1kg-Chocolate",
      data: {
        id: "67e7749163f930dcc6a2715d",
        img: "/assets/images/products/whey-protein/whey-protein-chocolate-1.webp",
        name: "Whey Protein 1kg Chocolate",
        price: "3000",
        discount: "1390",
        size: "1 Kg",
        dis_point: "53%",
      },
    },
    {
      key: "1kg-Mocha Coffee",
      data: {
        id: "67e774c463f930dcc6a27161",
        img: "/assets/images/products/whey-protein/whey-protein-mochacoffee-1.webp",
        name: "Whey Protein 1kg Mocha Coffee",
        price: "3000",
        discount: "1490",
        size: "1 Kg",
        dis_point: "50%",
      },
    },
    {
      key: "1kg-Mawa Kulfi",
      data: {
        id: "67e774a963f930dcc6a2715f",
        img: "/assets/images/products/whey-protein/whey-protein-mawakulfi-1.webp",
        name: "Whey Protein 1kg Mawa Kulfi",
        price: "3000",
        discount: "1490",
        size: "1 Kg",
        dis_point: "50%",
      },
    },
    {
      key: "2kg-Chocolate",
      data: {
        id: "67e7749163f930dcc6a2715d",
        img: "/assets/images/products/whey-protein/whey-protein-chocolate-1.webp",
        name: "Whey Protein 2kg Chocolate",
        price: "5599",
        discount: "2679",
        size: "2 Kg",
        dis_point: "52%",
      },
    },
    {
      key: "2kg-Mocha Coffee",
      data: {
        id: "67e774c463f930dcc6a27161",
        img: "/assets/images/products/whey-protein/whey-protein-mochacoffee-1.webp",
        name: "Whey Protein 2kg Mocha Coffee",
        price: "5999",
        discount: "2879",
        size: "2 Kg",
        dis_point: "52%",
      },
    },
    {
      key: "2kg-Mawa Kulfi",
      data: {
        id: "67e774a963f930dcc6a2715f",
        img: "/assets/images/products/whey-protein/whey-protein-mawakulfi-1.webp",
        name: "Whey Protein 2kg Mawa Kulfi",
        price: "5999",
        discount: "2879",
        size: "2 Kg",
        dis_point: "52%",
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
    { id: "Mawa Kulfi", label: "Mawa Kulfi" },
  ];

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

  useEffect(() => {
    if (ProductFlavor) {
      setActiveFlavor(ProductFlavor);
      setCurrentProduct(`${activeSize}-${ProductFlavor}`);
    }
  }, []);
  
  const USPData = [
    {
      title: "FSSAI Approved",
      description: "Certified by FSSAI, ensuring safety and quality in every serving.",
    },
    {
      title: "Direct from Manufacturers",
      description: "Sourced straight from manufacturers for guaranteed freshness and quality.",
    },
    {
      title: "International Raw Protein Usage",
      description: "Uses globally sourced raw protein for consistent purity and quality.",
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
      <NutritionHeader cartDataClick={cartDataClick} />
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
                  <div className="mt-4">
                    <img
                      src="/assets/images/government-approved.png"
                      alt="Approved By government"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-7 d-flex align-items-center mt-md-0 mt-3">
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
                    <h2 className="price d-flex mb-0">
                      ₹{currentProductData.discount}/-
                      <span className="old-prices">
                        ₹{currentProductData.price}/-
                      </span>
                    </h2>
                    <h5 className="stock-status">
                      ({currentProductData.dis_point} OFF)
                    </h5>
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
                    <button
                      onClick={() => addProductInCart(currentProductData.id)}
                      className="col-3 cart-btn m-0"
                    >
                      add to cart
                    </button>
                    <div className="col">
                      <h4 className="product-offer-title m-0 d-flex align-items-center text-yellow">
                        <img
                          src="/assets/images/discount.png"
                          alt="Special Offer"
                          width="24px"
                          className="me-1"
                        />
                        Hurry! Special Offer Available at Checkout.
                      </h4>
                    </div>
                  </div>
                  <Features USPData={USPData} />
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
                          Isolate, Whey powder), Cocoa Powder, Chocolate
                          Flavour, Soy Lecithin-INS 322 (i), xanthangum-INS 415,
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
                          milk/skimmed milk, chocolate chips and nuts can be
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
                                <tr>
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
        <MoreProduct
          setCartDataClick={setCartDataClick}
          cartDataClick={cartDataClick}
        />
        <HowToUse
          src1={
            currentProductData.name === "Whey Protein 1kg Mawa Kulfi"
              ? "step-1.mp4"
              : currentProductData.name === "Whey Protein 1kg Chocolate" ||
                currentProductData.name === "Whey Protein 1kg Mocha Coffee"
              ? "mocha-coffee-1.mp4"
              : "step-1.mp4"
          }
          src2="mocha-coffee-2.mp4"
          src3="mocha-coffee-3.mp4"
          src4={
            currentProductData.name === "Whey Protein 1kg Mawa Kulfi"
              ? "step-4.mp4"
              : currentProductData.name === "Whey Protein 1kg Chocolate" ||
                currentProductData.name === "Whey Protein 1kg Mocha Coffee"
              ? "mocha-coffee-4.mp4"
              : "step-4.mp4"
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
