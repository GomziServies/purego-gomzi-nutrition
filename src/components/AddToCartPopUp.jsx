/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useState } from "react";
import AddToCartButtonsContainer from "./AddToCartButtonsContainer";
import LoginModal from "../assets/js/popup/login";

const AddToCartPopUp = ({ clickATC, setClickATC }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if(clickATC) {
      handleCartOpen()
    }
  }, [clickATC]);

  const handleCartOpen = async () => {
    try {
      const isAuthenticated = localStorage.getItem(
        "fg_group_user_authorization"
      );

      if (!isAuthenticated) {
        localStorage.setItem("itemCartAdded", "true");
        setMenuOpen(false);
        setShowModal(true);
      } else {
        // setAddToCartProducts(data);
        setMenuOpen(!menuOpen);
        localStorage.setItem("itemCartAdded", "false");
      }
      setClickATC(false)
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <AddToCartButtonsContainer
        // addToCartProductsData={currentProductData}
        addToCartProducts={{ id: "1" }}
        toggleMenu={handleCartOpen}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        // selectedProductId={currentProductData.id}
        removeBtn={true}
      />
      {showModal && <LoginModal onClose={closeModal} />}
    </>
  );
};

export default AddToCartPopUp;
