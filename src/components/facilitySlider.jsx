import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const facilitySlider = () => {
  const iconStyle = {
    color: "orange",
    fontSize: "40px",
    marginRight: "20px",
  };

  return (
    <div className="w-100 border-top border-bottom bg-white overflow-hidden">
      <marquee behavior="scroll" direction="left" scrollamount="20">
        <div className="facility-slider">
          {[
            { icon: "fa-credit-card", text: "COD Available" },
            { icon: "fa-clock", text: "24 Hour Dispatch" },
            { icon: "fa-wallet", text: "Secure Payment" },
            { icon: "fa-headset", text: "Quick Support" },
            { icon: "fa-credit-card", text: "COD Available" },
            { icon: "fa-clock", text: "24 Hour Dispatch" },
            { icon: "fa-wallet", text: "Secure Payment" },
            { icon: "fa-headset", text: "Quick Support" },
            { icon: "fa-credit-card", text: "COD Available" },
            { icon: "fa-clock", text: "24 Hour Dispatch" },
            { icon: "fa-wallet", text: "Secure Payment" },
            { icon: "fa-headset", text: "Quick Support" },
          ].map((item, i) => (
            <div
              key={i}
              className="d-flex align-items-center px-5 py-3 fw-bold text-dark"
              style={{ flex: "0 0 auto" }}
            >
              <i className={`fas ${item.icon}`} style={iconStyle}></i>
              <span style={{ fontSize: "20px" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </marquee>
    </div>
  );
};

export default facilitySlider;
