import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

//User Account
import Home from "./pages/home";
import PureGoCreatine from "./pages/nutrition/pure-go-creatine";
import AddToCart from "./pages/nutrition/add-to-cart";
import ContactUs from "./pages/nutrition/contact-us";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pure-go-creatine" element={<PureGoCreatine />} />






        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/add-to-cart" element={<AddToCart />} />


      </Routes>
    </>
  );
}

export default App;
