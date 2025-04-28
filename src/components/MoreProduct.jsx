import React, { useEffect, useState } from "react";
import { axiosInstance, publicAxiosInstance } from "../assets/js/config/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import LoginModal from "../assets/js/popup/login";

const MoreProduct = ({ setCartDataClick, cartDataClick }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [cartItemName, setCartItemName] = useState([]);
  const [productsId, setProductsId] = useState([
    "67e7749163f930dcc6a2715d",
    "67e774a963f930dcc6a2715f",
    "67e774c463f930dcc6a27161",
    "67e7745f63f930dcc6a2715b",
    "67e7740363f930dcc6a27157",
    "67e7742d63f930dcc6a27159",
    "67e773f463f930dcc6a27155",
  ]);
  const [productReviewsData, setProductReviewsData] = useState([]);

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
  }, [cartDataClick]);

  const options = {
    loop: true,
    dots: false,
    dotsEach: true,
    nav: false,
    autoplayTimeout: 3000,
    smartSpeed: 500,
    responsive: {
      0: { items: 1 },
      600: { items: 3 },
      1000: { items: 4 },
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
        toast.success("Product added in cart.");
        fetchProductData();
        setCartDataClick(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {showModal && <LoginModal onClose={closeModal} />}
      <section className="features-products">
        <div className="section-title text-center mb-60">
          <p className="sub-title">.. Increased Wellness With Purego ..</p>
          <h2 className="title">Purego Products</h2>
        </div>
        <div className="container">
          {/* justify-content-center */}
          <div className="row">
            <OwlCarousel {...options} className="owl-theme d-block">
              <div className="item mx-2">
                <div className="item-card">
                  <div className="item-img-sec text-center">
                    <div className="d-flex justify-content-center">
                      <img
                        className="lazy"
                        src="/assets/images/products/whey-protein/whey-protein-chocolate-1.webp"
                        alt="whey-protein-chocolate"
                      />
                    </div>
                    <div className="wishlist d-flex justify-content-end">
                      <img
                        alt="inWishlist"
                        src="/assets/images/fifty-discount.png"
                        className="position-relative discount-img-size"
                      />
                      <p className="wishlist-text-first">58%</p>
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
                              <i class="fa-solid fa-star ms-1"></i>
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
              <div className="item mx-2">
                <div className="item-card">
                  <div className="item-img-sec text-center">
                    <div className="d-flex justify-content-center">
                      <img
                        className="lazy"
                        height="100%"
                        src="/assets/images/products/whey-protein/whey-protein-mawakulfi-1.webp"
                        alt="Whey Protein 1kg Mawa Kulfi"
                      />
                    </div>
                    <div className="wishlist d-flex justify-content-end">
                      <img
                        alt="inWishlist"
                        src="/assets/images/fifty-discount.png"
                        className="position-relative discount-img-size"
                      />
                      <p className="wishlist-text-first">56%</p>
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
                              <i class="fa-solid fa-star ms-1"></i>
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
              <div className="item mx-2">
                <div className="item-card">
                  <div className="item-img-sec text-center">
                    <div className="d-flex justify-content-center">
                      <img
                        className="lazy"
                        height="100%"
                        src="/assets/images/products/whey-protein/whey-protein-mochacoffee-1.webp"
                        alt="whey-protein-mocha-coffee"
                      />
                    </div>
                    <div className="wishlist d-flex justify-content-end">
                      <img
                        alt="inWishlist"
                        src="/assets/images/fifty-discount.png"
                        className="position-relative discount-img-size"
                      />
                      <p className="wishlist-text-first">55%</p>
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
                              <i class="fa-solid fa-star ms-1"></i>
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
              <div className="item mx-2">
                <div className="item-card">
                  <div className="item-img-sec text-center">
                    <div className="d-flex justify-content-center">
                      <img
                        className="lazy"
                        height="100%"
                        src="/assets/images/products/mass-gainer/mass-gainer-1.webp"
                        alt="Mass Gainer"
                      />
                    </div>
                    <div className="wishlist d-flex justify-content-end">
                      <img
                        alt="inWishlist"
                        src="/assets/images/fifty-discount.png"
                        className="position-relative discount-img-size"
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
                              <i class="fa-solid fa-star ms-1"></i>
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
              <div className="item mx-2">
                <div className="item-card position-relative">
                  <span class="labeling">Pre workout + fat burner</span>
                  <div className="item-img-sec text-center">
                    <div className="d-flex justify-content-center">
                      <img
                        className="lazy"
                        height="100%"
                        src="/assets/images/products/pre-workout/pre-workout-1.webp"
                        alt="Pre Workout"
                      />
                    </div>
                    <div className="wishlist d-flex justify-content-end">
                      <img
                        alt="inWishlist"
                        src="/assets/images/fifty-discount.png"
                        className="position-relative discount-img-size"
                      />
                      <p className="wishlist-text-first">82%</p>
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
                              <i class="fa-solid fa-star ms-1"></i>
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
              <div className="item mx-2">
                <div className="item-card">
                  <div className="item-img-sec text-center">
                    <div className="d-flex justify-content-center">
                      <img
                        className="lazy"
                        height="100%"
                        src="/assets/images/products/eaa/eaa-1.webp"
                        alt="EAA Powder"
                      />
                    </div>
                    <div className="wishlist d-flex justify-content-end">
                      <img
                        alt="inWishlist"
                        src="/assets/images/fifty-discount.png"
                        className="position-relative discount-img-size"
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
                                  product._id === "67e7742d63f930dcc6a27159" &&
                                  product.average_points
                              )}
                              <i class="fa-solid fa-star ms-1"></i>
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
              <div className="item mx-2">
                <div className="item-card position-relative">
                  <span class="labeling">India's first flavored creatine</span>
                  <div className="item-img-sec text-center">
                    <div className="d-flex justify-content-center">
                      <img
                        className="lazy"
                        height="100%"
                        src="/assets/images/products/creatine/creatine-1.webp"
                        alt="Creatine Monohydrate"
                      />
                    </div>
                    <div className="wishlist d-flex justify-content-end">
                      <img
                        alt="inWishlist"
                        src="/assets/images/fifty-discount.png"
                        className="position-relative discount-img-size"
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
                                  product._id === "67e773f463f930dcc6a27155" &&
                                  product.average_points
                              )}
                              <i class="fa-solid fa-star ms-1"></i>
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
            </OwlCarousel>
          </div>
        </div>
      </section>
    </>
  );
};

export default MoreProduct;
