import React from "react";
import CartItem from "./CartItem";
import './cart.scss';

interface CartItem{
    name: string,
    price: number,
    amount: number
}


const Cart: React.FC = () => {
    const cartItems: CartItem[] = [{name: 'Classic Tiramisu', price: 5.0,amount: 2}]

    const mapCartItemProps = (item: CartItem) => {
        const {name, price, amount} = item;
        return {name, price, amount};
    }

    return (
        <section className="cart">
            <h2 className="cart__title">Your Cart ({cartItems.length})</h2>
            {cartItems.length > 0 ? (
                <div className="cart__items">
                    {cartItems.map((item, index) => (
                        <CartItem key={index} {...mapCartItemProps(item)}/>
                    ))}
                </div>
            ) : (
                <div className="cart__empty">
                    <img className='cart_empty-image' src='../../assets/images/illustration-empty-cart.svg' alt='Empty cart'></img>
                    <p className="cart__empty-text">Your added items will appear here</p>
                </div>
            )}
        </section>)
}

export default Cart;