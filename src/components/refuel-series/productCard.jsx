import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductCard = ({
  imageSrc,
  productLink,
  productName,
  rating,
  originalPrice,
  discountedPrice,
}) => {
  return (
    <div className="col-md-3 col-6 nutri-product mb-3">
      <div className="whey-product-card text-center bg-white br-15 p-2 d-flex flex-wrap justify-content-center">
        <div className="col-12 p-0">
          <Link to={productLink}>
            <div className="whey-product-img">
              <span className="lazy-load-image-background blur lazy-load-image-loaded">
                <LazyLoadImage
                  src={imageSrc}
                  alt={productName}
                  className="img-fluid mx-auto product-img"
                  effect="blur"
                  loading="lazy"
                />
              </span>
            </div>
          </Link>
        </div>
        <div className="col-12 p-0">
          <Link
            to={productLink}
            className="text-ellipse-custom text-secondary mb-0 mt-1 f-rob-med f-20"
          >
            <b>{productName}</b>
          </Link>
        </div>
        <div className="d-block pb-3">
          <span className="d-inline-block text-black f-rob-bol f-20">
            Refuel Series
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
