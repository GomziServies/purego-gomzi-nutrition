import Swal from "sweetalert2";
import { publicAxiosInstance } from "../config/api";
import $ from "jquery";

export const handleUnexpectedError = () => {
  try {
    if (!publicAxiosInstance) {
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Unexpected Error",
      text: error.message || "report this issue",
    });
  }
};

export const sendInquiry = async (
  name,
  email,
  mobile = "N/A",
  subject,
  message,
  source,
  file,
  callback,
  files,
  branch = null
) => {
  try {
    if (!name || !email || !mobile || !message || !subject) {
      throw new Error("Missing required field");
    }

    // Validate Email
    let emailRegex =
      /(?:[a-z0-9!#$%&'*+/?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/?^_`{|}~-]+)*|"(?:[\x21\x23-\x5b\x5d-\x7f]|\\[\x21-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x21-\x5a\x53-\x7f]|\\[\x21-\x7f])+)])/;
    email = String(email).toLowerCase().trim();

    if (!email.match(emailRegex) || email.match(emailRegex)[0] !== email) {
      throw new Error("Invalid Email");
    }

    if (!source) {
      source = window.location.origin + window.location.pathname;
    }

    let payload = {
      name,
      email: email.match(emailRegex)[0],
      mobile,
      message,
      subject,
      source,
    };

    if (file) payload.file = file;
    if (files) payload.files = files;

    if (branch) {
      switch (branch.toLowerCase()) {
        case "vesu":
          payload.developer_notes = { branch_id: "63a667f43840ca466f14abc8" };
          break;
        case "varachha":
          payload.developer_notes = { branch_id: "639f2ea5ae2ee29b13a7b9e1" };
          break;
        case "rajkot":
          payload.developer_notes = { branch_id: "63a6666b3840ca466f14abc5" };
          break;
        default:
          break;
      }
    }

    const response = await publicAxiosInstance.post(
      `/contact-inquiry`,
      payload
    );

    if (!response.data.response === "OK") {
      const error = await response.data;
      throw new Error(error.message || "Something went wrong!");
    }

    $("[id^=txt_contact]").val(null);

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Thanks you for contacting us. We will get back to you soon.",
    });
  } catch (error) {
    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "Something went wrong!",
    });
  }
};

export const bookDemoLecture = async (data) => {
  let { name, email, mobile, subject, message, developer_notes, source } = data;

  if (!name || !email || !mobile || !message || !subject || !developer_notes) {
    return Swal.fire({
      icon: "error",
      title: "Missing required field",
      text: "Full Name, Email Address, Mobile, Subject, and message are required",
    });
  }

  // Validate Email
  let emailRegex =
    /(?:[a-z0-9!#$%&'*+/?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/?^_`{|}~-]+)*|"(?:[\x21\x23-\x5b\x5d-\x7f]|\\[\x21-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x21-\x5a\x53-\x7f]|\\[\x21-\x7f])+)])/;

  email = String(email).toLowerCase().trim();

  if (!email.match(emailRegex) || email.match(emailRegex)[0] !== email) {
    return Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email",
    });
  }

  if (!source) {
    source = window.location.origin + window.location.pathname;
  }

  let payload = {
    name,
    email: email.match(emailRegex)[0],
    mobile,
    message,
    subject,
    source,
    developer_notes,
  };

  const response = await publicAxiosInstance.post(`/contact-inquiry`, payload);

  if (!response.data.response === "OK") {
    const error = await response.data;
    throw new Error(error.message || "Something went wrong!");
  }

  $("[id^=txt_contact]").val(null);

  Swal.fire({
    icon: "success",
    title: "Success",
    text: "Thanks you for contacting us. We will get back to you soon.",
  });
};

export const sendNutritionInquiry = async (data) => {
  try {
    const { name, email, mobile, source, message, subject } = data;
    if (!name || !email || !mobile || !subject || !message) {
      throw new Error("Missing required field");
    }

    // Validate Email
    let emailRegex =
      /(?:[a-z0-9!#$%&'*+/?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/?^_`{|}~-]+)*|"(?:[\x21\x23-\x5b\x5d-\x7f]|\\[\x21-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x21-\x5a\x53-\x7f]|\\[\x21-\x7f])+)])/;
    const validEmail = String(email).toLowerCase().trim();

    if (
      !validEmail.match(emailRegex) ||
      validEmail.match(emailRegex)[0] !== validEmail
    ) {
      throw new Error("Invalid Email");
    }

    let sourceUrl = source || window.location.origin + window.location.pathname;

    let payload = {
      name,
      email: validEmail.match(emailRegex)[0],
      mobile,
      message,
      subject,
      source: sourceUrl,
    };

    const response = await publicAxiosInstance.post(
      "/contact-inquiry",
      payload
    );
    console.log(payload);

    if (!response.data.response === "OK") {
      const error = await response.data;
      throw new Error(error.message || "Something went wrong!");
    }

    $("[id^=txt_contact]").val(null);

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Thanks you for contacting us. We will get back to you soon.",
    });
  } catch (error) {
    console.error(error);

    // Show error Swal alert
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "Something went wrong!",
    });
  }
};
