import React, { useMemo, useState } from "react";
import CartItem from "./CartItem";
import "./cart.scss";
import ConfirmOrderDialog from "./ConfirmOrderDialog";
import { CartItemData } from "../models/types";

interface CartProps {
  cartItems: CartItemData[];
  onRemoveItem: (name: string) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemoveItem }) => {
  const [isDialogVisible, setDialogVisible] = useState(false);

  const handleOrderConfirm = () => {
    console.log("Order Confirmed!");
    setDialogVisible(false);
  };

  const mapCartItemProps = (item: CartItemData) => {
    return {
      name: item.dessert.name,
      price: item.dessert.price,
      amount: item.amount,
    };
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.dessert.price * item.amount, 0);
  }, [cartItems]);

  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => (sum += item.amount), 0);
  }, [cartItems]);

  return (
    <section className="cart">
      <h2 className="cart__title">Your Cart ({totalAmount})</h2>
      {cartItems.length > 0 ? (
        <>
          <div className="cart__items">
            {cartItems.map((item, index) => (
              <CartItem key={index} {...mapCartItemProps(item)} onRemoveItem={() => onRemoveItem(item.dessert.name)} />
            ))}
          </div>
          <div className="cart__summary">
            <span className="cart__summary-label">Order Total</span>
            <span className="cart__summary-price">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="cart__carbon-neutral">
            <img
              className="cart__carbon-neutral-icon"
              src="../../assets/images/icon-carbon-neutral.svg"
              alt="Carbon neutral"
            />
            <span className="cart__carbon-neutral-text">
              This is a <strong>carbon-neutral</strong> delivery
            </span>
          </div>
          <button className="cart__confirm-order-button" onClick={() => setDialogVisible(true)}>
            Confirm Order
          </button>
          <ConfirmOrderDialog
            orderItems={cartItems}
            isVisible={isDialogVisible}
            onClose={() => setDialogVisible(false)}
            onConfirm={() => handleOrderConfirm()}
          />
        </>
      ) : (
        <div className="cart__empty">
          <img
            className="cart__empty-image"
            src="../../assets/images/illustration-empty-cart.svg"
            alt="Empty cart"
          ></img>
          <p className="cart__empty-text">Your added items will appear here</p>
        </div>
      )}
    </section>
  );
};

export default Cart;
