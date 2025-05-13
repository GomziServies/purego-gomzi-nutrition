import React from "react";

const SelectableItem = ({ id, label, isActive, onClick }) => {
    console.log('isActive :- ', isActive);
    
  return (
    <li className="mb-3 d-inline-block product-detail">
      <div className="product-box" onClick={() => onClick(id)}>
        <div className="">
          <span
            className={`product-box-title me-md-3 me-1 my-md-3 ${
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
