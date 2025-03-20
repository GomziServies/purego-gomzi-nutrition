import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { axiosInstance } from "../config/api";

const LoginModal = ({ onClose }) => {
  const [showModal, setShowModal] = useState(true);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpDialogOpen, setEmailOtpDialogOpen] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setShowSignUpModal(false);
    onClose();
  };

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get("/account/profile");
      localStorage.setItem("user_info", JSON.stringify(response.data.data));
    } catch (error) {
      console.error("Error in handleAgreeAndConfirm:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/account/authorization", {
        mobile: mobileNumber,
      });

      if (response.data && response.data.data && response.data.data.OTP) {
        setOtpCode(response.data.data.OTP);
        setShowModal(false);
        handleOtpPopupOpen();
        toast.success("OTP Sent on your mobile number.");
      } else if (response.data && response.data.data) {
        setShowModal(false);
        handleOtpPopupOpen();
        toast.success("OTP Sent on your mobile number.");
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
      console.error("Error in handleLogin:", error);
    }
  };

  const handleLoginEmail = async () => {
    try {
      const response = await axiosInstance.post("/account/login", {
        email,
        password,
      });

      if (response.data.data.authorization) {
        localStorage.setItem(
          "fg_group_user_authorization",
          response.data.data.authorization
        );
        toast.success("Successfully Login!");
        handleClose();
      } else {
        setShowSignUpModal(false);
        setEmailOtpDialogOpen(true);
      }
    } catch (error) {
      toast.error("Invalid Password or Email");
      console.error("Error in handleLogin:", error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setShowSignUpModal(false);
      const response = await axiosInstance.post("/account/email-verification", {
        email: email,
        otp: emailOtp,
      });
      if (response.status === 200) {
        localStorage.setItem(
          "fg_group_user_authorization",
          response.data.data.authorization
        );
        await getUserData();
        setEmailOtpDialogOpen(false);
        toast.success("Successfully Login!");
        window.location.reload();
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error in handleOtpSubmit:", error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axiosInstance.post(
        "/account/authorization/verify",
        {
          mobile: mobileNumber,
          otp: otpCode,
        }
      );

      if (response.status === 200) {
        localStorage.setItem(
          "fg_group_user_authorization",
          response.data.data.authorization
        );
        await getUserData();
        setOtpDialogOpen(false);
        toast.success("Successfully Login!");
        window.location.reload();
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error in handleOtpSubmit:", error);
    }
  };

  const handleSignUpInternational = () => {
    setShowModal(false);
    setShowSignUpModal(true);
  };

  const handleOtpPopupOpen = () => {
    setOtpDialogOpen(true);
  };

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
  };

  const handleCloseEmailOtpModal = () => {
    setEmailOtpDialogOpen(false);
    setEmailOtp("");
  };

  const handleCloseOtpModal = () => {
    setOtpDialogOpen(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {/* Login Popup  */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            <div className="text-center">
              <img
                src={
                  process.env.PUBLIC_URL + "../assets/images/logo/fg_group.webp"
                }
                width="20%"
                alt="Fg Group"
              />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group
              controlId="formBasicUsername"
              className="mb-4 text-center"
            >
              <Form.Label className="label_modal text-center mb-2">
                OTP Verification
              </Form.Label>
              <Form.Control
                type="text"
                className="fr"
                placeholder="Enter mobile number"
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </Form.Group>
            <Button
              type="button"
              className="submit_modal"
              style={{
                width: "100%",
                color: "#fff",
                margin: "0",
                backgroundImage:
                  "linear-gradient(101deg, rgb(247, 69, 48), rgb(255, 46, 115))",
              }}
              onClick={handleLogin}
            >
              Log In
            </Button>
          </Form>
          <div className="text-center">
            <Button
              onClick={handleSignUpInternational}
              style={{
                background: "none",
                border: "none",
                color: "#000",
                textDecorationLine: "underline!important",
                fontSize: "18px",
                display: "inline-block",
              }}
              className="mt-3"
            >
              Login For International Student
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Otp Popup  */}
      <Modal show={otpDialogOpen} onHide={handleCloseOtpModal} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            <div className="text-center">
              <img
                src={
                  process.env.PUBLIC_URL + "../assets/images/logo/fg_group.webp"
                }
                width="20%"
                alt="Fg Group"
              />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group
              controlId="formBasicUsername"
              className="mb-4 text-center"
            >
              <Form.Label className="label_modal text-center mb-2">
                Enter OTP Here
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP Here"
                name="otpCode"
                className="fr"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
              />
            </Form.Group>
            <Button
              type="button"
              className="submit_modal"
              style={{
                width: "100%",
                color: "#fff",
                margin: "0",
                backgroundImage:
                  "linear-gradient(101deg, rgb(247, 69, 48), rgb(255, 46, 115))",
              }}
              onClick={handleOtpSubmit}
            >
              Verify Otp
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Signup Popup  */}
      <Modal show={showSignUpModal} onHide={handleCloseSignUpModal} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            <div className="text-center">
              <span
                className="clr1"
                style={{ fontSize: "25px", color: "#00afef" }}
                id="lbl_modal_email"
              >
                Login / Signup
              </span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div
              className="field_modal"
              style={{ margin: "20px 0px!important" }}
            >
              <Form.Label className="label_modal">Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="fr"
              />
            </div>
            <div
              className="field_modal"
              style={{ margin: "20px 0px!important" }}
            >
              <Form.Label className="label_modal mt-3">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="fr"
              />
            </div>
            <div style={{ margin: "20px 0px!important" }}>
              <button
                className="mt-4 sing-up-btn btn"
                type="button"
                onClick={handleLoginEmail}
              >
                Submit
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Email OTP Popup  */}
      <Modal
        show={emailOtpDialogOpen}
        onHide={handleCloseEmailOtpModal}
        centered
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            <div className="text-center">
              <span
                className="clr1"
                style={{ fontSize: "25px", color: "#00afef" }}
                id="lbl_modal_email"
              >
                Login / Signup
              </span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div
              className="field_modal"
              style={{ margin: "20px 0px!important" }}
            >
              <Form.Label className="label_modal">Enter Otp</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP here"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                className="fr"
              />
            </div>
            <div style={{ margin: "20px 0px!important" }}>
              <button
                className="mt-4 sing-up-btn btn"
                type="button"
                onClick={handleVerifyOTP}
              >
                Verify
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
