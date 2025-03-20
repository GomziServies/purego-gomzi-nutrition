import React from "react";
import UserInfo from "../../../assets/js/menu/userInfo";
import MobileUserInfo from "../../../assets/js/menu/mobileUserInfo";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function NutritionHeader() {
  // const [showBackToTop, setShowBackToTop] = useState(false);

  function openside() {
    document.getElementById("demo").style.width = "100%";
  }

  function sideclose() {
    console.log("Closing side");
    document.getElementById("demo").style.width = "0px";
  }

  const carouselOptions2 = {
    loop: true,
    autoplay: true,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  // useEffect(() => {
  //     const handleScroll = () => {
  //         if (window.scrollY > 500) {
  //             setShowBackToTop(true);
  //         } else {
  //             setShowBackToTop(false);
  //         }
  //     };

  //     window.addEventListener('scroll', handleScroll);

  //     return () => {
  //         window.removeEventListener('scroll', handleScroll);
  //     };
  // }, []);

  // const scrollToTop = () => {
  //     $("html, body").animate({
  //         scrollTop: 0
  //     }, 1500);
  // };
  return (
    <>
      {/* <button className={`scroll_top ${showBackToTop ? 'visible' : 'hidden'}`} onClick={scrollToTop}>
                <ArrowCircleUpIcon style={{ fontSize: '50px' }} />
            </button> */}
      {/* <div className="my-auto">
        <section className="header-main">
          <div className="px-1 py-2 bg-yellow text-center">
            <OwlCarousel
              id="fwg-owl"
              className="owl-theme"
              {...carouselOptions2}
            >
              <div className="item">
                <p className="text-white m-0 f-rob-reg f-14 lp-2">
                  Free shipping on prepaid orders above ₹499
                </p>
              </div>
            </OwlCarousel>
          </div>
        </section>
      </div> */}
      <div className="container-fluid main p-0 m-0">
        <div className="d-lg-block d-none log-new">
          <Link to="/">
            <div>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "../assets/images/nutrition-logo.webp"
                }
                width="100%"
                alt="Fg Group"
              />
            </div>
          </Link>
        </div>
        <div className="d-lg-none d-sm-block t0 log1-new">
          <Link to="/">
            <div>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "../assets/images/nutrition-logo.webp"
                }
                width="100%"
                alt="Fg Group"
              />
            </div>
          </Link>
        </div>
        <div className="lang">
          {/* <ul>
            <li>
              <Link to="/">
                <p className="m-0">Refuel 1.0</p>
              </Link>
            </li>
            <li>
              <Link to="/refuel-series">
                <p className="m-0">Refuel 2.0</p>
              </Link>
            </li>
          </ul> */}
        </div>
        <div className="side" id="demo">
          <span className="closebtn" onClick={sideclose}>
            ×
          </span>
          <Link
            to="/nutrition"
            style={{ marginTop: "50px", marginBottom: "30px" }}
          >
            <img
              className="lazy"
              src={
                process.env.PUBLIC_URL +
                "../assets/images/nutrition-logo.webp"
              }
              width="40%"
              alt="Fg Group"
            />
          </Link>
          {/* <Link to="/">Refuel 1.0</Link>
          <Link to="/refuel-series">Refuel 2.0</Link> */}
          <ul className="mobileUserInfo aa">
            {/* <li>
                            <Link to="#">
                                Offers
                                <i className="fas fa-percent ml-2"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                Cart
                                <i className="fas fa-shopping-bag ml-2"></i>
                            </Link>
                        </li> */}
            <li>
              <Link to="#">
                Help
                <i className="far fa-life-ring ml-2"></i>
              </Link>
            </li>
            <MobileUserInfo />
          </ul>
        </div>
        <span
          className="d-lg-none d-sm-block btnn"
          style={{ cursor: "pointer", fontSize: 20, color: "black" }}
          onClick={openside}
        >
          ☰
        </span>
        <div className="login d-lg-block d-none">
          <ul>
            {/* <li style={{ fontSize: "18px" }} className="ddmenu userInfo">
              <Link
                to="/nutrition/add-to-cart"
                style={{ marginTop: "50px", marginBottom: "30px" }}
              >
                <img
                  className="lazy"
                  src={
                    process.env.PUBLIC_URL +
                    "../assets/images/nutrition/shopping-and-commerce.png"
                  }
                  width="36px"
                  alt="Fg Group"
                />
              </Link>
            </li> */}
            {/* <li style={{ fontSize: "18px" }} className="ddmenu userInfo"> */}
            <UserInfo /> {/* </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default NutritionHeader;
