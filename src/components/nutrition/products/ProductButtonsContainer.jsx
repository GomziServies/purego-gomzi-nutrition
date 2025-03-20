import React from "react";
import ProductButton from "./ProductButtons.jsx";
import AddtoCartOffCanvas from "../../addtocartcanvas.jsx";

const ProductButtonsContainer = ({
  products,
  toggleMenu,
  currentProduct,
  menuOpen,
  setMenuOpen,
  productData,
}) => {
  return (
    <div className="col-12 p-0">
      <div className="m-0 w-100 py-4 px-0 px-md-3">
        <div className="common-button mx-2">
          {products.map((product) => (
            <ProductButton
              key={product.key}
              product={product}
              toggleMenu={toggleMenu}
              currentProduct={currentProduct}
            />
          ))}
          {menuOpen ? (
            <>
              <AddtoCartOffCanvas
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
                productData={productData}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductButtonsContainer;
