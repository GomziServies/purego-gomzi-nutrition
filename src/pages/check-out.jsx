import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet";
import { axiosInstance } from "../assets/js/config/api";
import { createPaymentProduct } from "../assets/js/utils/product";
import NutritionHeader from "../components/partials/Header/nutritionsheader";
import LoginModal from "../assets/js/popup/login";
import LoadingComponent from "../components/loadingComponent";

function CheckOut() {
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
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    pin_code: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "",
  });
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
    const isLogin = localStorage.getItem('fg_group_user_authorization')
    if(!isLogin){
      return openModal()
    }
  }, []);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const compareUserData = (updatedUserData) => {
    return (
      updatedUserData.pin_code === userData.pin_code &&
      updatedUserData.address_line_1 === userData.address_line_1 &&
      updatedUserData.address_line_2 === userData.address_line_2 &&
      updatedUserData.city === userData.city &&
      updatedUserData.email === userData.email
    );
  };

  const handleFormSubmit = async (e) => {
    setLoading(true)
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
      const payment_mode = paymentMode;
      if (!userData.username) {
        await updateUserData(updatedUserData);
      } else if (!compareUserData(updatedUserData)) {
        await updateUserData(updatedUserData);
      }
      try {
        const coupon_ids = [prepaidCouponCode._id].filter(Boolean);
        await createPaymentProduct(
          item_id
            ? [{ product_id: "670a5a7b9a7dbcdce616398d", quantity: 1 }]
            : productDatas,
          updatedUserData,
          coupon_ids,
          payment_mode
        );
      } catch (error) {
        console.error("Error during order:", error);
      }
      window.Razorpay && window.Razorpay.close && window.Razorpay.close();
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error in handleFormSubmit:", error);
    }
    setLoading(false)
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
        setUserData({
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
      }
    } catch (error) {
      console.error("Error in getUserData:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Checkout at Pure Go - Secure & Fast Payment Options
        </title>
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
      </Helmet>
      {showModal && <LoginModal onClose={closeModal} />}
      {loading && <LoadingComponent />}
      <NutritionHeader />
      <main className="main-area fix">
        <div className="checkout__area section-py-130">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <form
                  onSubmit={handleFormSubmit}
                  className="customer__form-wrap"
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
                          defaultValue={userData.first_name}
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
                          defaultValue={userData.last_name}
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
                      defaultValue={userData.email}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="street-address">Street address *</label>
                        <input
                          type="text"
                          id="street-address"
                          placeholder="House No/Building Name/Office Name"
                          name="officeName"
                          required
                          defaultValue={userData.address_line_1}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="street-address">
                          Road Name/Area/Colony *
                        </label>
                        <input
                          type="text"
                          id="street-address-two"
                          placeholder="Road Name/Area/Colony"
                          name="roadName"
                          required
                          defaultValue={userData.address_line_2}
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
                          defaultValue={userData.city}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="district-name">State *</label>
                        <input
                          type="text"
                          id="state"
                          placeholder="Enter State Name"
                          name="state"
                          required
                          defaultValue={userData.state}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="country-name">Country / Region *</label>
                        <input
                          type="text"
                          id="country"
                          placeholder="Enter Country"
                          name="country"
                          required
                          defaultValue={userData.country}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-grp">
                        <label htmlFor="zip-code">PostalCode *</label>
                        <input
                          type="text"
                          id="postalCode"
                          placeholder="Postal Code"
                          name="postalCode"
                          required
                          maxLength="6"
                          defaultValue={userData.pin_code}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-5">
                <div className="order__info-wrap">
                  <h2 className="title">YOUR ORDER</h2>
                  <ul className="list-wrap">
                    <li className="title text-dark">
                      Product <span>Subtotal</span>
                    </li>
                    <li>
                      Order Total{" "}
                      <span>₹{Math.round(mainPrice).toFixed(2)}</span>
                    </li>
                    {totalDiscount !== 0 && (
                      <li>
                        Discount{" "}
                        <span>
                          -{" "}
                          {totalDiscount !== undefined && totalDiscount !== null
                            ? totalDiscount
                            : 0}
                          %
                        </span>
                      </li>
                    )}
                    <li>
                      Delivery Charges{" "}
                      <span>₹{mainPrice <= 499 ? 85 : "FREE"}</span>
                    </li>
                    <li className="text-dark">
                      Amount Payable{" "}
                      <span>
                        ₹
                        {mainPrice <= 499
                          ? mainPrice + 85
                          : Math.round(mainPrice)}
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
                                checked
                                className="checkbox-input"
                                name="paymentMode"
                                value="ONLINE"
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
                                <p className="offer-label">Free Consultation</p>
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
                      SAVE &amp; PAY
                    </button>
                  </div>
                  {/* <button className="btn btn-sm">Place order</button> */}
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
