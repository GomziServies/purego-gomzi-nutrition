import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { axiosInstance, publicAxiosInstance } from "../assets/js/config/api";
import { createPaymentProduct } from "../assets/js/utils/product";
import NutritionHeader from "./partials/Header/nutritionsheader";
import LoginModal from "../assets/js/popup/login";
import LoadingComponent from "./loadingComponent";
import lookup from "india-pincode-lookup";
import { toast } from "react-toastify";
import { Card, Modal } from "react-bootstrap";
import confetti from "canvas-confetti";

function CouponCode() {
  const [isCouponRupee, setIsCouponRupee] = useState(false);
  const [amountOnCouponCode, setAmountOnCouponCode] = useState();
  const [productDatas, setProductDatas] = useState([[]]);
  const [paymentMode, setPaymentMode] = useState("ONLINE");
  const productData = localStorage.getItem("productsData");
  const [isOpen, setIsOpen] = useState(false);
  const [mainPrice, setMainPrice] = useState();
  const [discountCost, setDiscountCost] = useState(null);
  const [courierId, setCourierId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quickData, setQuickData] = useState({});
  const [manualCouponCode, setManualCouponCode] = useState("");
  const [manualCouponCodeData, setManualCouponCodeData] = useState("");
  const [autoDiscount, setAutoDiscount] = useState(0);
  const [totalCouponDiscount, setTotalCouponDiscount] = useState(0);
  const [autoCouponData, setAutoCouponData] = useState(null);

  const closeModal = () => {
    setShowModal(false);
  };

  const UpdatedData = (productData) => {
    const data = JSON.parse(productData);
    const orderTotal = data.totalAmount;
    setProductDatas(data.products);
    setAmountOnCouponCode(orderTotal);

    let selectedAddToCartData = localStorage.getItem("selectedAddToCartData");
    selectedAddToCartData = JSON.parse(selectedAddToCartData);

    const totalDiscountPercentage = selectedAddToCartData
      .map((data) => parseInt(data.dis_point.replace("%", "")))
      .reduce((sum, value) => sum + value, 0);

    const averageDiscount =
      totalDiscountPercentage / selectedAddToCartData.length;

    let baseDiscount;
    let priceAfterAutoDiscount;

    if (orderTotal >= 2000) {
      const baseDiscountPercent = 50;
      const originalDiscountPercent = averageDiscount;
      baseDiscount = orderTotal * (baseDiscountPercent / 100);
      priceAfterAutoDiscount = orderTotal - baseDiscount;

      if (originalDiscountPercent > baseDiscountPercent) {
        const remainingDiscountPercent =
          originalDiscountPercent - baseDiscountPercent;

        const promoCode = `ONLINE${Math.round(remainingDiscountPercent)}`;

        const customOffer = {
          code: promoCode,
          description: `Extra ${Math.round(remainingDiscountPercent)}% OFF`,
          discount: remainingDiscountPercent,
          discount_type: "percent",
        };

        setOffers((prev) => {
          const isAlreadyPresent = prev.some(
            (offer) => offer.code === promoCode
          );
          if (!isAlreadyPresent) {
            return [...prev, customOffer];
          }
          return prev;
        });
      }
    } else if (orderTotal < 2000) {
      const baseDiscountPercent = 25;
      const originalDiscountPercent = averageDiscount;
      baseDiscount = orderTotal * (baseDiscountPercent / 100);
      priceAfterAutoDiscount = orderTotal - baseDiscount;

      if (originalDiscountPercent > baseDiscountPercent) {
        const remainingDiscountPercent =
          originalDiscountPercent - baseDiscountPercent;

        const promoCode = `ONLINE${Math.round(remainingDiscountPercent)}`;

        const customOffer = {
          code: promoCode,
          description: `Extra ${Math.round(remainingDiscountPercent)}% OFF`,
          discount: remainingDiscountPercent,
          discount_type: "percent",
        };
        setOffers((prev) => {
          const isAlreadyPresent = prev.some(
            (offer) => offer.code === promoCode
          );
          if (!isAlreadyPresent) {
            return [...prev, customOffer];
          }
          return prev;
        });
      }
    }

    setAutoDiscount(baseDiscount);
    setMainPrice(priceAfterAutoDiscount);
  };

  useEffect(() => {
    if (productData) {
      UpdatedData(productData);
    }
  }, [productData]);

  const calculateDiscountedPrice = (couponData) => {
    let discountAmount = 0;
    const totalDiscountPercentOrRupees = couponData.discount || 0;
    setAutoCouponData(couponData);

    let totalCouponAmount;
    if (couponData.discount_type === "rupees") {
      discountAmount = totalDiscountPercentOrRupees;
      totalCouponAmount = amountOnCouponCode - autoDiscount - discountAmount;
      setIsCouponRupee(true);
    } else {
      discountAmount =
        ((amountOnCouponCode - autoDiscount) * totalDiscountPercentOrRupees) /
        100;
      totalCouponAmount = amountOnCouponCode - autoDiscount - discountAmount;
      setIsCouponRupee(false);
    }

    setTotalCouponDiscount(discountAmount);
    setMainPrice(totalCouponAmount);
  };

  useEffect(() => {
    let quickProductData = localStorage.getItem("quickProductData");
    quickProductData = JSON.parse(quickProductData);

    if (quickProductData) {
      setQuickData(quickProductData);
      setMainPrice(parseInt(quickProductData?.discount));
    }
  }, []);

  const handleRemoveCoupon = () => {
    setManualCouponCode("");
    setManualCouponCodeData(null);
    setTotalCouponDiscount(0);
    setIsCouponRupee(false);
    setAutoCouponData(null);
    localStorage.removeItem("appliedCoupon");
    UpdatedData(productData);
  };

  const handleApplyClick = async (appliedCoupon, PromoCode) => {
    try {
      if (PromoCode?.AutoPromoCode) {
        toast.success("Coupon applied successfully");
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
        });
        setManualCouponCodeData(appliedCoupon);
        calculateDiscountedPrice(appliedCoupon);
      } else {
        let code = appliedCoupon || manualCouponCode;

        if (!code.trim()) {
          Swal.fire({
            icon: "warning",
            title: "Empty Code",
            text: "Please enter or select a valid promo code.",
          });
          return;
        }

        const payload = { coupon_code: code };
        const response = await publicAxiosInstance.post(
          "/check-coupon-code",
          payload
        );

        const couponData = response.data.data;

        setManualCouponCode(code);
        setManualCouponCodeData(couponData);
        localStorage.setItem("appliedCoupon", JSON.stringify(couponData));

        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
        });

        toast.success("Coupon applied successfully");
        calculateDiscountedPrice(couponData);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.response?.data?.message || "Failed to apply coupon.",
      });
    }
  };

  const [offers, setOffers] = useState([]);

  return (
    <>
      {showModal && <LoginModal onClose={closeModal} />}
      {loading && <LoadingComponent />}
      <main className="main-area fix">
        <div className="checkout__area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="order__info-wrap mb-3">
                  <div className="br-15">
                    <h2 className="promo-title">Apply Promo Code</h2>
                    <div className="d-lg-block d-none">
                      <div className="row flex-md-row flex-column mt-3 align-items-center justify-content-between">
                        <div className="col-md-8 ps-0 pe-md-2 pe-0">
                          <input
                            type="text"
                            placeholder="Enter Coupon Code"
                            className="form-control apply-form"
                            value={manualCouponCode}
                            disabled={!!manualCouponCodeData}
                            onChange={(e) =>
                              setManualCouponCode(e.target.value)
                            }
                            maxLength="100"
                          />
                        </div>
                        <div className="col-md-4 ps-md-2 ps-0 pe-0 mt-md-0 mt-3">
                          {manualCouponCodeData ? (
                            <button
                              type="button"
                              onClick={handleRemoveCoupon}
                              className="remove-btn w-100"
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleApplyClick()}
                              className="apply-btn w-100"
                            >
                              Apply
                            </button>
                          )}
                        </div>
                        <div className="col-12 text-center mt-3">
                          <p
                            className="m-0 d-inline-block text-primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowCouponModal(true)}
                          >
                            View Coupons
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-lg-none d-block">
                      <div className="col-md-8 ps-0 pe-md-2 pe-0">
                        <input
                          type="text"
                          placeholder="Enter Coupon Code"
                          className="form-control apply-form"
                          value={manualCouponCode}
                          disabled={!!manualCouponCodeData}
                          onChange={(e) => setManualCouponCode(e.target.value)}
                          maxLength="100"
                        />
                      </div>
                      <div className="col-md-4 ps-md-2 ps-0 pe-0 mt-md-0 mt-3">
                        {manualCouponCodeData ? (
                          <button
                            type="button"
                            onClick={handleRemoveCoupon}
                            className="remove-btn w-100"
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleApplyClick()}
                            className="apply-btn w-100"
                          >
                            Apply
                          </button>
                        )}
                      </div>
                      <div className="col-12 text-center mt-3">
                        <p
                          className="m-0 d-inline-block text-primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowCouponModal(true)}
                        >
                          View Coupons
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Modal
                  show={showCouponModal}
                  onHide={() => setShowCouponModal(false)}
                  centered
                  size="md"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Offers & Benefits</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {offers.map((offer, idx) => (
                      <Card key={idx} className="mb-3">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="me-2">
                              <div className="fw-bold">Code: {offer.code}</div>
                              <div>{offer.description}</div>
                              {offer.note && (
                                <div className="text-danger small">
                                  {offer.note}
                                </div>
                              )}
                            </div>
                            <button
                              className="popup-btn"
                              onClick={() => {
                                setManualCouponCode(offer.code);
                                setShowCouponModal(false);
                                handleApplyClick(offer, {
                                  AutoPromoCode: true,
                                });
                              }}
                            >
                              Apply
                            </button>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </Modal.Body>
                </Modal>
              </div>
              <div className="col-12">
                <div className="order__info-wrap">
                  <h2 className="title">YOUR ORDER</h2>
                  <ul className="list-wrap">
                    <li className="title text-dark">
                      Product <span>Subtotal</span>
                    </li>
                    <li>
                      Order Total{" "}
                      <span>₹{amountOnCouponCode?.toFixed(2)} /-</span>
                    </li>

                    {autoDiscount !== 0 &&
                      (amountOnCouponCode < 2000 ? (
                        <li>
                          Discount (25%){" "}
                          <span className="text-danger">
                            - ₹{autoDiscount.toFixed(2)} /-
                          </span>
                        </li>
                      ) : (
                        <li>
                          Discount (50%){" "}
                          <span className="text-danger">
                            - ₹{autoDiscount.toFixed(2)} /-
                          </span>
                        </li>
                      ))}

                    {totalCouponDiscount !== 0 && (
                      <li>
                        Coupon Discount{" "}
                        {!isCouponRupee &&
                          `(${Math.round(
                            autoCouponData?.discount || 0
                          )}%)`}{" "}
                        <span className="text-danger">
                          -{" "}
                          {isCouponRupee
                            ? `₹${totalCouponDiscount.toFixed(2)}`
                            : `₹${totalCouponDiscount.toFixed(2)} /-`}
                          {isCouponRupee && " /-"}
                        </span>
                      </li>
                    )}
                    <li>
                      Delivery Charges{" "}
                      <span className="text-success">
                        {discountCost ? "+ ₹" + discountCost : "Enter Pincode"}{" "}
                        /-
                      </span>
                    </li>
                    <li className="text-dark">
                      Amount Payable <span>₹{mainPrice?.toFixed(2)} /-</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default CouponCode;
