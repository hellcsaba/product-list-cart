export interface ImageProps {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Dessert {
  name: string;
  category: string;
  price: number;
  image: ImageProps;
}

export interface CartItemData {
  dessert: Dessert
  amount: number;
}