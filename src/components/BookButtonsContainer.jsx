import React from "react";
import BookButton from "./BookButtons.jsx";
import AddtoCartOffCanvas from "./addtocartcanvas.jsx";

const BookButtonsContainer = ({
  booksData,
  books,
  toggleMenu,
  menuOpen,
  setMenuOpen,
  selectedBookId,
}) => {
  return (
    <>
      <BookButton
        key={booksData.name}
        booksData={booksData}
        toggleMenu={toggleMenu}
      />
      {menuOpen ? (
        <>
          <AddtoCartOffCanvas
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
            books={books}
            selectedBookId={selectedBookId}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default BookButtonsContainer;
