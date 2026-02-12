import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import NutritionHeader from "../components/partials/Header/nutritionsheader";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/animate.min.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/default.css";
import "../assets/css/jquery-ui.css";
import "../assets/css/magnific-popup.css";
import "../assets/css/odometer.css";
import "../assets/css/slick.css";
import "../assets/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import HomeNutritionFooter from "../components/partials/Footer/footer";
import { useNavigate } from "react-router-dom";
import { axiosInstance, publicAxiosInstance } from "../assets/js/config/api";
import Swal from "sweetalert2";
import AddToCartPopUp from "../components/AddToCartPopUp";

function AllBlogs() {
  const canonicalUrl = window.location.href;

  const [showModal, setShowModal] = useState(false);
  const [changeATC, setChangeATC] = useState(false);
  const [cartItemName, setCartItemName] = useState([]);
  const [clickATC, setClickATC] = useState(false);
  const [productReviewsData, setProductReviewsData] = useState([]);
  const Navigate = useNavigate();
  const productsId = [
    "67e7749163f930dcc6a2715d",
    "67e774a963f930dcc6a2715f",
    "67e774c463f930dcc6a27161",
    "67e7745f63f930dcc6a2715b",
    "67e7740363f930dcc6a27157",
    "67e7742d63f930dcc6a27159",
    "67e773f463f930dcc6a27155",
    "6827168ced4175d21de95c4e",
    "68316295f91df040c479acc8",
    "68316330f91df040c479ad1e",
  ];

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchProductData = async () => {
    try {
      const response = await axiosInstance.get(
        "/order-cart/get-carts?item_type=PURE_GO_MEAL_PRODUCT&is_purchase=true"
      );
      const cartData = response.data.data[0];
      const cartItemData = cartData.items_details.map((data) => data.name);
      setCartItemName(cartItemData);
      productsId.map((data) => fetchProductRatingData(data));
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const fetchProductRatingData = (product_id) => {
    publicAxiosInstance
      .get(`/feedback/products?product_id=${product_id}`)
      .then((response) => {
        const { data } = response;
        if (data && data.status === 200) {
          const feedback = data.data;
          if (feedback && feedback.length > 0) {
            let totalPoints = 0;
            let feedbackCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

            feedback.forEach((feedbackItem) => {
              totalPoints += feedbackItem.feedback_point;
              feedbackCount[feedbackItem.feedback_point]++;
            });
            const averagePoints = totalPoints / feedback.length;

            setProductReviewsData((prevData) => {
              const filteredData = prevData.filter(
                (item) => item._id !== product_id
              );
              const newEntry = {
                _id: product_id,
                average_points: averagePoints.toFixed(1),
                total_count: feedback.length,
              };
              return [...filteredData, newEntry];
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching product feedback:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch product feedback. Please try again later.",
          icon: "error",
        });
      });
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("fg_group_user_authorization");
    if (isLogin) {
      fetchProductData();
    }
  }, []);

  useEffect(() => {
    const isLogin = localStorage.getItem("fg_group_user_authorization");
    if (isLogin && changeATC) {
      fetchProductData();
    }
  }, [changeATC]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const section = document.querySelector(".main-section");
      if (!section) return;

      const { clientX, clientY } = e;
      const { width, height, left, top } = section.getBoundingClientRect();

      const xMove = (clientX - left - width / 2) / (width / 2);
      const yMove = (clientY - top - height / 2) / (height / 2);

      const shapes = document.querySelectorAll(".banner-shape");
      shapes.forEach((shape, index) => {
        const movementFactor = (index + 1) * 3;

        const reverseX = index % 2 === 0 ? -1 : 1;
        const reverseY = index % 2 !== 0 ? -1 : 1;

        shape.style.transform = `translate(${
          xMove * movementFactor * reverseX
        }px, ${yMove * movementFactor * reverseY}px)`;
      });
    };

    const section = document.querySelector(".main-section");
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const carouselOptions = {
    loop: true,
    autoplay: true,
    dots: false,
    nav: true,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  };

  const addProductInCart = async (product_id) => {
    localStorage.setItem("openCart", product_id);
    try {
      // const isLogin = localStorage.getItem("fg_group_user_authorization");
      // if (!isLogin) {
      //   return openModal();
      // }
      const response = await axiosInstance.post("/order-cart/add-item", {
        item_id: product_id,
        quantity: 1,
        item_type: "PURE_GO_MEAL_PRODUCT",
      });
      if (response.data.response === "OK") {
        fetchProductData();
        Navigate("/cart", { state: product_id });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let fromCartPage = localStorage.getItem("fromCartPage");

    if (fromCartPage) {
      addProductInCart();
      handleCartOpen();
      localStorage.removeItem("fromCartPage");
    }
  }, []);

  const handleCartOpen = async (cart = "addToCart") => {
    setClickATC(true);
    localStorage.setItem("cartOpenSource", cart);
  };

  const handleChangeCart = async () => {
    setChangeATC(true);
  };

  const handleChangeATC = async () => {
    if (changeATC) {
      setChangeATC(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Blogs | PureGo Nutrition</title>
        <meta
          name="description"
          content="Shop PureGo for high-quality nutrition, fitness supplements & wellness products. Fuel your body & boost performance."
        />
        <meta
          name="keyword"
          content="purego, protein powder, creatine protein powder, preworkout, bodybuilding supplement, lean whey protein powder, whey protein powder, eaa powder, bcaa supplement, protein powder, best protein powder, bcaa, best pre workout, protein powder, whey protein isolate, best protein powder for women, best protein powder, protein powder for weight loss, best protein powder for weight loss, organic protein powder, isolate protein, best supplements for muscle growth, whey isolate protein powder, best pre workout for men, best whey protein powder, best pre workout for women, best whey protein, bcaa powder, protein whey, pre workout for women, creatine monohydrate powder, best protein powder for muscle gain, best muscle building supplements, chocolate protein powder"
        />
        <meta
          property="og:image"
          content="https://www.purego.gomzilifesciences.in/assets/process.env.PUBLIC_URL + '/assets/images/nutrition-logo.png"
        />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />

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
              fbq('init', '2773291456345230');
              fbq('track', 'PageView');
          `}
        </script>
        <noscript>
          {`<img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=2773291456345230&ev=PageView&noscript=1"
            />`}
        </noscript>
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
        <script
          type="text/javascript"
          src="https://api.goaffpro.com/loader.js?shop=vijiwvsmjb"
        ></script>
      </Helmet>
      <p className="d-none">
        purego, protein powder, creatine protein powder, preworkout,
        bodybuilding supplement, lean whey protein powder, whey protein powder,
        eaa powder, bcaa supplement, protein powder, best protein powder, bcaa,
        best pre workout, protein powder, whey protein isolate, best protein
        powder for women, best protein powder, protein powder for weight loss,
        best protein powder for weight loss, organic protein powder, isolate
        protein, best supplements for muscle growth, whey isolate protein
        powder, best pre workout for men, best whey protein powder, best pre
        workout for women, best whey protein, bcaa powder, protein whey, pre
        workout for women, creatine monohydrate powder, best protein powder for
        muscle gain, best muscle building supplements, chocolate protein powder
      </p>
      <AddToCartPopUp
        clickATC={clickATC}
        setClickATC={setClickATC}
        changeATC={changeATC}
        handleChangeCart={handleChangeCart}
        handleChangeATC={handleChangeATC}
      />
      <NutritionHeader
        cartItemName={cartItemName}
        openModal={openModal}
        handleCartOpen={handleCartOpen}
        changeATC={changeATC}
        handleChangeATC={handleChangeATC}
      />
      <button className="scroll-top scroll-to-target" data-target="html">
        <i className="fas fa-angle-up"></i>
      </button>

      <main className="main-area fix">
        <section id="news" className="tg-blog-area pt-80 my-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-8">
                <div className="section-title text-center white-title mb-50">
                  <p className="sub-title">
                    PureGo: Where Quality Meets Wellness
                  </p>
                  <h2>Blogs</h2>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-xl-4 col-lg-5 col-md-6 col-sm-9">
                <div
                  className="tg-blog-post-item mb-30 wow fadeInUp"
                  data-wow-delay=".2s"
                >
                  <div className="tg-blog-post-thumb">
                    <a href="/top-supplements-for-weight-gain">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "assets/images/blog_post_thumb01.webp"
                        }
                        alt="blog"
                      />
                    </a>
                  </div>
                  <div className="tg-blog-post-content">
                    <div className="post-date">
                      <i className="far fa-calendar-alt"></i> 24th September
                      2024
                    </div>
                    <h4 className="title">
                      <a href="/top-supplements-for-weight-gain">
                        Top Supplements for Weight Gain: A Comparative Analysis
                      </a>
                    </h4>
                    <a
                      href="/top-supplements-for-weight-gain"
                      className="read-more"
                    >
                      <span>Read More</span>{" "}
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-6 col-sm-9">
                <div
                  className="tg-blog-post-item mb-30 wow fadeInUp"
                  data-wow-delay=".4s"
                >
                  <div className="tg-blog-post-thumb">
                    <a href="/how-supplements-help-you-live-healthy-life">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "assets/images/blog_post_thumb02.webp"
                        }
                        alt="blog"
                      />
                    </a>
                  </div>
                  <div className="tg-blog-post-content">
                    <div className="post-date">
                      <i className="far fa-calendar-alt"></i> 24th September
                      2024
                    </div>
                    <h4 className="title">
                      <a href="/how-supplements-help-you-live-healthy-life">
                        How Supplements Help you live a healthy life
                      </a>
                    </h4>
                    <a
                      href="/how-supplements-help-you-live-healthy-life"
                      className="read-more"
                    >
                      <span>Read More</span>{" "}
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-6 col-sm-9">
                <div
                  className="tg-blog-post-item mb-30 wow fadeInUp"
                  data-wow-delay=".6s"
                >
                  <div className="tg-blog-post-thumb">
                    <a href="/best-whey-protein-in-india">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "assets/images/blog_post_thumb03.webp"
                        }
                        alt="blog"
                      />
                    </a>
                  </div>
                  <div className="tg-blog-post-content">
                    <div className="post-date">
                      <i className="far fa-calendar-alt"></i> 24th September
                      2024
                    </div>
                    <h4 className="title">
                      <a href="/best-whey-protein-in-india">
                        The Ultimate Guide to the Best Whey Protein to Try in
                        India
                      </a>
                    </h4>
                    <a href="/best-whey-protein-in-india" className="read-more">
                      <span>Read More</span>{" "}
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-6 col-sm-9">
                <div
                  className="tg-blog-post-item mb-30 wow fadeInUp"
                  data-wow-delay=".6s"
                >
                  <div className="tg-blog-post-thumb">
                    <a href="/best-whey-protein-india-2025-reviews-price">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "assets/images/blog_post_thumb04.webp"
                        }
                        alt="blog"
                      />
                    </a>
                  </div>
                  <div className="tg-blog-post-content">
                    <div className="post-date">
                      <i className="far fa-calendar-alt"></i> 3rd October 2025
                    </div>
                    <h4 className="title">
                      <a href="/best-whey-protein-india-2025-reviews-price">
                        Best Whey Protein in India 2025 - Expert Reviews &...
                      </a>
                    </h4>
                    <a
                      href="/best-whey-protein-india-2025-reviews-price"
                      className="read-more"
                    >
                      <span>Read More</span>{" "}
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-6 col-sm-9">
                <div
                  className="tg-blog-post-item mb-30 wow fadeInUp"
                  data-wow-delay=".6s"
                >
                  <div className="tg-blog-post-thumb">
                    <a href="/pre-workout-supplement-india-guide-benefits">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "assets/images/blog_post_thumb05.webp"
                        }
                        alt="blog"
                      />
                    </a>
                  </div>
                  <div className="tg-blog-post-content">
                    <div className="post-date">
                      <i className="far fa-calendar-alt"></i> 3rd October 2025
                    </div>
                    <h4 className="title">
                      <a href="/pre-workout-supplement-india-guide-benefits">
                        Pre-Workout Supplement India Guide - Benefits, Side
                        Effects...
                      </a>
                    </h4>
                    <a
                      href="/pre-workout-supplement-india-guide-benefits"
                      className="read-more"
                    >
                      <span>Read More</span>{" "}
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-6 col-sm-9">
                <div
                  className="tg-blog-post-item mb-30 wow fadeInUp"
                  data-wow-delay=".6s"
                >
                  <div className="tg-blog-post-thumb">
                    <a href="/bcaa-before-after-workout-guide">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "assets/images/blog_post_thumb06.webp"
                        }
                        alt="blog"
                      />
                    </a>
                  </div>
                  <div className="tg-blog-post-content">
                    <div className="post-date">
                      <i className="far fa-calendar-alt"></i> 3rd October 2025
                    </div>
                    <h4 className="title">
                      <a href="/bcaa-before-after-workout-guide">
                        BCAA Before or After Workout? Science-Backed Answer
                      </a>
                    </h4>
                    <a
                      href="/bcaa-before-after-workout-guide"
                      className="read-more"
                    >
                      <span>Read More</span>{" "}
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col"></div>
              <div className="col-xl-4 col-lg-5 col-md-6 col-sm-9">
                <div
                  className="tg-blog-post-item mb-30 wow fadeInUp"
                  data-wow-delay=".6s"
                >
                  <div className="tg-blog-post-thumb">
                    <a href="/whey-protein-vs-plant-protein-which-is-better-for-you">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "assets/images/blog_post_thumb07.webp"
                        }
                        alt="blog"
                      />
                    </a>
                  </div>
                  <div className="tg-blog-post-content">
                    <div className="post-date">
                      <i className="far fa-calendar-alt"></i> 13rd October 2025
                    </div>
                    <h4 className="title">
                      <a href="/whey-protein-vs-plant-protein-which-is-better-for-you">
                        Whey Protein vs. Plant Protein: Which is Better for You?
                      </a>
                    </h4>
                    <a
                      href="/whey-protein-vs-plant-protein-which-is-better-for-you"
                      className="read-more"
                    >
                      <span>Read More</span>{" "}
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col"></div>
            </div>
          </div>
        </section>
      </main>
      <HomeNutritionFooter />
    </>
  );
}

export default AllBlogs;
