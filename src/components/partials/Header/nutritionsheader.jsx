import React from "react";
import UserInfo from "../../../assets/js/menu/userInfo";
import MobileUserInfo from "../../../assets/js/menu/mobileUserInfo";
import { Link } from "react-router-dom";

function NutritionHeader() {
  function openside() {
    document.getElementById("demo").style.width = "100%";
  }

  function sideclose() {
    document.getElementById("demo").style.width = "0px";
  }

  return (
    <>
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
            <li>
              <Link to="#">
                Help
                <i className="far fa-life-ring ml-2"></i>
              </Link>
            </li>
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
          <Link to="/user/order">
            <div className="cart-btnn">
              <div id="ex4">
                <span className="p1" data-count="4">
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
            <UserInfo />
          </ul>
        </div>
      </div>
    </>
  );
}

export default NutritionHeader;
