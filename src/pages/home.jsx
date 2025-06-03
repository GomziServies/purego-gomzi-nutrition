import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import NutritionHeader from "../components/partials/Header/nutritionsheader";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/animate.min.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/default.css";
import "../assets/css/jquery-ui.css";
import "../assets/css/magnific-popup.css";
import "../assets/css/odometer.css";
import "../assets/css/slick.css";
import "../assets/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Accordion } from "react-bootstrap";
import HomeNutritionFooter from "../components/partials/Footer/footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ModalVideo from "react-modal-video";
import { Link } from "react-router-dom";
import HappyClientReview from "../components/happyClient";
import { axiosInstance, publicAxiosInstance } from "../assets/js/config/api";
import LoginModal from "../assets/js/popup/login";
import Swal from "sweetalert2";
import AddToCartPopUp from "../components/AddToCartPopUp";
import FacilitySlider from "../components/facilitySlider";
import GymVideo from "../components/GymVideo";

function Home() {
  const canonicalUrl = window.location.href;

  const [showModal, setShowModal] = useState(false);
  const [changeATC, setChangeATC] = useState(false);
  const [cartItemName, setCartItemName] = useState([]);
  const [clickATC, setClickATC] = useState(false);
  const [productReviewsData, setProductReviewsData] = useState([]);
  const productsId = [
    "67e7749163f930dcc6a2715d",
    "67e774a963f930dcc6a2715f",
    "67e774c463f930dcc6a27161",
    "67e7745f63f930dcc6a2715b",
    "67e7740363f930dcc6a27157",
    "67e7742d63f930dcc6a27159",
    "67e773f463f930dcc6a27155",
    "6827168ced4175d21de95c4e",
    "68316295f91df040c479acc8",
    "68316330f91df040c479ad1e",
  ];

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchProductData = async () => {
    try {
      const response = await axiosInstance.get(
        "/order-cart/get-carts?item_type=PURE_GO_MEAL_PRODUCT&is_purchase=true"
      );
      const cartData = response.data.data[0];
      const cartItemData = cartData.items_details.map((data) => data.name);
      setCartItemName(cartItemData);
      productsId.map((data) => fetchProductRatingData(data));
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const fetchProductRatingData = (product_id) => {
    publicAxiosInstance
      .get(`/feedback/products?product_id=${product_id}`)
      .then((response) => {
        const { data } = response;
        if (data && data.status === 200) {
          const feedback = data.data;
          if (feedback && feedback.length > 0) {
            let totalPoints = 0;
            let feedbackCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

            feedback.forEach((feedbackItem) => {
              totalPoints += feedbackItem.feedback_point;
              feedbackCount[feedbackItem.feedback_point]++;
            });
            const averagePoints = totalPoints / feedback.length;

            setProductReviewsData((prevData) => {
              const filteredData = prevData.filter(
                (item) => item._id !== product_id
              );
              const newEntry = {
                _id: product_id,
                average_points: averagePoints.toFixed(1),
                total_count: feedback.length,
              };
              return [...filteredData, newEntry];
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching product feedback:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch product feedback. Please try again later.",
          icon: "error",
        });
      });
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("fg_group_user_authorization");
    if (isLogin) {
      fetchProductData();
    }
  }, []);

  useEffect(() => {
    const isLogin = localStorage.getItem("fg_group_user_authorization");
    if (isLogin && changeATC) {
      fetchProductData();
    }
  }, [changeATC]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const section = document.querySelector(".main-section");
      if (!section) return;

      const { clientX, clientY } = e;
      const { width, height, left, top } = section.getBoundingClientRect();

      const xMove = (clientX - left - width / 2) / (width / 2);
      const yMove = (clientY - top - height / 2) / (height / 2);

      const shapes = document.querySelectorAll(".banner-shape");
      shapes.forEach((shape, index) => {
        const movementFactor = (index + 1) * 3;

        const reverseX = index % 2 === 0 ? -1 : 1;
        const reverseY = index % 2 !== 0 ? -1 : 1;

        shape.style.transform = `translate(${
          xMove * movementFactor * reverseX
        }px, ${yMove * movementFactor * reverseY}px)`;
      });
    };

    const section = document.querySelector(".main-section");
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const carouselOptions = {
    loop: true,
    autoplay: true,
    dots: false,
    nav: true,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  };

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
        fetchProductData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const options = {
    loop: true,
    dots: true,
    dotsEach: true,
    nav: false,
    autoplayTimeout: 3000,
    smartSpeed: 500,
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 },
    },
  };

  const options1 = {
    loop: true,
    dots: false,
    dotsEach: false,
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 },
    },
  };

  const handleCartOpen = async () => {
    setClickATC(true);
  };

  const handleChangeCart = async () => {
    setChangeATC(true);
  };

  const handleChangeATC = async () => {
    if (changeATC) {
      setChangeATC(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          PureGo Nutrition | Premium Supplements for Fitness & Health
        </title>
        <meta
          name="description"
          content="Shop PureGo for high-quality nutrition, fitness supplements & wellness products. Fuel your body & boost performance."
        />
        <meta
          name="keyword"
          content="purego, protein powder, creatine protein powder, preworkout, bodybuilding supplement, lean whey protein powder, whey protein powder, eaa powder, bcaa supplement, protein powder, best protein powder, bcaa, best pre workout, protein powder, whey protein isolate, best protein powder for women, best protein powder, protein powder for weight loss, best protein powder for weight loss, organic protein powder, isolate protein, best supplements for muscle growth, whey isolate protein powder, best pre workout for men, best whey protein powder, best pre workout for women, best whey protein, bcaa powder, protein whey, pre workout for women, creatine monohydrate powder, best protein powder for muscle gain, best muscle building supplements, chocolate protein powder"
        />
        <meta
          property="og:image"
          content="https://www.purego.gomzilifesciences.in/assets/process.env.PUBLIC_URL + '/assets/images/nutrition-logo.png"
        />
        <meta
          property="og:url"
          content="https://purego.gomzilifesciences.in/"
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
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-J50WNKGW38"
        ></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J50WNKGW38');
          `}
        </script>
      </Helmet>
      <p className="d-none">
        purego, protein powder, creatine protein powder, preworkout,
        bodybuilding supplement, lean whey protein powder, whey protein powder,
        eaa powder, bcaa supplement, protein powder, best protein powder, bcaa,
        best pre workout, protein powder, whey protein isolate, best protein
        powder for women, best protein powder, protein powder for weight loss,
        best protein powder for weight loss, organic protein powder, isolate
        protein, best supplements for muscle growth, whey isolate protein
        powder, best pre workout for men, best whey protein powder, best pre
        workout for women, best whey protein, bcaa powder, protein whey, pre
        workout for women, creatine monohydrate powder, best protein powder for
        muscle gain, best muscle building supplements, chocolate protein powder
      </p>
      {showModal && <LoginModal onClose={closeModal} />}
      <AddToCartPopUp
        clickATC={clickATC}
        setClickATC={setClickATC}
        changeATC={changeATC}
        handleChangeCart={handleChangeCart}
        handleChangeATC={handleChangeATC}
      />
      <NutritionHeader
        cartItemName={cartItemName}
        openModal={openModal}
        handleCartOpen={handleCartOpen}
        changeATC={changeATC}
        handleChangeATC={handleChangeATC}
      />
      <button className="scroll-top scroll-to-target" data-target="html">
        <i className="fas fa-angle-up"></i>
      </button>
      <main className="main-area fix">
        <section className="banner-area main-section">
          <OwlCarousel {...options1} className="product-slide owl-theme">
            <div>
              <img
                src={process.env.PUBLIC_URL + "/assets/images/banner_3.webp"}
                alt="shape"
                width="100%"
                className="d-md-block d-none"
              />
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/images/banner_mobile_3.webp"
                }
                alt="shape"
                width="100%"
                className="d-md-none d-block"
              />
            </div>
            <div>
              <img
                src={process.env.PUBLIC_URL + "/assets/images/banner_1.webp"}
                alt="shape"
                width="100%"
                className="d-md-block d-none"
              />
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/images/banner_mobile_1.webp"
                }
                alt="shape"
                width="100%"
                className="d-md-none d-block"
              />
            </div>
            <div>
              <img
                src={process.env.PUBLIC_URL + "/assets/images/banner_2.webp"}
                alt="shape"
                width="100%"
                className="d-md-block d-none"
              />
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/images/banner_mobile_2.webp"
                }
                alt="shape"
                width="100%"
                className="d-md-none d-block"
              />
            </div>
          </OwlCarousel>
        </section>
        <section className="features-products">
          <div className="section-title text-center mb-60">
            <p className="sub-title">
              <i className="fa-solid fa-quote-left"></i> Wellness, Quality, and
              Transparency — That's PureGo{" "}
              <i className="fa-solid fa-quote-right"></i>
            </p>
            <h1 className="title">Elevate Everyday Living</h1>
          </div>
          <div className="container text-center">
            {/* justify-content-center */}
            <div className="row">
              <div className="col-lg-3 col-sm-6 mt-3 text-start">
                <div className="item-card">
                  <div className="item-img-sec text-center">
                    <OwlCarousel
                      {...options}
                      className="product-slide owl-theme"
                    >
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          src="/assets/images/products/whey-protein/whey-protein-chocolate-1.webp"
                          alt="whey-protein-chocolate"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          src="/assets/images/products/whey-protein/whey-protein-chocolate-2.webp"
                          alt="whey-protein-chocolate"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          src="/assets/images/products/whey-protein/whey-protein-chocolate-3.webp"
                          alt="whey-protein-chocolate"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          src="/assets/images/products/whey-protein/whey-protein-chocolate-4.webp"
                          alt="whey-protein-chocolate"
                        />
                      </div>
                    </OwlCarousel>

                    <div className="wishlist d-flex justify-content-end">
                      <img
                        alt="inWishlist"
                        width="70px"
                        className="position-relative"
                        src="/assets/images/fifty-discount.png"
                      />
                      <p className="wishlist-text-first">53%</p>
                      <p className="wishlist-text-second">OFF</p>
                    </div>
                  </div>
                  <div className="item-card-detail">
                    <div>
                      <span
                        className="item-rating-count"
                        style={{ lineHeight: "26px", marginTop: "10px" }}
                      >
                        <div className="item-ratings d-flex justify-content-between">
                          <div className="item-normal-div d-flex">
                            <span className="item-rating-child d-flex align-items-center">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "67e7749163f930dcc6a2715d" &&
                                  product.average_points
                              )}
                              {/* 4.5 */}
                              <i className="fa-solid fa-star ms-1"></i>
                            </span>
                            <div className="item-reviews ms-1">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "67e7749163f930dcc6a2715d" &&
                                  product.total_count
                              )}{" "}
                              reviews
                            </div>
                          </div>
                          <span className="item-veg">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/veg-icon.png"
                              }
                              width="100%"
                              alt="img"
                            />
                          </span>
                        </div>
                      </span>
                      <Link to="/whey-protein-powder?flavor=Chocolate">
                        <div
                          className="item-title"
                          style={{ WebkitBoxOrient: "vertical" }}
                        >
                          Whey Protein 1kg Chocolate{" "}
                        </div>
                      </Link>
                      <p className="item-description">
                        Pure Go Whey Protein Chocolate is a Mixture of Whey
                        Isolate, Whey Concentrate, Skimmed Milk powder, So...
                      </p>
                    </div>
                    <div>
                      <div className="item-desc">
                        <div className="">
                          <div className="d-flex align-items-center">
                            <span className="variant-price"> ₹2999/-</span>
                            {/* <span className="variant-old-price">₹2999</span> */}
                            {/* <span className="variant-offer">53% off</span> */}
                          </div>
                          <div className="d-flex">
                            {cartItemName.some((item) =>
                              item.includes("Whey Protein 1kg Chocolate")
                            ) ? (
                              <button className="product-btn item-add-to-cart-btn">
                                Item Added
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  addProductInCart("67e7749163f930dcc6a2715d")
                                }
                                className="product-btn item-add-to-cart-btn"
                              >
                                <i className="fa-solid fa-cart-shopping me-2"></i>
                                Add to Cart
                              </button>
                            )}
                            <Link
                              to="/whey-protein-powder?flavor=Chocolate"
                              className="product-btn item-view-btn"
                            >
                              <i className="fa-solid fa-eye me-2"></i>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-3 text-start">
                <div className="item-card">
                  <div className="item-img-sec text-center">
                    <OwlCarousel
                      {...options}
                      className="product-slide owl-theme"
                    >
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/whey-protein/whey-protein-mawakulfi-1.webp"
                          alt="Whey Protein 1kg Mawa Kulfi"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/whey-protein/whey-protein-mawakulfi-2.webp"
                          alt="Whey Protein 1kg Mawa Kulfi"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/whey-protein/whey-protein-mawakulfi-3.webp"
                          alt="Whey Protein 1kg Mawa Kulfi"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/whey-protein/whey-protein-mawakulfi-4.webp"
                          alt="Whey Protein 1kg Mawa Kulfi"
                        />
                      </div>
                    </OwlCarousel>
                    <div className="wishlist d-flex justify-content-end">
                      <img
                        alt="inWishlist"
                        width="70px"
                        className="position-relative"
                        src="/assets/images/fifty-discount.png"
                      />
                      <p className="wishlist-text-first">53%</p>
                      <p className="wishlist-text-second">OFF</p>
                    </div>
                  </div>
                  <div className="item-card-detail">
                    <div>
                      <span
                        className="item-rating-count"
                        style={{ lineHeight: "26px", marginTop: "10px" }}
                      >
                        <div className="item-ratings d-flex justify-content-between">
                          <div className="item-normal-div d-flex">
                            <span className="item-rating-child d-flex align-items-center">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "67e7749163f930dcc6a2715d" &&
                                  product.average_points
                              )}
                              <i className="fa-solid fa-star ms-1"></i>
                            </span>
                            <div className="item-reviews ms-1">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "67e7749163f930dcc6a2715d" &&
                                  product.total_count
                              )}{" "}
                              reviews
                            </div>
                          </div>
                          <span className="item-veg">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/veg-icon.png"
                              }
                              width="100%"
                              alt="img"
                            />
                          </span>
                        </div>
                      </span>
                      <Link to="/whey-protein-powder?flavor=Mawa Kulfi">
                        <div
                          className="item-title"
                          style={{ WebkitBoxOrient: "vertical" }}
                        >
                          Whey Protein 1kg Mawa Kulfi{" "}
                        </div>
                      </Link>
                      <p className="item-description">
                        Pure Go Whey Protein Mawa Kulfi is a Mixture of Whey
                        Isolate, Whey Concentrate, Skimmed Milk powder, So...
                      </p>
                    </div>
                    <div>
                      <div className="item-desc">
                        <div className="">
                          <div className="d-flex align-items-center">
                            <span className="variant-price"> ₹3190/-</span>
                            {/* <span className="variant-old-price">₹3190</span> */}
                            {/* <span className="variant-offer">53% off</span> */}
                          </div>
                          <div className="d-flex">
                            {cartItemName.some((item) =>
                              item.includes("Whey Protein 1kg Mawa Kulfi")
                            ) ? (
                              <button className="product-btn item-add-to-cart-btn">
                                Item Added
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  addProductInCart("67e774a963f930dcc6a2715f")
                                }
                                className="product-btn item-add-to-cart-btn"
                              >
                                <i className="fa-solid fa-cart-shopping me-2"></i>
                                Add to Cart
                              </button>
                            )}
                            <Link
                              to="/whey-protein-powder?flavor=Mawa Kulfi"
                              className="product-btn item-view-btn"
                            >
                              <i className="fa-solid fa-eye me-2"></i>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-3 text-start">
                <div className="item-card">
                  <div className="item-img-sec text-center">
                    <OwlCarousel
                      {...options}
                      className="product-slide owl-theme"
                    >
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/whey-protein/whey-protein-mochacoffee-1.webp"
                          alt="whey-protein-mocha-coffee"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/whey-protein/whey-protein-mochacoffee-2.webp"
                          alt="whey-protein-mocha-coffee"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/whey-protein/whey-protein-mochacoffee-3.webp"
                          alt="whey-protein-mocha-coffee"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/whey-protein/whey-protein-mochacoffee-4.webp"
                          alt="whey-protein-mocha-coffee"
                        />
                      </div>
                    </OwlCarousel>
                    <div className="wishlist d-flex justify-content-end">
                      <img
                        alt="inWishlist"
                        width="70px"
                        className="position-relative"
                        src="/assets/images/fifty-discount.png"
                      />
                      <p className="wishlist-text-first">53%</p>
                      <p className="wishlist-text-second">OFF</p>
                    </div>
                  </div>
                  <div className="item-card-detail">
                    <div>
                      <span
                        className="item-rating-count"
                        style={{ lineHeight: "26px", marginTop: "10px" }}
                      >
                        <div className="item-ratings d-flex justify-content-between">
                          <div className="item-normal-div d-flex">
                            <span className="item-rating-child d-flex align-items-center">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "67e7749163f930dcc6a2715d" &&
                                  product.average_points
                              )}
                              <i className="fa-solid fa-star ms-1"></i>
                            </span>
                            <div className="item-reviews ms-1">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "67e7749163f930dcc6a2715d" &&
                                  product.total_count
                              )}{" "}
                              reviews
                            </div>
                          </div>
                          <span className="item-veg">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/veg-icon.png"
                              }
                              width="100%"
                              alt="img"
                            />
                          </span>
                        </div>
                      </span>
                      <Link to="/whey-protein-powder?flavor=Mocha Coffee">
                        <div
                          className="item-title"
                          style={{ WebkitBoxOrient: "vertical" }}
                        >
                          Whey Protein 1kg Mocha Coffee{" "}
                        </div>
                      </Link>
                      <p className="item-description">
                        Pure Go Whey Protein Mocha Coffee is a Mixture of Whey
                        Isolate, Whey Concentrate, Skimmed Milk powder, So...
                      </p>
                    </div>
                    <div>
                      <div className="item-desc">
                        <div className="">
                          <div className="d-flex align-items-center">
                            <span className="variant-price"> ₹3190/-</span>
                            {/* <span className="variant-old-price">₹3190</span> */}
                            {/* <span className="variant-offer">53% off</span> */}
                          </div>
                          <div className="d-flex">
                            {cartItemName.some((item) =>
                              item.includes("Whey Protein 1kg Mocha Coffee")
                            ) ? (
                              <button className="product-btn item-add-to-cart-btn">
                                Item Added
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  addProductInCart("67e774c463f930dcc6a27161")
                                }
                                className="product-btn item-add-to-cart-btn"
                              >
                                <i className="fa-solid fa-cart-shopping me-2"></i>
                                Add to Cart
                              </button>
                            )}
                            <Link
                              to="/whey-protein-powder?flavor=Mocha Coffee"
                              className="product-btn item-view-btn"
                            >
                              <i className="fa-solid fa-eye me-2"></i>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-3 text-start">
                <div className="item-card">
                  <div className="item-img-sec text-center">
                    <OwlCarousel
                      {...options}
                      className="product-slide owl-theme"
                    >
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/whey-protein/whey-protein-mango-1.webp"
                          alt="whey-protein-mango"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/whey-protein/whey-protein-mango-2.webp"
                          alt="whey-protein-mango"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/whey-protein/whey-protein-mango-3.webp"
                          alt="whey-protein-mango"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/whey-protein/whey-protein-mango-4.webp"
                          alt="whey-protein-mango"
                        />
                      </div>
                    </OwlCarousel>
                    <div className="wishlist d-flex justify-content-end">
                      <img
                        alt="inWishlist"
                        width="70px"
                        className="position-relative"
                        src="/assets/images/fifty-discount.png"
                      />
                      <p className="wishlist-text-first">53%</p>
                      <p className="wishlist-text-second">OFF</p>
                    </div>
                  </div>
                  <div className="item-card-detail">
                    <div>
                      <span
                        className="item-rating-count"
                        style={{ lineHeight: "26px", marginTop: "10px" }}
                      >
                        <div className="item-ratings d-flex justify-content-between">
                          <div className="item-normal-div d-flex">
                            <span className="item-rating-child d-flex align-items-center">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "67e7749163f930dcc6a2715d" &&
                                  product.average_points
                              )}
                              <i className="fa-solid fa-star ms-1"></i>
                            </span>
                            <div className="item-reviews ms-1">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "67e7749163f930dcc6a2715d" &&
                                  product.total_count
                              )}{" "}
                              reviews
                            </div>
                          </div>
                          <span className="item-veg">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/veg-icon.png"
                              }
                              width="100%"
                              alt="img"
                            />
                          </span>
                        </div>
                      </span>
                      <Link to="/whey-protein-powder?flavor=Mango">
                        <div
                          className="item-title"
                          style={{ WebkitBoxOrient: "vertical" }}
                        >
                          Whey Protein 1kg Mango{" "}
                        </div>
                      </Link>
                      <p className="item-description">
                        Pure Go Whey Protein Mango is a Mixture of Whey Isolate,
                        Whey Concentrate, Skimmed Milk powder, So...
                      </p>
                    </div>
                    <div>
                      <div className="item-desc">
                        <div className="">
                          <div className="d-flex align-items-center">
                            <span className="variant-price"> ₹3190/-</span>
                            {/* <span className="variant-old-price">₹3190</span> */}
                            {/* <span className="variant-offer">53% off</span> */}
                          </div>
                          <div className="d-flex">
                            {cartItemName.some((item) =>
                              item.includes("Whey Protein 1kg Mango")
                            ) ? (
                              <button className="product-btn item-add-to-cart-btn">
                                Item Added
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  addProductInCart("68316295f91df040c479acc8")
                                }
                                className="product-btn item-add-to-cart-btn"
                              >
                                <i className="fa-solid fa-cart-shopping me-2"></i>
                                Add to Cart
                              </button>
                            )}
                            <Link
                              to="/whey-protein-powder?flavor=Mango"
                              className="product-btn item-view-btn"
                            >
                              <i className="fa-solid fa-eye me-2"></i>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-3 text-start">
                <div className="item-card">
                  <div className="item-img-sec text-center">
                    <OwlCarousel
                      {...options}
                      className="product-slide owl-theme"
                    >
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/mass-gainer/mass-gainer-1.webp"
                          alt="Mass Gainer"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/mass-gainer/mass-gainer-2.webp"
                          alt="Mass Gainer"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/mass-gainer/mass-gainer-3.webp"
                          alt="Mass Gainer"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/mass-gainer/mass-gainer-4.webp"
                          alt="Mass Gainer"
                        />
                      </div>
                    </OwlCarousel>
                    <div className="wishlist d-flex justify-content-end">
                      <img
                        alt="inWishlist"
                        width="70px"
                        className="position-relative"
                        src="/assets/images/fifty-discount.png"
                      />
                      <p className="wishlist-text-first">66%</p>
                      <p className="wishlist-text-second">OFF</p>
                    </div>
                  </div>
                  <div className="item-card-detail">
                    <div>
                      <span
                        className="item-rating-count"
                        style={{ lineHeight: "26px", marginTop: "10px" }}
                      >
                        <div className="item-ratings d-flex justify-content-between">
                          <div className="item-normal-div d-flex">
                            <span className="item-rating-child d-flex align-items-center">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "67e7745f63f930dcc6a2715b" &&
                                  product.average_points
                              )}
                              <i className="fa-solid fa-star ms-1"></i>
                            </span>
                            <div className="item-reviews ms-1">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "67e7745f63f930dcc6a2715b" &&
                                  product.total_count
                              )}{" "}
                              reviews
                            </div>
                          </div>
                          <span className="item-veg">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/veg-icon.png"
                              }
                              width="100%"
                              alt="img"
                            />
                          </span>
                        </div>
                      </span>
                      <Link to="/mass-gainer-protein-powder">
                        <div
                          className="item-title"
                          style={{ WebkitBoxOrient: "vertical" }}
                        >
                          Whey Mass Matrix 1kg Chocolate{" "}
                        </div>
                      </Link>
                      <p className="item-description">
                        Achieve Your Bulking Goals with Pure Go Mass Gainer
                        Powder. Our specially formulated blend is designed to
                        support...
                      </p>
                    </div>
                    <div>
                      <div className="item-desc">
                        <div className="">
                          <div className="d-flex align-items-center">
                            <span className="variant-price"> ₹1500/-</span>
                            {/* <span className="variant-old-price">₹1500</span> */}
                            {/* <span className="variant-offer">60% off</span> */}
                          </div>
                          <div className="d-flex">
                            {cartItemName.some((item) =>
                              item.includes("Whey Mass Matrix 1kg Chocolate")
                            ) ? (
                              <button className="product-btn item-add-to-cart-btn">
                                Item Added
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  addProductInCart("67e7745f63f930dcc6a2715b")
                                }
                                className="product-btn item-add-to-cart-btn"
                              >
                                <i className="fa-solid fa-cart-shopping me-2"></i>
                                Add to Cart
                              </button>
                            )}
                            <Link
                              to="/mass-gainer-protein-powder"
                              className="product-btn item-view-btn"
                            >
                              <i className="fa-solid fa-eye me-2"></i>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-3 text-start">
                <div className="item-card position-relative">
                  <span className="labeling">Pre workout + fat burner</span>
                  <div className="item-img-sec text-center">
                    <OwlCarousel
                      {...options}
                      className="product-slide owl-theme"
                    >
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/pre-workout/pre-workout-fruit-punch-1.webp"
                          alt="Pre Workout"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/pre-workout/pre-workout-fruit-punch-2.webp"
                          alt="Pre Workout"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/pre-workout/pre-workout-fruit-punch-3.webp"
                          alt="Pre Workout"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/pre-workout/pre-workout-fruit-punch-4.webp"
                          alt="Pre Workout"
                        />
                      </div>
                    </OwlCarousel>
                    <div className="wishlist d-flex justify-content-end">
                      <img
                        alt="inWishlist"
                        width="70px"
                        className="position-relative"
                        src="/assets/images/fifty-discount.png"
                      />
                      <p className="wishlist-text-first">76%</p>
                      <p className="wishlist-text-second">OFF</p>
                    </div>
                  </div>
                  <div className="item-card-detail">
                    <div>
                      <span
                        className="item-rating-count"
                        style={{ lineHeight: "26px", marginTop: "10px" }}
                      >
                        <div className="item-ratings d-flex justify-content-between">
                          <div className="item-normal-div d-flex">
                            <span className="item-rating-child d-flex align-items-center">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "67e7740363f930dcc6a27157" &&
                                  product.average_points
                              )}
                              <i className="fa-solid fa-star ms-1"></i>
                            </span>
                            <div className="item-reviews ms-1">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "67e7740363f930dcc6a27157" &&
                                  product.total_count
                              )}{" "}
                              reviews
                            </div>
                          </div>
                          <span className="item-veg">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/veg-icon.png"
                              }
                              width="100%"
                              alt="img"
                            />
                          </span>
                        </div>
                      </span>
                      <Link to="/weight-loss-supplement">
                        <div
                          className="item-title"
                          style={{ WebkitBoxOrient: "vertical" }}
                        >
                          Pre Workout Fruit Punch 250g{" "}
                        </div>
                      </Link>
                      <p className="item-description">
                        It will suppress your appetite and provide you with a
                        higher energy level in order to keep the adrenaline
                        levels up. It will also...
                      </p>
                    </div>
                    <div>
                      <div className="item-desc">
                        <div className="">
                          <div className="d-flex align-items-center">
                            <span className="variant-price"> ₹2500/-</span>
                            {/* <span className="variant-old-price">₹2500</span> */}
                            {/* <span className="variant-offer">76% off</span> */}
                          </div>
                          <div className="d-flex">
                            {cartItemName.some((item) =>
                              item.includes("Pre Workout")
                            ) ? (
                              <button className="product-btn item-add-to-cart-btn">
                                Item Added
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  addProductInCart("67e7740363f930dcc6a27157")
                                }
                                className="product-btn item-add-to-cart-btn"
                              >
                                <i className="fa-solid fa-cart-shopping me-2"></i>
                                Add to Cart
                              </button>
                            )}
                            <Link
                              to="/weight-loss-supplement"
                              className="product-btn item-view-btn"
                            >
                              <i className="fa-solid fa-eye me-2"></i>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-3 text-start">
                <div className="item-card">
                  <div className="item-img-sec text-center">
                    <OwlCarousel
                      {...options}
                      className="product-slide owl-theme"
                    >
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/eaa/eaa-1.webp"
                          alt="EAA Powder"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/eaa/eaa-2.webp"
                          alt="EAA Powder"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/eaa/eaa-3.webp"
                          alt="EAA Powder"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/eaa/eaa-4.webp"
                          alt="EAA Powder"
                        />
                      </div>
                    </OwlCarousel>
                    <div className="wishlist d-flex justify-content-end">
                      <img
                        alt="inWishlist"
                        width="70px"
                        className="position-relative"
                        src="/assets/images/fifty-discount.png"
                      />
                      <p className="wishlist-text-first">73%</p>
                      <p className="wishlist-text-second">OFF</p>
                    </div>
                  </div>
                  <div className="item-card-detail">
                    <div>
                      <span
                        className="item-rating-count"
                        style={{ lineHeight: "26px", marginTop: "10px" }}
                      >
                        <div className="item-ratings d-flex justify-content-between">
                          <div className="item-normal-div d-flex">
                            <span className="item-rating-child d-flex align-items-center">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "67e7742d63f930dcc6a27159" &&
                                  product.average_points
                              )}
                              <i className="fa-solid fa-star ms-1"></i>
                            </span>
                            <div className="item-reviews ms-1">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "67e7742d63f930dcc6a27159" &&
                                  product.total_count
                              )}{" "}
                              reviews
                            </div>
                          </div>
                          <span className="item-veg">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/veg-icon.png"
                              }
                              width="100%"
                              alt="img"
                            />
                          </span>
                        </div>
                      </span>
                      <Link to="/eaa-supplements">
                        <div
                          className="item-title"
                          style={{ WebkitBoxOrient: "vertical" }}
                        >
                          EAA Powder 250g{" "}
                        </div>
                      </Link>
                      <p className="item-description">
                        EAA is an advanced science-based solution that contains
                        13 Ultra amino acids as well as hydration and a vitamin
                        boost...
                      </p>
                    </div>
                    <div>
                      <div className="item-desc">
                        <div className="">
                          <div className="d-flex align-items-center">
                            <span className="variant-price"> ₹2099/-</span>
                            {/* <span className="variant-old-price">₹2099</span> */}
                            {/* <span className="variant-offer">73% off</span> */}
                          </div>
                          <div className="d-flex">
                            {cartItemName.some((item) =>
                              item.includes("EAA Powder")
                            ) ? (
                              <button className="product-btn item-add-to-cart-btn">
                                Item Added
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  addProductInCart("67e7742d63f930dcc6a27159")
                                }
                                className="product-btn item-add-to-cart-btn"
                              >
                                <i className="fa-solid fa-cart-shopping me-2"></i>
                                Add to Cart
                              </button>
                            )}
                            <Link
                              to="/eaa-supplements"
                              className="product-btn item-view-btn"
                            >
                              <i className="fa-solid fa-eye me-2"></i>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-3 text-start">
                <div className="item-card position-relative">
                  <span className="labeling">
                    India's first flavored creatine
                  </span>
                  <div className="item-img-sec text-center">
                    <OwlCarousel
                      {...options}
                      className="product-slide owl-theme"
                    >
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/creatine/creatine-lemon-1.webp"
                          alt="Creatine Monohydrate"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/creatine/creatine-lemon-2.webp"
                          alt="Creatine Monohydrate"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/creatine/creatine-lemon-3.webp"
                          alt="Creatine Monohydrate"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/creatine/creatine-lemon-4.webp"
                          alt="Creatine Monohydrate"
                        />
                      </div>
                    </OwlCarousel>
                    <div className="wishlist d-flex justify-content-end">
                      <img
                        alt="inWishlist"
                        width="70px"
                        className="position-relative"
                        src="/assets/images/fifty-discount.png"
                      />
                      <p className="wishlist-text-first">69%</p>
                      <p className="wishlist-text-second">OFF</p>
                    </div>
                  </div>
                  <div className="item-card-detail">
                    <div>
                      <span
                        className="item-rating-count"
                        style={{ lineHeight: "26px", marginTop: "10px" }}
                      >
                        <div className="item-ratings d-flex justify-content-between">
                          <div className="item-normal-div d-flex">
                            <span className="item-rating-child d-flex align-items-center">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "67e773f463f930dcc6a27155" &&
                                  product.average_points
                              )}
                              <i className="fa-solid fa-star ms-1"></i>
                            </span>
                            <div className="item-reviews ms-1">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "67e773f463f930dcc6a27155" &&
                                  product.total_count
                              )}{" "}
                              reviews
                            </div>
                          </div>
                          <span className="item-veg">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/veg-icon.png"
                              }
                              width="100%"
                              alt="img"
                            />
                          </span>
                        </div>
                      </span>
                      <Link to="/creatine-supplements">
                        <div
                          className="item-title"
                          style={{ WebkitBoxOrient: "vertical" }}
                        >
                          Creatine Monohydrate Lemon 250g{" "}
                        </div>
                      </Link>
                      <p className="item-description">
                        Creatine monohydrate works by increasing the body's
                        stores of phosphocreatine, a molecule that helps
                        regenerate adenosi...
                      </p>
                    </div>
                    <div>
                      <div className="item-desc">
                        <div className="">
                          <div className="d-flex align-items-center">
                            <span className="variant-price"> ₹1499/-</span>
                            {/* <span className="variant-old-price">₹1499</span> */}
                            {/* <span className="variant-offer">69% off</span> */}
                          </div>
                          <div className="d-flex">
                            {cartItemName.some((item) =>
                              item.includes("Creatine Monohydrate Lemon")
                            ) ? (
                              <button className="product-btn item-add-to-cart-btn">
                                Item Added
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  addProductInCart("67e773f463f930dcc6a27155")
                                }
                                className="product-btn item-add-to-cart-btn"
                              >
                                <i className="fa-solid fa-cart-shopping me-2"></i>
                                Add to Cart
                              </button>
                            )}
                            <Link
                              to="/creatine-supplements"
                              className="product-btn item-view-btn"
                            >
                              <i className="fa-solid fa-eye me-2"></i>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-3 text-start">
                <div className="item-card position-relative">
                  {/* <span className="labeling">India's first flavored BCAA Orange</span> */}
                  <div className="item-img-sec text-center">
                    <OwlCarousel
                      {...options}
                      className="product-slide owl-theme"
                    >
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/bcaa/bcaa-orange-1.webp"
                          alt="BCAA Powder"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/bcaa/bcaa-orange-2.webp"
                          alt="BCAA Powder"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/bcaa/bcaa-orange-3.webp"
                          alt="BCAA Powder"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/bcaa/bcaa-orange-4.webp"
                          alt="BCAA Powder"
                        />
                      </div>
                    </OwlCarousel>
                    <div className="wishlist d-flex justify-content-end">
                      <img
                        alt="inWishlist"
                        width="70px"
                        className="position-relative"
                        src="/assets/images/fifty-discount.png"
                      />
                      <p className="wishlist-text-first">60%</p>
                      <p className="wishlist-text-second">OFF</p>
                    </div>
                  </div>
                  <div className="item-card-detail">
                    <div>
                      <span
                        className="item-rating-count"
                        style={{ lineHeight: "26px", marginTop: "10px" }}
                      >
                        <div className="item-ratings d-flex justify-content-between">
                          <div className="item-normal-div d-flex">
                            <span className="item-rating-child d-flex align-items-center">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "6827168ced4175d21de95c4e" &&
                                  product.average_points
                              )}
                              <i className="fa-solid fa-star ms-1"></i>
                            </span>
                            <div className="item-reviews ms-1">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "6827168ced4175d21de95c4e" &&
                                  product.total_count
                              )}{" "}
                              reviews
                            </div>
                          </div>
                          <span className="item-veg">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/veg-icon.png"
                              }
                              width="100%"
                              alt="img"
                            />
                          </span>
                        </div>
                      </span>
                      <Link to="/bcaa-supplements">
                        <div
                          className="item-title"
                          style={{ WebkitBoxOrient: "vertical" }}
                        >
                          BCAA Orange Powder 250g{" "}
                        </div>
                      </Link>
                      <p className="item-description">
                        It will suppress your appetite and provide you with a
                        higher energy level in order to keep the adrenaline
                        levels up. It will als...
                      </p>
                    </div>
                    <div>
                      <div className="item-desc">
                        <div className="">
                          <div className="d-flex align-items-center">
                            <span className="variant-price"> ₹2100/-</span>
                            {/* <span className="variant-old-price">₹2100</span> */}
                            {/* <span className="variant-offer">69% off</span> */}
                          </div>
                          <div className="d-flex">
                            {cartItemName.some((item) =>
                              item.includes("BCAA Powder Orange")
                            ) ? (
                              <button className="product-btn item-add-to-cart-btn">
                                Item Added
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  addProductInCart("6827168ced4175d21de95c4e")
                                }
                                className="product-btn item-add-to-cart-btn"
                              >
                                <i className="fa-solid fa-cart-shopping me-2"></i>
                                Add to Cart
                              </button>
                            )}
                            <Link
                              to="/bcaa-supplements"
                              className="product-btn item-view-btn"
                            >
                              <i className="fa-solid fa-eye me-2"></i>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-3 text-start">
                <div className="item-card position-relative">
                  <div className="item-img-sec text-center">
                    <OwlCarousel
                      {...options}
                      className="product-slide owl-theme"
                    >
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/shaker-bottle/shaker-bottle-1.webp"
                          alt="Gomzi Nutrition Shaker Bottle 500ml"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/shaker-bottle/shaker-bottle-2.webp"
                          alt="Gomzi Nutrition Shaker Bottle 500ml"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/shaker-bottle/shaker-bottle-3.webp"
                          alt="Gomzi Nutrition Shaker Bottle 500ml"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/shaker-bottle/shaker-bottle-4.webp"
                          alt="Gomzi Nutrition Shaker Bottle 500ml"
                        />
                      </div>
                    </OwlCarousel>
                    {/* <div className="wishlist d-flex justify-content-end">
                      <img
                        alt="inWishlist"
                        width="70px"
                        className="position-relative"
                        src="/assets/images/fifty-discount.png"
                      />
                      <p className="wishlist-text-first">60%</p>
                      <p className="wishlist-text-second">OFF</p>
                    </div> */}
                  </div>
                  <div className="item-card-detail">
                    <div>
                      <span
                        className="item-rating-count"
                        style={{ lineHeight: "26px", marginTop: "10px" }}
                      >
                        <div className="item-ratings d-flex justify-content-between">
                          <div className="item-normal-div d-flex">
                            <span className="item-rating-child d-flex align-items-center">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "68316330f91df040c479ad1e" &&
                                  product.average_points
                              )}
                              <i className="fa-solid fa-star ms-1"></i>
                            </span>
                            <div className="item-reviews ms-1">
                              {productReviewsData.map(
                                (product) =>
                                  product._id === "68316330f91df040c479ad1e" &&
                                  product.total_count
                              )}{" "}
                              reviews
                            </div>
                          </div>
                          {/* <span className="item-veg">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/veg-icon.png"
                              }
                              width="100%"
                              alt="img"
                            />
                          </span> */}
                        </div>
                      </span>
                      <Link to="/shaker-bottle">
                        <div
                          className="item-title"
                          style={{ WebkitBoxOrient: "vertical" }}
                        >
                          Gomzi Nutrition Shaker 500ml{" "}
                        </div>
                      </Link>
                      <p className="item-description">
                        Elevate your fitness game with the Gomzi Nutrition
                        Shaker. Designed to be the ultimate companion for your
                        active...
                      </p>
                    </div>
                    <div>
                      <div className="item-desc">
                        <div className="">
                          <div className="d-flex align-items-center">
                            <span className="variant-price"> ₹149/-</span>
                            {/* <span className="variant-old-price">₹2100</span> */}
                            {/* <span className="variant-offer">69% off</span> */}
                          </div>
                          <div className="d-flex">
                            {cartItemName.some((item) =>
                              item.includes("Shaker Bottle")
                            ) ? (
                              <button className="product-btn item-add-to-cart-btn">
                                Item Added
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  addProductInCart("68316330f91df040c479ad1e")
                                }
                                className="product-btn item-add-to-cart-btn"
                              >
                                <i className="fa-solid fa-cart-shopping me-2"></i>
                                Add to Cart
                              </button>
                            )}
                            <Link
                              to="/shaker-bottle"
                              className="product-btn item-view-btn"
                            >
                              <i className="fa-solid fa-eye me-2"></i>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div>
          <FacilitySlider></FacilitySlider>
        </div>
        <section id="features" className="features-area">
          <div className="d-md-block d-none">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/features-bg.webp"}
              alt="shape"
              width="100%"
            />
          </div>
          <div className="d-md-none d-block">
            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/images/features-bg-mobile.webp"
              }
              alt="shape"
              width="100%"
            />
          </div>
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
        <section id="ingredient" className="ingredients-area">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-xl-5 col-lg-6 col-md-7">
                <div className="">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/features_img02.png"
                    }
                    alt="img"
                  />
                </div>
              </div>
              <div className="col-xl-7 col-lg-9">
                <div className="ingredients-items-wrap">
                  <div className="section-title mb-60 text-center">
                    <p className="sub-title">Product Design By</p>
                    <h2 className="title">Dr. Gautam Jani</h2>
                  </div>
                  <div className="row justify-content-center justify-content-lg-start">
                    <div className="col-12">
                      <div
                        className="ingredients-item wow fadeInUp"
                        data-wow-delay=".2s"
                      >
                        <div className="ingredients-content">
                          <h5 className="title">
                            Founder & CEO of FG Group / CEO GCS PVT LTD / Core
                            member of INPTA
                          </h5>
                          <p>
                            He finished his Civil Engineer and turned fitness
                            enthusiast in 2014 began his personal training
                            journey in Gujarat, India, in 2016. Certified by
                            ACSM, ISSA, and VLCC. he specializes in Clinical and
                            weight loss nutrition, Strength Training, Exercise
                            Science, and Performance Enhancement Drugs. In 2019
                            finished his MBA for better training and placement
                            services for their student of FGIIT. In 2024, he
                            earned his Ph.D. in Health & Fitness from Thames
                            university. As the Founder of FGIIT, Gautam is
                            dedicated to promoting holistic well-being through
                            personalized training and nutritional guidance.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <GymVideo />
        <section className="formula-area formula-bg">
          <div className="">
            <div className="section-title text-center white-title mb-50">
              <p className="sub-title">Purego Wellness</p>
              <h2 className="title">Certificates</h2>
            </div>
            <div className="row d-md-flex d-none justify-content-center">
              <div className="col-lg-2 mt-3">
                <img
                  className="img-fluid"
                  src={
                    process.env.PUBLIC_URL + "/assets/images/nutri-certi-5.webp"
                  }
                  alt="Certificate"
                  loading="lazy"
                />
              </div>
              <div className="col-lg-2 mt-3">
                <img
                  className="img-fluid"
                  src={
                    process.env.PUBLIC_URL + `/assets/images/nutri-certi-1.webp`
                  }
                  alt="Certificate"
                  loading="lazy"
                />
              </div>
              <div className="col-lg-2 mt-3">
                <img
                  className="img-fluid"
                  src={
                    process.env.PUBLIC_URL + "/assets/images/nutri-certi-2.webp"
                  }
                  alt="Certificate"
                  loading="lazy"
                />
              </div>
              <div className="col-lg-2 mt-3">
                <img
                  className="img-fluid"
                  src={
                    process.env.PUBLIC_URL + "/assets/images/nutri-certi-3.webp"
                  }
                  alt="Certificate"
                  loading="lazy"
                />
              </div>
              <div className="col-lg-2 mt-3">
                <img
                  className="img-fluid"
                  src={
                    process.env.PUBLIC_URL + "/assets/images/nutri-certi-4.webp"
                  }
                  alt="Certificate"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="row d-md-none d-flex">
              <OwlCarousel
                id="fwg-owl"
                className="owl-theme"
                {...carouselOptions}
              >
                <div className="item px-1">
                  <div className="col-lg-2 mt-3">
                    <img
                      className="img-fluid"
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/nutri-certi-5.webp"
                      }
                      alt="Certificate"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="item px-1">
                  <div className="col-lg-2 mt-3">
                    <img
                      className="img-fluid"
                      src={
                        process.env.PUBLIC_URL +
                        `/assets/images/nutri-certi-1.webp`
                      }
                      alt="Certificate"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="item px-1">
                  <div className="col-lg-2 mt-3">
                    <img
                      className="img-fluid"
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/nutri-certi-2.webp"
                      }
                      alt="Certificate"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="item px-1">
                  <div className="col-lg-2 mt-3">
                    <img
                      className="img-fluid"
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/nutri-certi-3.webp"
                      }
                      alt="Certificate"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="item px-1">
                  <div className="col-lg-2 mt-3">
                    <img
                      className="img-fluid"
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/nutri-certi-4.webp"
                      }
                      alt="Certificate"
                      loading="lazy"
                    />
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </section>
        <section className="bg-happy-client pt-5 pb-5">
          <HappyClientReview />
        </section>
        <section
          className="testimonial-area testimonial-bg"
          data-background="assets/img/bg/testimonial_bg.jpg"
        >
          <div className="testimonial-overlay"></div>
          <div className="container">
            <div className="section-title text-center white-title mb-50">
              <p className="sub-title">Are Client Says</p>
              <h2 className="title">Testimonials</h2>
            </div>
            <div className="row justify-content-center">
              <div className="col-xxl-8 col-xl-9 col-lg-11">
                <div className="testimonial-active">
                  <OwlCarousel
                    loop
                    nav
                    autoplay
                    dots={false}
                    id="fwg-owl"
                    className="owl-carousel owl-theme owl-nav-1"
                    navText={[
                      '<i class="fas fa-arrow-left"></i>',
                      '<i class="fas fa-arrow-right"></i>',
                    ]}
                    responsive={{
                      0: {
                        items: 1,
                      },
                      600: {
                        items: 1,
                      },
                      1000: {
                        items: 1,
                      },
                    }}
                  >
                    <div className="testimonial-item text-center">
                      <div className="testimonial-avatar-wrap">
                        <div className="testi-avatar-img">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/testi_avatar01.jpg"
                            }
                            alt="img"
                          />
                        </div>
                        <div className="testi-avatar-info">
                          <h5 className="name">Nisha Choudhary</h5>
                        </div>
                      </div>
                      <p>
                        “Purego products are amazing! The quality is top-notch,
                        and I feel healthier since using them. Highly recommend
                        for anyone looking for natural and effective
                        supplements.
                      </p>
                    </div>
                    <div className="testimonial-item text-center">
                      <div className="testimonial-avatar-wrap">
                        <div className="testi-avatar-img">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/testi_avatar02.jpg"
                            }
                            alt="img"
                          />
                        </div>
                        <div className="testi-avatar-info">
                          <h5 className="name">Shalin Jariwala</h5>
                        </div>
                      </div>
                      <p>
                        “Pure Go delivers on its promises! I tried their Pre
                        Workout, and it worked wonders. Authentic, safe, and
                        worth every penny. Will buy again!
                      </p>
                    </div>
                    <div className="testimonial-item text-center">
                      <div className="testimonial-avatar-wrap">
                        <div className="testi-avatar-img">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/testi_avatar03.jpg"
                            }
                            alt="img"
                          />
                        </div>
                        <div className="testi-avatar-info">
                          <h5 className="name">Pathik Patel</h5>
                        </div>
                      </div>
                      <p>
                        “Great range of wellness products at reasonable prices.
                        Loved their whey protein supplements. Packaging is good,
                        and delivery was on time. Satisfied with purchase!
                      </p>
                    </div>
                    <div className="testimonial-item text-center">
                      <div className="testimonial-avatar-wrap">
                        <div className="testi-avatar-img">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/testi_avatar04.jpg"
                            }
                            alt="img"
                          />
                        </div>
                        <div className="testi-avatar-info">
                          <h5 className="name">Satish Nishad</h5>
                        </div>
                      </div>
                      <p>
                        “I was skeptical at first, but Purego proved me wrong!
                        Their products are genuine and effective. Customer
                        service is also responsive. Definitely a brand I trust
                        now!
                      </p>
                    </div>
                  </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="testimonial-rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star-half-alt"></i>
        </div> */}
        </section>
        <section id="news" className="tg-blog-area pt-80">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-8">
                <div className="section-title text-center white-title mb-50">
                  <p className="sub-title">
                    PureGo: Where Quality Meets Wellness
                  </p>
                  <h2>Blogs</h2>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-xl-4 col-lg-5 col-md-6 col-sm-9">
                <div
                  className="tg-blog-post-item mb-30 wow fadeInUp"
                  data-wow-delay=".2s"
                >
                  <div className="tg-blog-post-thumb">
                    <a href="/top-supplements-for-weight-gain">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "assets/images/blog_post_thumb01.webp"
                        }
                        alt="blog"
                      />
                    </a>
                  </div>
                  <div className="tg-blog-post-content">
                    <div className="post-date">
                      <i className="far fa-calendar-alt"></i> 24th September
                      2024
                    </div>
                    <h4 className="title">
                      <a href="/top-supplements-for-weight-gain">
                        Top Supplements for Weight Gain: A Comparative Analysis
                      </a>
                    </h4>
                    <a
                      href="/top-supplements-for-weight-gain"
                      className="read-more"
                    >
                      <span>Read More</span>{" "}
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-6 col-sm-9">
                <div
                  className="tg-blog-post-item mb-30 wow fadeInUp"
                  data-wow-delay=".4s"
                >
                  <div className="tg-blog-post-thumb">
                    <a href="/how-supplements-help-you-live-healthy-life">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "assets/images/blog_post_thumb02.webp"
                        }
                        alt="blog"
                      />
                    </a>
                  </div>
                  <div className="tg-blog-post-content">
                    <div className="post-date">
                      <i className="far fa-calendar-alt"></i> 24th September
                      2024
                    </div>
                    <h4 className="title">
                      <a href="/how-supplements-help-you-live-healthy-life">
                        How Supplements Help you live a healthy life
                      </a>
                    </h4>
                    <a
                      href="/how-supplements-help-you-live-healthy-life"
                      className="read-more"
                    >
                      <span>Read More</span>{" "}
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-6 col-sm-9">
                <div
                  className="tg-blog-post-item mb-30 wow fadeInUp"
                  data-wow-delay=".6s"
                >
                  <div className="tg-blog-post-thumb">
                    <a href="/best-whey-protein-in-india">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "assets/images/blog_post_thumb03.webp"
                        }
                        alt="blog"
                      />
                    </a>
                  </div>
                  <div className="tg-blog-post-content">
                    <div className="post-date">
                      <i className="far fa-calendar-alt"></i> 24th September
                      2024
                    </div>
                    <h4 className="title">
                      <a href="/best-whey-protein-in-india">
                        The Ultimate Guide to the Best Whey Protein to Try in
                        India
                      </a>
                    </h4>
                    <a href="/best-whey-protein-in-india" className="read-more">
                      <span>Read More</span>{" "}
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="news" className="blog-post-area">
          <div className="container">
            <div className="blog-inner-wrapper">
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="faq-wrapper">
                    <div className="section-title mb-50">
                      <p className="sub-title">Ask Question</p>
                      <h2 className="title">Your Wellness FAQs</h2>
                    </div>
                    <Accordion defaultActiveKey={["1"]} alwaysOpen>
                      <Accordion.Item eventKey="1" className="mt-3 p-md-4 p-3">
                        <Accordion.Header className="f-18 lp-2">
                          Is protein only used for muscle development?
                        </Accordion.Header>
                        <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                          A lot of people think that protein is only used for
                          muscle growth and repair, however it can provide a lot
                          of other benefits, such as refueling your stores of
                          nutrients and amino acids which have been lost during
                          exercise.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2" className="mt-3 p-md-4 p-3">
                        <Accordion.Header className="f-18 lp-2">
                          What is whey protein?
                        </Accordion.Header>
                        <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                          Whey is a "complete" protein, meaning it contains all
                          the essential amino acids that the human body requires
                          for proper repair and function. Whey protein is also a
                          rich source of the branched chain amino acids,
                          L-Leucine, L-Isoleucine and L-Valine.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="3" className="mt-3 p-md-4 p-3">
                        <Accordion.Header className="f-18 lp-2">
                          Difference between whey protein isolate and whey
                          protein concentrate?
                        </Accordion.Header>
                        <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                          According to the Food and Drug Administration, whey
                          protein isolate is a natural dairy protein powder made
                          up of at least 90% protein. As a protein source, whey
                          protein isolate contains more protein than whey
                          protein concentrate, which contains about 80% protein.
                          In addition, whey protein isolate contains almost no
                          sugar, lactose or fat. Although whey protein isolate
                          packs more protein, whey protein concentrate is the
                          most economical option per gram of protein.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="4" className="mt-3 p-md-4 p-3">
                        <Accordion.Header className="f-18 lp-2 me-2">
                          Can those who are lactose intolerant eat whey protein?
                        </Accordion.Header>
                        <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                          Whey protein isolate is virtually free of lactose, but
                          may contain trace amounts (0.5g per serving). Most
                          people who are lactose intolerant are able to safely
                          consume whey without any negative side effects however
                          a medical practitioner should always be consulted
                          before taking if there are any doubts.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="5" className="mt-3 p-md-4 p-3">
                        <Accordion.Header className="f-18 lp-2">
                          If whey protein concentrate is 80% protein, what is
                          the other 20%?
                        </Accordion.Header>
                        <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                          Every protein powder, whether it's whey, soy, casein,
                          etc., has moisture. In fact, 5% of the total formula
                          is water. Another 3-5% is made up of naturally
                          occurring minerals in whey. The remaining 10-12% is a
                          combination of carbs and fat.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="6" className="mt-3 p-md-4 p-3">
                        <Accordion.Header className="f-18 lp-2">
                          Will A Higher Protein Diet Harm My Kidneys?
                        </Accordion.Header>
                        <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                          According to a study published in the "American
                          Journal of Kidney Disease," anyone who is currently
                          suffering from chronic kidney disease should avoid
                          high-protein diets. For otherwise healthy folk, your
                          high protein intake should not pose a threat to your
                          kidneys; make sure to keep your total daily protein
                          consumption reasonable and consume sufficient water to
                          counteract the water loss. Check with your doctor
                          first if you are concerned about this.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="7" className="mt-3 p-md-4 p-3">
                        <Accordion.Header className="f-18 lp-2 me-2">
                          Will More Protein Help Me Build Muscle Faster?
                        </Accordion.Header>
                        <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                          Yes, but only to some degree. Not all dietary protein
                          you eat goes toward protein synthesis. Once you eat
                          enough protein to drive protein synthesis, your body
                          will oxidize protein for energy. Driving your protein
                          intake far beyond the realm of 30-35 percent of your
                          daily calories probably won't provide additional
                          muscle-building benefits, but it will cut into your
                          fat and carbohydrate intake, which may actually hinder
                          your goals. This isn't exact, but eating at least 1
                          gram of protein per pound per day should cover your
                          bases.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="8" className="mt-3 p-md-4 p-3">
                        <Accordion.Header className="f-18 lp-2">
                          Is It True The Body Can Only Use 30 Grams Of Protein
                          At Once?
                        </Accordion.Header>
                        <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                          You're going to digest all the protein you eat, but
                          more isn't always better. Once you turn on protein
                          synthesis and initiate the muscle-building process,
                          you can't turn it on "more" in one meal. Roughly 30
                          grams of protein per meal across multiple meals will
                          actually help you boost protein synthesis many times
                          over the course of a day. It will probably be easier
                          on your digestive system, too.
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="blog-bg-shape one"></div>
          <div className="blog-bg-shape two"></div>
        </section>
      </main>
      <HomeNutritionFooter />
    </>
  );
}

export default Home;
