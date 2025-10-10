import { Link } from "react-router-dom";
import NutritionHeader from "./partials/Header/nutritionsheader";
import { useState } from "react";
import HomeNutritionFooter from "./partials/Footer/footer";
import { Helmet } from "react-helmet";

const ThankYou = () => {
    const [clickATC, setClickATC] = useState(false);

    const handleCartOpen = async () => {
        setClickATC(false);
    };
    return (
        <>
            <Helmet>
                <script>
                    { `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '3713420712287031');
                    fbq('track', 'PageView');
                `}
                </script>
                <noscript>
                    { `<img height="1" width="1" style="display:none"
                src="https://www.facebook.com/tr?id=3713420712287031&ev=PageView&noscript=1"
                />`}
                </noscript>
                <script type="text/javascript" src="https://api.goaffpro.com/loader.js?shop=vijiwvsmjb"></script>
            </Helmet>
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
            <script type="text/javascript">
                { `window.goaffpro_order = {
                        number : "#1001",
                    total: 1000
                    }
                    if(typeof window.goaffproTrackConversion !== "undefined"){
                        window.goaffproTrackConversion(window.goaffpro_order)
                    }`}
            </script>
        </>
    );
};

export default ThankYou;
