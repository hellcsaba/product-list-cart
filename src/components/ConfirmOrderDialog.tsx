import React from "react";
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

  if (!isVisible) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <article className="order">
        <header className="order__header">
          <img
            className="order__confirm-icon"
            src="../../assets/images/icon-order-confirmed.svg"
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
          </div>
          <div className="order__summary">
            <span className="order__summary-label">Order Total</span>
            <span className="order__summary-price">$46.50</span>
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
