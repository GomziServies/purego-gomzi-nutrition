import { useState, useRef, useEffect } from "react";
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
import ProductSelectComponent from "../../components/productSelectComponent";
import AddToCartButtonsContainer from "../../components/AddToCartButtonsContainer";
import AddToCartPopUp from "../../components/AddToCartPopUp";
import GymVideo from "../../components/GymVideo";
import { useLocation } from "react-router";

function PureGoCreatine() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ProductFlavor = searchParams.get("flavor");
  const [currentProduct, setCurrentProduct] = useState("250g-Lemon");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState("250g");
  const [activeFlavor, setActiveFlavor] = useState("Lemon");

  const getCanonicalUrl = () => {
    // Lemon flavor
    if (activeFlavor === "Lemon") {
      return "https://purego.gomzilifesciences.in/creatine-suppliment/lemon";
    }
    // Unflavored
    else if (activeFlavor === "Unflavoured") {
      return "https://purego.gomzilifesciences.in/Creatine-suppliment/unflavoured";
    }
    // Default
    else {
      return window.location.href;
    }
  };

  const canonicalUrl = getCanonicalUrl();
  const [opacity, setOpacity] = useState(1);
  const imageRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
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
    "250g-Lemon": [
      "/assets/images/products/creatine/creatine-lemon-1.webp",
      "/assets/images/products/creatine/creatine-lemon-3.webp",
      "/assets/images/products/creatine/creatine-lemon-4.webp",
      "/assets/images/products/creatine/creatine-lemon-2.webp",
    ],
    "250g-Unflavoured": [
      "/assets/images/products/creatine/creatine-unflavoured-1.webp",
      "/assets/images/products/creatine/creatine-unflavoured-3.webp",
      "/assets/images/products/creatine/creatine-unflavoured-4.webp",
      "/assets/images/products/creatine/creatine-unflavoured-2.webp",
    ],
  };

  const products = [
    {
      key: "250g-Lemon",
      data: {
        id: "67e773f463f930dcc6a27155",
        img: "/assets/images/products/creatine/creatine-lemon-1.webp",
        name: "Creatine Monohydrate Lemon",
        price: "1510",
        discount: "1162",
        size: "250g",
        dis_point: "25%",
      },
    },
    {
      key: "250g-Unflavoured",
      data: {
        id: "6827197bed4175d21de95d5c",
        img: "/assets/images/products/creatine/creatine-unflavoured-1.webp",
        name: "Creatine Monohydrate Unflavoured",
        price: "1510",
        discount: "1162",
        size: "250g",
        dis_point: "25%",
      },
    },
  ];

  const sizeOptions = [{ id: "250g", label: "250g" }];

  const flavorOptions = [
    { id: "Lemon", label: "Lemon" },
    { id: "Unflavoured", label: "Unflavoured" },
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

  useEffect(() => {
    if (ProductFlavor) {
      setActiveFlavor(ProductFlavor);
      setCurrentProduct(`${activeSize}-${ProductFlavor}`);
    }
  }, []);

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
        JSON.stringify(quickProductData),
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
        (product) => product.product_id === currentProductData.id,
      );

      if (!productExists) {
        existingData.products.push({
          product_id: currentProductData.id,
        });
        localStorage.setItem("addItemInCart", JSON.stringify(existingData));
      }

      const isAuthenticated = localStorage.getItem(
        "fg_group_user_authorization",
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
  ];

  const handleCartOpen = async () => {
    setClickATC(true);
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

  const getMetaTitle = () => {
    // Lemon flavor
    if (activeFlavor === "Lemon") {
      return "Buy Lemon Flavored Creatine Online – Best Prices in India";
    }
    // Unflavored
    else if (activeFlavor === "Unflavoured") {
      return "Buy PureGo Unflavored Creatine – Best Price & Quality Online";
    }
    // Default
    else {
      return "Best Creatine Supplements for Muscle Growth & Strength";
    }
  };

  const getMetaDescription = () => {
    // Lemon flavor
    if (activeFlavor === "Lemon") {
      return "PureGo Lemon Creatine – Enhance Strength & Recovery with High-Quality Creatine Monohydrate at Best Price Online";
    }
    // Unflavored
    else if (activeFlavor === "Unflavoured") {
      return "PureGo Unflavored Creatine – Maximize Muscle Growth & Performance with Premium Creatine Monohydrate at Best Price";
    }
    // Default
    else {
      return "Discover the best creatine supplements to boost muscle growth, enhance strength, and improve performance. Shop top picks today!";
    }
  };

  // Function to generate JSON-LD structured data for the current product
  const generateJsonLd = () => {
    // Get the discounted price for the current product
    const priceData = DiscountCalculate(
      "Whey Protein 1kg Mocha Coffee",
      currentProductData?.price,
    );
    const discountedPrice = priceData?.discountedprice || "0";

    // Get the main image for the current product
    const productImagesArray = productImages[currentProduct] || [];
    const mainImage = productImagesArray[2] || productImagesArray[0] || ""; // Using the third image (index 2) or first if not available

    // Construct full image URL
    const fullImageUrl = mainImage
      ? `https://purego.gomzilifesciences.in${mainImage}`
      : "";

    // Define product data for each variant
    const productVariants = {
      "250g-Lemon": {
        name: "Creatine Monohydrate Lemon",
        image:
          "https://purego.gomzilifesciences.in/assets/images/products/creatine/creatine-lemon-4.webp",
        description:
          "PureGo Lemon Creatine – Enhance Strength & Recovery with High-Quality Creatine Monohydrate at Best Price Online",
        url: "https://purego.gomzilifesciences.in/creatine-suppliment/lemon",
        price: "755",
      },
      "250g-Unflavoured": {
        name: "Creatine Monohydrate Unflavoured",
        image:
          "https://purego.gomzilifesciences.in/assets/images/products/creatine/creatine-unflavoured-4.webp",
        description:
          "PureGo Unflavored Creatine – Maximize Muscle Growth & Performance with Premium Creatine Monohydrate at Best Price",
        url: "https://purego.gomzilifesciences.in/Creatine-suppliment/unflavoured",
        price: "755",
      },
    };

    // Get the data for the current product variant
    const variantData = productVariants[currentProduct] || {
      name: currentProductData?.name || "Creatine Monohydrate",
      image: fullImageUrl,
      description: getMetaDescription(),
      url: canonicalUrl,
      price: discountedPrice,
    };

    // Generate the JSON-LD structure
    const jsonLd = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: variantData.name,
      image: variantData.image,
      description: variantData.description,
      brand: {
        "@type": "Brand",
        name: "Purego",
      },
      offers: {
        "@type": "Offer",
        url: variantData.url,
        priceCurrency: "INR",
        price: variantData.price,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    };

    return JSON.stringify(jsonLd, null, 2);
  };

  return (
    <>
      <Helmet>
        <title>{getMetaTitle()}</title>
        <meta name="description" content={getMetaDescription()} />
        <meta
          name="keyword"
          content="creatine, creatine monohydrate, micronised, muscle building, best creatine, best creatine for men, best creatine monohydrate, creatine powder, creatine monohydrate powder, best protein powder for muscle gain, best muscle building supplements, muscle building supplements, creatine for women, creatine supplements, micronized creatine, bodybuilding supplements, best creatine for muscle growth, best creatine supplement, muscle growth supplements, micronized creatine monohydrate, best protein powder for muscle growth"
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:image"
          content="https://www.purego.gomzilifesciences.in/assets/process.env.PUBLIC_URL + '/assets/images/nutrition-logo.png"
        />
        <link rel="canonical" href={canonicalUrl} />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{generateJsonLd()}</script>
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
              fbq('init', '2773291456345230');
              fbq('track', 'PageView');
          `}
        </script>
        <noscript>
          {`<img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=2773291456345230&ev=PageView&noscript=1"
            />`}
        </noscript>
        <script
          type="text/javascript"
          src="https://api.goaffpro.com/loader.js?shop=vijiwvsmjb"
        ></script>
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
                            "Whey Protein 1kg Mocha Coffee",
                            currentProductData?.price,
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
                      Creatine monohydrate works by increasing the body's stores
                      of phosphocreatine, a molecule that helps regenerate
                      adenosine triphosphate, the primary energy source for
                      muscle contractions during high-intensity activities like
                      weightlifting and sprinting.
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
                          DIRECTIONS FOR CREATINE POWDER:
                        </h4>
                        <p>
                          As a dietary supplement, Mix 1 leveled scoop (approx.
                          05g) to 200-220 ml of water or your favorite sports
                          beverages.
                        </p>
                        <h4 className="title">
                          DRINK ATLEAST 4-5 LITERS OF WATER PER DAY DURING
                          CREATINE INTAKE
                        </h4>
                        <h4 className="title">WARNINGS:</h4>
                        <p>
                          Consult a healthcare practitioner prior to use if you
                          are pregnant or you have liver disease or if you've
                          been instructed to follow a low-protein diet. Not to
                          exceed the recommended daily usage. Do not use if
                          safety seal on the package has been broken.
                        </p>
                        <h4 className="title">NOT FOR MEDICINAL USE.</h4>
                        <h4 className="title">STORAGE:</h4>
                        <p>
                          Store under 25°C Temperature, dry and hygienic place.
                          Keep away from direct sunlight. Keep out of reach of
                          children.
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
          src2="production/files/FILE-atp-step-2-994902b4-e2d7-4cb7-adcb-bfe48c538905.mp4"
          src3="production/files/FILE-step-3-e3d1f5ef-c77b-480a-bc5b-40d08de3b62f.mp4"
          src4="production/files/FILE-atp-step-4-9a80f53c-1975-4c2b-b63d-3da1673d7afe.mp4"
          step1="Add 300 ml of water"
          step2="Mix 1 scoop of Creatine Monohydrate"
        />
        <Review />
        <section className="inner-shop-details-area pt-0">
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

export default PureGoCreatine;
