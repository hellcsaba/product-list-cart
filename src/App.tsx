import { useEffect, useState } from "react";
import "./App.scss";
import DessertCard from "./components/DessertCard";
import Cart from "./components/Cart";
import { CartItemData, Dessert } from "./models/types";

function App() {
  const [desserts, setDesserts] = useState<Dessert[]>([]);
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);

  const fetchDesserts = async () => {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}data.json`);
      if (!response.ok) {
        throw new Error("Failed to fetch desserts");
      }
      const data: Dessert[] = await response.json();
      setDesserts(data);
      console.log(data[0].price);
    } catch (error) {
      console.error("Error fetching desserts", error);
    }
  };

  useEffect(() => {
    fetchDesserts();
  }, []);

  const mapDessertToCardProps = (dessert: Dessert) => {
    const { name, category, price, image } = dessert;
    return { name, category, price, image };
  };

  const handleAddToCart = (dessert: Dessert) => {
    setCartItems((prevCartItems: CartItemData[]) => {
      const existingItemIndex = prevCartItems.findIndex((item: CartItemData) => item.dessert.name === dessert.name);
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCartItems];
        updatedCart[existingItemIndex].amount += 1;
        return updatedCart;
      } else {
        return [...prevCartItems, { dessert, amount: 1 }];
      }
    });
  };

  const handleUpdateCartItemAmount = (name: string, quantity: number) => {
    setCartItems((prevCartItems) => {
      const incrementedCart = prevCartItems.map((item) =>
        item.dessert.name === name ? { ...item, amount: item.amount + quantity } : item
      );
      const updatedCart = incrementedCart.filter((item) => item.amount > 0);
      return updatedCart;
    });
  };

  const handleRemoveItem = (name: string) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.dessert.name !== name));
  };

  const onOrderSubmit = () => {
    setCartItems([]);
  };

  return (
    <article className="app-container">
      <header className="app-header">
        <h1 className="app-header__title">Desserts</h1>
      </header>
      <main className="app-main">
        <section className="app-main__desserts">
          {desserts.map((dessert, index) => {
            const cartItem = cartItems.find((item) => item.dessert.name === dessert.name);
            return (
              <DessertCard
                key={index}
                {...mapDessertToCardProps(dessert)}
                amount={cartItem?.amount || 0}
                onAddToCart={() => handleAddToCart(mapDessertToCardProps(dessert))}
                onUpdateItemAmount={(amount) => handleUpdateCartItemAmount(dessert.name, amount)}
              />
            );
          })}
        </section>
        <section className="app-main__cart">
          <Cart cartItems={cartItems} onRemoveItem={handleRemoveItem} onOrderSubmit={onOrderSubmit} />
        </section>
      </main>
    </article>
  );
}

export default App;
