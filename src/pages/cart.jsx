import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';

const Cart = () => {
    const location = useLocation();
    const productId = location.state;
    const Navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("fromCartPage", "true");
        Navigate("/");
    }, [])

    return (
        <>
        </>
    )
}

export default Cart