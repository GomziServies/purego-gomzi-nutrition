import React, { useState, useEffect } from "react";
import "../assets/css/offcanvase.css";
import { Form } from "react-bootstrap";
import { axiosInstance } from "../assets/js/config/api";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const AddtoCartOffCanvas = ({ isOpen, onClose, productData }) => {
  const [animateOpen, setAnimateOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productDataGet, setProductDataGet] = React.useState([]);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [serverDataID, setServerDataID] = React.useState("");
  const [totalMRP, setTotalMRP] = React.useState(0);
  const [previousProductData, setPreviousProductData] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setAnimateOpen(true);
    } else {
      setAnimateOpen(false);
    }
  }, [isOpen]);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/order-cart/get-carts?item_type=FG_MEAL_PRODUCT&is_purchase=true"
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

      // if (!itemDataForGetQty.length || !itemDataForGetImgName.length) {
      //   console.error("No items or item details found in the response.");
      //   return;
      // }

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
      totalMRPCalculation(updatedServerData);
      setProductDataGet(updatedServerData);
      totalAmountCalculation(updatedServerData);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
    setLoading(false);
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

  useEffect(() => {
    if (productData) {
      fetchProductData();
    }
  }, [productData]);

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

          window.location.href = `/nutrition/check-out`;
        }
      } else {
        const products = productDataGet.map((product) => ({
          product_id: product._id,
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

        window.location.href = `/nutrition/check-out`;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const carouselOptions = {
    loop: true,
    autoplay: false,
    dots: false,
    nav: false,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 2,
      },
    },
  };

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      <div className={`offcanvas ${animateOpen ? "open" : ""}`}>
        <div
          className="d-flex justify-content-between px-2 pt-2"
          style={{ background: "rgb(238 238 238)" }}
        >
          <h4>YOUR CART</h4>
          <button
            type="button"
            className="closess closse-mobile p-0"
            onClick={onClose}
            style={{
              backgroundColor: "transparent",
              border: "none",
              width: "50px",
            }}
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true" className="p-0">
              <i className="fas fa-times text-black"></i>
            </span>
          </button>
        </div>
        <div>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center mb-4 my-7 loader-h">
              <div class="loader"></div>
            </div>
          ) : (
            productDataGet.length > 0 && (
              <div>
                <div className="col-12 cart-detail py-3">
                  {productDataGet.map((product) => {
                    const totalPrice = product.price * product.quantity;
                    // const totalMRPPrice = product.mrpPrice * product.quantity;
                    return (
                      <div
                        key={product._id}
                        className="cart-item-main p-2 p-md-3 bg-white br-15 shadow mb-4 position-relative"
                      >
                        <div className="media bg-white cart-main">
                          <div className="row">
                            <div className="col-3 p-0">
                              <span
                                className="lazy-load-image-background blur lazy-load-image-loaded"
                                style={{ display: "inline-block" }}
                              >
                                <img
                                  alt="product"
                                  className="img-fluid cp"
                                  src={`https://files.fggroup.in/${product.display_image}`}
                                />
                              </span>
                            </div>
                            <div className="col-7">
                              <div className="media-body align-self-center">
                                <div className="d-flex justify-content-between">
                                  <div className="col-12 p-0">
                                    <h3
                                      className="f-rob-bol d-inline-block cp mb-2"
                                      style={{ fontSize: "21px" }}
                                    >
                                      {product.name}
                                    </h3>
                                    {/* <h3 className="f-rob-bol f-14 cp mb-1">
                                    ({product.size ? product.size : "N/A"}){" "}
                                  </h3> */}
                                  </div>
                                </div>
                                <div className="cart-add align-items-center mt-3">
                                  <div className="d-flex align-items-center mx-2">
                                    <i
                                      className="fas fa-minus text-dark mr-2"
                                      onClick={() => minusQuantity(product._id)}
                                    ></i>
                                    <Form.Group className="text-center">
                                      <Form.Control
                                        type="number"
                                        id="txt_quantity"
                                        value={product.quantity}
                                        min="1"
                                        className="mb-0"
                                        readOnly
                                        style={{
                                          borderRadius: "5px",
                                          width: "45px",
                                          height: "30px",
                                        }}
                                      />
                                    </Form.Group>
                                    <i
                                      className="fas fa-plus text-dark ml-2"
                                      onClick={() => plusQuantity(product._id)}
                                    ></i>
                                  </div>
                                </div>
                                <ul className="list-unstyled m-0">
                                  <li className="d-block">
                                    <span className="d-inline-block f-rob-med f-13 mr-2">
                                      Inclusive of all taxes
                                    </span>
                                  </li>
                                </ul>
                                <div className="col-12 p-0 mt-1">
                                  <div className="d-inline-block">
                                    <span className="d-inline-block mr-2 f-rob-bol f-22">
                                      ₹{totalPrice.toFixed(2)}
                                    </span>
                                    {/* <p>
                                    MRP:&nbsp;
                                    <span className="price--line-through">
                                      ₹{totalMRPPrice}
                                    </span>
                                  </p> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-2">
                              <div className="right">
                                <div className="remove">
                                  <button
                                    type="button"
                                    className="closess mr-3 closse-mobile p-0"
                                    style={{
                                      backgroundColor: "transparent",
                                      border: "none",
                                      width: "50px",
                                    }}
                                    onClick={() =>
                                      handleRemoveProduct(
                                        product._id,
                                        product.items_id
                                      )
                                    }
                                    aria-label="Remove"
                                  >
                                    <span aria-hidden="true" className="p-0">
                                      <i className="fa-solid fa-trash-can text-black"></i>
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div>
                    <h3
                      className="f-rob-bol d-inline-block cp mb-2"
                      style={{ fontSize: "21px" }}
                    >
                      More Products
                    </h3>
                    <OwlCarousel
                      id="fwg-owl"
                      className="owl-theme"
                      {...carouselOptions}
                    >
                      <div className="item">
                        <div
                          className="d-inline-block"
                          tabIndex="-1"
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div className="col-12">
                            <div className="categories-product-main text-center">
                              <div className="category-product-item">
                                <Link to="/nutrition/gomzi-nutrition-whey-protein-chocolate">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/nutrition/categories-1.webp"
                                    }
                                    className="img-fluid  "
                                    alt="Whey Protein"
                                    effect="blur"
                                  />
                                </Link>
                              </div>
                              <div className="custom-tooltip-main">
                                <p className="my-2 f-pop-sembol f-14 text-dark">
                                  Whey Protein
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div
                          className="d-inline-block"
                          tabIndex="-1"
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div className="col-12">
                            <div className="categories-product-main text-center">
                              <div className="category-product-item">
                                <Link to="/nutrition/gomzi-nutrition-whey-protein-concentrate">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/nutrition/categories-3.webp"
                                    }
                                    className="img-fluid  "
                                    alt="Whey Concentrate"
                                    effect="blur"
                                  />
                                </Link>
                              </div>
                              <div className="custom-tooltip-main">
                                <p className="my-2 f-pop-sembol f-14 text-dark">
                                  Whey Concentrate
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div
                          className="d-inline-block"
                          tabIndex="-1"
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div className="col-12">
                            <div className="categories-product-main text-center">
                              <div className="category-product-item">
                                <Link to="/nutrition/gomzi-nutrition-whey-protein-isolate">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/nutrition/categories-2.webp"
                                    }
                                    className="img-fluid  "
                                    alt="Whey Isolate"
                                    effect="blur"
                                  />
                                </Link>
                              </div>
                              <div className="custom-tooltip-main">
                                <p className="my-2 f-pop-sembol f-14 text-dark">
                                  Whey Isolate
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div
                          className="d-inline-block"
                          tabIndex="-1"
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div className="col-12">
                            <div className="categories-product-main text-center">
                              <div className="category-product-item">
                                <Link to="/nutrition/gomzi-nutrition-ignite-fat-burner">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/nutrition/categories-5.webp"
                                    }
                                    className="img-fluid  "
                                    alt="GNC Mega Men"
                                    effect="blur"
                                  />
                                </Link>
                              </div>
                              <div className="custom-tooltip-main">
                                <p className="my-2 f-pop-sembol f-14 text-dark">
                                  Ignite Fat Burner
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div
                          className="d-inline-block"
                          tabIndex="-1"
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div className="col-12">
                            <div className="categories-product-main text-center">
                              <div className="category-product-item">
                                <Link to="/nutrition/gomzi-nutrition-spark-eaa">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/nutrition/categories-6.webp"
                                    }
                                    className="img-fluid  "
                                    alt="Spark EAA"
                                    effect="blur"
                                  />
                                </Link>
                              </div>
                              <div className="custom-tooltip-main">
                                <p className="my-2 f-pop-sembol f-14 text-dark">
                                  Spark EAA
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div
                          className="d-inline-block"
                          tabIndex="-1"
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div className="col-12">
                            <div className="categories-product-main text-center">
                              <div className="category-product-item">
                                <Link to="/nutrition/gomzi-nutrition-atp-creatine">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/nutrition/categories-7.webp"
                                    }
                                    className="img-fluid  "
                                    alt="ATP Creatine"
                                    effect="blur"
                                  />
                                </Link>
                              </div>
                              <div className="custom-tooltip-main">
                                <p className="my-2 f-pop-sembol f-14 text-dark">
                                  ATP Creatine
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </OwlCarousel>
                  </div>
                </div>
                <div
                  className="d-flex flex-column align-items-center checkout-main-1"
                  style={{ background: "rgb(238 238 238)" }}
                >
                  <div className="w-100 p-2 pb-3">
                    <div className="subtotal-main shadow bg-white br-15 mb-3 p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <p className="m-0 f-rob-bol f-16">Total Amount</p>
                        </div>
                        <div>
                          <span className="d-inline-block f-rob-med f-16 text-lig-gray">
                            ₹{totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 text-center">
                      <div className="common-button">
                        <button
                          onClick={handleAddToCart}
                          className="bg-yellow d-block text-uppercase px-3 px-lg-5 text-white f-16 f-rob-bol rate-btn"
                        >
                          Check OUT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
          {productDataGet.length === 0 && !loading && (
            <div className="d-flex align-items-center position-absolute h-100">
              <div className="row">
                <div className="col-12">
                  <img
                    alt="Coming Soon"
                    className="img-fluid"
                    src={`${process.env.PUBLIC_URL} /assets/images/nutrition/empty.webp`}
                    width="100%"
                    height="auto"
                  />
                  <p className="m-0 f-rob-bol f-20 mt-4 text-center">
                    <b>Your Cart Is Empty</b>
                  </p>
                  <div className="common-button mx-2">
                    <Link to="/">
                      <button className="bg-dark-section text-uppercase px-2 mt-3 px-lg-5 py-2 text-white f-16 f-rob-bol">
                        Go Home
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddtoCartOffCanvas;
