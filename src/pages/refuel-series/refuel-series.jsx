import React from "react";
import { Helmet } from "react-helmet";
import NutritionHeader from "../../components/partials/Header/nutritionsheader";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import WhatsappHeaderApp from "../../components/NutritionWhatsappHeaderBtn";
import { Suspense } from "react";
import { Oval } from "react-loader-spinner";
import NutritionFooterRefuelSeries from "../../components/partials/Footer/nutritionFooterRefuelSeries";
import PageMeta from "../../components/PageMeta";

const ProductBlogs = React.lazy(() =>
  import("../../components/nutrition/blogs")
);
const ProductFAQS = React.lazy(() => import("../../components/nutrition/faqs"));
const MainVideoSection = React.lazy(() =>
  import("../../components/nutrition/mainVideoSection")
);
const Testimonials = React.lazy(() =>
  import("../../components/nutrition/testimonials")
);
const ProductDesignByGautam = React.lazy(() =>
  import("../../components/nutrition/productDesignByGautam")
);
const CertifiedProduct = React.lazy(() =>
  import("../../components/nutrition/certified")
);
const RefuelSeriesIgniteFatBurner = React.lazy(() =>
  import("../../components/nutrition/refuel-series/refuel-ignite-fat-burner")
);
const RefuelSeriesSparkEAA = React.lazy(() =>
  import("../../components/nutrition/refuel-series/refuel-spark-eaa")
);
const RefuelSeriesATPCreatine = React.lazy(() =>
  import("../../components/nutrition/refuel-series/refuel-atp-creatine")
);
const RefuelSeriesMassGainer = React.lazy(() =>
  import("../../components/nutrition/refuel-series/refuel-mass-gainer")
);
const RefuelSeriesWheyProtein = React.lazy(() =>
  import("../../components/nutrition/refuel-series/refuel-whey-protein")
);
const RefuelSeriesWheyProteinIsolate = React.lazy(() =>
  import("../../components/nutrition/refuel-series/refuel-whey-protein-isolate")
);
const RefuelSeriesWheyProteinConcentrate = React.lazy(() =>
  import(
    "../../components/nutrition/refuel-series/refuel-whey-protein-concentrate"
  )
);

function RefuelSeries() {
  const canonicalUrl = window.location.href;
  return (
    <>
      <PageMeta
        title="Gomzi Nutrition Refuel 2.0 Series | Advanced Sports Supplements for
          Peak Performance"
        description="Unleash your potential with Gomzi Nutrition's Refuel 2.0 Series. These advanced sports supplements are formulated to enhance recovery, boost endurance, and optimize performance for athletes and fitness enthusiasts."
        keywords="Refuel 2.0, sports supplements, performance enhancement, muscle recovery, endurance, Gomzi Nutrition, fitness supplements, athlete nutrition"
        canonicalUrl={canonicalUrl}
        metaScript={`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1144699046738070');
            fbq('track', 'PageView');
          `}
        noscriptData={`
            <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1144699046738070&ev=PageView&noscript=1" />
          `}
        googleTag={`
            https://www.googletagmanager.com/gtag/js?id=G-J50WNKGW38
          `}
        googleScriptData={`
            window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-J50WNKGW38');
          `}
      />
      <Helmet>
        {/* Preconnect to Facebook CDN */}
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link
          rel="preload"
          href={`${process.env.PUBLIC_URL}/assets/images/nutrition/nutrition-banner-inner-14.webp`}
          as="image"
        />
      </Helmet>
      <WhatsappHeaderApp
        message={
          "Hello, I wanted to know more about all Gomzi Nutrition Refuel Series Products. "
        }
        options={{ pageRef: true }}
      />
      <NutritionHeader />
      <div className="my-auto">
        <section className="banner-main bg-white margintop-nutrition">
          <div className="container-fluid w-80">
            <div className="row py-2">
              <div className="col-12 text-center">
                <Link
                  to="/nutrition/white-labelling"
                  className="btn black-btn mx-3 my-2 my-md-0"
                >
                  Click Here For Third Party Manufacturing
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="product-tabination  bg-secondaryyy pb-5">
          <div className="container-fluid w-80">
            <div className="row overflow-hidden pt-2">
              <div className="col-12">
                <div className="item">
                  <img
                    className="border-radius-20 d-none d-md-block"
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/nutrition/nutrition-banner-refuel-series-1.webp"
                    }
                    alt="Gomzi Nutrition Banner"
                    width="100%"
                    height="auto"
                    loading="eager"
                  />
                  <img
                    className="border-radius-20 d-block d-md-none"
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/nutrition/nutrition-banner-mobile-refuel-series-1.webp"
                    }
                    alt="Gomzi Nutrition Banner"
                    width="100%"
                    height="auto"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="checkout-main checkout-page-detail p-lg-4">
          <div className="container-fluid w-80 checkout-padding">
            <div className="col-12 px-0 mb-5 text-center">
              {/* <h1 className="f-rob-bol f-35">Refuel 2.0</h1> */}
              <p className="f-rob-bol f-24 mb-2">
                <b>Exclusively available only offline sales</b>
              </p>
              <p className="mb-3 f-18 refuel-series-intro-paragraph">
                Gomzi Nutrition proudly presents Refuel 2.0, a specialized
                supplement series crafted for fitness trainers and dietitians.
                Designed to optimize performance, enhance recovery, and boost
                endurance, Refuel 2.0 combines premium ingredients backed by
                science. Whether supporting intense workouts or helping clients
                achieve their wellness goals, this range delivers precision
                nutrition for high-performance results. Gomzi Nutrition is
                committed to empowering professionals with cutting-edge products
                to elevate their training and dietary programs.
              </p>
            </div>
            <div className="row">
              <Suspense
                fallback={
                  <div className="main-loading-logo">
                    <Oval
                      visible={true}
                      height="60"
                      width="60"
                      color="#4fa94d"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperclassName=""
                    />
                  </div>
                }
              >
                <RefuelSeriesWheyProteinConcentrate />
              </Suspense>
              <Suspense
                fallback={
                  <div className="main-loading-logo">
                    <Oval
                      visible={true}
                      height="60"
                      width="60"
                      color="#4fa94d"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperclassName=""
                    />
                  </div>
                }
              >
                <RefuelSeriesWheyProteinIsolate />
              </Suspense>
              <Suspense
                fallback={
                  <div className="main-loading-logo">
                    <Oval
                      visible={true}
                      height="60"
                      width="60"
                      color="#4fa94d"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperclassName=""
                    />
                  </div>
                }
              >
                <RefuelSeriesWheyProtein />
              </Suspense>
              <Suspense
                fallback={
                  <div className="main-loading-logo">
                    <Oval
                      visible={true}
                      height="60"
                      width="60"
                      color="#4fa94d"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperclassName=""
                    />
                  </div>
                }
              >
                <RefuelSeriesMassGainer />
              </Suspense>
              <Suspense
                fallback={
                  <div className="main-loading-logo">
                    <Oval
                      visible={true}
                      height="60"
                      width="60"
                      color="#4fa94d"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperclassName=""
                    />
                  </div>
                }
              >
                <RefuelSeriesATPCreatine />
              </Suspense>
              <Suspense
                fallback={
                  <div className="main-loading-logo">
                    <Oval
                      visible={true}
                      height="60"
                      width="60"
                      color="#4fa94d"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperclassName=""
                    />
                  </div>
                }
              >
                <RefuelSeriesSparkEAA />
              </Suspense>
              <Suspense
                fallback={
                  <div className="main-loading-logo">
                    <Oval
                      visible={true}
                      height="60"
                      width="60"
                      color="#4fa94d"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperclassName=""
                    />
                  </div>
                }
              >
                <RefuelSeriesIgniteFatBurner />
              </Suspense>
            </div>
          </div>
        </section>
        <Suspense
          fallback={
            <div className="main-loading-logo">
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            </div>
          }
        >
          <ProductDesignByGautam />
        </Suspense>
        {/* <Suspense
          fallback={
            <div className="main-loading-logo">
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            </div>
          }
        >
          <HomePageMoreProduct />
        </Suspense> */}
        <Suspense
          fallback={
            <div className="main-loading-logo">
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            </div>
          }
        >
          <CertifiedProduct />
        </Suspense>
        <Suspense
          fallback={
            <div className="main-loading-logo">
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            </div>
          }
        >
          <MainVideoSection />
        </Suspense>
        <Suspense
          fallback={
            <div className="main-loading-logo">
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            </div>
          }
        >
          <Testimonials />
        </Suspense>
        <Suspense
          fallback={
            <div className="main-loading-logo">
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            </div>
          }
        >
          <ProductBlogs />
        </Suspense>
        <Suspense
          fallback={
            <div className="main-loading-logo">
              <Oval
                visible={true}
                height="60"
                width="60"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperclassName=""
              />
            </div>
          }
        >
          <ProductFAQS />
        </Suspense>
      </div>
      <NutritionFooterRefuelSeries />
    </>
  );
}

export default RefuelSeries;
