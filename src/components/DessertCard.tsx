import React from 'react';

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
  return (
    <article>
      <picture>
        <source srcSet={image.desktop} media="(min-width: 64rem)" />
        <source srcSet={image.tablet} media="(min-width: 48rem)" />
        <source srcSet={image.mobile} media="(min-width: 30rem)" />
        <img src={image.thumbnail} alt={name} />
      </picture>
      <button>Add to Cart</button>
      <p>{category}</p>
      <h3>{name}</h3>
      <p>${price}</p>
    </article>
  )
};

export default DessertCard;
