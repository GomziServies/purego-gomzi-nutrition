import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import NutritionHeader from "../../components/partials/Header/nutritionsheader";
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
import { axiosInstance, publicAxiosInstance } from "../../assets/js/config/api";
import LoginModal from "../../assets/js/popup/login";
import LoadingComponent from "../../components/loadingComponent";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import MoreProduct from "../../components/MoreProduct";
import LogoComponent from "../../components/logoComponent";

function AddToCart() {
  const canonicalUrl = window.location.href;
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [productData, setProductData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [serverDataID, setServerDataID] = useState("");
  const [productDataGet, setProductDataGet] = useState([]);
  const [previousProductData, setPreviousProductData] = useState([]);
  const [totalMRP, setTotalMRP] = React.useState(0);
  const [showModal, setShowModal] = useState(false);
  const [cartDataClick, setCartDataClick] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchProductCartData = async () => {
    setLoading(true);
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
      setPreviousProductData(updatedServerData);
      setProductData(updatedServerData);
      totalAmountCalculation(updatedServerData);
      setProductDataGet(updatedServerData);
      totalMRPCalculation(updatedServerData);

      setCartDataClick(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductCartData();

    const isLogin = localStorage.getItem("fg_group_user_authorization");
    if (!isLogin) {
      return openModal();
    }
  }, [cartDataClick]);

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
      setCartDataClick(true);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const totalMRPCalculation = (data) => {
    const totalMrp = data.map((product) => {
      const mrp = product.mrpPrice * product.quantity;
      return mrp;
    });
    const amount = totalMrp.reduce((sum, product) => sum + product, 0);
    setTotalMRP(amount || 0);
    return amount;
  };

  const minusQuantity = (productId) => {
    setProductDataGet((prevData) => {
      const updatedData = prevData.map((product) =>
        product._id === productId
          ? { ...product, quantity: Math.max(1, product.quantity - 1) }
          : product
      );
      const changedProducts = updatedData.filter((product) => {
        const originalProduct = prevData.find((p) => p._id === product._id);
        return originalProduct && originalProduct.quantity !== product.quantity;
      });
      totalAmountCalculation(updatedData);
      totalMRPCalculation(updatedData);
      setTimeout(async () => {
        handleUpdateCart(changedProducts);
      }, 1000);
      return updatedData;
    });
  };

  const plusQuantity = (productId) => {
    setProductDataGet((prevData) => {
      const updatedData = prevData.map((product) =>
        product._id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );

      const changedProducts = updatedData.filter((product) => {
        const originalProduct = prevData.find((p) => p._id === product._id);
        return originalProduct && originalProduct.quantity !== product.quantity;
      });

      totalAmountCalculation(updatedData);
      totalMRPCalculation(updatedData);

      setTimeout(() => {
        handleUpdateCart(changedProducts);
      }, 1000);

      return updatedData;
    });
  };

  const handleUpdateCart = async (updatedData) => {
    try {
      await axiosInstance.post("/order-cart/add-item", updatedData[0]);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleAddToCart = async () => {
    setLoading1(true);
    try {
      const changedProducts = productDataGet.filter((currentProduct) => {
        const previousProduct = previousProductData.find(
          (p) => p._id === currentProduct._id
        );
        return (
          previousProduct &&
          previousProduct.quantity !== currentProduct.quantity
        );
      });

      if (changedProducts.length > 0) {
        const products = productDataGet.map((product) => ({
          product_id: product._id,
          quantity: product.quantity,
        }));
        const allProductsData = productDataGet.map((product) => ({
          product_id: product._id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
        }));

        const response = await axiosInstance.post(
          "/order-cart/add-item",
          changedProducts[0]
        );

        if (response.data.status === 200) {
          setPreviousProductData(productDataGet);
          localStorage.setItem(
            "productsData",
            JSON.stringify({
              products,
              totalAmount,
              totalMRP,
            })
          );
          localStorage.setItem(
            "allProductsData",
            JSON.stringify({
              allProductsData,
              totalAmount,
              totalMRP,
            })
          );

          window.location.href = `/check-out`;
        }
      } else {
        const products = productDataGet.map((product) => ({
          product_id: product._id,
          quantity: product.quantity,
        }));
        const allProductsData = productDataGet.map((product) => ({
          product_id: product._id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
        }));

        localStorage.setItem(
          "productsData",
          JSON.stringify({
            products,
            totalAmount,
            totalMRP,
          })
        );
        localStorage.setItem(
          "allProductsData",
          JSON.stringify({
            allProductsData,
            totalAmount,
            totalMRP,
          })
        );

        localStorage.setItem("serverDataID", serverDataID);

        window.location.href = `/check-out`;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
    setLoading1(false);
  };

  const [cartItemName, setCartItemName] = useState([]);
  const [productsId, setProductsId] = useState([
    "67e7749163f930dcc6a2715d",
    "67e774a963f930dcc6a2715f",
    "67e774c463f930dcc6a27161",
    "67e7745f63f930dcc6a2715b",
    "67e7740363f930dcc6a27157",
    "67e7742d63f930dcc6a27159",
    "67e773f463f930dcc6a27155",
  ]);
  const [productReviewsData, setProductReviewsData] = useState([]);

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

  const options = {
    loop: true,
    dots: false,
    dotsEach: true,
    nav: false,
    autoplayTimeout: 3000,
    smartSpeed: 500,
    responsive: {
      0: { items: 1 },
      600: { items: 3 },
      1000: { items: 4 },
    },
  };

  const addProductInCart = async (product_id) => {
    try {
      const isLogin = localStorage.getItem("fg_group_user_authorization");
      if (!isLogin) {
        return openModal();
      }
      const response = await axiosInstance.post("/order-cart/add-item", {
        item_id: product_id,
        quantity: 1,
        item_type: "PURE_GO_MEAL_PRODUCT",
      });
      if (response.data.response === "OK") {
        toast.success("Product added in cart.");
        fetchProductData();
        fetchProductCartData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Pure Go | Best Whey Protein in India | Premium Supplements
        </title>
        <meta
          name="description"
          content="Discover Pure Go, your go-to destination for the best whey protein and premium nutrition supplements in India. Boost your fitness journey with our high-quality products tailored for muscle growth, weight loss, and overall health."
        />
        <meta
          name="keyword"
          content="bowelease  Constipation Relief, shop near by me, diet supplements near me, best multivitamins for men india, booster testosterone, how to fat burn, supplement shop near, whey isolate vs protein, whey protein vs whey protein isolate, women's protein powder for weight gain, protein powder for weight gain woman, which best peanut butter, nutrition in 100g oats"
        />
        {/* <meta
          property="og:image"
          content="https://www.purego.gomzilifesciences.in/assets/process.env.PUBLIC_URL + '/assets/images/nutrition-logo.png"
        /> */}
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
      {/* <LoaderComponent /> */}
      {showModal && <LoginModal onClose={closeModal} />}
      {/* {(loading || loading1) && <LoadingComponent />} */}
      <LoadingComponent isLoading={loading || loading1} />
      <NutritionHeader productDataGet={productDataGet} />
      <button className="scroll-top scroll-to-target" data-target="html">
        <i className="fas fa-angle-up"></i>
      </button>
      <main className="main-area fix">
        <div className="cart__area section-py-130 pb-0">
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
                    {productDataGet.map((product, index) => {
                      const totalPrice = product.price * product.quantity;
                      return (
                        <tr key={index}>
                          <td className="product__thumb">
                            <span className="text-dark">
                              <img
                                src={`https://files.fggroup.in/${product.display_image}`}
                                alt="product"
                              />
                            </span>
                          </td>
                          <td className="product__name">
                            <span className="text-dark">{product.name}</span>
                          </td>
                          <td className="product__price">
                            ₹{product.price?.toFixed(2)}
                          </td>
                          <td>
                            <div className="product__quantity d-flex align-items-center">
                              <i
                                className="fas fa-minus text-dark me-2 fs-6"
                                onClick={() => minusQuantity(product._id)}
                              ></i>
                              <div className="quickview-cart-plus-minus">
                                <input type="text" value={product.quantity} />
                              </div>
                              <i
                                className="fas fa-plus text-dark ms-2 fs-6"
                                onClick={() => plusQuantity(product._id)}
                              ></i>
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
                  </tbody>
                </table>
                {productDataGet.length === 0 && (
                  <h5 className="text-center mt-3">No items found</h5>
                )}
              </div>
              <div className="col-lg-4">
                <div className="cart__collaterals-wrap">
                  <h2 className="title">Cart totals</h2>
                  <ul className="list-wrap">
                    <li>
                      Subtotal <span>₹{totalAmount?.toFixed(2)}</span>
                    </li>
                    <li>
                      Extra Charges{" "}
                      <span>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </li>
                    <li className="fs-5">
                      Total{" "}
                      <span className="amount">₹{totalAmount?.toFixed(2)}</span>
                    </li>
                  </ul>
                  <div className="inner-shop-perched-info mt-3">
                    <button
                      onClick={handleAddToCart}
                      className="cart-btn w-100 m-0"
                      disabled={productDataGet.length === 0}
                    >
                      Proceed to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MoreProduct
          setCartDataClick={setCartDataClick}
          cartDataClick={cartDataClick}
        />
      </main>
      <HomeNutritionFooter />
    </>
  );
}

export default AddToCart;
