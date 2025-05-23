/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

const AddToCartButton = ({ addToCartProductsData, toggleMenu }) => {
  return (
    <>
      <button
        onClick={(e) => toggleMenu(addToCartProductsData, e)}
        className="col-md-3 col-11 cart-btn m-0 ms-md-0 mx-1 my-1"
      >
        <i className="fa-solid fa-cart-shopping me-2"></i> add to cart
      </button>
      {/* <button
          onClick={() => handleQuickBuy(currentProductData)}
          className="col-md-3 col-11 quick-buy-btn m-0 ms-md-3 mx-1 my-1"
        >
          <i className="fa-solid fa-bolt me-2"></i> Quick Buy
        </button> */}
    </>
  );
};

export default AddToCartButton;
