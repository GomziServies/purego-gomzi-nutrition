import React from "react";
import SelectableItem from "./SelectableItem";

const SelectableList = ({ items, activeItem, onItemClick, title }) => {
  return (
    <>
      <p className="f-rob-bol f-18">
        <b>{title}</b>
      </p>
      <ul className="list-unstyled mb-0">
        {items.map((item) => (
          <SelectableItem
            key={item.id}
            id={item.id}
            label={item.label}
            isActive={activeItem === item.id}
            onClick={onItemClick}
          />
        ))}
      </ul>
    </>
  );
};

export default SelectableList;
