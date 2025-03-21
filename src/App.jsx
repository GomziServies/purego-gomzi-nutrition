import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

//User Account
import Home from "./pages/home";
import PureGoCreatine from "./pages/nutrition/pure-go-creatine";
import AddToCart from "./pages/nutrition/add-to-cart";
import ContactUs from "./pages/nutrition/contact-us";
import TermsConditions from "./pages/nutrition/terms-conditions";
import ReturnRefundPolicyCustomer from "./pages/nutrition/return-and-refund-policy-customer";
import PrivacyPolicyCustomer from "./pages/nutrition/privacy-policy-customer";
import PricingPolicyCustomer from "./pages/nutrition/pricing-policy-customer";
import ShippingPolicyCustomer from "./pages/nutrition/shipping-policy-customer";
import CancellationPolicyCustomer from "./pages/nutrition/cancellation-policy-customer";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pure-go-creatine" element={<PureGoCreatine />} />
        <Route path="/return-and-refund-policy-customer" element={<ReturnRefundPolicyCustomer />} />
        <Route path="/privacy-policy-customer" element={<PrivacyPolicyCustomer />} />
        <Route path="/pricing-policy-customer" element={<PricingPolicyCustomer />} />
        <Route path="/shipping-policy-customer" element={<ShippingPolicyCustomer />} />
        <Route path="/cancellation-policy-customer" element={<CancellationPolicyCustomer />} />






        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/add-to-cart" element={<AddToCart />} />


      </Routes>
    </>
  );
}

export default App;
