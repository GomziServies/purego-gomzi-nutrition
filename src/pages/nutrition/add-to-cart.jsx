import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import NutritionHeader from "../../components/partials/Header/nutritionsheader";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/css/animate.min.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/default.css";
import "../../assets/css/jquery-ui.css";
import "../../assets/css/magnific-popup.css";
import "../../assets/css/odometer.css";
import "../../assets/css/slick.css";
import "../../assets/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import HomeNutritionFooter from "../../components/partials/Footer/footer";
import LoaderComponent from "../../components/PageLoader";
import { axiosInstance } from "../../assets/js/config/api";

function AddToCart() {
  const canonicalUrl = window.location.href;

  const [productData, setProductData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [serverDataID, setServerDataID] = useState("");
  const [productDataGet, setProductDataGet] = useState([]);

  const fetchProductData = async () => {
    // setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/order-cart/get-carts?item_type=PURE_GO_MEAL_PRODUCT&is_purchase=true"
      );
      const serverData = response.data.data[0];
      setServerDataID(serverData._id);
      const existingData = JSON.parse(
        localStorage.getItem("addItemInCart")
      ) || { products: [] };

      const priceMap = existingData.products.reduce((map, product) => {
        map[product.product_id] = product.mrpPrice;
        return map;
      }, {});

      const itemDataForGetQty = serverData?.items || [];
      const itemDataForGetImgName = serverData?.items_details || [];

      const combinedData = itemDataForGetQty.map((item) => {
        const itemDetails = itemDataForGetImgName.find(
          (details) => details._id === item.item_id
        );
        if (!itemDetails) {
          console.warn(`No details found for item with id: ${item.item_id}`);
          return item;
        }

        return {
          ...item,
          ...itemDetails,
          items_id: item._id,
        };
      });

      const updatedServerData = combinedData.map((product) => {
        return {
          ...product,
          mrpPrice: priceMap[product.item_id] || product.mrpPrice,
        };
      });
      setProductData(updatedServerData);
      totalAmountCalculation(updatedServerData);
      setProductDataGet(updatedServerData);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
    // setLoading(false);
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const totalAmountCalculation = (data) => {
    const amount = data.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTotalAmount(amount || 0);
  };

  const handleRemoveProduct = async (cart_id, product_id) => {
    try {
      await axiosInstance.delete(
        `/order-cart/remove-item?item_id=${product_id}&cart_id=${serverDataID}`
      );
      setProductDataGet((prevData) =>
        prevData.filter((product) => product._id !== cart_id)
      );
      const existingData = JSON.parse(
        localStorage.getItem("addItemInCart")
      ) || { products: [] };
      existingData.products = existingData.products.filter(
        (product) => product.product_id !== product_id
      );
      localStorage.setItem("addItemInCart", JSON.stringify(existingData));
      fetchProductData();
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Gomzi Nutrition | Best Whey Protein in India | Premium Supplements
        </title>
        <meta
          name="description"
          content="Discover Gomzi Nutrition, your go-to destination for the best whey protein and premium nutrition supplements in India. Boost your fitness journey with our high-quality products tailored for muscle growth, weight loss, and overall health."
        />
        <meta
          name="keyword"
          content="bowelease  Constipation Relief, shop near by me, diet supplements near me, best multivitamins for men india, booster testosterone, how to fat burn, supplement shop near, whey isolate vs protein, whey protein vs whey protein isolate, women's protein powder for weight gain, protein powder for weight gain woman, which best peanut butter, nutrition in 100g oats"
        />
        <meta
          property="og:image"
          content="https://www.gomzilifesciences.in/assets/process.env.PUBLIC_URL + '/assets/images/nutrition-logo.webp"
        />
        <meta
          property="og:url"
          content="https://purego.gomzilifesciences.in/"
        />
        <link rel="canonical" href={{ canonicalUrl }} />

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
            fbq('init', '1144699046738070');
            fbq('track', 'PageView');
          `}
        </script>
        <noscript>
          {`<img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=1144699046738070&ev=PageView&noscript=1"
          />`}
        </noscript>
        <link
          rel="preload"
          href={`${process.env.PUBLIC_URL}/assets/process.env.PUBLIC_URL +  "/assets/images/nutrition/nutrition-banner-inner-14.webp`}
          as="image"
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
      </Helmet>
      <LoaderComponent />
      <NutritionHeader />
      <button className="scroll-top scroll-to-target" data-target="html">
        <i className="fas fa-angle-up"></i>
      </button>
      <main className="main-area fix">
        <section className="breadcrumb-area breadcrumb-bg">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-10">
                <div className="breadcrumb-content text-center">
                  <h2 className="title">Cart Page</h2>
                  <nav aria-label="Breadcrumbs" className="breadcrumb-trail">
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item trail-item trail-begin">
                        <a href="/">
                          <span>Home</span>
                        </a>
                      </li>
                      <li className="breadcrumb-item trail-item trail-end">
                        <span>Cart</span>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="video-shape one">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/video_shape01.png"}
              alt="shape"
            />
          </div>
          <div className="video-shape two">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/video_shape02.png"}
              alt="shape"
            />
          </div>
        </section>
        <div className="cart__area section-py-130">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <table className="table cart__table">
                  <thead>
                    <tr>
                      <th className="product__thumb"></th>
                      <th className="product__name">Product</th>
                      <th className="product__price">Price</th>
                      <th className="product__quantity">Quantity</th>
                      <th className="product__subtotal">Subtotal</th>
                      <th className="product__remove"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {productData.map((product, index) => {
                      const totalPrice = product.price * product.quantity;
                      return (
                        <tr key={index}>
                          <td className="product__thumb">
                            <span className="text-dark">
                              <img
                                src={`https://files.fggroup.in/${product.display_image}`}
                                alt=""
                              />
                            </span>
                          </td>
                          <td className="product__name">
                            <span className="text-dark">{product.name}</span>
                          </td>
                          <td className="product__price">
                            ₹{product.price?.toFixed(2)}
                          </td>
                          <td className="product__quantity">
                            <div className="quickview-cart-plus-minus">
                              <input type="text" value={product.quantity} />
                            </div>
                          </td>
                          <td className="product__subtotal">
                            ₹{totalPrice?.toFixed(2)}
                          </td>
                          <td className="product__remove">
                            <button
                              className="border-0 bg-white product-close"
                              onClick={() =>
                                handleRemoveProduct(
                                  product._id,
                                  product.items_id
                                )
                              }
                            >
                              ×
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {/* <tr>
                      <td className="product__thumb">
                        <a href="shop-details.html">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/home_shop_thumb02.png"
                            }
                            alt=""
                          />
                        </a>
                      </td>
                      <td className="product__name">
                        <a href="shop-details.html">Time to Explore</a>
                      </td>
                      <td className="product__price">$19.00</td>
                      <td className="product__quantity">
                        <div className="quickview-cart-plus-minus">
                          <input type="text" value="1" />
                        </div>
                      </td>
                      <td className="product__subtotal">$19.00</td>
                      <td className="product__remove">
                        <a href="#">×</a>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="6" className="cart__actions">
                        <form action="#" className="cart__actions-form">
                          <input type="text" placeholder="Coupon code" />
                          <button type="submit" className="btn btn-sm">
                            Apply coupon
                          </button>
                        </form>
                        <div className="update__cart-btn text-end f-right">
                          <button type="submit" className="btn btn-sm">
                            Update cart
                          </button>
                        </div>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
              <div className="col-lg-4">
                <div className="cart__collaterals-wrap">
                  <h2 className="title">Cart totals</h2>
                  <ul className="list-wrap">
                    <li>
                      Subtotal <span>₹{totalAmount?.toFixed(2)}</span>
                    </li>
                    <li>
                      Delivery Charges{" "}
                      <span>{totalAmount <= 499 ? "₹85" : "FREE"}</span>
                    </li>
                    <li>
                      Total{" "}
                      <span className="amount">₹{totalAmount?.toFixed(2)}</span>
                    </li>
                  </ul>
                  <a href="checkout.html" className="btn btn-sm">
                    Proceed to checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <HomeNutritionFooter />
    </>
  );
}

export default AddToCart;
