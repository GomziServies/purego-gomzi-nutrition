// import React from "react";
// const LoadingComponent = () => {
//   return (
//     <>
//       <div id="preloader1">
//         <div className="tg-cube-grid">
//           <div className="tg-cube tg-cube1"></div>
//           <div className="tg-cube tg-cube2"></div>
//           <div className="tg-cube tg-cube3"></div>
//           <div className="tg-cube tg-cube4"></div>
//           <div className="tg-cube tg-cube5"></div>
//           <div className="tg-cube tg-cube6"></div>
//           <div className="tg-cube tg-cube7"></div>
//           <div className="tg-cube tg-cube8"></div>
//           <div className="tg-cube tg-cube9"></div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoadingComponent;

import React, { useEffect, useState } from "react";

const LoadingComponent = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timeout);
    } else {
      setShouldRender(true);
    }
  }, [isLoading]);

  return shouldRender ? (
    <div
      id="preloader1"
      className={`fade-loader ${isLoading ? "fade-in" : "fade-out"}`}
    >
      <div className="tg-cube-grid">
        {[...Array(9)].map((_, i) => (
          <div key={i} className={`tg-cube tg-cube${i + 1}`} />
        ))}
      </div>
    </div>
  ) : null;
};

export default LoadingComponent;
