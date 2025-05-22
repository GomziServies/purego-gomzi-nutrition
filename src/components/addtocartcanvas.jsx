import React, { useState, useEffect, useRef } from "react";
import "../assets/css/offcanvase.css";
import "../assets/css/style.css";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { axiosInstance, publicAxiosInstance } from "../assets/js/config/api";
import confetti from "canvas-confetti";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AddtoCartOffCanvas = ({ isOpen, onClose, books, selectedBookId }) => {
  const [animateOpen, setAnimateOpen] = useState(false);
  const [productDataGet, setProductDataGet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalMRP, setTotalMRP] = useState(0);
  const [previousProductData, setPreviousProductData] = useState([]);
  const [serverDataID, setServerDataID] = useState("");
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("fg_group_user_authorization")
  );
  const [manualCouponCode, setManualCouponCode] = useState("");
  const [manualCouponCodeData, setManualCouponCodeData] = useState(null);

  const hasFiredConfetti = useRef(false);

  // Confetti effect on totalAmount > 2000
  useEffect(() => {
    if (totalAmount > 2000 && !hasFiredConfetti.current) {
      hasFiredConfetti.current = true;

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });
    }

    if (totalAmount <= 2000) {
      hasFiredConfetti.current = false;
    }
  }, [totalAmount]);

  // Animate open toggle
  useEffect(() => {
    setAnimateOpen(isOpen);
  }, [isOpen]);

  // Fetch cart data when books change
  useEffect(() => {
    if (books && !isFetchingData) fetchBooksCartData();
  }, [books]);

  // AUTO apply coupon based on totalAmount
  useEffect(() => {
    const appliedCoupon = JSON.parse(localStorage.getItem("appliedCoupon"));

    if (totalAmount <= 0) {
      // Cart empty - clear coupon
      setManualCouponCode("");
      setManualCouponCodeData(null);
      localStorage.removeItem("appliedCoupon");
      return;
    }

    const couponCode = totalAmount > 2000 ? "FLAT50" : "FLAT25";

    if (!appliedCoupon || appliedCoupon?.coupon_code !== couponCode) {
      handleApplyClick(couponCode, true); // true means auto apply, no UI alerts
    }
  }, [totalAmount]);

  // Fetch cart data
  const fetchBooksCartData = async () => {
    if (isFetchingData) return;

    setLoading(true);
    setIsFetchingData(true);

    try {
      const response = await axiosInstance.get(
        "/order-cart/get-carts?item_type=PURE_GO_MEAL_PRODUCT&is_purchase=true"
      );
      const serverData = response.data.data[0];
      setServerDataID(serverData._id);

      const existingData = JSON.parse(
        localStorage.getItem("addItemInCart")
      ) || {
        products: [],
      };

      const priceMap = existingData.products.reduce((map, product) => {
        map[product.book_id] = product.mrpPrice;
        return map;
      }, {});

      const itemDataForGetQty = serverData?.items || [];
      const itemDataForGetImgName = serverData?.items_details || [];

      const combinedData = itemDataForGetQty.map((item) => {
        const itemDetails = itemDataForGetImgName.find(
          (details) => details._id === item.item_id
        );
        if (!itemDetails) {
          console.warn(`No details found for item with id: ${item.item_id}`);
          return item;
        }

        return {
          ...item,
          ...itemDetails,
          items_id: item._id,
        };
      });

      const updatedServerData = combinedData.map((product) => ({
        ...product,
        mrpPrice: priceMap[product.item_id] || product.mrpPrice || 0,
        price: product.price || 0,
        quantity: product.quantity || 1,
      }));

      setPreviousProductData(updatedServerData);
      totalMRPCalculation(updatedServerData);
      setProductDataGet(updatedServerData);
      totalAmountCalculation(updatedServerData);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }

    setLoading(false);
    setIsFetchingData(false);
  };

  // Calculate total MRP
  const totalMRPCalculation = (data) => {
    const amount = data.reduce(
      (sum, product) => sum + (product.mrpPrice || 0) * (product.quantity || 1),
      0
    );
    setTotalMRP(amount);
    return amount;
  };

  // Calculate total price
  const totalAmountCalculation = (data) => {
    const amount = data.reduce(
      (sum, product) => sum + (product.price || 0) * (product.quantity || 1),
      0
    );
    setTotalAmount(amount);
  };

  // Coupon apply handler
  const handleApplyClick = async (appliedCoupon, isAuto = false) => {
    try {
      let code = appliedCoupon || manualCouponCode;

      if (!code.trim()) {
        if (!isAuto) {
          Swal.fire({
            icon: "warning",
            title: "Empty Code",
            text: "Please enter or select a valid promo code.",
          });
        }
        return;
      }

      const payload = { coupon_code: code };
      const response = await publicAxiosInstance.post(
        "/check-coupon-code",
        payload
      );

      const couponData = response.data.data;

      setManualCouponCode(code);
      setManualCouponCodeData(couponData);
      localStorage.setItem("appliedCoupon", JSON.stringify(couponData));

      if (!isAuto) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
        });
        toast.success("Coupon applied successfully");
      }

      calculateDiscountedPrice(couponData);
    } catch (error) {
      if (!isAuto) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error?.response?.data?.message || "Failed to apply coupon.",
        });
      }
    }
  };

  // Your discount price calculation logic here
  const calculateDiscountedPrice = (couponData) => {
    // Implement discount price calculation based on couponData and totalAmount
    console.log("Calculate discount with coupon", couponData);
  };

  // Other existing handlers below unchanged:

  const handleRemoveProduct = async (cart_id, book_id) => {
    try {
      await axiosInstance.delete(
        `/order-cart/remove-item?item_id=${book_id}&cart_id=${serverDataID}`
      );
      setProductDataGet((prevData) =>
        prevData.filter((product) => product._id !== cart_id)
      );
      const existingData = JSON.parse(
        localStorage.getItem("addItemInCart")
      ) || {
        products: [],
      };
      existingData.products = existingData.products.filter(
        (product) => product.book_id !== book_id
      );
      localStorage.setItem("addItemInCart", JSON.stringify(existingData));
      fetchBooksCartData();
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const minusQuantity = (productId) => {
    setProductDataGet((prevData) => {
      const updatedData = prevData.map((product) =>
        product._id === productId
          ? { ...product, quantity: Math.max(1, (product.quantity || 1) - 1) }
          : product
      );
      totalAmountCalculation(updatedData);
      totalMRPCalculation(updatedData);
      setTimeout(() => handleUpdateCart(updatedData), 1000);
      return updatedData;
    });
  };

  const plusQuantity = (productId) => {
    setProductDataGet((prevData) => {
      const updatedData = prevData.map((product) =>
        product._id === productId
          ? {
              ...product,
              quantity:
                (product.quantity || 1) < 5
                  ? product.quantity + 1
                  : product.quantity,
            }
          : product
      );
      totalAmountCalculation(updatedData);
      totalMRPCalculation(updatedData);
      setTimeout(() => handleUpdateCart(updatedData), 1000);
      return updatedData;
    });
  };

  const handleUpdateCart = async (updatedData) => {
    try {
      if (updatedData.length > 0) {
        await axiosInstance.post("/order-cart/add-item", updatedData[0]);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const changedProducts = productDataGet.filter((currentProduct) => {
        const previousProduct = previousProductData.find(
          (p) => p._id === currentProduct._id
        );
        return (
          previousProduct &&
          previousProduct.quantity !== currentProduct.quantity
        );
      });

      const products = productDataGet.map((product) => ({
        book_id: product._id,
        quantity: product.quantity,
      }));

      if (changedProducts.length > 0) {
        const response = await axiosInstance.post(
          "/order-cart/add-item",
          changedProducts[0]
        );

        if (response.data.status === 200) {
          setPreviousProductData(productDataGet);
          localStorage.setItem(
            "productsData",
            JSON.stringify({ products, totalAmount, totalMRP })
          );
          window.location.href = `/check-out`;
        }
      } else {
        localStorage.setItem(
          "productsData",
          JSON.stringify({ products, totalAmount, totalMRP })
        );
        window.location.href = `/check-out`;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const toggleMenu = async (data, BuyButton, e) => {
    e.preventDefault();
    try {
      if (isAuthenticated) {
        const existingData = JSON.parse(
          localStorage.getItem("addItemInCart")
        ) || {
          products: [],
        };

        const productExists = existingData.products.some(
          (product) => product.book_id === selectedBookId
        );

        if (!productExists) {
          existingData.products.push({
            book_id: BuyButton,
            mrpPrice: data.prices || 0,
            data: data,
          });
        }

        localStorage.setItem("addItemInCart", JSON.stringify(existingData));
        const response = await axiosInstance.post("/order-cart/add-item", {
          item_id: BuyButton,
          data: data,
          quantity: data?.quantity || 1,
          item_type: "BOOKS",
        });
        if (response.data.response === "OK") fetchBooksCartData();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      <div className={`offcanvas ${animateOpen ? "open" : ""}`}>
        <div className="hs-header-layout">
          <div className="hs-close-popup-cart">
            <div className="hs-header-close-empty position-relative">
              <p className="hs-header-title">Your Cart</p>
              <span
                className="hs-close hs-event-static"
                onClick={onClose}
                data-dismiss="modal"
                aria-label="Close"
              >
                <svg
                  tabindex="0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 329.26933 329"
                  width="16px"
                  height="12px"
                >
                  <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="hs-content-discounts-calculate-checkout hs-enable-content-rewards">
          <div className="hs-rewards-content">
            <div className="hs-progess-content hs-hidden-percentages">
              {totalAmount > 2000 ? (
                <>
                  <div className="hs-text-free-shipping text-dark">
                    🎉 Congratulations! You've unlocked an exclusive{" "}
                    <b>50% discount</b>! 🎁✨
                  </div>
                  <div id="hs_shipping_progress">
                    <div
                      id="hs_shipping_bar"
                      style={{
                        width: "100%",
                        backgroundColor: "#ff0404",
                        height: "6px",
                      }}
                    ></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="hs-text-free-shipping text-dark">
                    🎉 You're just <b>₹{(2000 - totalAmount).toFixed(2)}</b>{" "}
                    away from unlocking a <b>50% discount</b>! 🛍️💸
                  </div>
                  <div id="hs_shipping_progress">
                    <div
                      id="hs_shipping_bar"
                      style={{
                        width: `${Math.min((totalAmount / 2000) * 100, 100)}%`,
                        backgroundColor: "#ff0404",
                        height: "6px",
                        transition: "width 0.5s ease",
                      }}
                    ></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div class="thin-scrollbar" style={{ overflowY: "scroll" }}>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center mb-4 my-7 loader-h">
              <div className="loader"></div>
            </div>
          ) : (
            productDataGet?.length > 0 && (
              <div>
                <div className="cart-detail">
                  {productDataGet.map((product, index) => {
                    const totalPrice = product.amount * product.quantity;
                    return (
                      <div
                        key={index}
                        className="cart-item-main border-top pt-2 m-2"
                      >
                        <div className="media bg-white cart-main">
                          <div className="d-flex">
                            <div className="col-3">
                              <span
                                className="lazy-load-image-background blur lazy-load-image-loaded"
                                style={{ display: "inline-block" }}
                              >
                                <img
                                  alt="product"
                                  className="img-fluid cp"
                                  src={`https://files.fggroup.in/${product.display_image?.[0]}`}
                                />
                              </span>
                            </div>
                            <div className="col-6">
                              <div className="media-body align-self-center">
                                <div className="d-flex mx-2 justify-content-between">
                                  <div className="col-12">
                                    <h2
                                      className="f-rob-bol d-inline-block h3-fs cp mb-2 fs-18"
                                      title={product.name}
                                    >
                                      {product.name?.length > 20
                                        ? product.name.slice(0, 20) + "..."
                                        : product.name}
                                    </h2>
                                  </div>
                                </div>
                                <div className="cart-add align-items-center mt-2">
                                  <div className="d-flex align-items-center mx-2">
                                    <i
                                      className="fas fa-minus text-dark mx-1"
                                      onClick={() => minusQuantity(product._id)}
                                    ></i>
                                    <Form.Group className="text-center">
                                      <Form.Control
                                        type="number"
                                        id="txt_quantity"
                                        value={product.quantity}
                                        min="1"
                                        className="mb-0 p-0 text-center"
                                        readOnly
                                        style={{
                                          borderRadius: "5px",
                                          width: "45px",
                                          height: "30px",
                                        }}
                                      />
                                    </Form.Group>
                                    <i
                                      className="fas fa-plus text-dark mx-1"
                                      onClick={() => plusQuantity(product._id)}
                                    ></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-3 right-text">
                              <div className="right">
                                <div className="remove">
                                  <button
                                    type="button"
                                    className="closess mr-3 closse-mobile-1 p-0"
                                    style={{
                                      backgroundColor: "transparent",
                                      border: "none",
                                      width: "50px",
                                    }}
                                    onClick={() =>
                                      handleRemoveProduct(
                                        product._id,
                                        product.items_id
                                      )
                                    }
                                    aria-label="Remove"
                                  >
                                    <span aria-hidden="true" className="p-0">
                                      <i className="fa-solid fa-trash-can text-black"></i>
                                    </span>
                                  </button>
                                </div>
                              </div>
                              <div className="text-dark p-0 mt-1">
                                <div className="d-inline-block">
                                  <span className="d-inline-block mr-2 f-rob-bol f-22">
                                    ₹{product.price.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div>
                    <div className="hs-frequently-bought mt-5">
                      <span>You Might Also Like These </span>
                    </div>
                    <div className="cart-item-main mt-3 m-2">
                      <div className="media bg-white cart-main">
                        <div className="d-flex">
                          <div className="col-3">
                            <span
                              className="lazy-load-image-background blur lazy-load-image-loaded"
                              style={{ display: "inline-block" }}
                            >
                              <img
                                alt="product"
                                className="img-fluid cp"
                                src={`https://files.fggroup.in/production/products/FILE-whey-protein-chocolate-1-8c2c4aae-b61a-43f4-b782-8fee3acf54e3.jpeg`}
                              />
                            </span>
                          </div>
                          <div className="col-7">
                            <div className="media-body align-self-center">
                              <div className="d-flex mx-2 justify-content-between">
                                <div className="col-12">
                                  <h2
                                    className="f-rob-bol d-inline-block h3-fs cp mb-2 fs-18"
                                    title="Everyday Sweet | 1:1 Sugar Replacer | Zero Calories | 100% Natural"
                                  >
                                    Everyday Sweet | 1:1 Sugar Replacer | Zero
                                    Calories
                                  </h2>
                                </div>
                              </div>
                              <div className="text-dark mx-2">
                                <div className="d-inline-block">
                                  <span className="d-inline-block mr-2 f-rob-bol f-22">
                                    ₹1300
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-2 right-text">
                            <div className="hs-upsell-add ">
                              <button
                                title="ADD"
                                type="button"
                                className="hs-upsell-add-to-cart hs-event-static"
                              >
                                <span className="hs-add--to--cart">ADD</span>
                                <span className="hs--loading">
                                  <div className="hs-spinner"></div>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          {productDataGet?.length === 0 && !loading && (
            <div className="d-flex  text-center align-items-center position-absolute h-100">
              <div className="row">
                <div className="col-12">
                  <img
                    alt="Coming Soon"
                    className="img-fluid"
                    src={`${process.env.PUBLIC_URL}/assets/images/empty.webp`}
                    width="100%"
                    height="auto"
                  />
                  <p className="m-0 f-rob-bol f-20 mt-4 text-center">
                    <b>Your Cart Is Empty</b>
                  </p>
                  <div className="common-button mx-2">
                    <Link to="/">
                      <button className="bg-blue text-uppercase px-2 mt-3 px-lg-5 py-2 text-white f-16 f-rob-bol">
                        Start Shopping
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {productDataGet?.length > 0 && (
          <div className="d-flex flex-column align-items-center border-top">
            <div className="w-100 p-2 pb-3">
              <div className="subtotal-main p-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="m-0 f-rob-bol text-dark f-16">
                      <b>SUBTOTAL</b>
                    </p>
                  </div>
                  <div>
                    <span className="d-inline-block text-dark f-rob-med f-16">
                      <b>₹{totalAmount.toFixed(2)}</b>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12 text-center">
                <div className="common-button">
                  <button
                    onClick={(e) => handleAddToCart(e)}
                    className="bg-blue d-block text-uppercase px-3 px-lg-5 text-white f-16 f-rob-bol rate-btn-blue"
                  >
                    Check OUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddtoCartOffCanvas;
