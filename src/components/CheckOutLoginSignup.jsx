import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../assets/js/config/api";

const CheckOutLoginSignup = () => {
    const [otpCode, setOtpCode] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const authInfo = localStorage.getItem("fg_group_user_authorization");
        setIsLoggedIn(!!authInfo);
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post("/account/authorization", {
                mobile: mobileNumber,
            });

            if (response.data && response.data.data && response.data.data.OTP) {
                setOtpCode(response.data.data.OTP);
                setOtpSent(true);
                toast.success("OTP Sent on your mobile number.");
            } else if (response.data && response.data.data) {
                setOtpSent(true);
                toast.success("OTP Sent on your mobile number.");
            } else {
                toast.error("Failed to send OTP. Please try again.");
            }
        } catch (error) {
            toast.error("Failed to send OTP. Please try again.");
            console.error("Error in handleLogin:", error);
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
                toast.success("Successfully Logged in!");
                window.location.reload();
            } else {
                toast.error("Failed to verify OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error in handleOtpSubmit:", error);
        }
    };

    return (
        <div className="card br-15 mb-3 active-tab-shadow">
            <div className="card-header bg-yellow" id="headingOne">
                <div data-toggle="" data-target="#collapseOne">
                    <span className="text-white f-rob-bol f-18 text-uppercase">
                        <i className="far fa-check-circle me-2"></i>
                        Login or signup
                    </span>
                </div>
            </div>
            {!isLoggedIn ? (
                <div id="collapseOne" className="collapse show">
                    <div className="card-body px-4 px-xl-5">
                        <div className="row w-100">
                            <div className="col-12 col-xl-7 px-0">
                                <div className="col-12 mb-2 mb-lg-2 login-number position-relative">
                                    {!otpSent ? (
                                        <>
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <div className="input-with-label d-flex align-items-center">
                                                        <div className="country-code">
                                                            <p className="mb-0 mx-2 f-14 f-pop-sembol text-secondary">
                                                                +91
                                                            </p>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter mobile number"
                                                            className="form-control f-14 f-pop-sembol text-black"
                                                            required=""
                                                            onChange={(e) =>
                                                                setMobileNumber(e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="fix-continue">
                                                <div className="common-button">
                                                    <button
                                                        onClick={handleLogin}
                                                        type="button"
                                                        className="bg-yellow mt-3 text-uppercase text-white f-16 f-rob-bol checkout-login fix-continue"
                                                    >
                                                        Continue
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <div className="input-with-label d-flex align-items-center">
                                                        <div className="country-code">
                                                            <p className="mb-0 mx-2 f-14 f-pop-sembol text-secondary">
                                                                <i className="fas fa-phone"></i>
                                                            </p>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter mobile number"
                                                            className="form-control f-14 f-pop-sembol text-black"
                                                            required=""
                                                            onChange={(e) =>
                                                                setMobileNumber(e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center my-3">
                                                <div className="input-with-label d-flex align-items-center">
                                                    <div className="country-code">
                                                        <p className="mb-0 mx-2 f-14 f-pop-sembol text-secondary">
                                                            <i className="fas fa-key"></i>
                                                        </p>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter OTP"
                                                        name="otpCode"
                                                        value={otpCode}
                                                        className="form-control f-14 f-pop-sembol text-black"
                                                        required=""
                                                        onChange={(e) =>
                                                            setOtpCode(e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="fix-continue">
                                                <div className="common-button">
                                                    <button
                                                        onClick={handleOtpSubmit}
                                                        type="button"
                                                        className="bg-yellow text-uppercase text-white f-16 f-rob-bol checkout-login fix-continue"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default CheckOutLoginSignup;
