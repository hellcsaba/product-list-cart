import React from "react";
import './cart-item.scss';

interface CartItemProps {
    name: string,
    price: number,
    amount: number
    onRemoveItem: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ name, price, amount, onRemoveItem }) => {

    const totalPrice = (price: number, amount: number) => price * amount

    return (
        <div className="cart-item">
            <div className="cart-item__content">
                <h3 className="cart-item__name">{name}</h3>
                <div className="cart-item__details">
                    <span className="cart-item__amount">{amount}x</span>
                    <span className="cart-item__price-per-item">@ ${price}</span>
                    <span className="cart-item__total-price">$ {totalPrice(price, amount)}</span>
                </div>
            </div>
            <button className="cart-item__remove-button" onClick={onRemoveItem}><img className="cart-item__remove-icon" src='/assets/images/icon-remove-item.svg' alt='Remove item'></img></button>
        </div>
    )
}

export default CartItem;