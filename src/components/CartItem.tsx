import React from "react";
import "./cart-item.scss";

interface CartItemProps {
  name: string;
  price: number;
  amount: number;
  onRemoveItem: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ name, price, amount, onRemoveItem }) => {
  const totalPrice = (price: number, amount: number) => price * amount;

  return (
    <div className="cart-item">
      <div className="cart-item__content">
        <h3 className="cart-item__name">{name}</h3>
        <div className="cart-item__details">
          <span className="cart-item__amount">{amount}x</span>
          <span className="cart-item__price-per-item">@ ${price.toFixed(2)}</span>
          <span className="cart-item__total-price">${totalPrice(price, amount).toFixed(2)}</span>
        </div>
      </div>
      <button className="cart-item__remove-button" onClick={onRemoveItem}>
        <svg
          className="cart-item__remove-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          fill="none"
          viewBox="0 0 10 10"
        >
          <path
            fill="#CAAFA7"
            d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;
