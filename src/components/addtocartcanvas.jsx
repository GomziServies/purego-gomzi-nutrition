import React, { useState, useEffect } from "react";
import "../assets/css/offcanvase.css";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { axiosInstance } from "../assets/js/config/api";
// import {
//   AdvanceClinicalNutritionBookData,
//   AnabolicAndrogenicSteroidsBookData,
//   BechelorNutritionBookData,
//   DiplomainHealthBookData,
//   DiplomaInNutritionBookData,
//   FGIITAllCoursesBookData,
//   FitnessCoursesAllBookData,
//   GroupInstructorMasterclassBookData,
//   InjuryRehabBookData,
//   PersonalTrainingBookData,
//   PowerliftingBookData,
//   RapidTransformation1BookData,
//   RapidTransformation2BookData,
//   RapidTransformationBookData,
//   RapidTransformationPrepBookData,
//   RapidTransformationWeightLossBookData,
//   RTP2BookData,
// } from "./AllBookData";

const AddtoCartOffCanvas = ({ isOpen, onClose, books, selectedBookId }) => {
  const [animateOpen, setAnimateOpen] = useState(false);
  const [productDataGet, setProductDataGet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalMRP, setTotalMRP] = useState(0);
  const [previousProductData, setPreviousProductData] = useState([]);
  const [serverDataID, setServerDataID] = useState("");
  const [languageImg, setLanguageImg] = useState("English");
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("fg_group_user_authorization")
  );
  const [moreProductData, setMoreProductData] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setAnimateOpen(true);
    } else {
      setAnimateOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (books && !isFetchingData) {
      fetchBooksCartData();
    }
  }, [books]);

  const fetchBooksCartData = async () => {
    if (isFetchingData) return;

    setLoading(true);
    setIsFetchingData(true);

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
        map[product.book_id] = product.mrpPrice;
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

      const updatedServerData = combinedData.map((product) => ({
        ...product,
        mrpPrice: priceMap[product.item_id] || product.mrpPrice,
      }));

      setPreviousProductData(updatedServerData);
      totalMRPCalculation(updatedServerData);
      setProductDataGet(updatedServerData);
      totalAmountCalculation(updatedServerData);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }

    setLoading(false);
    setIsFetchingData(false); // Reset fetching state
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

  const handleRemoveProduct = async (cart_id, book_id) => {
    try {
      await axiosInstance.delete(
        `/order-cart/remove-item?item_id=${book_id}&cart_id=${serverDataID}`
      );
      setProductDataGet((prevData) =>
        prevData.filter((product) => product._id !== cart_id)
      );
      const existingData = JSON.parse(
        localStorage.getItem("addItemInCart")
      ) || { products: [] };
      existingData.products = existingData.products.filter(
        (product) => product.book_id !== book_id
      );
      localStorage.setItem("addItemInCart", JSON.stringify(existingData));
      fetchBooksCartData();
    } catch (error) {
      console.error("Error removing product:", error);
    }
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
          ? {
            ...product,
            quantity:
              product.quantity < 5 ? product.quantity + 1 : product.quantity, // Ensure quantity doesn't go above 5
          }
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

  const handleAddToCart = async (e) => {
    e.preventDefault();
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

      if (changedProducts?.length > 0) {
        const products = productDataGet.map((product) => ({
          book_id: product._id,
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

          window.location.href = `/book/check-out`;
        }
      } else {
        const products = productDataGet.map((product) => ({
          book_id: product._id,
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

        window.location.href = `/book/check-out`;
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

  const toggleMenu = async (data, BuyButton, e) => {
    e.preventDefault();
    try {
      if (isAuthenticated) {
        const existingData = JSON.parse(
          localStorage.getItem("addItemInCart")
        ) || { products: [] };
        const productExists = existingData.products.some(
          (product) => product.book_id === selectedBookId
        );

        if (!productExists) {
          existingData.products.push({
            book_id: BuyButton,
            // quantity: data?.quantity || 1,
            mrpPrice: data.prices || 0,
            data: data,
          });
        }

        localStorage.setItem("addItemInCart", JSON.stringify(existingData));
        const response = await axiosInstance.post("/order-cart/add-item", {
          item_id: BuyButton,
          data: data,
          quantity: data?.quantity || 1,
          item_type: "BOOKS",
        });
        if (response.data.response === "OK") {
          fetchBooksCartData();
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // const carouselData = (language) => {
  //   const array = [
  //     PersonalTrainingBookData,
  //     BechelorNutritionBookData,
  //     AdvanceClinicalNutritionBookData,
  //     RapidTransformation1BookData,
  //     RapidTransformation2BookData,
  //     FitnessCoursesAllBookData,
  //     GroupInstructorMasterclassBookData,
  //     RapidTransformationBookData,
  //     FGIITAllCoursesBookData,
  //     InjuryRehabBookData,
  //     DiplomainHealthBookData,
  //     DiplomaInNutritionBookData,
  //     PowerliftingBookData,
  //     RapidTransformationPrepBookData,
  //     AnabolicAndrogenicSteroidsBookData,
  //     RapidTransformationWeightLossBookData,
  //     RTP2BookData,
  //   ];

  //   const productData = array.flatMap((product) => {
  //     if (product?.hindibookImg) {
  //       return [
  //         {
  //           coverImage: product?.englishbookImg?.[0],
  //           title: product.name,
  //           BuyButton: product?.BuyButton?.BuyBook,
  //           data: product,
  //         },
  //         {
  //           coverImage: product?.hindibookImg?.[0],
  //           title: `${product.name} - Hindi`,
  //           BuyButton: product?.BuyButton?.BuyHindiBook,
  //           data: product,
  //         },
  //       ];
  //     } else {
  //       return {
  //         coverImage: product?.englishbookImg?.[0],
  //         title: product.name,
  //         BuyButton: product?.BuyButton?.BuyBook,
  //         data: product,
  //       };
  //     }
  //   });

  //   setMoreProductData(productData);
  // };

  // useEffect(() => {
  //   carouselData(languageImg);
  // }, [languageImg]);

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      <div className={`offcanvas ${animateOpen ? "open" : ""}`}>
        <div
          className="d-flex justify-content-between px-2 pt-2"
          style={{ background: "rgb(238 238 238)" }}
        >
          <h2 className="h4-fs">YOUR CART</h2>
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
            productDataGet?.length > 0 && (
              <div>
                <div className="col-12 cart-detail py-3">
                  {productDataGet.map((product, index) => {
                    const totalPrice = product.amount * product.quantity;
                    // const totalMRPPrice = product.mrpPrice * product.quantity;
                    return (
                      <div
                        key={index}
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
                                  src={`https://files.fggroup.in/${product.display_image?.[0]}`}
                                />
                              </span>
                            </div>
                            <div className="col-7">
                              <div className="media-body align-self-center">
                                <div className="d-flex justify-content-between">
                                  <div className="col-12 p-0">
                                    <h2
                                      className="f-rob-bol d-inline-block h3-fs cp mb-2 fs-21"
                                      title={product.name}
                                    >
                                      {product.name?.length > 30
                                        ? product.name.slice(0, 30) +
                                        "..."
                                        : product.name}
                                    </h2>
                                    {/* <h2 className="h3-fs f-rob-bol f-14 cp mb-1">
                                    ({product.size ? product.size : "N/A"}){" "}
                                  </h2> */}
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
                                      ₹{product.price.toFixed(2)}
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
                                    className="closess mr-3 closse-mobile-1 p-0"
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
                  {/* <div>
                    <div className="mb-3">
                      <h2
                        className="f-rob-bol h3-fs d-inline-block cp fs-24"
                        style={{ fontSize: "21px" }}
                      >
                        More Products
                      </h2>
                    </div>

                    <OwlCarousel
                      id="fwg-owl"
                      className="owl-theme"
                      {...carouselOptions}
                    >
                      {moreProductData
                        .filter((product) => product.coverImage) // Filter out products with undefined coverImage
                        .map((product, index) => (
                          <div
                            className="item d-flex justify-content-center"
                            key={index}
                          >
                            <div
                              className="d-inline-block"
                              tabIndex="-1"
                              style={{ width: "80%", display: "inline-block" }}
                            >
                              <div className="col-12 p-0">
                                <div className="categories-product-main text-center">
                                  <div className="category-product-item">
                                    <Link
                                      to={product?.data?.link}
                                      className="book"
                                    >
                                      <img
                                        effect="blur"
                                        className="lazy"
                                        src={
                                          process.env.PUBLIC_URL +
                                          product.coverImage
                                        }
                                        alt={product.title}
                                      />
                                    </Link>
                                  </div>
                                  <div className="custom-tooltip-main">
                                    <p className="my-2 f-pop-sembol text-dark fs-15 lh-0">
                                      {product.title?.length > 30
                                        ? product.title.slice(0, 30) + "..."
                                        : product.title}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <button
                                    className="addtocartbtncart"
                                    onClick={(e) =>
                                      toggleMenu(
                                        product.data,
                                        product.BuyButton,
                                        e
                                      )
                                    }
                                  >
                                    Add To Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </OwlCarousel>
                  </div> */}
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
                          onClick={(e) => handleAddToCart(e)}
                          className="bg-blue d-block text-uppercase px-3 px-lg-5 text-white f-16 f-rob-bol rate-btn-blue"
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
          {productDataGet?.length === 0 && !loading && (
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
                    <Link to="/book/health-books">
                      <button className="bg-blue text-uppercase px-2 mt-3 px-lg-5 py-2 text-white f-16 f-rob-bol">
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
