import React from 'react';

const SelectableItem = ({ id, label, isActive, onClick }) => {
    return (
        <li className="mr-3 mb-3 d-inline-block">
            <div
                className="avail-in-other-size-main"
                onClick={() => onClick(id)}
            >
                <div className="d-block avail-in-other-size">
                    <span
                        className={`d-block product-type avail-other-size selectbtn cp ${isActive ? "active" : ""}`}
                        id={id}
                    >{label}
                    </span>
                </div>
            </div>
        </li>
    );
};

export default SelectableItem;
