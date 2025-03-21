import React, { useEffect, useState } from "react";
const LoaderComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading && (
        <div id="preloader">
          <div className="tg-cube-grid">
            <div className="tg-cube tg-cube1"></div>
            <div className="tg-cube tg-cube2"></div>
            <div className="tg-cube tg-cube3"></div>
            <div className="tg-cube tg-cube4"></div>
            <div className="tg-cube tg-cube5"></div>
            <div className="tg-cube tg-cube6"></div>
            <div className="tg-cube tg-cube7"></div>
            <div className="tg-cube tg-cube8"></div>
            <div className="tg-cube tg-cube9"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoaderComponent;
