import React, { useState } from 'react';

interface ImageProps {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}


interface DessertCardProps {
  name: string,
  category: string,
  price: number,
  image: ImageProps
}

const DessertCard: React.FC<DessertCardProps> = ({ name, category, price, image }) => {
  const [quantity, setQuantity] = useState<number>(0);
  const handleAddToCart = () => setQuantity(1);
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 0));

  return (
    <article className='dessert'>
      <picture className='dessert__picture'>
        <source srcSet={image.desktop} media="(min-width: 64rem)" />
        <source srcSet={image.tablet} media="(min-width: 48rem)" />
        <source srcSet={image.mobile} media="(min-width: 30rem)" />
        <img src={image.thumbnail} alt={name} />
      </picture>
      {quantity === 0 ? (
        <button className='dessert__buy-button dessert__button--cart' onClick={handleAddToCart}><img src="/assets/images/icon-add-to-cart.svg" alt="Cart icon"/>Add to Cart</button>
      ) : (
        <div className="dessert__quantity-selector">
          <button
            className="dessert__quantity-button dessert__quantity-button--decrement"
            onClick={handleDecrement}>
            <img src="/assets/images/icon-decrement-quantity.svg" className="dessert__button-decrement" 
            alt="Decrease quantity"/>
          </button>
          <span className="dessert__quantity">{quantity}</span>
          <button
            className="dessert__quantity-button dessert__quantity-button--increment"
            onClick={handleIncrement}>
            <img src="/assets/images/icon-increment-quantity.svg" className="dessert__button--increment" 
            alt="Increase quantity"/>
          </button>
        </div>
      )}
      <p className='dessert__category'>{category}</p>
      <h3 className='dessert__name'>{name}</h3>
      <p className='dessert__price'>${price}</p>
    </article>
  )
};

export default DessertCard;
