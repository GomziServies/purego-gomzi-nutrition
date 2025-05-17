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
    <div className="col-12 p-0">
      <div className="m-0 w-100 py-4 px-0 px-md-3">
        <div className="common-button mx-2">
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
        </div>
      </div>
    </div>
  );
};

export default BookButtonsContainer;
