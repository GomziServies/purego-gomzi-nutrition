import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

//User Account
import Home from "./pages/home";
import PureGoCreatine from "./pages/products/creatine-supplements";
import AddToCart from "./pages/nutrition/add-to-cart";
import ContactUs from "./pages/nutrition/contact-us";
import TermsConditions from "./pages/nutrition/terms-conditions";
import ReturnRefundPolicyCustomer from "./pages/nutrition/return-and-refund-policy-customer";
import PrivacyPolicyCustomer from "./pages/nutrition/privacy-policy-customer";
import PricingPolicyCustomer from "./pages/nutrition/pricing-policy-customer";
import ShippingPolicyCustomer from "./pages/nutrition/shipping-policy-customer";
import CancellationPolicyCustomer from "./pages/nutrition/cancellation-policy-customer";
import PureGoEaa from "./pages/products/eaa-supplements";
import PureGoMassGainer from "./pages/products/mass-gainer-protein-powder";
import PureGoPreWorkout from "./pages/products/weight-loss-supplement";
import PureGoWheyProtein from "./pages/products/whey-protein-powder";
import NotFoundPage from "./pages/404";
import CheckOut from "./pages/check-out";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/return-and-refund-policy-customer" element={<ReturnRefundPolicyCustomer />} />
        <Route path="/privacy-policy-customer" element={<PrivacyPolicyCustomer />} />
        <Route path="/pricing-policy-customer" element={<PricingPolicyCustomer />} />
        <Route path="/shipping-policy-customer" element={<ShippingPolicyCustomer />} />
        <Route path="/cancellation-policy-customer" element={<CancellationPolicyCustomer />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/add-to-cart" element={<AddToCart />} />
        <Route path="/check-out" element={<CheckOut />} />
        {/* Products */}
        <Route path="/creatine-supplements" element={<PureGoCreatine />} />
        <Route path="/weight-loss-supplement" element={<PureGoPreWorkout />} />
        <Route path="/mass-gainer-protein-powder" element={<PureGoMassGainer />} />
        <Route path="/whey-protein-powder" element={<PureGoWheyProtein />} />
        <Route path="/eaa-supplements" element={<PureGoEaa />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
