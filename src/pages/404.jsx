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
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-J50WNKGW38"
        ></script>
        <script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-J50WNKGW38');
          `}
        </script>
        {/* Preconnect to Facebook CDN */}
        <link rel="preconnect" href="https://connect.facebook.net" />
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '580401698019006');
            fbq('track', 'PageView');
          `}
        </script>
        <noscript>
          {`<img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=580401698019006&ev=PageView&noscript=1"
          />`}
        </noscript>
      </Helmet>
      <NutritionHeader />
      <section className="margintop-nutrition mb-5">
        <div className="container-fluid">
          <div className="container px-0 px-md-3">
            <div className="col-md-12 text-center error px-0 px-md-3">
              <div className="">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/404-error.webp"}
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
