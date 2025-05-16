import React, { useState } from "react";
import { axiosInstance } from "../assets/js/config/api";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";

const Features = ({ USPData, removeUSP, openModal }) => {
  const [pincode, setPincode] = useState(null);
  const [pincodeAvailable, setPincodeAvailable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPincode, setIsPincode] = useState(false);

  const searchPincode = async () => {
    const isLogin = localStorage.getItem("fg_group_user_authorization");
    if (!isLogin) {
      return openModal();
    }
    setLoading(true);
    if (!pincode || pincode.length === 0) {
      setPincodeAvailable(null);
      setIsPincode(true);
    }
    try {
      const payload = {
        pincode: pincode,
      };
      const response = await axiosInstance.post(
        "/icarry/check-pincode",
        payload
      );

      const data = response.data;

      if (data.data.msg[0].cod === "Y") {
        // toast.success("Success! Your city is available for delivery.");
        setPincodeAvailable("success");
      } else if (data.data.msg[0].cod === "N") {
        setPincodeAvailable("error");
        // toast.error(
        //   "Sorry, your city is currently not available for delivery."
        // );
      }
    } catch (error) {
      console.error("Error submitting pincode:", error);
      toast.error("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className={`row border-top pt-4 mt-3 position-relative  ${
          pincodeAvailable === "success" || pincodeAvailable === "error"
            ? "pb-0 mb-0"
            : "pb-3"
        }`}
      >
        <div className="col-12 pt-1">
          <label className="delivery-label">Check Delivery Pincode</label>
          <div className="d-flex">
            <input
              type="text"
              className="delivery-input w-100"
              placeholder="Enter Delivery Pincode"
              onChange={(e) => setPincode(e.target.value)}
              maxLength={6}
            />
            <button
              className="cart-btn delivery-btn m-0"
              onClick={searchPincode}
            >
              Check
            </button>
          </div>
          {loading && (
            <div id="pincode_loader">
              <div className="tg-cube-grid pincode">
                <div className="tg-cube tg-cube1"></div>
                <div className="tg-cube tg-cube2"></div>
                <div className="tg-cube tg-cube3"></div>
                <div className="tg-cube tg-cube4"></div>
                <div className="tg-cube tg-cube5"></div>
                <div className="tg-cube tg-cube6"></div>
                <div className="tg-cube tg-cube7"></div>
                <div className="tg-cube tg-cube8"></div>
                <div className="tg-cube tg-cube9"></div>
              </div>
            </div>
          )}
          {pincodeAvailable === "success" ? (
            <p className="mt-2 mb-0 text-yellow fw-bold">
              <i class="fa-solid fa-circle-check"></i> Your area is available
              for delivery.
            </p>
          ) : pincodeAvailable === "error" ? (
            <p className="mt-2 mb-0 text-danger fw-bold">
              <i class="fa-solid fa-circle-xmark"></i> Sorry, your area is
              currently not available for delivery.
            </p>
          ) : isPincode ? (
            <p className="mt-2 mb-0 text-danger fw-bold">
              <i class="fa-solid fa-circle-xmark"></i> Enter Your Delivery Pincode.
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="row border-top pt-3 mt-md-4 mt-3 mx-0">
        <div className="col-4 feature-review p-md-2 px-1 text-center">
          <ReactPlayer
            url={`https://files.fggroup.in/production/files/FILE-review-1-cc182fc2-49ad-4065-b49d-45dcb183b5ed.mp4`}
            width="100%"
            height="auto"
            className="how-to-make-stap-video"
            playing
            loop
            muted
            playsinline
          />
        </div>
        <div className="col-4 feature-review p-md-2 px-1 text-center">
          <ReactPlayer
            url={`https://files.fggroup.in/production/files/FILE-review-2-90f182da-71cb-439a-9e26-60221ea49cbf.mp4`}
            width="100%"
            height="auto"
            className="how-to-make-stap-video"
            playing
            loop
            muted
            playsinline
          />
        </div>
        <div className="col-4 feature-review p-md-2 px-1 text-center">
          <ReactPlayer
            url={`https://files.fggroup.in/production/files/FILE-review-3-ed20c58d-7e0b-481d-b077-90695ff55337.mp4`}
            width="100%"
            height="auto"
            className="how-to-make-stap-video"
            playing
            loop
            muted
            playsinline
          />
        </div>
      </div>
      <div className="row border-top pt-3 mt-4 mx-0">
        <div className="col-md-3 shipping p-2 text-center col-6">
          <div className="box">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/fast-delivery.png"}
              alt="img"
              width="45px"
            />
            <h4 className="box-title d-md-block d-none">Fast delivery</h4>
            <h4 className="box-title d-md-none d-block">
              Fast <br /> delivery
            </h4>
          </div>
        </div>
        <div className="col-md-3 shipping p-2 text-center col-6">
          <div className="box">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/original.png"}
              alt="img"
              width="45px"
            />
            <h4 className="box-title d-md-block d-none">100% Authentic</h4>
            <h4 className="box-title d-md-none d-block">
              100% <br /> Authentic
            </h4>
          </div>
        </div>
        <div className="col-md-3 shipping p-2 text-center col-6">
          <div className="box">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/return.png"}
              alt="img"
              width="45px"
            />
            <h4 className="box-title d-md-block d-none">Return & refund</h4>
            <h4 className="box-title d-md-none d-block">
              Return & <br /> refund
            </h4>
          </div>
        </div>
        <div className="col-md-3 shipping p-2 text-center col-6">
          <div className="box">
            <img
              src={
                process.env.PUBLIC_URL + "/assets/images/cash-on-delivery.png"
              }
              alt="img"
              width="45px"
            />
            <h4 className="box-title d-md-block d-none">Cash on delivery</h4>
            <h4 className="box-title d-md-none d-block">
              Cash on <br /> delivery
            </h4>
          </div>
        </div>
      </div>
      {removeUSP ? (
        ""
      ) : (
        <div className="row border-top pt-3 mt-4 mx-0">
          <div className="col-12 return-policy-main px-2">
            <div className="mt-3 editor-text">
              <h4 className="d-inline-block f-rob-med f-14">
                <i
                  className="fas fa-check-circle right me-2"
                  style={{ fontSize: "24px", color: "#86c33a" }}
                ></i>
                100% Authentic
              </h4>
              <ul className="list-unstyled mb-0">
                <li className="d-block mb-0">
                  <div className="mb-2 ql-editor descriptionShow text-secondary">
                    {USPData?.map((data) => {
                      return (
                        <p className="ql-align-justify mb-1">
                          <b className="text-secondary">{data?.title}</b>{" "}
                          {data?.description}
                        </p>
                      );
                    })}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="border-top pt-4 mt-3 pb-3">
        <div className="offer-main-box">
          <label className="delivery-label">Offers</label>
          <div className="row pt-1 px-0">
            <div className="col-md-12 my-2 shipping text-center p-0">
              <div className="offer-box mx-2 px-3">
                <h4 className="box-title m-0 text-start me-2 text-danger">
                  Cashback :{" "}
                  <span className="offer-desc">
                    Get GST invoice and save up to 28% on business purchGet GST
                    invoice and save up to 28% on business purchGet GST invoice
                    and save up to 28% on business purch...
                  </span>
                </h4>
              </div>
            </div>
            <div className="col-md-12 my-2 shipping text-center p-0">
              <div className="offer-box mx-2 px-3">
                <h4 className="box-title m-0 text-start me-2 text-danger">
                  Bank Offer :{" "}
                  <span className="offer-desc">
                    Get GST invoice and save up to 28% on business purchGet GST
                    invoice and save up to 28% on business purchGet GST invoice
                    and save up to 28% on business purch...
                  </span>
                </h4>
              </div>
            </div>
            <div className="col-md-12 my-2 shipping text-center p-0">
              <div className="offer-box mx-2 px-3">
                <h4 className="box-title m-0 text-start me-2 text-danger">
                  Partner Offers :{" "}
                  <span className="offer-desc">
                    Get GST invoice and save up to 28% on business purchGet GST
                    invoice and save up to 28% on business purchGet GST invoice
                    and save up to 28% on business purch...
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
