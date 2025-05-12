import React, { Suspense, lazy } from "react";
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
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=UA-209915471-2";
      script.async = true;
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
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </RedirectFromHtml>
    <ToastContainer />
  </BrowserRouter>
);
