import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { axiosInstance, publicAxiosInstance } from "../assets/js/config/api";
import { createPaymentProduct } from "../assets/js/utils/product";
import NutritionHeader from "../components/partials/Header/nutritionsheader";
import LoginModal from "../assets/js/popup/login";
import LoadingComponent from "../components/loadingComponent";
import lookup from "india-pincode-lookup";
import { toast } from "react-toastify";
import { Card, Modal } from "react-bootstrap";
import confetti from "canvas-confetti";

function CheckOut() {
  const [isCouponRupee, setIsCouponRupee] = useState(false);
  const [amountOnCouponCode, setAmountOnCouponCode] = useState();
  const [productDatas, setProductDatas] = useState([[]]);
  const [paymentMode, setPaymentMode] = useState("ONLINE");
  const productData = localStorage.getItem("productsData");
  const [isOpen, setIsOpen] = useState(false);
  const [mainPrice, setMainPrice] = useState();
  const canonicalUrl = window.location.href;
  const [discountCost, setDiscountCost] = useState(null);
  const [courierId, setCourierId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quickData, setQuickData] = useState({});
  const [manualCouponCode, setManualCouponCode] = useState("");
  const [manualCouponCodeData, setManualCouponCodeData] = useState("");
  const [autoDiscount, setAutoDiscount] = useState(0);
  const [totalCouponDiscount, setTotalCouponDiscount] = useState(0);
  const [autoCouponData, setAutoCouponData] = useState(null);
  const [orderUserData, setOrderUserData] = useState({
    username: "",
    email: "",
    pin_code: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "",
    mobile: "",
  });
  const stateData = [
    { stateName: "Andaman and Nicobar Islands", stateCode: "AN" },
    { stateName: "Andhra Pradesh", stateCode: "AP" },
    { stateName: "Arunachal Pradesh", stateCode: "AR" },
    { stateName: "Assam", stateCode: "AS" },
    { stateName: "Bihar", stateCode: "BI" },
    { stateName: "Chandigarh", stateCode: "CH" },
    { stateName: "Dadra and Nagar Haveli", stateCode: "DA" },
    { stateName: "Daman and Diu", stateCode: "DM" },
    { stateName: "Delhi", stateCode: "DE" },
    { stateName: "Goa", stateCode: "GO" },
    { stateName: "Gujarat", stateCode: "GU" },
    { stateName: "Haryana", stateCode: "HA" },
    { stateName: "Himachal Pradesh", stateCode: "HP" },
    { stateName: "Jammu and Kashmir", stateCode: "JA" },
    { stateName: "Karnataka", stateCode: "KA" },
    { stateName: "Kerala", stateCode: "KE" },
    { stateName: "Lakshadweep Islands", stateCode: "LI" },
    { stateName: "Madhya Pradesh", stateCode: "MP" },
    { stateName: "Maharashtra", stateCode: "MA" },
    { stateName: "Manipur", stateCode: "MN" },
    { stateName: "Meghalaya", stateCode: "ME" },
    { stateName: "Mizoram", stateCode: "MI" },
    { stateName: "Nagaland", stateCode: "NA" },
    { stateName: "Odisha", stateCode: "OD" },
    { stateName: "Puducherry", stateCode: "PO" },
    { stateName: "Punjab", stateCode: "PU" },
    { stateName: "Rajasthan", stateCode: "RA" },
    { stateName: "Sikkim", stateCode: "SI" },
    { stateName: "Tamil Nadu", stateCode: "TN" },
    { stateName: "Tripura", stateCode: "TR" },
    { stateName: "Uttar Pradesh", stateCode: "UP" },
    { stateName: "West Bengal", stateCode: "WB" },
    { stateName: "Telangana", stateCode: "TS" },
    { stateName: "Jharkhand", stateCode: "JH" },
    { stateName: "Uttarakhand", stateCode: "UK" },
    { stateName: "Chattisgarh", stateCode: "CG" },
    { stateName: "Ladakh", stateCode: "LA" },
  ];

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePaymentModeChange = (e) => {
    const selectedMode = e.target.value;
    setPaymentMode(selectedMode);
  };

  const UpdatedData = (productData) => {
    const data = JSON.parse(productData);
    const orderTotal = data.totalAmount;
    setProductDatas(data.products);
    setAmountOnCouponCode(orderTotal);

    let selectedAddToCartData = localStorage.getItem("selectedAddToCartData");
    selectedAddToCartData = JSON.parse(selectedAddToCartData);

    const totalDiscountPercentage = selectedAddToCartData
      .map((data) => {
        if (data && data.dis_point) {
          return parseInt(data.dis_point.replace("%", ""));
        }
        return 0; // or ignore if you want to skip these entries instead of counting zero
      })
      .reduce((sum, value) => sum + value, 0);

    const averageDiscount =
      totalDiscountPercentage / selectedAddToCartData.length;

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
      getUserData();
      UpdatedData(productData);
    }
  }, [productData]);

  useEffect(() => {
    const isLogin = localStorage.getItem("fg_group_user_authorization");
    if (!isLogin) {
      return openModal();
    }

    if (orderUserData.pin_code) {
      handleFormSubmit();
    }
  }, []);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const compareUserData = (updatedUserData) => {
    return (
      updatedUserData.pin_code === orderUserData.pin_code &&
      updatedUserData.address_line_1 === orderUserData.address_line_1 &&
      updatedUserData.address_line_2 === orderUserData.address_line_2 &&
      updatedUserData.city === orderUserData.city &&
      updatedUserData.email === orderUserData.email
    );
  };

  const handleFormSubmit = async (e) => {
    setLoading(true);
    e?.preventDefault();
    try {
      const updatedUserData = {
        pin_code: e.target.postalCode.value,
        address_line_1: e.target.officeName.value,
        address_line_2: e.target.roadName.value,
        city: e.target.city.value,
        state: e.target.state.value,
        country: e.target.country.value,
        email: e.target.email.value,
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
      };

      setOrderUserData(updatedUserData);
      if (!orderUserData.username) {
        await updateUserData(updatedUserData);
      } else if (!compareUserData(updatedUserData)) {
        await updateUserData(updatedUserData);
      }
      getEstimate(e.target.postalCode.value);
      toast.success("User Details save successfully.");
    } catch (error) {
      console.error("Error in handleFormSubmit:", error);
    }
    setLoading(false);
  };

  const handleOrderPayment = async () => {
    setLoading(true);
    try {
      const updatedUserData = {
        pin_code: orderUserData.pin_code,
        address_line_1: orderUserData.address_line_1,
        address_line_2: orderUserData.address_line_2,
        city: orderUserData.city,
        state: orderUserData.state,
        country: orderUserData.country,
        email: orderUserData.email,
        first_name: orderUserData.first_name,
        last_name: orderUserData.last_name,
        mobile: orderUserData.mobile,
      };
      const payment_mode = paymentMode;

      // if (totalCouponDiscount !== 0 && payment_mode === "Cash On Delivery") {
      //   Swal.fire({
      //     icon: "warning",
      //     title: "Notice",
      //     text: "Coupon is not available with Cash On Delivery. For discount offers, use Online Payment or remove the coupon.",
      //   });
      //   return;
      // }

      try {
        const coupon_ids = [manualCouponCodeData?._id].filter(Boolean);
        await createPaymentProduct(
          quickData && quickData?.id
            ? [{ product_id: quickData.id, quantity: 1 }]
            : productDatas,
          updatedUserData,
          coupon_ids,
          payment_mode,
          discountCost,
          courierId
        );
        localStorage.removeItem("appliedCoupon");
        localStorage.removeItem("productsData");
        localStorage.removeItem("allProductsData");
        localStorage.removeItem("addItemInCart");

        setManualCouponCode("");
        setManualCouponCodeData(null);
        setTotalCouponDiscount(0);
      } catch (error) {
        console.error("Error during order:", error);
      }
      window.Razorpay && window.Razorpay.close && window.Razorpay.close();
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error in handleFormSubmit:", error);
    }
    setLoading(false);
  };

  const updateUserData = async (data) => {
    try {
      await axiosInstance.post("/account/update-profile", data);
      getUserData();
    } catch (error) {
      console.error("Error in updateUserData:", error);
    }
  };

  useEffect(() => {
    const storedCoupon = localStorage.getItem("appliedCoupon");
    if (storedCoupon) {
      try {
        const parsedCoupon = JSON.parse(storedCoupon);
        handleApplyClick(parsedCoupon, { AutoPromoCode: true }); // 👈 Important
      } catch (e) {
        console.error("Invalid coupon data in localStorage", e);
        calculateDiscountedPrice(null);
      }
    } else {
      calculateDiscountedPrice(null);
    }
  }, [amountOnCouponCode, autoDiscount]);

  const handleApplyClick = async (appliedCoupon, PromoCode) => {
    try {
      if (PromoCode?.AutoPromoCode) {
        toast.success("Coupon applied successfully");
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
        });

        setManualCouponCode(appliedCoupon?.coupon_code || "");
        setManualCouponCodeData(appliedCoupon);
        calculateDiscountedPrice(appliedCoupon);
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
    const baseAmount =
      Number(amountOnCouponCode || 0) - Number(autoDiscount || 0);

    if (!couponData) {
      setTotalCouponDiscount(0);
      setMainPrice(baseAmount);
      return;
    }

    let discountAmount = 0;
    const discount = Number(couponData.discount || 0);

    if (couponData.discount_type === "rupees") {
      discountAmount = discount;
    } else if (couponData.discount_type === "percentage") {
      discountAmount = (baseAmount * discount) / 100;
    }

    discountAmount = Math.min(discountAmount, baseAmount);

    setTotalCouponDiscount(discountAmount);
    setMainPrice(Math.max(baseAmount - discountAmount, 0));
  };

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get("/account/profile");
      const userData = response.data.data;
      if (userData) {
        setOrderUserData({
          pin_code: userData.user?.address?.pin_code || "",
          address_line_1: userData.user?.address?.address_line_1 || "",
          address_line_2: userData.user?.address?.address_line_2 || "",
          city: userData.user?.address?.city || "",
          email: userData.user?.email || "",
          first_name: userData.user?.first_name || "",
          last_name: userData.user?.last_name || "",
          mobile: userData.user?.mobile || "",
          state: userData.user?.address?.state || "",
          country: userData.user?.address?.country || "",
        });
        getEstimate(userData.user?.address?.pin_code);
      }
    } catch (error) {
      console.error("Error in getUserData:", error);
    }
  };

  const getEstimate = async (pin_code) => {
    try {
      const allProductsData = localStorage.getItem("allProductsData");
      const cartProductData = JSON.parse(allProductsData);

      const totalProduct = cartProductData?.allProductsData.length;
      const oneKgProduct = cartProductData?.allProductsData.filter((data) =>
        data.name?.includes("1kg")
      );
      const twentyFiveGmProduct = cartProductData?.allProductsData.filter(
        (data) => !data.name?.includes("1kg")
      );

      let parcelSize = {
        breadth: 10,
        height: 15,
        length: 10,
        weight: 1050,
      };

      // 1 KG 1 product size
      if (totalProduct === 1 && oneKgProduct.length === 1) {
        parcelSize = {
          breadth: 10,
          height: 10,
          length: 15,
          weight: 1050,
        };
      }
      // 250 gm 1 product size
      if (totalProduct === 1 && twentyFiveGmProduct.length === 1) {
        parcelSize = {
          breadth: 10,
          height: 10,
          length: 15,
          weight: 300,
        };
      }
      // 1 KG and 250 gm less than 4 product size
      if (
        totalProduct !== 1 &&
        totalProduct <= 4 &&
        (oneKgProduct.length > 0 || twentyFiveGmProduct.length > 0)
      ) {
        let oneKgWeight = 0;
        let twentyFiveGmWeight = 0;
        if (oneKgProduct.length > 0) {
          oneKgWeight = oneKgProduct.length * 1000;
        }
        if (twentyFiveGmProduct.length > 0) {
          twentyFiveGmWeight = twentyFiveGmProduct.length * 250;
        }
        const weight = oneKgWeight + twentyFiveGmWeight + 50;
        parcelSize = {
          breadth: 23,
          height: 19,
          length: 30,
          weight: weight,
        };
      }
      // 1 KG and 250 gm more than 4 product size
      if (
        totalProduct !== 1 &&
        totalProduct > 4 &&
        (oneKgProduct.length > 0 || twentyFiveGmProduct.length > 0)
      ) {
        let oneKgWeight = 0;
        let twentyFiveGmWeight = 0;
        if (oneKgProduct.length > 0) {
          oneKgWeight = oneKgProduct.length * 1000;
        }
        if (twentyFiveGmProduct.length > 0) {
          twentyFiveGmWeight = twentyFiveGmProduct.length * 250;
        }
        const weight = oneKgWeight + twentyFiveGmWeight + 50;
        parcelSize = {
          breadth: 20,
          height: 30,
          length: 20,
          weight: weight,
        };
      }

      const payload = {
        ...parcelSize,
        destination_pincode: pin_code,
        origin_pincode: "394510",
        destination_country_code: "IN",
        origin_country_code: "IN",
        shipment_mode: "S",
        shipment_type:
          paymentMode === "ONLINE"
            ? "P"
            : paymentMode === "Cash On Delivery"
            ? "C"
            : "C",
        shipment_value: `${Math.round(mainPrice)}`,
      };

      const response = await axiosInstance.post(
        "/icarry/get-estimate",
        payload
      );

      const estimateData = response.data.data.estimate;
      const courierArray = Object.values(estimateData);

      const deliveryCouriers = courierArray.filter((data) =>
        data.courier_group_name?.includes("Delhivery")
      );

      let cheapCostData;

      if (deliveryCouriers.length > 0) {
        cheapCostData = deliveryCouriers.reduce((min, current) =>
          current.courier_cost < min.courier_cost ? current : min
        );
      } else {
        cheapCostData = courierArray.reduce((min, current) =>
          current.courier_cost < min.courier_cost ? current : min
        );
      }

      setDiscountCost(cheapCostData.courier_cost);
      setCourierId(cheapCostData.courier_id);
    } catch (error) {
      console.error("Error submitting pincode:", error);
    }
  };

  useEffect(() => {
    let quickProductData = localStorage.getItem("quickProductData");
    quickProductData = JSON.parse(quickProductData);

    if (quickProductData) {
      setQuickData(quickProductData);
      setMainPrice(parseInt(quickProductData?.discount));
    }
  }, []);

  const handleStateChange = (event) => {
    try {
      const state = event.target.value;
      if (state) {
        const result = lookup.lookup(state);
        if (result?.[0]) {
          setOrderUserData((prev) => ({
            ...prev,
            city: result[0].districtName,
            state: event.target.value,
            pin_code: result[0].pincode,
          }));
        }
      }
    } catch (error) {
      console.error("Error submitting state:", error);
    }
  };

  const handlePincodeChange = (event) => {
    try {
      const pincode = event.target.value;

      if (pincode.length === 6) {
        const result = lookup.lookup(pincode);
        if (result?.[0]) {
          const matchedStateName = result[0].stateName.trim().toLowerCase();

          const selectedStateData = stateData.find(
            (data) => data.stateName.toLowerCase() === matchedStateName
          );

          setOrderUserData((prev) => ({
            ...prev,
            city: result[0].districtName,
            state: selectedStateData?.stateCode || "",
          }));
        }
      }
    } catch (error) {
      console.error("Error submitting pincode:", error);
    }
  };

  const handleRemoveCoupon = () => {
    setManualCouponCode("");
    setManualCouponCodeData(null);
    setTotalCouponDiscount(0);
    setIsCouponRupee(false);
    setAutoCouponData(null);
    localStorage.removeItem("appliedCoupon");
    getUserData();
    UpdatedData(productData);
  };

  const [offers, setOffers] = useState([]);

  return (
    <>
      <Helmet>
        <title>Checkout at Pure Go - Secure & Fast Payment Options</title>
        <meta
          name="description"
          content="Complete your purchase at Pure Go with secure and fast checkout options. Hassle-free payment process for all your nutrition and supplement needs."
        />
        <meta
          name="keyword"
          content="bowelease  Constipation Relief, diet supplements near me, best multivitamins for men india, booster testosterone, how to fat burn, supplement shop near, whey isolate vs protein, whey protein vs whey protein isolate, women's protein powder for weight gain, protein powder for weight gain woman, which best peanut butter, nutrition in 100g oats, protein shakes for weight gain female"
        />
        <meta
          property="og:title"
          content="Checkout at Pure Go - Secure & Fast Payment Options"
        />
        <meta
          property="og:description"
          content="Complete your purchase at Pure Go with secure and fast checkout options. Hassle-free payment process for all your nutrition and supplement needs."
        />
        <meta
          property="og:url"
          content="https://www.purego.gomzilifesciences.in/nutrition/check-out"
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
            fbq('init', '580401698019006');
            fbq('track', 'PageView');
          `}
        </script>
        <noscript>
          {`<img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=580401698019006&ev=PageView&noscript=1"
          />`}
        </noscript>
      </Helmet>
      {showModal && <LoginModal onClose={closeModal} />}
      {loading && <LoadingComponent />}
      <NutritionHeader />
      <main className="main-area fix">
        <div className="checkout__area section-py-130">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="black-before">
                  <form
                    onSubmit={handleFormSubmit}
                    className="customer__form-wrap position-relative"
                  >
                    <span className="title">Billing Details</span>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-grp">
                          <label htmlFor="first-name">First name *</label>
                          <input
                            type="text"
                            id="first-name"
                            placeholder="Enter First Name"
                            name="first_name"
                            required
                            defaultValue={orderUserData.first_name}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-grp">
                          <label htmlFor="last-name">Last name *</label>
                          <input
                            type="text"
                            id="last-name"
                            placeholder="Enter Last Name"
                            name="last_name"
                            required
                            defaultValue={orderUserData.last_name}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-grp">
                      <label htmlFor="email">Email address *</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        name="email"
                        required
                        defaultValue={orderUserData.email}
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-grp">
                          <label htmlFor="street-address">
                            Street address *
                          </label>
                          <input
                            type="text"
                            id="street-address"
                            placeholder="House No/Building Name/Office Name"
                            name="officeName"
                            required
                            defaultValue={orderUserData.address_line_1}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-grp">
                          <label htmlFor="street-address-two">
                            Road Name/Area/Colony *
                          </label>
                          <input
                            type="text"
                            id="street-address-two"
                            placeholder="Road Name/Area/Colony"
                            name="roadName"
                            required
                            defaultValue={orderUserData.address_line_2}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-grp">
                          <label htmlFor="pincode">Pincode *</label>
                          <input
                            type="text"
                            id="pincode"
                            placeholder="PinCode"
                            name="postalCode"
                            required
                            maxLength="6"
                            defaultValue={orderUserData.pin_code}
                            onChange={handlePincodeChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-grp">
                          <label htmlFor="town-name">City *</label>
                          <input
                            type="text"
                            id="town-name"
                            placeholder="City"
                            name="city"
                            required
                            disabled
                            defaultValue={orderUserData.city}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-grp">
                          <label htmlFor="district-name">State *</label>
                          <select
                            id="state"
                            name="state"
                            required
                            value={orderUserData.state}
                            onChange={(e) => handleStateChange(e)}
                          >
                            <option value="select">Select State</option>
                            <option value="AN">
                              Andaman and Nicobar Islands
                            </option>
                            <option value="AP">Andhra Pradesh</option>
                            <option value="AR">Arunachal Pradesh</option>
                            <option value="AS">Assam</option>
                            <option value="BI">Bihar</option>
                            <option value="CH">Chandigarh</option>
                            <option value="DA">Dadra and Nagar Haveli</option>
                            <option value="DM">Daman and Diu</option>
                            <option value="DE">Delhi</option>
                            <option value="GO">Goa</option>
                            <option value="GU">Gujarat</option>
                            <option value="HA">Haryana</option>
                            <option value="HP">Himachal Pradesh</option>
                            <option value="JA">Jammu and Kashmir</option>
                            <option value="KA">Karnataka</option>
                            <option value="KE">Kerala</option>
                            <option value="LI">Lakshadweep Islands</option>
                            <option value="MP">Madhya Pradesh</option>
                            <option value="MA">Maharashtra</option>
                            <option value="MN">Manipur</option>
                            <option value="ME">Meghalaya</option>
                            <option value="MI">Mizoram</option>
                            <option value="NA">Nagaland</option>
                            <option value="OD">Odisha</option>
                            <option value="PO">Puducherry</option>
                            <option value="PU">Punjab</option>
                            <option value="RA">Rajasthan</option>
                            <option value="SI">Sikkim</option>
                            <option value="TN">Tamil Nadu</option>
                            <option value="TR">Tripura</option>
                            <option value="UP">Uttar Pradesh</option>
                            <option value="WB">West Bengal</option>
                            <option value="TS">Telangana</option>
                            <option value="JH">Jharkhand</option>
                            <option value="UK">Uttarakhand</option>
                            <option value="CG">Chattisgarh</option>
                            <option value="LA">Ladakh</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-grp">
                          <label htmlFor="country-name">
                            Country / Region *
                          </label>
                          <input
                            type="text"
                            id="country"
                            placeholder="Enter Country"
                            name="country"
                            required
                            defaultValue={orderUserData.country}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mt-3">
                        <button
                          onClick={() => {
                            if (paymentMode) {
                              document.querySelector("form").requestSubmit();
                            } else {
                              Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: "Please select a payment method.",
                              });
                            }
                          }}
                          className="cart-btn w-100 m-0"
                        >
                          Save &amp; Continue
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="col-12 d-none">
                  <div className="order__info-wrap mb-3">
                    <div className="br-15">
                      <h2 className="promo-title">Apply Promo Code</h2>
                      <div className="d-lg-block d-none">
                        <div className="row flex-md-row flex-column mt-3 align-items-center justify-content-between">
                          <div className="col-md-8 ps-0 pe-md-2 pe-0">
                            <input
                              type="text"
                              placeholder="Enter Coupon Code"
                              className="form-control apply-form"
                              value={manualCouponCode}
                              disabled={!!manualCouponCodeData}
                              onChange={(e) =>
                                setManualCouponCode(e.target.value)
                              }
                              maxLength="100"
                            />
                          </div>
                          <div className="col-md-4 ps-md-2 ps-0 pe-0 mt-md-0 mt-3">
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
                              >
                                Apply
                              </button>
                            )}
                          </div>
                          <div className="col-12 text-center mt-3">
                            <p
                              className="m-0 d-inline-block text-primary"
                              style={{ cursor: "pointer" }}
                              onClick={() => setShowCouponModal(true)}
                            >
                              View Coupons
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-lg-none d-block">
                        <div className="col-md-8 ps-0 pe-md-2 pe-0">
                          <input
                            type="text"
                            placeholder="Enter Coupon Code"
                            className="form-control apply-form"
                            value={manualCouponCode}
                            disabled={!!manualCouponCodeData}
                            onChange={(e) =>
                              setManualCouponCode(e.target.value)
                            }
                            maxLength="100"
                          />
                        </div>
                        <div className="col-md-4 ps-md-2 ps-0 pe-0 mt-md-0 mt-3">
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
                            >
                              Apply
                            </button>
                          )}
                        </div>
                        <div className="col-12 text-center mt-3">
                          <p
                            className="m-0 d-inline-block text-primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowCouponModal(true)}
                          >
                            View Coupons
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Modal
                    show={showCouponModal}
                    onHide={() => setShowCouponModal(false)}
                    centered
                    size="md"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Offers & Benefits</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {offers.map((offer, idx) => (
                        <Card key={idx} className="mb-3">
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="me-2">
                                <div className="fw-bold">
                                  Code: {offer.code}
                                </div>
                                <div>{offer.description}</div>
                                {offer.note && (
                                  <div className="text-danger small">
                                    {offer.note}
                                  </div>
                                )}
                              </div>
                              <button
                                className="popup-btn"
                                onClick={() => {
                                  setManualCouponCode(offer.code);
                                  setShowCouponModal(false);
                                  handleApplyClick(offer, {
                                    AutoPromoCode: true,
                                  });
                                }}
                              >
                                Apply
                              </button>
                            </div>
                          </Card.Body>
                        </Card>
                      ))}
                    </Modal.Body>
                  </Modal>
                </div>
                <div className="col-12">
                  <div className="order__info-wrap">
                    <h2 className="title">YOUR ORDER</h2>
                    <ul className="list-wrap">
                      <li className="title text-dark">
                        Product <span>Subtotal</span>
                      </li>

                      <li>
                        Order Total{" "}
                        <span>
                          ₹
                          {amountOnCouponCode
                            ? amountOnCouponCode.toFixed(2)
                            : "0.00"}{" "}
                          /-
                        </span>
                      </li>

                      {autoDiscount !== 0 && (
                        <li>
                          Discount ({amountOnCouponCode < 2000 ? "25%" : "50%"}){" "}
                          <span className="text-danger">
                            - ₹{autoDiscount ? autoDiscount.toFixed(2) : "0.00"}{" "}
                            /-
                          </span>
                        </li>
                      )}

                      {totalCouponDiscount !== 0 && (
                        <li>
                          Coupon Discount{" "}
                          {!isCouponRupee &&
                            `(${Math.round(
                              autoCouponData?.discount || 0
                            )}%)`}{" "}
                          <span className="text-danger">
                            - ₹{totalCouponDiscount.toFixed(2)} /-
                          </span>
                        </li>
                      )}

                      <li>
                        Delivery Charges{" "}
                        <span className="text-success">
                          {discountCost !== undefined && discountCost !== null
                            ? `+ ₹${parseFloat(discountCost).toFixed(2)} /-`
                            : "Enter Pincode /-"}
                        </span>
                      </li>

                      <li className="text-dark">
                        Amount Payable{" "}
                        <span>
                          ₹
                          {mainPrice !== undefined && mainPrice !== null
                            ? discountCost
                              ? (mainPrice + parseFloat(discountCost)).toFixed(
                                  2
                                )
                              : mainPrice.toFixed(2)
                            : "0.00"}{" "}
                          /-
                        </span>
                      </li>
                    </ul>

                    <div className="br-15 mb-3">
                      <div className=" bg-white pt-2">
                        <div>
                          <span className="f-rob-bol f-16 text-uppercase text-secondary">
                            <i className="fas fa-check-circle me-2"></i>
                            SELECT PAYMENT MODE
                          </span>
                        </div>
                      </div>
                      <div className="py-3">
                        <div className="row">
                          <div className="col-12">
                            <div className="checkbox-wrapper-16">
                              <label className="checkbox-wrapper mx-2">
                                <input
                                  type="radio"
                                  className="checkbox-input"
                                  name="paymentMode"
                                  value="Cash On Delivery"
                                  checked={paymentMode === "Cash On Delivery"}
                                  onChange={handlePaymentModeChange}
                                />
                                <span className="checkbox-tile">
                                  <span className="checkbox-icon">
                                    <img
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/assets/images/loan.png"
                                      }
                                      className="border-radius-20"
                                      width="32px"
                                      alt="fggroup"
                                    />
                                  </span>
                                  <span className="checkbox-label">COD</span>
                                </span>
                              </label>

                              <label className="checkbox-wrapper mx-2">
                                <input
                                  type="radio"
                                  className="checkbox-input"
                                  name="paymentMode"
                                  value="ONLINE"
                                  checked={paymentMode === "ONLINE"}
                                  onChange={handlePaymentModeChange}
                                />
                                <span className="checkbox-tile">
                                  <span className="checkbox-icon">
                                    <img
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/assets/images/cashless-payment.webp"
                                      }
                                      className="border-radius-20"
                                      width="32px"
                                      alt="fggroup"
                                    />
                                  </span>
                                  <span className="checkbox-label">Online</span>
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="inner-shop-perched-info mt-3">
                      <button
                        onClick={() => {
                          handleOrderPayment();
                        }}
                        className="cart-btn w-100 m-0"
                      >
                        SAVE &amp; PAY
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default CheckOut;
