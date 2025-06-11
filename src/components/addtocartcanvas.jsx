import React, { useState, useEffect, useRef } from "react";
import "../assets/css/offcanvase.css";
import "../assets/css/style.css";
import { Accordion, Form } from "react-bootstrap";
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
  const [appliedCouponCode, setAppliedCouponCode] = useState("");

  const [isCouponRupee, setIsCouponRupee] = useState(false);
  const [amountOnCouponCode, setAmountOnCouponCode] = useState();
  const [productDatas, setProductDatas] = useState([[]]);
  const productData = localStorage.getItem("productsData");
  const [mainPrice, setMainPrice] = useState();
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [manualCouponCodeData, setManualCouponCodeData] = useState("");
  const [autoDiscount, setAutoDiscount] = useState(0);
  const [totalCouponDiscount, setTotalCouponDiscount] = useState(0);
  const [autoCouponData, setAutoCouponData] = useState(null);
  const [offers, setOffers] = useState([]);

  const hasFiredConfetti = useRef(false);

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

  useEffect(() => {
    setAnimateOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (addToCartProducts && !isFetchingData && !dataPrinted) {
      fetchProductsCartData();
    }
  }, [addToCartProducts]);

  const handleRemoveCoupon = () => {
    setManualCouponCode("");
    setManualCouponCodeData(null);
    setTotalCouponDiscount(0);
    setIsCouponRupee(false);
    setAutoCouponData(null);
    localStorage.removeItem("appliedCoupon");
    if (productData) {
      UpdatedData(productData);
    }
  };

  const UpdatedData = (productData) => {
    const data = JSON.parse(productData);
    const orderTotal = data.totalAmount;
    setProductDatas(data.products);
    setAmountOnCouponCode(orderTotal);

    let selectedAddToCartData = localStorage.getItem("selectedAddToCartData");
    selectedAddToCartData = JSON.parse(selectedAddToCartData);

    const totalDiscountPercentage = selectedAddToCartData
      ?.map((data) => parseInt(data?.dis_point.replace("%", "")))
      ?.reduce((sum, value) => sum + value, 0);

    const averageDiscount =
      totalDiscountPercentage / selectedAddToCartData?.length;

    let baseDiscount;
    let priceAfterAutoDiscount;

    if (orderTotal >= 2000) {
      const baseDiscountPercent = 50;
      const originalDiscountPercent = averageDiscount;
      baseDiscount = orderTotal * (baseDiscountPercent / 100);
      priceAfterAutoDiscount = orderTotal - baseDiscount;

      if (originalDiscountPercent > baseDiscountPercent) {
        const remainingDiscountPercent =
          originalDiscountPercent - baseDiscountPercent;

        const promoCode = `ONLINE${Math.round(remainingDiscountPercent)}`;

        const customOffer = {
          code: promoCode,
          description: `Extra ${Math.round(remainingDiscountPercent)}% OFF`,
          discount: remainingDiscountPercent,
          discount_type: "percent",
        };

        setOffers((prev) => {
          const isAlreadyPresent = prev.some(
            (offer) => offer.code === promoCode
          );
          if (!isAlreadyPresent) {
            return [...prev, customOffer];
          }
          return prev;
        });
      }
    } else if (orderTotal < 2000) {
      const baseDiscountPercent = 25;
      const originalDiscountPercent = averageDiscount;
      baseDiscount = orderTotal * (baseDiscountPercent / 100);
      priceAfterAutoDiscount = orderTotal - baseDiscount;

      if (originalDiscountPercent > baseDiscountPercent) {
        const remainingDiscountPercent =
          originalDiscountPercent - baseDiscountPercent;

        const promoCode = `ONLINE${Math.round(remainingDiscountPercent)}`;

        const customOffer = {
          code: promoCode,
          description: `Extra ${Math.round(remainingDiscountPercent)}% OFF`,
          discount: remainingDiscountPercent,
          discount_type: "percent",
        };
        setOffers((prev) => {
          const isAlreadyPresent = prev.some(
            (offer) => offer.code === promoCode
          );
          if (!isAlreadyPresent) {
            return [...prev, customOffer];
          }
          return prev;
        });
      }
    }

    setAutoDiscount(baseDiscount);
    setMainPrice(priceAfterAutoDiscount);
  };

  useEffect(() => {
    if (productData) {
      UpdatedData(productData);
    }
  }, [productData]);

  const fetchProductsCartData = async () => {
    if (isFetchingData) return;

    setLoading(true);
    setIsFetchingData(true);

    try {
      const response = await axiosInstance.get(
        "/order-cart/get-carts?item_type=PURE_GO_MEAL_PRODUCT&is_purchase=true"
      );
      const serverData = response.data.data[0];
      // let itemdata = {
      //   CartProduct:serverData.items_details,
      //   Productquantity:serverData.items
      // };

      localStorage.setItem(
        "ProductNameData",
        JSON.stringify(serverData.items_details)
      );

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

  const handleApplyClick = async (appliedCoupon, PromoCode) => {
    try {
      if (PromoCode?.AutoPromoCode) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        let code = appliedCoupon || manualCouponCode;

        if (!code.trim()) {
          Swal.fire({
            icon: "warning",
            title: "Empty Code",
            text: "Please enter or select a valid promo code.",
          });
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

        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
        });

        toast.success("Coupon applied successfully");
        calculateDiscountedPrice(couponData);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.response?.data?.message || "Failed to apply coupon.",
      });
    }
  };

  const calculateDiscountedPrice = (couponData) => {
    if (!couponData) {
      setTotalCouponDiscount(0);
      setMainPrice(amountOnCouponCode);
      setIsCouponRupee(false);
      setAutoCouponData(null);
      return;
    }

    let discountAmount = 0;
    const totalDiscountPercentOrRupees = couponData.discount || 0;
    setAutoCouponData(couponData);

    let totalCouponAmount;
    if (couponData.discount_type === "rupees") {
      discountAmount = totalDiscountPercentOrRupees;
      totalCouponAmount = amountOnCouponCode - autoDiscount - discountAmount;
      setIsCouponRupee(true);
    } else {
      discountAmount =
        ((amountOnCouponCode - autoDiscount) * totalDiscountPercentOrRupees) /
        100;
      totalCouponAmount = amountOnCouponCode - autoDiscount - discountAmount;
      setIsCouponRupee(false);
    }

    setTotalCouponDiscount(discountAmount);
    setMainPrice(totalCouponAmount);
  };

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

  const couponOffers = [
    {
      code: "FLAT199",
      description: "Get ₹199 off on your order",
      note: "Applicable on orders above ₹1000",
    },
    {
      code: "FLAT499",
      description: "Get ₹499 off on your order",
      note: "Applicable on orders above ₹5000",
    },
  ];

  const AllPureGoProducts = [
    {
      key: "1kg-Chocolate",
      data: {
        id: "67e7749163f930dcc6a2715d",
        img: "/assets/images/products/whey-protein/whey-protein-chocolate-1.webp",
        name: "Whey Protein 1kg Chocolate",
        price: "3080",
        discount: "1390",
        size: "1kg",
        dis_point: "53%",
      },
    },
    {
      key: "1kg-Mocha Coffee",
      data: {
        id: "67e774c463f930dcc6a27161",
        img: "/assets/images/products/whey-protein/whey-protein-mochacoffee-1.webp",
        name: "Whey Protein 1kg Mocha Coffee",
        price: "3270",
        discount: "1490",
        size: "1kg",
        dis_point: "53%",
      },
    },
    {
      key: "1kg-Mawa Kulfi",
      data: {
        id: "67e774a963f930dcc6a2715f",
        img: "/assets/images/products/whey-protein/whey-protein-mawakulfi-1.webp",
        name: "Whey Protein 1kg Mawa Kulfi",
        price: "3270",
        discount: "1490",
        size: "1kg",
        dis_point: "53%",
      },
    },
    {
      key: "2kg-Chocolate",
      data: {
        id: "68219edf28bd0ff3b2083fa6",
        img: "/assets/images/products/whey-protein/whey-protein-chocolate-1.webp",
        name: "Whey Protein 2kg Chocolate",
        price: "5750",
        discount: "2679",
        size: "2kg",
        dis_point: "52%",
      },
    },
    {
      key: "2kg-Mocha Coffee",
      data: {
        id: "68219f0d28bd0ff3b2083fad",
        img: "/assets/images/products/whey-protein/whey-protein-mochacoffee-1.webp",
        name: "Whey Protein 2kg Mocha Coffee",
        price: "6150",
        discount: "2879",
        size: "2kg",
        dis_point: "52%",
      },
    },
    {
      key: "2kg-Mawa Kulfi",
      data: {
        id: "68219ef928bd0ff3b2083fa8",
        img: "/assets/images/products/whey-protein/whey-protein-mawakulfi-1.webp",
        name: "Whey Protein 2kg Mawa Kulfi",
        price: "6150",
        discount: "2879",
        size: "2kg",
        dis_point: "52%",
      },
    },
    {
      key: "250g-Fruit Punch",
      data: {
        id: "67e7740363f930dcc6a27157",
        img: "/assets/images/products/pre-workout/pre-workout-fruit-punch-1.webp",
        name: "Pre Workout Fruit Punch",
        price: "2550",
        discount: "600",
        size: "250g",
        dis_point: "76%",
      },
    },
    {
      key: "250g-Cola",
      data: {
        id: "682718b1ed4175d21de95d0b",
        img: "/assets/images/products/pre-workout/pre-workout-cola-1.webp",
        name: "Pre Workout Cola",
        price: "2550",
        discount: "600",
        size: "250g",
        dis_point: "76%",
      },
    },
    {
      key: "250g-Orange",
      data: {
        id: "6827168ced4175d21de95c4e",
        img: "/assets/images/products/bcaa/bcaa-orange-1.webp",
        name: "BCAA Orange",
        price: "2150",
        discount: "840",
        size: "250g",
        dis_point: "60%",
      },
    },
    {
      key: "250g-Cranberry",
      data: {
        id: "6827180aed4175d21de95cb9",
        img: "/assets/images/products/bcaa/bcaa-cranberry-1.webp",
        name: "BCAA Cranberry",
        price: "2150",
        discount: "840",
        size: "250g",
        dis_point: "60%",
      },
    },
    {
      key: "250g-Lemon",
      data: {
        id: "67e773f463f930dcc6a27155",
        img: "/assets/images/products/creatine/creatine-lemon-1.webp",
        name: "Creatine Monohydrate Lemon",
        price: "1550",
        discount: "450",
        size: "250g",
        dis_point: "69%",
      },
    },
    {
      key: "250g-Unflavoured",
      data: {
        id: "6827197bed4175d21de95d5c",
        img: "/assets/images/products/creatine/creatine-unflavoured-1.webp",
        name: "Creatine Monohydrate Unflavoured",
        price: "1550",
        discount: "450",
        size: "250g",
        dis_point: "69%",
      },
    },
    {
      key: "250g-Watermelon",
      data: {
        id: "67e7742d63f930dcc6a27159",
        img: "/assets/images/products/eaa/eaa-1.webp",
        name: "EAA Powder",
        price: "2100",
        discount: "550",
        size: "250g",
        dis_point: "73%",
      },
    },
    {
      key: "1kg-Chocolate",
      data: {
        id: "67e7745f63f930dcc6a2715b",
        img: "/assets/images/products/mass-gainer/mass-gainer-1.webp",
        name: "Whey Matrix 1kg Chocolate",
        price: "1580",
        discount: "599",
        size: "1kg",
        dis_point: "60%",
      },
    },
    {
      key: "3kg-Chocolate",
      data: {
        id: "68219f4d28bd0ff3b2083fb1",
        img: "/assets/images/products/mass-gainer/mass-gainer-1.webp",
        name: "Mass Gainer 3kg Chocolate",
        price: "4750",
        discount: "1699",
        size: "3kg",
        dis_point: "62%",
      },
    },
    {
      key: "500ml-Black",
      data: {
        id: "68316330f91df040c479ad1e",
        img: "/assets/images/products/shaker-bottle/shaker-bottle-1.webp",
        name: "Gomzi Nutrition Shaker 500ml",
        price: "160",
        discount: "0",
        size: "500ml",
        dis_point: "60%",
      },
    },
  ];

  AllPureGoProducts?.sort((a, b) => a?.data.price - b?.data.price);

  const handleSuggestionData = (updatedServerData) => {
    const filteredData = AllPureGoProducts.filter((item) => {
      return !updatedServerData.some(
        (serverItem) => serverItem._id === item.data.id
      );
    });

    setSuggestionData(filteredData);
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
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  let defaultDiscountPercent =  totalAmount > 2000 ? 0.5 : 0.25;
  let defaultDiscountAmount =  totalAmount * defaultDiscountPercent;

  let couponDiscountAmount = 0;
  let couponLabel = "";

  if (manualCouponCodeData) {
    if (manualCouponCodeData.discount_percentage) {
      const percent = manualCouponCodeData.discount_percentage / 100;
      couponDiscountAmount = (totalAmount - defaultDiscountAmount) * percent;
      couponLabel = `(${manualCouponCodeData.discount_percentage}%)`;
    } else if (manualCouponCodeData.discount_amount) {
      couponDiscountAmount = manualCouponCodeData.discount_amount;
      couponLabel = "";
    }
  }

  let finalAmount = totalAmount - defaultDiscountAmount - totalCouponDiscount;

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
        // name: product.name,
      }));

      const selectedAddToCartData = products.map((data) => {
        const selectedProduct = AllPureGoProducts.find(
          (allProducts) => allProducts.data.id === data.product_id
        );

        return selectedProduct?.data;
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
            JSON.stringify({
              products,
              totalAmount,
              totalMRP,
              finalAmount,
              defaultDiscountAmount,
              totalCouponDiscount,
            })
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
          JSON.stringify({
            products,
            totalAmount,
            totalMRP,
            finalAmount,
            defaultDiscountAmount,
            totalCouponDiscount,
          })
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

  const handleClose = () => {
    setAnimateOpen(false);
    setTimeout(() => {
      onClose();
    }, 700);
  };

  let DiscountCalculate = (name, mainprice) => {

    let Demo = {};

    if (( mainprice > 1500)) {
      
      defaultDiscountPercent = (name === "Pure Go Whey Matrix 1kg Chocolate" || mainprice > 1500) ? 0.5 : 0.25;
      defaultDiscountAmount =  totalAmount * defaultDiscountPercent;
      finalAmount = totalAmount - defaultDiscountAmount - totalCouponDiscount
    }
    
    if (( mainprice > 1500) || (productDataGet.length > 1 && finalAmount > 1500)
    ) {
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
      {isOpen && (
        <div
          className={`overlay ${animateOpen ? "" : "hidden"}`}
          onClick={onClose}
        ></div>
      )}
      <div className={`offcanvas ${animateOpen ? "open" : "close"}`}>
        <div className="hs-header-layout">
          <div className="hs-close-popup-cart">
            <div className="hs-header-close-empty position-relative">
              <p className="hs-header-title">Your Cart</p>
              <span className="hs-close hs-event-static" onClick={handleClose}>
                <img
                  alt="product"
                  className="img-fluid cp"
                  src={process.env.PUBLIC_URL + "/assets/images/close.png"}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="hs-content-discounts-calculate-checkout hs-enable-content-rewards">
          <div className="hs-rewards-content">
            <div className="hs-progess-content hs-hidden-percentages">
              {totalAmount > 1500 ? (
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
                    🎉 You're just <b>₹{(1500 - totalAmount).toFixed(2)}</b>{" "}
                    away from unlocking a <b>50% discount</b>! 🛍️💸
                  </div>
                  <div id="hs_shipping_progress">
                    <div
                      id="hs_shipping_bar"
                      style={{
                        width: `${Math.min((totalAmount / 1500) * 100, 100)}%`,
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
                                      className="f-rob-bol d-inline-block text-capitalize h3-fs cp fs-17 m-0"
                                      title={product?.name}
                                    >
                                      {product?.name?.length > 35
                                        ? product?.name.slice(0, 35) + "..."
                                        : product?.name}
                                    </h2>
                                  </div>
                                </div>
                                <div className="text-dark p-0 ">
                                  <div
                                    className="d-flex gap-2 align-items-center justify-content-center px-2"
                                    style={{ width: "fit-content" }}
                                  >
                                    {(() => {
                                      const price = DiscountCalculate(
                                        product?.name,
                                        product.quantity * product.price
                                      );
                                      return (
                                        <>
                                          <span className="variant-price">
                                            ₹{price?.discountedprice?.toFixed(0)}
                                            /-
                                          </span>
                                          <span
                                            className="variant-old-price m-0"
                                            style={{ fontSize: "14px"}}
                                          >
                                            ₹{price?.mainprice}{" "}
                                          </span>
                                          <span
                                            className="variant-offer"
                                            style={{ fontSize: "13px"}}
                                          >
                                            {price?.discount} off
                                          </span>
                                        </>
                                      );
                                    })()}
                                  </div>
                                </div>
                                <div className="cart-add align-items-center">
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
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="p-3">
                    <h2 className="promo-title">Apply Promo Code</h2>
                    <div>
                      <div className="d-flex row mt-3 align-items-center justify-content-between">
                        <div className="col-8">
                          <input
                            type="text"
                            placeholder="Enter Coupon Code"
                            className="form-control apply-form"
                            value={manualCouponCode}
                            onChange={(e) =>
                              setManualCouponCode(e.target.value)
                            }
                            maxLength="100"
                          />
                        </div>
                        <div className="col-4">
                          {manualCouponCodeData ? (
                            <button
                              type="button"
                              onClick={handleRemoveCoupon}
                              className="remove-btn w-100"
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleApplyClick()}
                              className="apply-btn w-100"
                              disabled={
                                (manualCouponCode === "FLAT499" &&
                                  totalAmount < 5000) ||
                                (manualCouponCode === "FLAT199" &&
                                  totalAmount < 1000)
                              }
                            >
                              Apply
                            </button>
                          )}
                        </div>
                        {manualCouponCode === "FLAT499" &&
                          totalAmount < 5000 && (
                            <small style={{ color: "red" }}>
                              Minimum order amount ₹5000 required to apply this
                              coupon.
                            </small>
                          )}

                        {manualCouponCode === "FLAT199" &&
                          totalAmount < 1000 && (
                            <small style={{ color: "red" }}>
                              Minimum order amount ₹1000 required to apply this
                              coupon.
                            </small>
                          )}
                      </div>
                    </div>

                    <div className="faq-wrapper">
                      <Accordion defaultActiveKey={["1"]} alwaysOpen>
                        <Accordion.Item eventKey="1" className="p-2">
                          <Accordion.Header className="f-18 lp-2">
                            <div className="discount-field">
                              <div className="logoAndApplyCouponText">
                                <svg
                                  width="30"
                                  height="15"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.4312 8.06504C13.2713 7.78613 13.11 7.50723 12.95 7.22695C12.8707 7.0834 12.8707 6.91523 12.95 6.77168C12.9705 6.73476 12.991 6.69922 13.0115 6.66367C13.1113 6.48867 13.2125 6.31504 13.3123 6.14004C13.3807 6.02109 13.4504 5.90215 13.5187 5.78184C13.676 5.50019 13.635 5.13926 13.4053 4.9082C13.3 4.80293 13.1537 4.73457 13.0266 4.66074L12.4769 4.34492C12.3553 4.27519 12.2021 4.20957 12.1187 4.09336C12.0189 3.95391 12.0312 3.79531 12.0312 3.63535V3.00781C12.0312 2.86426 12.0422 2.71523 12.0217 2.57305C11.9738 2.24629 11.6949 2.0043 11.3723 1.97012C11.2396 1.95644 11.1002 1.96738 10.9662 1.96738H10.3428C10.1801 1.96738 10.0215 1.97695 9.88476 1.86621C9.77538 1.77734 9.70976 1.62422 9.64003 1.50391C9.53476 1.3207 9.42949 1.1375 9.32421 0.955663C9.24765 0.823046 9.17792 0.674023 9.06171 0.571484C8.82519 0.362304 8.48613 0.329491 8.21269 0.482616C7.91327 0.65078 7.6166 0.825781 7.31992 0.996679C7.28163 1.01855 7.24472 1.0418 7.20644 1.06094C7.06972 1.1334 6.90429 1.12383 6.77031 1.05C6.64999 0.983007 6.53242 0.913281 6.4121 0.843554C6.2371 0.743749 6.06347 0.642577 5.88847 0.541405C5.71484 0.441601 5.5412 0.362304 5.33339 0.388281C5.08046 0.419726 4.89179 0.571484 4.76601 0.787499C4.67578 0.943359 4.58554 1.10059 4.49531 1.25644C4.40917 1.40684 4.32167 1.55723 4.23554 1.70762C4.14257 1.87031 3.99492 1.96465 3.80488 1.96465C3.45488 1.96601 3.10488 1.96465 2.75351 1.96465C2.52656 1.96465 2.30917 2.02617 2.15195 2.20117C2.0412 2.32422 1.97831 2.47734 1.96464 2.64141C1.96054 2.68652 1.96327 2.73301 1.96327 2.77812C1.96327 3.12402 1.96738 3.46992 1.96327 3.81582C1.96191 4.01269 1.85117 4.15078 1.6871 4.24512C1.52988 4.33535 1.37265 4.42695 1.21542 4.51719L0.768353 4.77559C0.540032 4.90684 0.388275 5.13379 0.381439 5.40176C0.37597 5.5959 0.46347 5.75312 0.556439 5.91445C0.660345 6.09355 0.762884 6.27402 0.86679 6.45449C0.933782 6.5707 1.01308 6.68691 1.06913 6.80859C1.13066 6.94258 1.11835 7.09844 1.04726 7.22558C1.02538 7.26523 1.00214 7.30488 0.9789 7.34316C0.812103 7.63301 0.641204 7.92148 0.477142 8.21269C0.315814 8.50117 0.362298 8.87852 0.611126 9.1041C0.720501 9.20391 0.864056 9.2709 0.991204 9.34473C1.17441 9.45 1.35624 9.55527 1.53945 9.66055C1.66523 9.73301 1.81425 9.79727 1.89355 9.92578C1.98105 10.0652 1.96464 10.2238 1.96464 10.3811V11.0113C1.96464 11.1549 1.95234 11.3066 1.97831 11.4488C2.03847 11.7742 2.33378 12.0121 2.65917 12.0271C2.79042 12.0326 2.92167 12.0271 3.05292 12.0271H3.66542C3.83769 12.0271 4.00175 12.0244 4.1371 12.1543C4.23554 12.2486 4.29706 12.3949 4.36406 12.5111C4.46796 12.6916 4.57187 12.8734 4.67714 13.0539C4.75781 13.1934 4.83027 13.3437 4.95878 13.4463C5.19667 13.6363 5.51933 13.6596 5.78456 13.5092C5.91581 13.4354 6.0457 13.3588 6.17558 13.2836L6.68827 12.9883C6.72929 12.965 6.76894 12.9377 6.81269 12.9186C6.94667 12.8598 7.0998 12.8721 7.22695 12.9432C7.52636 13.1113 7.82304 13.2863 8.11972 13.4586C8.1539 13.4777 8.18671 13.4982 8.22089 13.5174C8.37265 13.6008 8.54218 13.6268 8.71171 13.5967C8.9455 13.5557 9.11503 13.3957 9.22988 13.1975C9.40624 12.8912 9.58261 12.5836 9.76035 12.2773C9.85468 12.1146 10.0051 12.0271 10.1924 12.0271H11.2506C11.4816 12.0271 11.7045 11.9561 11.8562 11.7715C11.9629 11.6416 12.0244 11.483 12.0271 11.3135C12.0285 11.2752 12.0271 11.2355 12.0271 11.1973V10.5998C12.0271 10.4576 12.0258 10.3154 12.0271 10.1732C12.0285 10.0461 12.0764 9.92851 12.168 9.84101C12.2103 9.8 12.2609 9.77129 12.3115 9.74258C12.6178 9.56621 12.924 9.39121 13.2289 9.21348C13.4613 9.07949 13.6158 8.8375 13.6103 8.56543C13.6117 8.37676 13.5228 8.225 13.4312 8.06504ZM4.18359 5.07773C4.24238 4.84394 4.38046 4.61152 4.5664 4.45703C4.78242 4.27793 5.02167 4.17812 5.30058 4.14941C5.7873 4.10019 6.29863 4.39414 6.50507 4.83711C6.62538 5.09277 6.65546 5.35391 6.61034 5.63144C6.57343 5.86523 6.44628 6.08535 6.28495 6.25625L6.27128 6.26992L6.25351 6.28769C5.84472 6.67187 5.18984 6.75664 4.71542 6.43535C4.27245 6.13594 4.0537 5.60137 4.18359 5.07773ZM6.59394 7.96934L5.58085 8.98242L5.15839 9.40488C5.00117 9.56211 4.7537 9.55117 4.59511 9.40488C4.43652 9.25859 4.44745 8.98926 4.59511 8.8416L4.60195 8.83477C4.77011 8.65977 4.94648 8.49023 5.11874 8.31797L6.17968 7.25703L7.40605 6.03066L8.41913 5.01758L8.84159 4.59512C8.99882 4.43789 9.24628 4.44883 9.40488 4.59512C9.56347 4.74141 9.55253 5.01074 9.40488 5.1584L9.39804 5.16523C9.22988 5.34023 9.05351 5.50977 8.88124 5.68203L7.82031 6.74297L6.59394 7.96934ZM9.83281 8.8498C9.79589 9.08359 9.66874 9.30508 9.50742 9.47461L9.49374 9.48828L9.47597 9.50605C9.06718 9.89023 8.4123 9.975 7.93788 9.65508C7.49491 9.35566 7.27617 8.81973 7.40741 8.29609C7.4662 8.0623 7.60429 7.82988 7.79023 7.67539C8.00624 7.49492 8.2455 7.39512 8.52441 7.36777C9.01113 7.31855 9.52245 7.61387 9.7289 8.05547C9.84648 8.31113 9.87656 8.5709 9.83281 8.8498Z"
                                    fill="black"
                                  ></path>
                                </svg>
                                <p className="m-0 text-dark">
                                  <b>View All Coupon Code</b>
                                </p>
                              </div>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body className="p-0 f-rob-reg f-14">
                            {offers.map((offer, idx) => (
                              <div key={idx} className="coupon-card ">
                                <div className="coupon-label">{offer.code}</div>
                                <div className="coupon-content">
                                  <h2>
                                    {offer.description}, Use this code.
                                    {appliedCouponCode !== offer.code && (
                                      <span
                                        className="apply"
                                        onClick={() => {
                                          setManualCouponCode(offer.code);
                                          setShowCouponModal(false);
                                          handleApplyClick(offer.code);
                                          setAppliedCouponCode(offer.code);
                                        }}
                                      >
                                        Apply
                                      </span>
                                    )}
                                    {appliedCouponCode === offer.code && (
                                      <span
                                        className="apply text-danger"
                                        onClick={() => {
                                          handleRemoveCoupon();
                                          setAppliedCouponCode("");
                                        }}
                                      >
                                        Remove
                                      </span>
                                    )}
                                  </h2>
                                  <p>USE CODE: {offer.code}</p>
                                  <div className="dotted-line"></div>
                                  <p>{offer.description}, Use above code.</p>
                                  <p className="af-inline">{offer.note}</p>
                                </div>
                              </div>
                            ))}
                            {couponOffers.map((coupon, index) => {
                              const isFLAT499 = coupon.code === "FLAT499";
                              const isFLAT199 = coupon.code === "FLAT199";

                              const isFLAT499Enabled =
                                isFLAT499 && totalAmount >= 5000;
                              const isFLAT199Enabled =
                                isFLAT199 && totalAmount >= 1000;

                              const isDisabled =
                                (isFLAT499 && !isFLAT499Enabled) ||
                                (isFLAT199 && !isFLAT199Enabled);

                              return (
                                <div
                                  className="coupon-card"
                                  key={index}
                                  style={{
                                    opacity: isDisabled ? 0.5 : 1,
                                    pointerEvents: isDisabled ? "none" : "auto",
                                  }}
                                >
                                  <div className="coupon-label">
                                    {coupon.code}
                                  </div>
                                  <div className="coupon-content">
                                    <h2>
                                      {coupon.description}
                                      {!isDisabled &&
                                        appliedCouponCode !== coupon.code && (
                                          <span
                                            className="apply"
                                            onClick={() => {
                                              setManualCouponCode(coupon.code);
                                              setShowCouponModal(false);
                                              handleApplyClick(coupon.code);
                                              setAppliedCouponCode(coupon.code);
                                            }}
                                            style={{
                                              cursor: "pointer",
                                              marginLeft: "10px",
                                            }}
                                          >
                                            Apply
                                          </span>
                                        )}
                                      {!isDisabled &&
                                        appliedCouponCode === coupon.code && (
                                          <span
                                            className="apply text-danger"
                                            onClick={() => {
                                              handleRemoveCoupon();
                                              setAppliedCouponCode("");
                                            }}
                                            style={{
                                              cursor: "pointer",
                                              marginLeft: "10px",
                                            }}
                                          >
                                            Remove
                                          </span>
                                        )}
                                      {isDisabled && (
                                        <span
                                          className="apply text-muted"
                                          style={{
                                            cursor: "not-allowed",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          Apply
                                        </span>
                                      )}
                                    </h2>
                                    <p>USE CODE: {coupon.code}</p>
                                    <div className="dotted-line"></div>
                                    <p className="af-inline">{coupon.note}</p>

                                    {/* Warning messages */}
                                    {isDisabled && isFLAT499 && (
                                      <p
                                        style={{
                                          color: "red",
                                          fontSize: "0.9em",
                                          marginTop: "5px",
                                        }}
                                      >
                                        Minimum order ₹5000 required to apply
                                        this coupon.
                                      </p>
                                    )}
                                    {isDisabled && isFLAT199 && (
                                      <p
                                        style={{
                                          color: "red",
                                          fontSize: "0.9em",
                                          marginTop: "5px",
                                        }}
                                      >
                                        Minimum order ₹1000 required to apply
                                        this coupon.
                                      </p>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  </div>
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
                                        className="f-rob-bol d-inline-block text-capitalize h3-fs cp mb-2 fs-18"
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
                      <button
                        className="bg-blue text-uppercase px-2 mt-3 px-lg-5 py-2 text-white f-16 f-rob-bol"
                        onClick={handleClose}
                      >
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
                      <b>Amount</b>
                    </p>
                  </div>
                  <div>
                    <span className="d-inline-block text-dark f-rob-med f-16">
                      <b>₹{totalAmount.toFixed(2)}</b>
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="m-0 f-rob-bol text-dark f-16">
                      <b>Discount ({defaultDiscountPercent * 100}%)</b>
                    </p>
                  </div>
                  <div>
                    <span className="d-inline-block text-danger f-rob-med f-16">
                      <b>- ₹{defaultDiscountAmount.toFixed(2)}</b>
                    </span>
                  </div>
                </div>

                {totalCouponDiscount !== 0 && (
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <p className="m-0 f-rob-bol text-dark f-16">
                        <b>
                          Coupon Discount{" "}
                          {!isCouponRupee &&
                            `(${Math.round(autoCouponData?.discount || 0)}%)`}
                        </b>
                      </p>
                    </div>
                    <div>
                      <span className="d-inline-block text-danger f-rob-med f-16">
                        <b>
                          -{" "}
                          {isCouponRupee
                            ? `₹${totalCouponDiscount.toFixed(2)}`
                            : `₹${totalCouponDiscount.toFixed(2)}`}
                        </b>
                      </span>
                    </div>
                  </div>
                )}

                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="m-0 f-rob-bol text-dark f-16">
                      <b>SUBTOTAL</b>
                    </p>
                  </div>
                  <div>
                    <span className="d-inline-block text-dark f-rob-med f-16">
                      <b>₹{finalAmount.toFixed(2)}</b>
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
