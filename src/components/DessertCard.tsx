import React from "react";
import "./dessert-card.scss";

interface ImageProps {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

interface DessertCardProps {
  name: string;
  category: string;
  price: number;
  image: ImageProps;
  amount: number;
  onAddToCart: () => void;
  onUpdateItemAmount: (amount: number) => void;
}

const DessertCard: React.FC<DessertCardProps> = ({
  name,
  category,
  price,
  image,
  amount,
  onAddToCart,
  onUpdateItemAmount,
}) => {
  const handleIncrement = () => {
    onUpdateItemAmount(1);
  };

  const handleDecrement = () => {
    onUpdateItemAmount(-1);
  };

  return (
    <article className="dessert">
      <picture className="dessert__picture">
        <source srcSet={image.desktop} media="(min-width: 64rem)" />
        <source srcSet={image.tablet} media="(min-width: 50rem)" />
        <img
          className={`dessert__image ${amount > 0 ? "dessert__image--in-cart" : ""}`}
          src={image.mobile}
          alt={name}
        />
      </picture>
      {amount === 0 ? (
        <button className="dessert__buy-button dessert__button--cart" onClick={onAddToCart}>
          <img src="/assets/images/icon-add-to-cart.svg" alt="Cart icon" />
          Add to Cart
        </button>
      ) : (
        <div className="dessert__quantity-selector">
          <button className="dessert__quantity-button dessert__quantity-button--decrement" onClick={handleDecrement}>
            <svg
              className="dessert__button--decrement"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="2"
              fill="none"
              viewBox="0 0 10 2"
            >
              <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
            </svg>
          </button>
          <span className="dessert__quantity">{amount}</span>
          <button className="dessert__quantity-button dessert__quantity-button--increment" onClick={handleIncrement}>
            <svg
              className="dessert__button--increment"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="none"
              viewBox="0 0 10 10"
            >
              <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
            </svg>
          </button>
        </div>
      )}
      <p className="dessert__category">{category}</p>
      <h3 className="dessert__name">{name}</h3>
      <p className="dessert__price">${price.toFixed(2)}</p>
    </article>
  );
};

export default DessertCard;
