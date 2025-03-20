import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SelectableList from "../products/SelectableList";

const RefuelSeriesSparkEAA = () => {
  const [currentProduct, setCurrentProduct] = useState("250g-Guava");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeSize, setActiveSize] = useState("250g");
  const [activeFlavor, setActiveFlavor] = useState("Guava");
  const [opacity, setOpacity] = useState(1);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      setOpacity(0.5);
      const fadeOutTimer = setTimeout(() => {
        setOpacity(1);
      }, 300);

      return () => clearTimeout(fadeOutTimer);
    }
  }, [activeImageIndex]);

  const productImages = {
    "250g-Watermelon": ["/assets/images/nutrition/refuel-eaa-watermelon-1.webp"],
    "250g-Guava": ["/assets/images/nutrition/refuel-eaa-guava-1.webp"],
  };

  const sizeOptions = [{ id: "250g", label: "250g" }];

  const flavorOptions = [
    { id: "Watermelon", label: "Watermelon" },
    { id: "Guava", label: "Guava" },
  ];
  const handleSelectSize = (id) => {
    setOpacity(0.3);
    setTimeout(() => {
      setActiveSize(id);
      setCurrentProduct(`${id}-${activeFlavor}`);
      setActiveImageIndex(0);
      setOpacity(1);
    }, 500);
  };

  const handleSelectFlavor = (id) => {
    setOpacity(0.3);
    setTimeout(() => {
      setActiveFlavor(id);
      setCurrentProduct(`${activeSize}-${id}`);
      setActiveImageIndex(0);
      setOpacity(1);
    }, 500);
  };

  return (
    <div className="col-lg-4">
      <div className="row no-gutters mb-2 p-4">
        <div className="col-12 active-tab-shadow pt-3">
          <div className="row w-100 flex-column-reverse flex-md-row mx-0 px-0">
            <div className="col-lg-12 px-md-3 mb-2 mt-2 mt-md-0 order-1">
              <div className="item mb-3">
                <div
                  className="product-image-container"
                  ref={imageRef}
                  style={{
                    opacity: opacity,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                >
                  <img
                    src={productImages[currentProduct]}
                    alt="FG Group"
                    className="w-100"
                    width="100%"
                    height="auto"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <h2 className="f-rob-bol text-center f-35">Spark EAA</h2>
                </div>
                <br />
                <div className="col-12 return-policy-main">
                  <div className="mt-3 editor-text">
                    <div className="descriptionShow text-secondary">
                      <p className="f-20 flavour-button">
                        <SelectableList
                          items={sizeOptions}
                          activeItem={activeSize}
                          onItemClick={handleSelectSize}
                          title="Size"
                        />
                      </p>
                      <p className="f-20 flavour-button">
                        <SelectableList
                          items={flavorOptions}
                          activeItem={activeFlavor}
                          onItemClick={handleSelectFlavor}
                          title="Flavor"
                        />
                      </p>
                    </div>
                    <div className="d-flex mt-4">
                      <div className="col-12 p-0">
                        <p className="nutrition-content-1 text-bold">7.8g</p>
                        <p className="nutrition-content-2 text-bold">EAA</p>
                      </div>
                    </div>
                    <div className="pb-2 mt-3 text-center ql-editor descriptionShow text-secondary">
                      <p>Available only for bulk purchase</p>
                      <Link
                        to="https://api.whatsapp.com/send?phone=7874331000&amp;text= Hello, I have an inquiry about Refuel 2.0 Spark EAA product."
                        type="button"
                        className="btn btn-success mt-3"
                      >
                        Yes, I am interested!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefuelSeriesSparkEAA;
