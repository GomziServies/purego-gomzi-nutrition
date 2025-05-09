import React from "react";
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
import Blog1 from "./pages/blog/top-supplements-for-weight-gain";
import Blog2 from "./pages/blog/how-supplements-help-you-live-healthy-life";
import Blog3 from "./pages/blog/best-whey-protein-in-india";
import UserOrder from "./pages/account/order";
import UserProfile from "./pages/account/profile";
import CheckOut from "./pages/check-out";
import ScrollRestoration from "./components/scroll-restoration";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/return-and-refund-policy-customer"
          element={<ReturnRefundPolicyCustomer />}
        />
        <Route
          path="/privacy-policy-customer"
          element={<PrivacyPolicyCustomer />}
        />
        <Route
          path="/pricing-policy-customer"
          element={<PricingPolicyCustomer />}
        />
        <Route
          path="/shipping-policy-customer"
          element={<ShippingPolicyCustomer />}
        />
        <Route
          path="/cancellation-policy-customer"
          element={<CancellationPolicyCustomer />}
        />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/add-to-cart" element={<AddToCart />} />
        <Route path="/check-out" element={<CheckOut />} />
        <Route path="/user/order" element={<UserOrder />} />
        <Route path="/user/profile" element={<UserProfile />} />
        {/* Products */}
        <Route path="/creatine-supplements" element={<PureGoCreatine />} />
        <Route path="/weight-loss-supplement" element={<PureGoPreWorkout />} />
        <Route
          path="/mass-gainer-protein-powder"
          element={<PureGoMassGainer />}
        />
        <Route path="/whey-protein-powder" element={<PureGoWheyProtein />} />
        <Route path="/eaa-supplements" element={<PureGoEaa />} />
        {/* Blogs */}
        <Route path="/top-supplements-for-weight-gain" element={<Blog1 />} />
        <Route
          path="/how-supplements-help-you-live-healthy-life"
          element={<Blog2 />}
        />
        <Route path="/best-whey-protein-in-india" element={<Blog3 />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
      <ScrollRestoration />
    </>
  );
}

export default App;
