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

function PureGoMassGainer() {
  const canonicalUrl = window.location.href;
  const [currentProduct, setCurrentProduct] = useState("1kg-Chocolate");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState("1kg");
  const [activeFlavor, setActiveFlavor] = useState("Chocolate");
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
    "1kg-Chocolate": [
      "/assets/images/products/mass-gainer/mass-gainer-1.webp",
      "/assets/images/products/mass-gainer/mass-gainer-2.webp",
      "/assets/images/products/mass-gainer/mass-gainer-3.webp",
      "/assets/images/products/mass-gainer/mass-gainer-4.webp",
    ],
    "3kg-Chocolate": [
      "/assets/images/products/mass-gainer/mass-gainer-3kg-1.webp",
      "/assets/images/products/mass-gainer/mass-gainer-3kg-2.webp",
      "/assets/images/products/mass-gainer/mass-gainer-3kg-3.webp",
      "/assets/images/products/mass-gainer/mass-gainer-3kg-4.webp",
    ],
  };

  const products = [
    {
      key: "1kg-Chocolate",
      data: {
        id: "67e7745f63f930dcc6a2715b",
        img: "/assets/images/products/mass-gainer/mass-gainer-1.webp",
        name: "Whey Mass Matrix 1kg Chocolate",
        price: "1500",
        discount: "599",
        size: "1 Kg",
        dis_point: "60%",
      },
    },
    {
      key: "3kg-Chocolate",
      data: {
        id: "68219f4d28bd0ff3b2083fb1",
        img: "/assets/images/products/mass-gainer/mass-gainer-1.webp",
        name: "Mass Gainer 3kg Chocolate",
        price: "4500",
        discount: "1699",
        size: "3 Kg",
        dis_point: "62%",
      },
    },
  ];

  const sizeOptions = [
    { id: "1kg", label: "1kg" },
    { id: "3kg", label: "3kg" },
  ];

  const flavorOptions = [{ id: "Chocolate", label: "Chocolate" }];

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
    { title: "Key Benefits:", description: "" },
    {
      title: "Muscle Growth:",
      description:
        "Our meticulously crafted blend provides an optimal combination of nutrients for maximum results. Each serving delivers a powerful 17.5 grams of premium protein, including a blend of fast and slow-digesting proteins, ensuring sustained amino acid delivery for muscle recovery and growth. The strategic mix of carbohydrates and healthy fats provides the necessary energy for intense workouts and promotes weight gain effectively.",
    },
    {
      title: "Healthy Metabolism:",
      description:
        "Fortified with essential vitamins and minerals, our mass gainer supports overall health and metabolism, ensuring optimal function during intense training.",
    },
    {
      title: "Reduced Muscle Loss:",
      description:
        "By providing a steady supply of nutrients, our formula helps minimize muscle breakdown, preserving hard-earned gains and promoting muscle retention effectively.",
    },
    { title: "Ideal Usage:", description: "" },
    {
      title: "Pre-Workout:",
      description:
        "Consume a serving approximately 30 minutes before your workout to prime your body with essential nutrients for optimal performance.",
    },
    {
      title: "Post-Workout:",
      description:
        "Replenish your muscles immediately after your workout to kickstart the recovery process and support muscle repair and growth effectively.",
    },
    {
      title: "Between Meals:",
      description:
        "Use as a convenient and nutritious snack between meals to increase calorie intake and promote weight gain efficiently.",
    },
  ];

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
                      Achieve Your Bulking Goals with Pure Go Mass Gainer
                      Powder. Our specially formulated blend is designed to
                      support muscle growth, weight gain, and overall
                      performance for bodybuilders and fitness enthusiasts
                      seeking to pack on size and strength effectively.
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
                        <h4 className="title">INGREDIENTS:</h4>
                        <p>
                          Maltodextrin, Protein Blend (Skimmed Milk Powder, whey
                          protein concentrate, whey protein isolate). Cocoa
                          powder. Ashwagandha, BCAA blend. Soy Lecithin-INS 322
                          (1). xanthangum-INS 415, Sucralo-se-INS 955, Chocolate
                          Flavour.
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
                        {/* <h4 className="title mb-2">Key Benefits:</h4>
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
                        </div> */}
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
                              <th scope="row">Energy (kcal)</th>
                              <td>363.65</td>
                            </tr>
                            <tr>
                              <th scope="row">Total Protein (g)</th>
                              <td>20.00</td>
                            </tr>
                            <tr>
                              <th scope="row">Carbohydrates (g)</th>
                              <td>68.46</td>
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
                              <th scope="row">
                                Polyunsaturated fatty acid (g)
                              </th>
                              <td>0.30</td>
                            </tr>
                            <tr>
                              <th scope="row">
                                Monounsaturated fatty acid (mg)
                              </th>
                              <td>1.54</td>
                            </tr>
                            <tr>
                              <th scope="row">Trans Fatty Acid (g)</th>
                              <td>0.39</td>
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
          src1="production/files/FILE-mocha-coffee-1-0efabada-3df5-4b4a-9a5d-1b733f183113.mp4"
          src2="production/files/FILE-mocha-coffee-2-b80c20b6-ddd9-4e21-bef7-1098ba85d725.mp4"
          src3="production/files/FILE-mocha-coffee-3-ad97dd8c-dc93-4f45-b37c-02478f0d31fc.mp4"
          src4="production/files/FILE-mocha-coffee-4-f2b28315-8582-490e-a4bb-2092f4b4608a.mp4"
          step1="Add 300 ml of water/milk"
          step2="Mix 1 scoop of Mass Gainer"
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

export default PureGoMassGainer;
