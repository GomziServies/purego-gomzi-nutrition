import { Link } from "react-router-dom";
import NutritionHeader from "./partials/Header/nutritionsheader";
import { useState } from "react";
import HomeNutritionFooter from "./partials/Footer/footer";

const ThankYou = () => {
    const [clickATC, setClickATC] = useState(false);

    const handleCartOpen = async () => {
        setClickATC(false);
    };
    return (
        <>
            <NutritionHeader handleCartOpen={handleCartOpen} />
            <section className="marginbottom-nutrition py-5 my-5">
                <div className="container-fluid pt-md-5">
                    <div className="container">
                        <div className="row">
                            <div className="wrapper-1">
                                <div className="wrapper-2">
                                    <div className="success-checkmark">
                                        <div className="check-icon">
                                            <span className="icon-line line-tip"></span>
                                            <span className="icon-line line-long"></span>
                                            <div className="icon-circle"></div>
                                            <div className="icon-fix"></div>
                                        </div>
                                    </div>
                                    <h1>Thank you for order!</h1>
                                    <p className="mb-4">
                                        Please check your Email for Invoice.
                                    </p>
                                    <Link className="go-home" to="/user/order">
                                        Track Your Order
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <HomeNutritionFooter />
        </>
    );
};

export default ThankYou;
