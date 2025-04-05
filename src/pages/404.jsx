import React from "react";
import { Helmet } from "react-helmet";
import NutritionHeader from "../components/partials/Header/nutritionsheader";
import HomeNutritionFooter from "../components/partials/Footer/footer";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 error page</title>
        <meta
          property="og:image"
          content="https://www.purego.gomzilifesciences.in/assets/process.env.PUBLIC_URL + '/assets/images/nutrition-logo.png"
        />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-J50WNKGW38"></script>
        <script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-J50WNKGW38');
          `}
        </script>
      </Helmet>
      <NutritionHeader />
      <section className="margintop-nutrition mb-5">
        <div className="container-fluid">
          <div className="container px-0 px-md-3">
            <div className="col-md-12 text-center error px-0 px-md-3">
              <div className="">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/404-error.webp"
                  }
                  className="img-fluid"
                  alt="404 Error"
                />
              </div>
              <p className="mt-0">Maybe You Can Find What You Need Here ?</p>
              <div className="row justify-content-center">
                <div className="mb-5">
                  <a href="/" className="btn" target="_blank">
                    Go To Homepage
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HomeNutritionFooter />
    </>
  );
};

export default NotFoundPage;
