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

const AddtoCartOffCanvas = ({
  isOpen,
  onClose,
  addToCartProducts,
  handleChangeCart,
}) => {
  const [animateOpen, setAnimateOpen] = useState(false);
  const [dataPrinted, setDataPrinted] = useState(false);
  const [productDataGet, setProductDataGet] = useState([]);
  const [suggestionData, setSuggestionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalMRP, setTotalMRP] = useState(0);
  const [previousProductData, setPreviousProductData] = useState([]);
  const [serverDataID, setServerDataID] = useState("");
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [manualCouponCode, setManualCouponCode] = useState("");

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

  // Fetch cart data when addToCartProducts change
  useEffect(() => {
    if (addToCartProducts && !isFetchingData && !dataPrinted) {
      fetchProductsCartData();
    }
  }, [addToCartProducts]);

  // AUTO apply coupon based on totalAmount
  useEffect(() => {
    const appliedCoupon = JSON.parse(localStorage.getItem("appliedCoupon"));

    if (totalAmount <= 0) {
      // Cart empty - clear coupon
      setManualCouponCode("");
      localStorage.removeItem("appliedCoupon");
      return;
    }

    const couponCode = totalAmount > 2000 ? "FLAT50" : "FLAT25";

    if (!appliedCoupon || appliedCoupon?.coupon_code !== couponCode) {
      handleApplyClick(couponCode, true); // true means auto apply, no UI alerts
    }
  }, [totalAmount]);

  // Fetch cart data
  const fetchProductsCartData = async () => {
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
        map[product.product_id] = product.mrpPrice;
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

      handleSuggestionData(updatedServerData);
      setDataPrinted(true);
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
      localStorage.setItem("appliedCoupon", JSON.stringify(couponData));

      if (!isAuto) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
        });
        toast.success("Coupon applied successfully");
      }
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

  // Other existing handlers below unchanged:

  const handleRemoveProduct = async (cart_id, product_id) => {
    try {
      await axiosInstance.delete(
        `/order-cart/remove-item?item_id=${product_id}&cart_id=${serverDataID}`
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
        (product) => product.product_id !== product_id
      );
      localStorage.setItem("addItemInCart", JSON.stringify(existingData));
      fetchProductsCartData();

      handleChangeCart();
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

  const AllPureGoProducts = [
    {
      key: "1kg-Chocolate",
      data: {
        id: "67e7749163f930dcc6a2715d",
        img: "/assets/images/products/whey-protein/whey-protein-chocolate-1.webp",
        name: "Whey Protein 1kg Chocolate",
        price: "2999",
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
        price: "3199",
        discount: "1490",
        size: "1 Kg",
        dis_point: "53%",
      },
    },
    {
      key: "1kg-Mawa Kulfi",
      data: {
        id: "67e774a963f930dcc6a2715f",
        img: "/assets/images/products/whey-protein/whey-protein-mawakulfi-1.webp",
        name: "Whey Protein 1kg Mawa Kulfi",
        price: "3199",
        discount: "1490",
        size: "1 Kg",
        dis_point: "53%",
      },
    },
    {
      key: "2kg-Chocolate",
      data: {
        id: "68219edf28bd0ff3b2083fa6",
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
        id: "68219f0d28bd0ff3b2083fad",
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
        id: "68219ef928bd0ff3b2083fa8",
        img: "/assets/images/products/whey-protein/whey-protein-mawakulfi-1.webp",
        name: "Whey Protein 2kg Mawa Kulfi",
        price: "5999",
        discount: "2879",
        size: "2 Kg",
        dis_point: "52%",
      },
    },
    {
      key: "250g-Fruit Punch",
      data: {
        id: "67e7740363f930dcc6a27157",
        img: "/assets/images/products/pre-workout/pre-workout-fruit-punch-1.webp",
        name: "Pre Workout Fruit Punch",
        price: "2500",
        discount: "600",
        size: "250 g",
        dis_point: "76%",
      },
    },
    {
      key: "250g-Cola",
      data: {
        id: "682718b1ed4175d21de95d0b",
        img: "/assets/images/products/pre-workout/pre-workout-cola-1.webp",
        name: "Pre Workout Cola",
        price: "2500",
        discount: "600",
        size: "250 g",
        dis_point: "76%",
      },
    },
    {
      key: "250g-Orange",
      data: {
        id: "6827168ced4175d21de95c4e",
        img: "/assets/images/products/bcaa/bcaa-orange-1.webp",
        name: "BCAA Orange",
        price: "2100",
        discount: "840",
        size: "250 g",
        dis_point: "60%",
      },
    },
    {
      key: "250g-Cranberry",
      data: {
        id: "6827180aed4175d21de95cb9",
        img: "/assets/images/products/bcaa/bcaa-cranberry-1.webp",
        name: "BCAA Cranberry",
        price: "2100",
        discount: "840",
        size: "250 g",
        dis_point: "60%",
      },
    },
    {
      key: "250g-Lemon",
      data: {
        id: "67e773f463f930dcc6a27155",
        img: "/assets/images/products/creatine/creatine-lemon-1.webp",
        name: "Creatine Monohydrate Lemon",
        price: "1499",
        discount: "450",
        size: "250 g",
        dis_point: "69%",
      },
    },
    {
      key: "250g-Unflavoured",
      data: {
        id: "6827197bed4175d21de95d5c",
        img: "/assets/images/products/creatine/creatine-unflavoured-1.webp",
        name: "Creatine Monohydrate Unflavoured",
        price: "1499",
        discount: "450",
        size: "250 g",
        dis_point: "69%",
      },
    },
    {
      key: "250g-Watermelon",
      data: {
        id: "67e7742d63f930dcc6a27159",
        img: "/assets/images/products/eaa/eaa-1.webp",
        name: "EAA Powder",
        price: "2099",
        discount: "550",
        size: "250 g",
        dis_point: "73%",
      },
    },
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
    {
      key: "500ml-Black",
      data: {
        id: "6827168ced4175d21de95c4e",
        img: "/assets/images/products/bcaa/bcaa-orange-1.webp",
        name: "Shaker Bottle 500ml",
        price: "2100",
        discount: "840",
        size: "500ml",
        dis_point: "60%",
      },
    },
  ];

  const handleSuggestionData = (updatedServerData) => {
    const filteredData = AllPureGoProducts.filter((item) => {
      return !updatedServerData.some(
        (serverItem) => serverItem._id === item.data.id
      );
    });

    setSuggestionData(filteredData);
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
        product_id: product._id,
        quantity: product.quantity,
      }));

      const selectedAddToCartData = products.map((data) => {
        const selectedProduct = AllPureGoProducts.find(
          (allProducts) => allProducts.data.id === data.product_id
        );

        return selectedProduct.data;
      });

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
          localStorage.setItem(
            "allProductsData",
            JSON.stringify({
              allProductsData: products,
              totalAmount,
              totalMRP,
            })
          );
          localStorage.setItem(
            "selectedAddToCartData",
            JSON.stringify(selectedAddToCartData)
          );
          window.location.href = `/check-out`;
        }
      } else {
        localStorage.setItem(
          "productsData",
          JSON.stringify({ products, totalAmount, totalMRP })
        );
        localStorage.setItem(
          "allProductsData",
          JSON.stringify({
            allProductsData: products,
            totalAmount,
            totalMRP,
          })
        );
        localStorage.setItem(
          "selectedAddToCartData",
          JSON.stringify(selectedAddToCartData)
        );
        window.location.href = `/check-out`;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const toggleMenu = async (data) => {
    try {
      let existingData = JSON.parse(localStorage.getItem("addItemInCart")) || {
        products: [],
      };
      const productExists = existingData.products.some(
        (product) => product.product_id === data.id
      );

      if (!productExists) {
        existingData.products.push({
          product_id: data.id,
        });
        localStorage.setItem("addItemInCart", JSON.stringify(existingData));
      }

      const response = await axiosInstance.post("/order-cart/add-item", {
        item_id: data.id,
        quantity: 1,
        item_type: "PURE_GO_MEAL_PRODUCT",
      });

      if (response.data.response === "OK") {
        fetchProductsCartData();
        handleChangeCart();
        // setAddToCartProducts(data);
        // setMenuOpen(!menuOpen);
        // localStorage.setItem("itemCartAdded", "false");
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
                  tabIndex="0"
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
        <div className="thin-scrollbar" style={{ overflowY: "scroll" }}>
          {loading ? (
            <div
              id="preloader1"
              className={`fade-loader ${loading ? "fade-in" : "fade-out"}`}
              style={{ position: "unset" }}
            >
              <div
                className="tg-cube-grid"
                style={{ position: "unset", margin: "20px auto" }}
              >
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`tg-cube tg-cube${i + 1}`} />
                ))}
              </div>
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
                                      className="f-rob-bol d-inline-block text-capitalize h3-fs cp mb-2 fs-17"
                                      title={product?.name}
                                    >
                                      {product?.name?.length > 35
                                        ? product?.name.slice(0, 35) + "..."
                                        : product?.name}
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
                                        className="mb-0 text-center"
                                        readOnly
                                        style={{
                                          borderRadius: "5px",
                                          width: "45px",
                                          height: "30px",
                                          padding: "0px 0px 0px 15px",
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
                    <div className="hs-frequently-bought mt-3">
                      <span>You Might Also Like These </span>
                    </div>
                    {suggestionData.map((data) => {
                      const suggestionProduct = data.data;
                      return (
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
                                    src={suggestionProduct.img}
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
                                        {suggestionProduct.name}
                                      </h2>
                                    </div>
                                  </div>
                                  <div className="text-dark mx-2">
                                    <div className="d-inline-block">
                                      <span className="d-inline-block mr-2 f-rob-bol f-22">
                                        ₹{suggestionProduct.price}
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
                                    onClick={() =>
                                      toggleMenu(suggestionProduct)
                                    }
                                  >
                                    <span className="hs-add--to--cart">
                                      ADD
                                    </span>
                                    <span className="hs--loading">
                                      <div className="hs-spinner"></div>
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
