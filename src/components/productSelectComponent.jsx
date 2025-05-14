import { useEffect, useState } from "react";

const ProductSelectComponent = ({ fadingItem }) => {
  const [fadeClass, setFadeClass] = useState("fade-hidden");
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!fadingItem) return;

    setShouldRender(true);
    setFadeClass("fade-hidden"); // Start hidden

    const showTimeout = setTimeout(() => {
      setFadeClass("fade-in"); // Trigger fade-in
    }, 80); // Small delay to allow DOM paint

    const fadeTimeout = setTimeout(() => {
      setFadeClass("fade-out");
    }, 800);

    const removeTimeout = setTimeout(() => {
      setShouldRender(false);
    }, 1100);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, [fadingItem]);

  return shouldRender ? (
    <div id="preloader2" className={`product-select-fade-loader ${fadeClass}`}></div>
  ) : null;
};

export default ProductSelectComponent;
