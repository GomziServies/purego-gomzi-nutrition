import React, { Suspense, lazy, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import $ from "jquery";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/animate.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/default.css";
import "./assets/css/jquery-ui.css";
import "./assets/css/magnific-popup.css";
import "./assets/css/odometer.css";
import "./assets/css/slick.css";
import "./assets/css/style.css";
const App = lazy(() => import("./App"));

window.$ = $;
window.jQuery = $;
window.BASE_URL = process.env.PUBLIC_URL;

const RedirectFromHtml = ({ children }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=UA-209915471-2";
      script.async = true; // Ensure async loading
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "UA-209915471-2");
      };
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return children;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <RedirectFromHtml>
      <Suspense
        fallback={
          <div>
            <div className="main-loading-logo">
              <div className="">
                {/* <div className='m-auto'>
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            </div> */}
                <div>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "../assets/images/nutrition-logo.png"
                    }
                    className="img-fluid"
                    width={120}
                    height="auto"
                    alt="Fg Group"
                  />
                </div>
              </div>
            </div>
          </div>
        }
      >
        <App />
      </Suspense>
    </RedirectFromHtml>
    <ToastContainer />
  </BrowserRouter>
);
