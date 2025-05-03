import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet";
import { axiosInstance } from "../assets/js/config/api";
import { createPaymentProduct } from "../assets/js/utils/product";
import NutritionHeader from "../components/partials/Header/nutritionsheader";
import LoginModal from "../assets/js/popup/login";
import LoadingComponent from "../components/loadingComponent";

function MedicineCheckOut() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const item_id = searchParams.get("item_id");
  const [totalPrice, setTotalPrice] = useState();
  const [productDatas, setProductDatas] = useState([[]]);
  const [paymentMode, setPaymentMode] = useState("ONLINE");
  const productData = localStorage.getItem("productsData");
  const [isOpen, setIsOpen] = useState(false);
  const [mainPrice, setMainPrice] = useState();
  const canonicalUrl = window.location.href;
  const [prepaidCouponCode, setPrepaidCouponCode] = useState({});
  const [orderUserData, setOrderUserData] = useState({
    username: "",
    email: "",
    pin_code: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "",
  });
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [discountCost, setDiscountCost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePaymentModeChange = (e) => {
    const selectedMode = e.target.value;
    setPaymentMode(selectedMode);

    if (selectedMode === "ONLINE") {
      setPrepaidCouponCode({ discount: 0 });
    } else if (selectedMode === "Cash On Delivery") {
      setPrepaidCouponCode({ discount: 0 });
      setMainPrice(totalPrice);
      removePromoCode("GOMZI5", "COD");
    }
  };

  const UpdatedData = (productData) => {
    const data = JSON.parse(productData);
    setMainPrice(data.totalAmount);
    setProductDatas(data.products);
    setTotalPrice(data.totalAmount);
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
    e.preventDefault();
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
      };
      const payment_mode = paymentMode;

      try {
        const coupon_ids = [prepaidCouponCode._id].filter(Boolean);
        await createPaymentProduct(
          item_id
            ? [{ product_id: "670a5a7b9a7dbcdce616398d", quantity: 1 }]
            : productDatas,
          updatedUserData,
          coupon_ids,
          payment_mode,
          discountCost
        );
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

  const removePromoCode = (code, action) => {
    if (action === "COD") {
      calculateDiscountedPrice({ discount: 0 }, "COD");
    } else {
      calculateDiscountedPrice({ discount: 0 }, "remove");
    }
    if (code !== "GOMZI5") {
      window.location.reload();
    }
  };

  const calculateDiscountedPrice = (couponData, action) => {
    let discountAmount = 0;
    let prepaidDiscount;
    if (action === "COD") {
      prepaidDiscount = 0;
    } else {
      prepaidDiscount = prepaidCouponCode.discount || 0;
    }

    const latestDiscount = couponData.discount || 0;
    const totalDiscount = prepaidDiscount + latestDiscount;
    discountAmount += (totalPrice * totalDiscount) / 100;

    const discountedPrice = totalPrice - discountAmount;
    setMainPrice(discountedPrice > 0 ? discountedPrice : totalPrice);
    setTotalDiscount(totalDiscount);
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
      const payload = {
        length: 10,
        breadth: 10,
        height: 25,
        weight: 1000,
        destination_pincode: pin_code,
        origin_pincode: "395004",
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
        "/insights/icarry/get-estimate",
        payload
      );

      const estimateData = response.data.data.estimate;
      const courierArray = Object.values(estimateData);

      const deliveryCouriers = courierArray.filter((data) =>
        data.courier_group_name.includes("Delhivery")
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
    } catch (error) {
      console.error("Error submitting pincode:", error);
    }
  };

  // useEffect(() => {
  //   getEstimate();
  // }, []);

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
      {showModal && <LoginModal onClose={closeModal} />}
      {loading && <LoadingComponent />}
      {/* <NutritionHeader /> */}
      <main className="main-area fix">
        <div className="checkout__area section-py-130">
          <div className="container">
            <div className="row">
              <div className="col"></div>
              <div className="col-lg-10">
                <div className="black-before">
                  <form
                    onSubmit={handleFormSubmit}
                    className="customer__form-wrap position-relative"
                  >
                    <span className="title">Personal Details</span>
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
                    <div className="row">
                      <div className="col-12">
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
                      </div>
                      <div className="col-12">
                        <div className="form-grp">
                          <label htmlFor="street-address-two">
                            Your Disease *
                          </label>
                          <textarea
                            type="text"
                            id="street-address-two"
                            placeholder="Your Disease"
                            name="roadName"
                            required
                            // defaultValue={orderUserData.address_line_2}
                          />
                        </div>
                      </div>
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
                          <label htmlFor="town-name">City *</label>
                          <input
                            type="text"
                            id="town-name"
                            placeholder="City"
                            name="city"
                            required
                            defaultValue={orderUserData.city}
                          />
                        </div>
                      </div>
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
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col"></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MedicineCheckOut;
