import React from 'react';

const ProductButton = ({ product, toggleMenu, currentProduct }) => {
    return (
        <button
            onClick={() => toggleMenu(product.data)}
            style={{ display: currentProduct === product.key ? 'block' : 'none' }}
            className="bg-yellow text-uppercase px-3 px-lg-5 text-white f-16 f-rob-bol rate-btn"
        >
            Add to Cart
        </button>
    );
};

export default ProductButton;
