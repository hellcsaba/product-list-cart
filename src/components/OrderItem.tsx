import React from "react";

interface OrderItemProps {
  name: string;
  price: number;
  amount: number;
  image: string;
}

const OrderItem: React.FC<OrderItemProps> = ({ name, price, amount, image }) => {
  const totalPrice = (price: number, amount: number) => price * amount;

  return (
    <div className="order-item">
      <img className="order-item__image" src={image}></img>
      <div className="order-item__info">
        <h3 className="order-item__name">{name}</h3>
        <div className="order-item__details">
          <span className="order-item__amount">x{amount}</span>
          <span className="order-item__price-per-piece">@ {price}</span>
        </div>
      </div>
      <span className="order__item-price">${totalPrice(price, amount).toFixed(2)}</span>
    </div>
  );
};

export default OrderItem;
