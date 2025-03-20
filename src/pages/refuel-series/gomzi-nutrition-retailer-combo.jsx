import React, { useState, useEffect } from "react";
import NutritionHeader from "../../components/partials/Header/nutritionsheader";
import "@fortawesome/fontawesome-free/css/all.min.css";

import NutritionFooter from "../../components/partials/Footer/nutritionfooter";
import LoginModal from "../../assets/js/popup/login.jsx";
import ModalVideo from "react-modal-video";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import WhatsappHeaderApp from "../../components/NutritionWhatsappHeaderBtn";
import Authentic from "../../components/nutrition/authentic.jsx";
import CompanyDetails from "../../components/nutrition/company-details.jsx";
import RawMaterial from "../../components/nutrition/raw-material.jsx";
import PageMeta from "../../components/PageMeta.jsx";
import SingleProductPhotoSection from "../../components/nutrition/SingleProductPhotoSection.jsx";

function GomziNutritionRetailerCombo() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const addToCart = localStorage.getItem("addtocart");
  const [showModal, setShowModal] = useState(false);
  const isAuthenticated = !!localStorage.getItem("fg_group_user_authorization");
  const canonicalUrl = window.location.href;

  const addProductInCart = async () => {
    try {
      localStorage.setItem("productsData", JSON.stringify(addtocartdata));
      window.location.href =
        "/nutrition/check-out?item_id=670a5a7b9a7dbcdce616398d";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // const localData = JSON.parse(localStorage.getItem("productCartAvailable"));
    const dataAvailable = JSON.parse(localStorage.getItem("cartAvailable"));
    if (dataAvailable) {
      addProductInCart();
    }
  }, []);

  const closeVideoModal = () => {
    setIsVideoOpen(false);
    setVideoUrl("");
  };

  const addtocartdata = {
    id: "6616357847003e22aea8a0fe",
    img: "/assets/images/nutrition/retailer-combo-1.webp",
    name: "Retailer Combo",
    price: "45400",
    discount: "20198",
    totalAmount: "20198",
    size: "Retailer Combo",
    dis_point: "55.51%",
  };

  const product = [
    "/assets/images/nutrition/retailer-combo-1.webp",
    "/assets/images/nutrition/retailer-combo-2.webp",
    "/assets/images/nutrition/retailer-combo-3.webp",
    "/assets/images/nutrition/retailer-combo-4.webp",
  ];

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleMenu = async (data) => {
    localStorage.setItem("addtocart", "true");
    // localStorage.setItem(
    //   "productData",
    //   JSON.stringify({
    //     ...data,
    //   })
    // );

    try {
      if (!isAuthenticated) {
        setShowModal(true);
        // localStorage.setItem("productCartAvailable", JSON.stringify(data));
        localStorage.setItem("cartAvailable", true);
      } else {
        // const existingData = JSON.parse(
        //   localStorage.getItem("addItemInCart")
        // ) || { products: [] };
        // const productExists = existingData.products.some(
        //   (product) => product.product_id === data.id
        // );

        // if (!productExists) {
        //   existingData.products.push({
        //     product_id: data.id,
        //     quantity: data?.quantity || 1,
        //     mrpPrice: data.price || 0,
        //   });
        // }

        // localStorage.setItem("addItemInCart", JSON.stringify(existingData));
        localStorage.setItem("productsData", JSON.stringify(addtocartdata));
        window.location.href =
          "/nutrition/check-out?item_id=670a5a7b9a7dbcdce616398d";
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    if (addToCart === "true") {
      setTimeout(() => {
        localStorage.removeItem("addtocart");
      }, 2000);
    }
  }, [addToCart]);

  return (
    <>
      <PageMeta
        title="Gomzi Nutrition Muscle Build Combo - Ultimate Stack for Muscle Growth"
        description="Boost muscle growth with Gomzi Nutrition Muscle Build Combo. A powerful blend of whey Protein, creatine, and amino acids designed for serious muscle gains and recovery."
        keywords="Muscle Build Combo, muscle gain stack, whey Protein combo, creatine and amino acids, build muscle fast, fitness supplements, buy muscle stack"
        canonicalUrl={canonicalUrl}
        metaScript={`
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
        noscriptData={`
              <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1144699046738070&ev=PageView&noscript=1" />
            `}
        googleTag={`
              https://www.googletagmanager.com/gtag/js?id=G-J50WNKGW38
            `}
        googleScriptData={`
              window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J50WNKGW38');
            `}
      />
      <ModalVideo
        channel="youtube"
        isOpen={isVideoOpen}
        videoId={videoUrl}
        onClose={closeVideoModal}
      />
      {showModal && <LoginModal onClose={closeModal} />}
      <NutritionHeader />
      <WhatsappHeaderApp
        message={"Hello, I wanted to know more about Muscle Build Combo. "}
        options={{ pageRef: true }}
      />
      <div className="main-content margintop-nutrition">
        <section className="product-detail-main bg-white">
          <div className="container-fluid w-80 mb-4">
            <div className="row justify-content-center w-100 mx-auto">
              <div className="col-12 p-0 px-md-3 px-xl-4 py-3 py-md-3 h-100 mt-5">
                <div className="col-12 p-0 col-lg-7 h-100 mb-lg-0 px-0 px-md-3 product-detail-left">
                  <SingleProductPhotoSection product={product} />
                </div>
                <div className="col-12 p-0 col-lg-5 mb-3 mt-3 mb-lg-0 product-detail-right">
                  <div className="row">
                    {/* <div className="col-12 mt-3 d-block d-lg-none">
                                            <p className="f-rob-bol f-18">Size</p>
                                            <ul className="list-unstyled mb-0">
                                                <li className="mr-3 mb-3 d-inline-block">
                                                    <div className="avail-in-other-size-main">
                                                        <div className="d-block avail-in-other-size active">
                                                            <span
                                                                className="d-block product-type avail-other-size cp active"
                                                            ><p className="d-block m-0">Combo - 1</p></span
                                                            >
                                                            <div className="d-block product-type avail-other-price cp">
                                                                <p className="d-block m-0">₹900+ ₹749 = ₹1,600</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div> */}
                    <div className="col-12">
                      <h1 className="f-rob-bol f-22 text-bold">
                        Retailer Combo
                      </h1>
                    </div>
                    <div className="col-9 pt-2">
                      <div className="d-inline-block">
                        <span className="d-inline-block mr-2 f-rob-bol f-20 text-red">
                          55.51%
                        </span>
                        <span className="d-inline-block mr-2 f-rob-bol f-22">
                          ₹20,198 /- GST included
                        </span>
                        <p className="f-20">
                          MRP:-
                          <span className="price--line-through">₹45,400/-</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-3 text-left text-md-right">
                      <div className="row">
                        <div className="d-flex align-items-center justify-content-center my-2">
                          <span className="d-flex product-rating f-14 text-secondary">
                            <i className="fas fa-star mr-2 rating-star"></i>
                            4.7
                          </span>
                        </div>
                      </div>
                    </div>
                    <RawMaterial />
                    <div className="col-12 mt-4">
                      <p className="f-rob-bol f-22">Combo</p>
                      <ul className="list-unstyled mb-0">
                        <li className="mb-3 d-inline-block">
                          <div>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/whey-protein-chocolate-1-1kg.webp"
                              }
                              alt="rate"
                              width="100px"
                              height="auto"
                            />
                          </div>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <span className="d-block f-rob-reg f-22 text-lig-gray">
                            +
                          </span>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <div>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/whey-protein-mango-1-1kg.webp"
                              }
                              alt="rate"
                              width="100px"
                              height="auto"
                            />
                          </div>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <span className="d-block f-rob-reg f-22 text-lig-gray">
                            +
                          </span>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <div>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/whey-protein-mawa-kulfi-1-1kg.webp"
                              }
                              alt="rate"
                              width="100px"
                              height="auto"
                            />
                          </div>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <span className="d-block f-rob-reg f-22 text-lig-gray">
                            +
                          </span>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <div>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/whey-protein-isolate-1-1kg.webp"
                              }
                              alt="rate"
                              width="100px"
                              height="auto"
                            />
                          </div>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <span className="d-block f-rob-reg f-22 text-lig-gray">
                            +
                          </span>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <div>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/ignite-fat-burner-1.webp"
                              }
                              alt="rate"
                              width="100px"
                              height="auto"
                            />
                          </div>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <span className="d-block f-rob-reg f-22 text-lig-gray">
                            +
                          </span>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <div>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/spark-eaa-1.webp"
                              }
                              alt="rate"
                              width="100px"
                              height="auto"
                            />
                          </div>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <span className="d-block f-rob-reg f-22 text-lig-gray">
                            +
                          </span>
                        </li>
                        <li className="mb-3 d-inline-block">
                          <div>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/images/nutrition/atp-creatine-1.webp"
                              }
                              alt="rate"
                              width="100px"
                              height="auto"
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="col-12">
                      <div className="delivery-detail-box p-3">
                        <div className="d-flex justify-content-between border-bottom py-2">
                          <div className="d-inline-block p-0">
                            <p className="ql-align-justify f-18 mb-1">
                              <b>Whey Protein - 1kg (Chocolate)</b>
                            </p>
                            <p className="ql-align-justify f-20 mb-1">
                              <del>₹7,000</del>&nbsp;&nbsp;
                              <b>₹1500*2=₹3000/-</b>
                            </p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between border-bottom py-2">
                          <div className="d-inline-block p-0">
                            <p className="ql-align-justify f-18 mb-1">
                              <b>Whey Protein - 1kg (Mango)</b>
                            </p>
                            <p className="ql-align-justify f-20 mb-1">
                              <del>₹7,000</del>&nbsp;&nbsp;
                              <b>₹1500*2=₹3000/-</b>
                            </p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between border-bottom py-2">
                          <div className="d-inline-block p-0">
                            <p className="ql-align-justify f-18 mb-1">
                              <b>Whey Protein - 1kg (Mawa Kulfi)</b>
                            </p>
                            <p className="ql-align-justify f-20 mb-1">
                              <del>₹7,000</del>&nbsp;&nbsp;
                              <b>₹1500*2=₹3000/-</b>
                            </p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between border-bottom py-2">
                          <div className="d-inline-block p-0">
                            <p className="ql-align-justify f-18 mb-1">
                              <b>Whey Protein Isolate - 1kg (Chocho Brownie)</b>
                            </p>
                            <p className="ql-align-justify f-20 mb-1">
                              <del>₹12,000</del>&nbsp;&nbsp;
                              <b>₹3200*2=₹6400/-</b>
                            </p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between border-bottom py-2">
                          <div className="d-inline-block p-0">
                            <p className="ql-align-justify f-18 mb-1">
                              <b>EAA Powder</b>
                            </p>
                            <p className="ql-align-justify f-20 mb-1">
                              <del>₹4,200</del>&nbsp;&nbsp;
                              <b>₹800*2=₹1600/-</b>
                            </p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between border-bottom py-2">
                          <div className="d-inline-block p-0">
                            <p className="ql-align-justify f-18 mb-1">
                              <b>Creatine Powder</b>
                            </p>
                            <p className="ql-align-justify f-20 mb-1">
                              <del>₹7,000</del>&nbsp;&nbsp;
                              <b>₹1500*2=₹3000/-</b>
                            </p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between py-2">
                          <div className="d-inline-block p-0">
                            <p className="ql-align-justify f-18 mb-1">
                              <b>Ignite Pre Workout Powder</b>
                            </p>
                            <p className="ql-align-justify f-20 mb-1">
                              <del>₹5,000</del>&nbsp;&nbsp;
                              <b>₹999*2=₹1998/-</b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 p-0">
                      <div className="m-0 w-100 py-4 px-0 px-md-3">
                        <div className="common-button mx-2">
                          <button
                            className="bg-yellow d-block text-uppercase text-white f-16 f-rob-bol rate-btn"
                            onClick={() => {
                              toggleMenu();
                            }}
                          >
                            Buy Now
                          </button>
                          {/* <Link to="/nutrition/check-out?item_id=">
                            Buy Now
                          </Link> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 return-policy-main">
                      <div className="mt-3 editor-text">
                        <Authentic />
                        <ul className="list-unstyled">
                          <li className="d-block mb-3">
                            <div className="mb-2 ql-editor descriptionShow text-secondary">
                              <CompanyDetails />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <LazyLoadImage
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/nutrition/trust-badges.webp"
                      }
                      width="100%"
                      className="d-block mt-4"
                      alt="trust-badges"
                      effect="blur"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <NutritionFooter />
    </>
  );
}

export default GomziNutritionRetailerCombo;
