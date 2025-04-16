import React from "react";
const Features = () => {
  return (
    <>
      <div className="row border-top pt-3 mt-3">
        <div className="col-md-3 shipping p-2 text-center col-6">
          <div className="box">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/fast-delivery.png"}
              alt="img"
              width="45px"
            />
            <h4 className="box-title">Fast delivery</h4>
          </div>
        </div>
        <div className="col-md-3 shipping p-2 text-center col-6">
          <div className="box">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/original.png"}
              alt="img"
              width="45px"
            />
            <h4 className="box-title">100% Authentic</h4>
          </div>
        </div>
        <div className="col-md-3 shipping p-2 text-center col-6">
          <div className="box">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/return.png"}
              alt="img"
              width="45px"
            />
            <h4 className="box-title">Return & refund</h4>
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
            <h4 className="box-title">Cash on delivery</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
