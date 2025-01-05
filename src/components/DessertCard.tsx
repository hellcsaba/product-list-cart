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
  isInCart: boolean;
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
        <source srcSet={image.tablet} media="(min-width: 48rem)" />
        <source srcSet={image.mobile} media="(min-width: 30rem)" />
        <img
          className={`dessert__image ${amount > 0 ? "dessert__image--in-cart" : ""}`}
          src={image.thumbnail}
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
            <img
              src="/assets/images/icon-decrement-quantity.svg"
              className="dessert__button-decrement"
              alt="Decrease quantity"
            />
          </button>
          <span className="dessert__quantity">{amount}</span>
          <button className="dessert__quantity-button dessert__quantity-button--increment" onClick={handleIncrement}>
            <img
              src="/assets/images/icon-increment-quantity.svg"
              className="dessert__button--increment"
              alt="Increase quantity"
            />
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
