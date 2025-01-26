import React, { useEffect, useMemo } from "react";
import OrderItem from "./OrderItem";
import { CartItemData } from "../models/types";
import "./confirm-order-dialog.scss";

interface ConfirmOrderDialogProps {
  isVisible: boolean;
  orderItems: CartItemData[];
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmOrderDialog: React.FC<ConfirmOrderDialogProps> = ({ orderItems, isVisible, onClose, onConfirm }) => {
  const mapOrderItem = (item: CartItemData) => {
    return {
      name: item.dessert.name,
      price: item.dessert.price,
      amount: item.amount,
      image: item.dessert.image.thumbnail,
    };
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  const totalPrice = useMemo(() => {
    return orderItems.reduce((sum, item) => sum + item.dessert.price * item.amount, 0);
  }, [orderItems]);

  if (!isVisible) return null;
  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <article className="order">
        <header className="order__header">
          <img
            className="order__confirm-icon"
            src={`${import.meta.env.BASE_URL}assets/images/icon-order-confirmed.svg`}
            alt="Order confirmed"
          ></img>
          <h1 className="order__title">Order Confirmed</h1>
          <span className="order__message">We hope you enjoy your food!</span>
        </header>
        <main className="order__main">
          <div className="order__items">
            {orderItems.map((item: CartItemData, index) => (
              <OrderItem key={index} {...mapOrderItem(item)} />
            ))}
            <div className="order__summary">
              <span className="order__summary-label">Order Total</span>
              <span className="order__summary-price">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button className="order__new-button" onClick={onConfirm}>
            Start New Order
          </button>
        </main>
      </article>
    </>
  );
};

export default ConfirmOrderDialog;
