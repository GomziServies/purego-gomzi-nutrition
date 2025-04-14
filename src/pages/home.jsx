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
import { axiosInstance } from "../assets/js/config/api";
import LoginModal from "../assets/js/popup/login";

function Home() {
  const canonicalUrl = window.location.href;
  const [videoUrl, setVideoUrl] = useState("");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openVideoModal = (url) => {
    setIsVideoOpen(true);
    setVideoUrl(url);
  };

  const closeVideoModal = () => {
    setIsVideoOpen(false);
    setVideoUrl("");
  };

  const [cartItemName, setCartItemName] = useState([]);

  const fetchProductData = async () => {
    try {
      const response = await axiosInstance.get(
        "/order-cart/get-carts?item_type=PURE_GO_MEAL_PRODUCT&is_purchase=true"
      );
      const cartData = response.data.data[0];
      const cartItemData = cartData.items_details.map((data) => data.name);
      setCartItemName(cartItemData);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("fg_group_user_authorization");
    if (isLogin) {
      fetchProductData();
    }
  }, []);

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
        fetchProductData()
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
          content="purego, protein powder, creatine protein powder, preworkout, bodybuilding supplement, lean whey protein powder, whey protein powder, eaa powder, bcaa supplement, vegan protein powder, best protein powder, bcaa, best pre workout, vegan protein, whey protein isolate, best protein powder for women, best vegan protein powder, protein powder for weight loss, best protein powder for weight loss, organic protein powder, isolate protein, best supplements for muscle growth, whey isolate protein powder, best pre workout for men, best whey protein powder, best pre workout for women, best whey protein, bcaa powder, protein whey, pre workout for women, creatine monohydrate powder, best protein powder for muscle gain, best muscle building supplements, chocolate protein powder"
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
        <link
          rel="preload"
          href={`${process.env.PUBLIC_URL}/assets/process.env.PUBLIC_URL +  "/assets/images/nutrition/nutrition-banner-inner-14.webp`}
          as="image"
        />
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
        eaa powder, bcaa supplement, vegan protein powder, best protein powder,
        bcaa, best pre workout, vegan protein, whey protein isolate, best
        protein powder for women, best vegan protein powder, protein powder for
        weight loss, best protein powder for weight loss, organic protein
        powder, isolate protein, best supplements for muscle growth, whey
        isolate protein powder, best pre workout for men, best whey protein
        powder, best pre workout for women, best whey protein, bcaa powder,
        protein whey, pre workout for women, creatine monohydrate powder, best
        protein powder for muscle gain, best muscle building supplements,
        chocolate protein powder
      </p>
      {showModal && <LoginModal onClose={closeModal} />}
      <NutritionHeader cartItemName={cartItemName} />
      <button className="scroll-top scroll-to-target" data-target="html">
        <i className="fas fa-angle-up"></i>
      </button>
      <main className="main-area fix">
        <section className="banner-area main-section">
          <div className="d-md-block d-none">
            <OwlCarousel
              loop
              autoplay
              dots={false}
              nav="false"
              className="banner-slide"
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
              <img
                src={process.env.PUBLIC_URL + "/assets/images/banner_1.webp"}
                alt="shape"
                width="100%"
              />
              {/* <img
              src={process.env.PUBLIC_URL + "/assets/images/banner_1.webp"}
              alt="shape"
              width="100%"
            />
            <img
              src={process.env.PUBLIC_URL + "/assets/images/banner_1.webp"}
              alt="shape"
              width="100%"
            /> */}
            </OwlCarousel>
          </div>
          <div className="d-md-none d-block">
            <OwlCarousel
              loop
              autoplay
              dots={false}
              nav="false"
              className="banner-slide"
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
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/images/banner_mobile_1.webp"
                }
                alt="shape"
                width="100%"
              />
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/images/banner_mobile_1.webp"
                }
                alt="shape"
                width="100%"
              />
              <img
                src={
                  process.env.PUBLIC_URL + "/assets/images/banner_mobile_1.webp"
                }
                alt="shape"
                width="100%"
              />
            </OwlCarousel>
          </div>
          {/* <div className="container">
            <div className="row justify-content-center">
              <div className="col-xxl-8 col-xl-7 col-lg-8 col-md-10">
                <div className="banner-content text-center">
                  <p className="banner-caption">
                    .. Increased Energy With SUXNIX ..
                  </p>
                  <h2 className="title">
                    Improve Your Body With Pure-Go Nutrition
                  </h2>
                  <a href="shop.html" className="btn btn-two">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="banner-images text-center">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/images/banner_img01.png"
                    }
                    alt="img"
                    className="main-img"
                  />
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/banner_round_bg.png"
                    }
                    alt="img"
                    className="bg-shape"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="banner-shape one">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/banner_shape01.png"}
              alt="shape"
              className="wow bannerFadeInLeft"
              data-wow-delay=".2s"
              data-wow-duration="2s"
            />
          </div>
          <div className="banner-shape two">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/banner_shape02.png"}
              alt="shape"
              className="wow bannerFadeInRight"
              data-wow-delay=".2s"
              data-wow-duration="2s"
            />
          </div>
          <div className="banner-shape three">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/banner_shape03.png"}
              alt="shape"
              className="wow bannerFadeInDown"
              data-wow-delay=".2s"
              data-wow-duration="2s"
            />
          </div>
          <div className="banner-shape four">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/banner_shape04.png"}
              alt="shape"
              className="wow bannerFadeInDown"
              data-wow-delay=".2s"
              data-wow-duration="2s"
            />
          </div> */}
        </section>
        <section className="features-products">
          <div className="section-title text-center mb-60">
            <p className="sub-title">.. Increased Wellness With Purego ..</p>
            <h1 className="title">Purego Products</h1>
          </div>
          <div className="container text-center">
            {/* justify-content-center */}
            <div className="row">
              <div className="col-12">
                <h2 className="title text-start">Whey Protein</h2>
              </div>
              <div className="col-lg-3 col-sm-6 text-start">
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
                          src="/assets/images/products/whey-protein/whey-protein-chocolate-1.webp"
                          alt="whey-protein-chocolate"
                        />
                      </div>
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
                          src="/assets/images/products/whey-protein/whey-protein-chocolate-1.webp"
                          alt="whey-protein-chocolate"
                        />
                      </div>
                    </OwlCarousel>
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
                              4.5
                              <i class="fa-solid fa-star ms-1"></i>
                            </span>
                            <div className="item-reviews ms-1">30 reviews</div>
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
                          style={{ webkitBoxOrient: "vertical" }}
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
                            <span className="variant-price"> ₹1250/-</span>
                            <span className="variant-old-price">₹3000</span>
                            <span className="variant-offer">58% off</span>
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
                              <i class="fa-solid fa-eye me-2"></i>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-sm-0 mt-3 text-start">
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
                          src="/assets/images/products/whey-protein/whey-protein-mawakulfi-1.webp"
                          alt="Whey Protein 1kg Mawa Kulfi"
                        />
                      </div>
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
                          src="/assets/images/products/whey-protein/whey-protein-mawakulfi-1.webp"
                          alt="Whey Protein 1kg Mawa Kulfi"
                        />
                      </div>
                    </OwlCarousel>
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
                              4.5
                              <i class="fa-solid fa-star ms-1"></i>
                            </span>
                            <div className="item-reviews ms-1">30 reviews</div>
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
                          style={{ webkitBoxOrient: "vertical" }}
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
                            <span className="variant-price"> ₹1300/-</span>
                            <span className="variant-old-price">₹3000</span>
                            <span className="variant-offer">56% off</span>
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
                              <i class="fa-solid fa-eye me-2"></i>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-lg-0 mt-3 text-start">
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
                          src="/assets/images/products/whey-protein/whey-protein-mochacoffee-1.webp"
                          alt="whey-protein-mocha-coffee"
                        />
                      </div>
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
                          src="/assets/images/products/whey-protein/whey-protein-mochacoffee-1.webp"
                          alt="whey-protein-mocha-coffee"
                        />
                      </div>
                    </OwlCarousel>
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
                              4.5
                              <i class="fa-solid fa-star ms-1"></i>
                            </span>
                            <div className="item-reviews ms-1">30 reviews</div>
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
                          style={{ webkitBoxOrient: "vertical" }}
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
                            <span className="variant-price"> ₹1350/-</span>
                            <span className="variant-old-price">₹3000</span>
                            <span className="variant-offer">55% off</span>
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
                              <i class="fa-solid fa-eye me-2"></i>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-lg-0 mt-3 text-start">
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
                          src="/assets/images/products/mass-gainer/mass-gainer-1.webp"
                          alt="Mass Gainer"
                        />
                      </div>
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
                          src="/assets/images/products/mass-gainer/mass-gainer-1.webp"
                          alt="Mass Gainer"
                        />
                      </div>
                    </OwlCarousel>
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
                              4.5
                              <i class="fa-solid fa-star ms-1"></i>
                            </span>
                            <div className="item-reviews ms-1">24 reviews</div>
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
                          style={{ webkitBoxOrient: "vertical" }}
                        >
                          Mass Gainer 1kg Chocolate{" "}
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
                            <span className="variant-price"> ₹499/-</span>
                            <span className="variant-old-price">₹1500</span>
                            <span className="variant-offer">66% off</span>
                          </div>
                          <div className="d-flex">
                            {cartItemName.some((item) =>
                              item.includes("Mass Gainer 1kg Chocolate")
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
                              <i class="fa-solid fa-eye me-2"></i>
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
            <div className="row">
              <div className="col-12">
                <h2 className="title text-start mt-5">Performance Drinks</h2>
              </div>
              <div className="col-lg-3 col-sm-6 mt-md-0 mt-3 text-start">
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
                          src="/assets/images/products/pre-workout/pre-workout-1.webp"
                          alt="Pre Workout"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/pre-workout/pre-workout-1.webp"
                          alt="Pre Workout"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/pre-workout/pre-workout-1.webp"
                          alt="Pre Workout"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/pre-workout/pre-workout-1.webp"
                          alt="Pre Workout"
                        />
                      </div>
                    </OwlCarousel>
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
                              4.5
                              <i class="fa-solid fa-star ms-1"></i>
                            </span>
                            <div className="item-reviews ms-1">12 reviews</div>
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
                          style={{ webkitBoxOrient: "vertical" }}
                        >
                          Pre Workout 250g{" "}
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
                            <span className="variant-price"> ₹440/-</span>
                            <span className="variant-old-price">₹2500</span>
                            <span className="variant-offer">82% off</span>
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
                              <i class="fa-solid fa-eye me-2"></i>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-md-0 mt-3 text-start">
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
                          src="/assets/images/products/eaa/eaa-1.webp"
                          alt="EAA Powder"
                        />
                      </div>
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
                          src="/assets/images/products/eaa/eaa-1.webp"
                          alt="EAA Powder"
                        />
                      </div>
                    </OwlCarousel>
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
                              4.5
                              <i class="fa-solid fa-star ms-1"></i>
                            </span>
                            <div className="item-reviews ms-1">12 reviews</div>
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
                          style={{ webkitBoxOrient: "vertical" }}
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
                            <span className="variant-price"> ₹490/-</span>
                            <span className="variant-old-price">₹2099</span>
                            <span className="variant-offer">76% off</span>
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
                              <i class="fa-solid fa-eye me-2"></i>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 mt-lg-0 mt-3 text-start">
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
                          src="/assets/images/products/creatine/creatine-1.webp"
                          alt="Creatine Monohydrate"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/creatine/creatine-1.webp"
                          alt="Creatine Monohydrate"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/creatine/creatine-1.webp"
                          alt="Creatine Monohydrate"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <img
                          className="lazy"
                          height="100%"
                          src="/assets/images/products/creatine/creatine-1.webp"
                          alt="Creatine Monohydrate"
                        />
                      </div>
                    </OwlCarousel>
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
                              4.5
                              <i class="fa-solid fa-star ms-1"></i>
                            </span>
                            <div className="item-reviews ms-1">12 reviews</div>
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
                          style={{ webkitBoxOrient: "vertical" }}
                        >
                          Creatine Monohydrate 250g{" "}
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
                            <span className="variant-price"> ₹350/-</span>
                            <span className="variant-old-price">₹1499</span>
                            <span className="variant-offer">76% off</span>
                          </div>
                          <div className="d-flex">
                            {cartItemName.some((item) =>
                              item.includes("Creatine Monohydrate")
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
                              <i class="fa-solid fa-eye me-2"></i>
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
            {/* <div className="col-lg-4">
                <div className="home-shop-item ">
                  <div className="home-shop-thumb">
                    <a href="/whey-protein-powder">
                      <img src={process.env.PUBLIC_URL + '/assets/images/home_shop_thumb01.webp'} alt="img" />
                    </a>
                    <div className="shop-thumb-shape blue"></div>
                  </div>
                  <div className="home-shop-content">
                    <h4 className="title"><a href="/whey-protein-powder">Whey Protein 1kg Chocolate</a></h4>
                    <div className="features-product-bottom mt-0 mb-3 mx-auto d-block">
                      <span className="price">
                        ₹1250/-
                        <span className="old-price">₹3000</span>
                        <span className="discount-price">58%</span>
                      </span>
                    </div>
                    <div className="home-shop-rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <span className="total-rating">(30)</span>
                    </div>
                    <div className="shop-content-bottom">
                      <a href="/whey-protein-powder" className="btn btn-two">Buy Now</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="home-shop-item">
                  <div className="home-shop-thumb">
                    <a href="/whey-protein-powder">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/home_shop_thumb02.png"
                        }
                        alt="img"
                      />
                    </a>
                    <div className="shop-thumb-shape yellow"></div>
                  </div>
                  <div className="home-shop-content">
                    <h4 className="title">
                      <a href="/whey-protein-powder">
                        Whey Protein 1kg Mawa Kulfi
                      </a>
                    </h4>
                    <div className="features-product-bottom mt-0 mb-3 mx-auto d-block">
                      <span className="price">
                        ₹1250/-
                        <span className="old-price">₹3000</span>
                        <span className="discount-price">58%</span>
                      </span>
                    </div>
                    <div className="home-shop-rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <span className="total-rating">(30)</span>
                    </div>
                    <div className="shop-content-bottom">
                      <a href="/whey-protein-powder" className="btn btn-two">
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="home-shop-item">
                  <div className="home-shop-thumb">
                    <a href="/whey-protein-powder">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/home_shop_thumb03.png"
                        }
                        alt="img"
                      />
                    </a>
                    <div className="shop-thumb-shape red"></div>
                  </div>
                  <div className="home-shop-content">
                    <h4 className="title">
                      <a href="/whey-protein-powder">
                        Whey Protein 1kg Mocha Coffee
                      </a>
                    </h4>
                    <div className="features-product-bottom mt-0 mb-3 mx-auto d-block">
                      <span className="price">
                        ₹1250/-
                        <span className="old-price">₹3000</span>
                        <span className="discount-price">58%</span>
                      </span>
                    </div>
                    <div className="home-shop-rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <span className="total-rating">(24)</span>
                    </div>
                    <div className="shop-content-bottom">
                      <a href="/whey-protein-powder" className="btn btn-two">
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="home-shop-item">
                  <div className="home-shop-thumb">
                    <a href="/mass-gainer-protein-powder">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/home_shop_thumb04.png"
                        }
                        alt="img"
                      />
                    </a>
                    <div className="shop-thumb-shape gray"></div>
                  </div>
                  <div className="home-shop-content">
                    <h4 className="title">
                      <a href="/mass-gainer-protein-powder">
                        Mass Gainer 1kg Chocolate
                      </a>
                    </h4>
                    <div className="features-product-bottom mt-0 mb-3 mx-auto d-block">
                      <span className="price">
                        ₹499/-
                        <span className="old-price">₹1500</span>
                        <span className="discount-price">72%</span>
                      </span>
                    </div>
                    <div className="home-shop-rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <span className="total-rating">(24)</span>
                    </div>
                    <div className="shop-content-bottom">
                      <a
                        href="/mass-gainer-protein-powder"
                        className="btn btn-two"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="home-shop-item">
                  <div className="home-shop-thumb">
                    <a href="/weight-loss-supplement">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/home_shop_thumb05.png"
                        }
                        alt="img"
                      />
                    </a>
                    <div className="shop-thumb-shape purple"></div>
                  </div>
                  <div className="home-shop-content">
                    <h4 className="title">
                      <a href="/weight-loss-supplement">Pre Workout 250g</a>
                    </h4>
                    <div className="features-product-bottom mt-0 mb-3 mx-auto d-block">
                      <span className="price">
                        ₹440/-
                        <span className="old-price">₹2500</span>
                        <span className="discount-price">82%</span>
                      </span>
                    </div>
                    <div className="home-shop-rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <span className="total-rating">(12)</span>
                    </div>
                    <div className="shop-content-bottom">
                      <a href="/weight-loss-supplement" className="btn btn-two">
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="home-shop-item">
                  <div className="home-shop-thumb">
                    <a href="/eaa-supplements">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/home_shop_thumb06.png"
                        }
                        alt="img"
                      />
                    </a>
                    <div className="shop-thumb-shape green"></div>
                  </div>
                  <div className="home-shop-content">
                    <h4 className="title">
                      <a href="/eaa-supplements">EAA Powder 250g</a>
                    </h4>
                    <div className="features-product-bottom mt-0 mb-3 mx-auto d-block">
                      <span className="price">
                        ₹490/-
                        <span className="old-price">₹2099</span>
                        <span className="discount-price">76%</span>
                      </span>
                    </div>
                    <div className="home-shop-rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <span className="total-rating">(12)</span>
                    </div>
                    <div className="shop-content-bottom">
                      <a href="/eaa-supplements" className="btn btn-two">
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="home-shop-item">
                  <div className="home-shop-thumb">
                    <a href="/creatine-supplements">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/images/home_shop_thumb07.png"
                        }
                        alt="img"
                      />
                    </a>
                    <div className="shop-thumb-shape"></div>
                  </div>
                  <div className="home-shop-content">
                    <h4 className="title">
                      <a href="/creatine-supplements">
                        Creatine Monohydrate 250g
                      </a>
                    </h4>
                    <div className="features-product-bottom mt-0 mb-3 mx-auto d-block">
                      <span className="price">
                        ₹350/-
                        <span className="old-price">₹1499</span>
                        <span className="discount-price">76%</span>
                      </span>
                    </div>
                    <div className="home-shop-rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <span className="total-rating">(12)</span>
                    </div>
                    <div className="shop-content-bottom">
                      <a href="/creatine-supplements" className="btn btn-two">
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              </div> */}
          </div>
        </section>
        <section
          id="features"
          className="features-area features-bg"
          data-background="assets/img/bg/features_bg.jpg"
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="features-items-wrap">
                  <div className="row justify-content-center">
                    <div className="col-xxl-6 d-lg-none d-block col-lg-5">
                      <div
                        className="features-img wow featuresRollOut"
                        data-wow-delay=".3s"
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/features_img.png"
                          }
                          alt="features"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 d-md-block d-none row justify-content-center">
                      <div className="col-lg-12">
                        <div className="features-item">
                          <div className="features-icon">
                            <i className="fas fa-leaf"></i>
                          </div>
                          <div className="features-content">
                            <h4 className="title">Herbal Boost</h4>
                            <p>
                              Natural wellness products to boost immunity and
                              healthit.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="features-item">
                          <div className="features-icon">
                            <i className="fa-solid fa-kit-medical"></i>
                          </div>
                          <div className="features-content">
                            <h4 className="title">100% Immunity Aid</h4>
                            <p>
                              Enhance your immunity with Purego's herbal
                              solutions.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 d-lg-block d-none">
                      <div
                        className="features-img wow featuresRollOut"
                        data-wow-delay=".3s"
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/features_img.png"
                          }
                          alt="features"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 d-md-block d-none row ps-lg-4 justify-content-center">
                      <div className="col-lg-12">
                        <div className="features-item">
                          <div className="features-icon">
                            <i className="fas fa-bolt ps-lg-1 ps-0"></i>
                          </div>
                          <div className="features-content">
                            <h4 className="title">Energy Surge</h4>
                            <p>
                              Boost your energy levels with Purego's natural
                              supplements.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="features-item">
                          <div className="features-icon">
                            <i className="fa-solid fa-hands-holding-child"></i>
                          </div>
                          <div className="features-content">
                            <h4 className="title">Holistic Care</h4>
                            <p>
                              Purego offers holistic products for overall
                              well-being and health.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-6 d-md-none d-block col-lg-7">
                      <div className="features-items-wrap">
                        <div className="row justify-content-center">
                          <div className="col-lg-6 col-sm-8">
                            <div className="features-item">
                              <div className="features-icon">
                                <i className="fas fa-leaf"></i>
                              </div>
                              <div className="features-content">
                                <h4 className="title">Herbal Boost</h4>
                                <p>
                                  Natural wellness products to boost immunity
                                  and healthit.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 mt-4 col-sm-8">
                            <div className="features-item">
                              <div className="features-icon">
                                <i className="fa-solid fa-kit-medical"></i>
                              </div>
                              <div className="features-content">
                                <h4 className="title">100% Immunity Aid</h4>
                                <p>
                                  Enhance your immunity with Purego's herbal
                                  solutions.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 mt-4 col-sm-8">
                            <div className="features-item">
                              <div className="features-icon">
                                <i className="fas fa-bolt ps-1"></i>
                              </div>
                              <div className="features-content">
                                <h4 className="title">Energy Surge</h4>
                                <p>
                                  Boost your energy levels with Purego's natural
                                  supplements.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 mt-4 col-sm-8">
                            <div className="features-item">
                              <div className="features-icon">
                                <i className="fa-solid fa-hands-holding-child"></i>
                              </div>
                              <div className="features-content">
                                <h4 className="title">Holistic Care</h4>
                                <p>
                                  Purego offers holistic products for overall
                                  well-being and health.
                                </p>
                              </div>
                            </div>
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
                    <p className="sub-title">.. Product Design By ..</p>
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
        <div className="video-area video-bg">
          <div className="video-bg-overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="video-btn">
                  <a
                    className="popup-video ripple-white"
                    onClick={() => openVideoModal("4X2pTMgb1og")}
                  >
                    <i className="fas fa-play"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="video-shape one">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/video_shape01.png"}
              alt="shape"
            />
          </div>
          <div className="video-shape two">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/video_shape02.png"}
              alt="shape"
            />
          </div>
        </div>
        {/* <section id="ingredient" className="ingredients-area">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-6">
                <div className="">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/features_img03.png"
                    }
                    alt="features"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="ingredients-items-wrap">
                  <div className="section-title mb-60">
                    <p className="sub-title">
                      .. Increased Wellness With Purego ..
                    </p>
                    <h2 className="title">Purego Ingredients</h2>
                  </div>
                  <div className="row justify-content-center justify-content-lg-start">
                    <div className="col-12">
                      <div
                        className="ingredients-item wow fadeInUp"
                        data-wow-delay=".2s"
                      >
                        <div className="ingredients-content">
                          <h5 className="title">
                            Enhances Your Immunity Naturally
                          </h5>
                          <p>
                            Purego's natural ingredients help strengthen your
                            immune system.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div
                        className="ingredients-item wow fadeInUp"
                        data-wow-delay=".3s"
                      >
                        <div className="ingredients-content">
                          <h5 className="title">Low Carbs</h5>
                          <p>
                            Purego keeps carbs low while providing maximum
                            benefits.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div
                        className="ingredients-item wow fadeInUp"
                        data-wow-delay=".4s"
                      >
                        <div className="ingredients-content">
                          <h5 className="title">
                            Ingredients That Energize You
                          </h5>
                          <p>
                            Purego's fuel your body for better energy levels.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div
                        className="ingredients-item wow fadeInUp"
                        data-wow-delay=".5s"
                      >
                        <div className="ingredients-content">
                          <h5 className="title">
                            Clean, Pure Ingredients Always
                          </h5>
                          <p>
                            Purego uses only the finest natural ingredients for
                            your health.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <section className="formula-area formula-bg">
          <div className="">
            <div className="section-title text-center white-title mb-50">
              <p className="sub-title">.. Purego Wellness ..</p>
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
              <p className="sub-title">.. Are Client Says ..</p>
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
                          <h5 className="name">Mukesh Gupta</h5>
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
                          <h5 className="name">Shruti Shah</h5>
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
                          <h5 className="name">Jaydeep Chauhan</h5>
                        </div>
                      </div>
                      <p>
                        “Great range of wellness products at reasonable prices.
                        Loved their herbal supplements. Packaging is good, and
                        delivery was on time. Satisfied with purchase!
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
                          <h5 className="name">Neha Desai</h5>
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
                    .. Increased Wellness With Purego ..
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
                      <p className="sub-title">.. Ask Question ..</p>
                      <h2 className="title">Your Wellness FAQs</h2>
                    </div>
                    <Accordion defaultActiveKey={["1"]} alwaysOpen>
                      <Accordion.Item eventKey="1" className="mt-3 p-md-4 p-3">
                        <Accordion.Header className="f-18 lp-2">
                          What makes Purego products different?
                        </Accordion.Header>
                        <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                          Purego stands out with 100% natural ingredients,
                          ensuring maximum wellness benefits without any harmful
                          additives.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2" className="mt-3 p-md-4 p-3">
                        <Accordion.Header className="f-18 lp-2">
                          Are Purego products vegan-friendly?
                        </Accordion.Header>
                        <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                          Yes, all Purego products are vegan, cruelty-free, and
                          made with plant-based ingredients, offering a natural
                          wellness solution for all.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="3" className="mt-3 p-md-4 p-3">
                        <Accordion.Header className="f-18 lp-2">
                          Do Purego supplements have any side effects?
                        </Accordion.Header>
                        <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                          Purego supplements are formulated with safe, organic
                          ingredients and have no known side effects when used
                          as directed.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="4" className="mt-3 p-md-4 p-3">
                        <Accordion.Header className="f-18 lp-2 me-2">
                          Are Purego products gluten-free?
                        </Accordion.Header>
                        <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                          Yes, all Purego products are 100% gluten-free, making
                          them suitable for those with dietary restrictions or
                          sensitivities.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="5" className="mt-3 p-md-4 p-3">
                        <Accordion.Header className="f-18 lp-2">
                          How do Purego products improve immunity?
                        </Accordion.Header>
                        <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                          Purego's herbal ingredients are carefully selected to
                          strengthen your immune system naturally, supporting
                          overall health and wellness.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="6" className="mt-3 p-md-4 p-3">
                        <Accordion.Header className="f-18 lp-2">
                          Can I take Purego products on a daily basis?
                        </Accordion.Header>
                        <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                          Absolutely! Purego products are safe for daily use,
                          designed to enhance long-term health when taken as
                          part of a balanced routine.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="7" className="mt-3 p-md-4 p-3">
                        <Accordion.Header className="f-18 lp-2 me-2">
                          Where are Purego products made?
                        </Accordion.Header>
                        <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                          Purego products are manufactured in India, adhering to
                          the highest quality standards and certifications to
                          ensure premium wellness.
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="8" className="mt-3 p-md-4 p-3">
                        <Accordion.Header className="f-18 lp-2">
                          How long does it take to see results with Purego
                          products?
                        </Accordion.Header>
                        <Accordion.Body className="mt-3 f-rob-reg f-14 lp-2">
                          Results vary by individual, but many customers report
                          noticeable improvements in energy and wellness within
                          a few weeks of consistent use.
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
        <ModalVideo
          channel="youtube"
          isOpen={isVideoOpen}
          videoId={videoUrl}
          onClose={closeVideoModal}
        />
      </main>
      <HomeNutritionFooter />
    </>
  );
}

export default Home;
