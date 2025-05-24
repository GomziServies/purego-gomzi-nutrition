import React from "react";
import AddToCartButton from "./AddToCartButtons.jsx";
import AddtoCartOffCanvas from "./addtocartcanvas.jsx";

const AddToCartButtonsContainer = ({
  addToCartProductsData,
  addToCartProducts,
  toggleMenu,
  menuOpen,
  setMenuOpen,
  selectedProductId,
  removeBtn,
  handleChangeCart,
  handleChangeATC,
}) => {
  return (
    <>
      {removeBtn ? (
        ""
      ) : (
        <AddToCartButton
          key={addToCartProductsData?.name}
          addToCartProductsData={addToCartProductsData}
          toggleMenu={toggleMenu}
        />
      )}
      {menuOpen ? (
        <>
          <AddtoCartOffCanvas
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
            addToCartProducts={addToCartProducts}
            selectedProductId={selectedProductId}
            handleChangeCart={handleChangeCart}
            handleChangeATC={handleChangeATC}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default AddToCartButtonsContainer;
