/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

const BookButton = ({ booksData, toggleMenu }) => {
  return (
    <>
      <button
        onClick={(e) => toggleMenu(booksData, e)}
        style={{ display: booksData.name ? "block" : "none", backgroundColor: '#86c33a' }}
        className="bg-blue text-uppercase  text-white f-16 f-rob-bol rate-btn-blue"
      >
        Add to Cart
      </button>
      <Link
        to="/user/order"
        target="_blank"
        style={{ display: booksData.name ? "block" : "none" }}
      >
        <button type="button" className="bg-dark text-uppercase text-white f-16 f-rob-bol rate-btn-black mt-3">
          Track Your Order
        </button>
      </Link>
    </>
  );
};

export default BookButton;
