import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { BASE_URL } from "../../helpers/api";

import CartItem from "../CartItem/CartItem";
import './Cart.css';

function Cart (props) {
    const { user } = React.useContext(AuthContext);
    const [isCheckoutPopupDisplayed, setCheckoutPopupDisplay] = React.useState(false);
    let navigate = useNavigate();

    const calculateTotalProductPrice = () => {
        let totalProductCost = 0;

        for( let i = 0; i < props.cartProducts.length; i++) {
            totalProductCost += props.cartProducts[i].price * props.cartProducts[i].quantity
        }

        return totalProductCost.toFixed(2);
    }

    const handleCheckoutPopup = () => {
        setCheckoutPopupDisplay(!isCheckoutPopupDisplayed)
    }

    const confirmPurchase = () => {
        // TODO: Handle order creation on API level
        // hide popup
        handleCheckoutPopup()
        axios.post(`${BASE_URL}/orders`, {
            "user_id": user.user_id,
            "product_ids": props.cartProducts.map(cartProduct => cartProduct.product_id)
        })
        .then(response => {
            // remove all products from cart
            props.removeAllProductsFromCart()
            // redirect the user back to the homepage
            navigate('/products')
        })
    }

    return (
        <div>
            {/* {isCheckoutPopupDisplayed ? <div>Checkout is completed </div> : null} */}
            {!isCheckoutPopupDisplayed && (
            <div className='popup'>
                <div className='popup-card'>
                    <div className='popup-card-content'>
                        <h1 className='popup-card-title'>Your order was finalised</h1>
                        <p className='popup-card-subtitle'>Total amount was {calculateTotalProductPrice()}</p>
                        <button className='popup-card-button' onClick={confirmPurchase}>Confirm Purchase</button>
                    </div>
                </div>
            </div>
            )}
            <div className="cart-container">
                <p>Item</p>
                <div />
                <p>Price</p>
                <p>Quantity</p>
                <p>Remove</p>
                {props.cartProducts.map(
                    (productItem) => 
                    <CartItem cartProductInfo={productItem} deleteProduct={props.deleteProduct} />
                )}
                {props.cartProducts.length ? 
                    <>Total {calculateTotalProductPrice()}</>
                    :
                    null
                }
                {props.cartProducts.length ? <button onClick={handleCheckoutPopup}>Checkout</button> : null}
            </div>
        </div>
    )
}


export default Cart;

