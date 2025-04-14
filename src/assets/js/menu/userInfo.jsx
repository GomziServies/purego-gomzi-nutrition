import React, { useEffect, useState } from "react";
import LoginModal from "../popup/login";
import { axiosInstance } from "../config/api";
import { toast } from "react-toastify";

const UserInfo = ({ cartCount }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const authorization = localStorage.getItem("fg_group_user_authorization");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const logout = () => {
    localStorage.removeItem("fg_group_user_authorization");
    localStorage.removeItem("user_info");
    localStorage.clear();
    setUserInfo(null);
    toast.success("Successfully Logout!");
  };

  const toggleUserMenu = () => {
    setIsUserMenuVisible(!isUserMenuVisible);
  };

  const http_getProfile = async () => {
    try {
      const response = await axiosInstance.get("/account/profile");
      setUserInfo(response.data.data);
      localStorage.setItem("user_info", JSON.stringify(response.data.data));
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    const user_info = localStorage.getItem("user_info");
    if (authorization && !user_info) {
      const fetchProfile = async () => {
        try {
          await http_getProfile();
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      fetchProfile();
    } else {
      setUserInfo(JSON.parse(user_info));
    }
  }, [authorization]);

  return (
    <div>
      {userInfo ? (
        <>
          <li
            className="mb-1"
            onClick={toggleUserMenu}
            style={{ cursor: "pointer" }}
          >
            Hi, {userInfo.user.last_name} <i className="far fa-user"></i>
          </li>
          <li className="mx-0">
            <a href="/add-to-cart" aria-label="Fg Group">
              {/* <img
                src={process.env.PUBLIC_URL + "/assets/images/cart-img.webp"}
                width="21px"
                alt="Cart"
                className="mb-1"
              /> */}
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
            </a>
          </li>
          {isUserMenuVisible && (
            <ul>
              <li>
                <a href={`/user/profile`}>
                  <i className="far fa-user"></i> Profile
                </a>
              </li>
              <li className="me-0">
                <a href={`/user/order`}>
                  <i
                    className="fas fa-box me-1"
                    style={{ fontSize: "18px" }}
                  ></i>
                  Orders
                </a>
              </li>
              <li onClick={logout}>
                <button className="video-button-bg p-0">
                  <i className="fas fa-sign-out-alt"></i> Log Out
                </button>
              </li>
            </ul>
          )}
        </>
      ) : (
        <li style={{ fontSize: "18px" }} className="ddmenu userInfo">
          <button
            onClick={openModal}
            style={{ cursor: "pointer" }}
            className=" video-button-bg px-0"
          >
            {" "}
            Login <i className="far fa-user ml-1"></i>
          </button>
          {showModal && <LoginModal onClose={closeModal} />}
        </li>
      )}
    </div>
  );
};

export default UserInfo;
