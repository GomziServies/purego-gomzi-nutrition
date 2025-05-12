import { useEffect, useState } from "react";

const LogoComponent = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    const removeTimeout = setTimeout(() => {
      setShouldRender(false);
    }, 2500);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, []);

  return shouldRender ? (
    <div
      id="preloader2"
      className={`fade-loader ${fadeOut ? "fade-out" : "fade-in"}`}
    >
      <img
        src={process.env.PUBLIC_URL + "/assets/images/nutrition-logo.png"}
        className="img-fluid"
        width={120}
        height="auto"
        alt="Fg Group"
      />
    </div>
  ) : null;
};

export default LogoComponent;
