import React, { useEffect, useState } from "react";
import UserInfo from "../../../assets/js/menu/userInfo";
import MobileUserInfo from "../../../assets/js/menu/mobileUserInfo";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../assets/js/config/api";
import LogoComponent from "../../logoComponent";

function NutritionHeader({
  productDataGet,
  cartItemName,
  cartDataClick,
  handleCartOpen,
  changeATC,
  handleChangeATC,
}) {
  function openside() {
    document.getElementById("demo").style.width = "100%";
  }

  function sideclose() {
    document.getElementById("demo").style.width = "0px";
  }

  const [cartCount, setCartCount] = useState(0);

  const fetchProductData = async () => {
    try {
      const response = await axiosInstance.get(
        "/order-cart/get-carts?item_type=PURE_GO_MEAL_PRODUCT&is_purchase=true"
      );
      const cartData = response.data.data[0];
      setCartCount(cartData.items.length);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("fg_group_user_authorization");
    if (isLogin) {
      fetchProductData();
    }
  }, [productDataGet, cartItemName, cartDataClick]);

  useEffect(() => {
    const isLogin = localStorage.getItem("fg_group_user_authorization");
    
    if (isLogin) {
      fetchProductData();
    }
  }, []);

  useEffect(() => {
    const isLogin = localStorage.getItem("fg_group_user_authorization");
    
    if (isLogin && changeATC) {
      handleChangeATC()
    }
  }, [changeATC]);

  useEffect(() => {
    let quickProductData = localStorage.getItem("quickProductData");
    quickProductData = JSON.parse(quickProductData);
    const currentURL = window.location.href;

    if (quickProductData && !currentURL.includes("check-out")) {
      localStorage.removeItem("quickProductData");
    }
  }, []);

  return (
    <>
      <LogoComponent />
      <div className="container-fluid offer-main bg-yellow p-0 m-0 d-flex align-items-center">
        <marquee className="text-white py-2">
          🛍️ If your order is above ₹2000, you get a 25% OFF! 💸💥 But wait...
          If your order is ₹2000 or less, enjoy a massive 50% OFF! 🔥🤑 | 💸🛍️
          Enjoy exclusive customer support, Monday to Friday, 11 AM to 5 PM! 📞
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; 🛍️ If your order is above ₹2000, you get a 25%
          OFF! 💸💥 But wait... If your order is ₹2000 or less, enjoy a massive
          50% OFF! 🔥🤑 | 💸🛍️ Enjoy exclusive customer support, Monday to
          Friday, 11 AM to 5 PM! 📞 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 🛍️ If your order is above
          ₹2000, you get a 25% OFF! 💸💥 But wait... If your order is ₹2000 or
          less, enjoy a massive 50% OFF! 🔥🤑 | 💸🛍️ Enjoy exclusive customer
          support, Monday to Friday, 11 AM to 5 PM! 📞 &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; 🛍️ If your order is above ₹2000, you get a 25% OFF! 💸💥
          But wait... If your order is ₹2000 or less, enjoy a massive 50% OFF!
          🔥🤑 | 💸🛍️ Enjoy exclusive customer support, Monday to Friday, 11 AM
          to 5 PM! 📞 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; 🛍️ If your order is above ₹2000, you get a
          25% OFF! 💸💥 But wait... If your order is ₹2000 or less, enjoy a
          massive 50% OFF! 🔥🤑 | 💸🛍️ Enjoy exclusive customer support, Monday
          to Friday, 11 AM to 5 PM! 📞 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 🛍️ If your order is above
          ₹2000, you get a 25% OFF! 💸💥 But wait... If your order is ₹2000 or
          less, enjoy a massive 50% OFF! 🔥🤑 | 💸🛍️ Enjoy exclusive customer
          support, Monday to Friday, 11 AM to 5 PM! 📞
        </marquee>
      </div>
      <div className="container-fluid main p-0 m-0">
        <div className="d-lg-block d-none log-new">
          <Link to="/">
            <div>
              <img
                src={
                  process.env.PUBLIC_URL + "../assets/images/nutrition-logo.png"
                }
                width="100%"
                alt="Fg Group"
              />
            </div>
          </Link>
        </div>
        <div className="d-lg-none d-sm-block t0 log1-new">
          <Link to="/">
            <div>
              <img
                src={
                  process.env.PUBLIC_URL + "../assets/images/nutrition-logo.png"
                }
                width="100%"
                alt="Fg Group"
              />
            </div>
          </Link>
        </div>
        <div className="lang"></div>
        <div className="side" id="demo">
          <span className="closebtn" onClick={sideclose}>
            ×
          </span>
          <Link
            to="/nutrition"
            style={{ marginTop: "50px", marginBottom: "30px" }}
          >
            <img
              className="lazy"
              src={
                process.env.PUBLIC_URL + "../assets/images/nutrition-logo.png"
              }
              width="40%"
              alt="Fg Group"
            />
          </Link>
          <ul className="mobileUserInfo aa">
            <MobileUserInfo />
          </ul>
        </div>
        <span
          className="d-lg-none d-sm-block btnn"
          style={{ cursor: "pointer", fontSize: 20, color: "black" }}
          onClick={openside}
        >
          ☰
        </span>
        <div className="d-lg-none d-sm-block mt-4">
          <Link to="/add-to-cart">
            <div className="cart-btnn">
              <div id="ex4">
                <span className="p1" data-count={cartCount}>
                  <img
                    src={
                      process.env.PUBLIC_URL + "../assets/images/cart-img.webp"
                    }
                    width="28px"
                    alt="Fg Group"
                  />
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div className="login d-lg-block d-none">
          <ul>
            <UserInfo cartCount={cartCount} handleCartOpen={handleCartOpen} />
          </ul>
        </div>
      </div>
    </>
  );
}

export default NutritionHeader;
