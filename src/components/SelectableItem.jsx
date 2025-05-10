import React from "react";

const SelectableItem = ({ id, label, isActive, onClick }) => {
    console.log('isActive :- ', isActive);
    
  return (
    <li className="me-3 mb-3 d-inline-block product-detail">
      <div className="product-box" onClick={() => onClick(id)}>
        <div className="">
          <span
            className={`product-box-title my-md-3 ${
              isActive ? "active" : ""
            }`}
            id={id}
          >
            {label}
          </span>
        </div>
      </div>
    </li>
  );
};

export default SelectableItem;
