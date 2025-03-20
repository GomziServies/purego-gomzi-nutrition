import Swal from "sweetalert2";
import { axiosInstance } from "../config/api";

export const minusQuantity = () => {
  let quantity = document.getElementById("txt_quantity").value;
  if (quantity > 1) {
    quantity--;
    document.getElementById("txt_quantity").value = quantity;
  } else {
    return Swal.fire({
      title: "Error",
      text: "Min 1 book required for order!",
      icon: "error",
    });
  }
};

export const plusQuantity = () => {
  let quantity = document.getElementById("txt_quantity").value;
  if (quantity < 10) {
    quantity++;
    document.getElementById("txt_quantity").value = quantity;
  } else {
    return Swal.fire({
      title: "Error",
      text: "Max limit is 10 books per order!",
      icon: "error",
    });
  }
};

export const directBuyBookAction = () => {
  let bookSearchParams = new URLSearchParams(window.location.search);

  if (
    bookSearchParams.has("action") &&
    bookSearchParams.get("action") === "directBuyBook"
  ) {
    let findPayload = localStorage.getItem("tmp_ProductPurchasePayload");
    if (findPayload) {
      try {
        findPayload = JSON.parse(findPayload);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export const createPaymentProduct = (
  products,
  data,
  coupon_id,
  payment_mode
) => {
  let quantity = data.quantity;
  let address_line_1 = data.address_line_1;
  let address_line_2 = data.address_line_2;
  let city = data.city;
  let pin_code = data.pin_code;
  let state = data.state;
  let country = data.country;

  let address = {
    address_line_1: address_line_1,
    address_line_2: address_line_2,
    city: city,
    pin_code: pin_code,
    state: state,
    country: country,
  };

  if (!address_line_1 || !city || !pin_code || !state || !country) {
    return Swal.fire({
      title: "Error",
      text: "Address, City and Pin code are required",
      icon: "error",
    });
  }

  return createProductOrder(
    products,
    quantity,
    address,
    coupon_id,
    payment_mode
  );
};

export const createProductOrder = async (
  products,
  quantity = 1,
  address,
  coupon_id,
  payment_mode
) => {
  try {
    if (!products) {
      throw new Error("Product ID is required.");
    }

    if (!address) {
      throw new Error("Address, city, and pin code are required!");
    }

    if (!address.address_line_1 || !address.city || !address.pin_code) {
      throw new Error("Address, city, and pin code are required!");
    }

    if (
      quantity === undefined ||
      isNaN(parseInt(quantity)) ||
      parseInt(quantity) < 1
    ) {
      throw new Error("Min 1 Product required for order!");
    }

    let { address_line_1, address_line_2, city, pin_code, state, country } =
      address;

    let payload = {
      products,
      quantity: parseInt(quantity),
      payment_mode,
    };

    if (coupon_id) {
      payload.coupon_id = coupon_id;
    }

    if (address_line_1 && city && pin_code) {
      address_line_1 = String(address_line_1).trim();
      city = String(city).trim();
      pin_code = String(pin_code).trim();

      if (address_line_1.length === 0) {
        throw new Error("Address Line 1 is required!");
      }

      if (city.length === 0) {
        throw new Error("City name is invalid!");
      }

      if (state.length === 0) {
        throw new Error("State name is invalid!");
      }

      if (country.length === 0) {
        throw new Error("Country name is invalid!");
      }

      if (isNaN(parseInt(pin_code)) || pin_code.length !== 6) {
        throw new Error("Pin Code is invalid!");
      }

      payload.address_line_1 = address_line_1;
      payload.city = city;
      payload.pin_code = pin_code;
      payload.state = state;
      payload.country = country;
      payload.payment_mode = payment_mode;
    }

    if (address_line_2) {
      payload.address_line_2 = String(address_line_2).trim();
    }
    // Will use after authentication
    localStorage.setItem(
      "tmp_ProductPurchasePayload",
      JSON.stringify({
        ...payload,
        expire: new Date().getTime() + 1000 * 60 * 60 * 5,
      })
    );

    // Check Authentication
    if (
      localStorage.getItem("fg_group_user_authorization") === null ||
      localStorage.getItem("user_info") === null
    ) {
      localStorage.removeItem("fg_group_user_authorization");
      localStorage.removeItem("user_info");

      // expire in 5h
      return { showLoginModal: true };
    }

    const result = await axiosInstance.post("/meals/create-order", payload);

    if (
      (result &&
        result.data &&
        result.data.status === 200 &&
        result.data.message === "COD Order Created Successfully") ||
      (result &&
        result.status === 200 &&
        result.response === "OK" &&
        result.message === "COD Order Created Successfully")
    ) {
      Swal.fire({
        title: "Success",
        text: "Please check your email for the invoice.",
        icon: "success",
      }).then(() => {
        // Remove temporary data and coupon id
        localStorage.removeItem("tmp_ProductPurchasePayload");
        localStorage.removeItem("coupon_id");
        // Redirect to Order Page
        window.location.href = "/nutrition/thank-you-for-order";
      });

      return { showLoginModal: false, success: true };
    } else if (result && result.data) {
      result.data.data.handler = () => {
        localStorage.removeItem("tmp_ProductPurchasePayload");
        Swal.fire({
          title: "Success",
          text: "Please check your email for the invoice.",
          icon: "success",
        }).then(() => {
          // Remove coupon id
          localStorage.removeItem("coupon_id");

          // Redirect to Order Page
          window.location.href = "/user/order";
        });
      };

      result.data.data.hidden = {
        contact: false,
        email: false,
      };
      new window.Razorpay(result.data.data).open();
      return { showLoginModal: false, success: true };
    } else if (result && result.status === 200) {
      result.data.data.handler = () => {
        localStorage.removeItem("tmp_ProductPurchasePayload");
        Swal.fire({
          title: "Success",
          text: "Please check your email for the invoice.",
          icon: "success",
        }).then(() => {
          // Remove coupon id
          localStorage.removeItem("coupon_id");

          // Redirect to Order Page
          window.location.href = "/nutrition/thank-you-for-order";
        });
      };

      result.data.data.hidden = {
        contact: false,
        email: false,
      };
      new window.Razorpay(result.data.data).open();
      return { showLoginModal: false, success: true };
    }
  } catch (error) {
    if (error.response && error.response.data.status === 401) {
      console.log("error response");
      return { showLoginModal: true };
    } else {
      Swal.fire({
        title: "Error",
        text: error.message || "An error occurred during the order creation.",
        icon: "error",
      });
    }
  }
};
