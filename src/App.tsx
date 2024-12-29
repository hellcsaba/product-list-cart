import { useEffect, useState } from 'react'
import './App.css'
import DessertCard from './components/DessertCard';
import Cart from './components/Cart';

interface ImageProps {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

interface Dessert {
  name: string;
  category: string;
  price: number;
  image: ImageProps;
}

function App() {
  const [desserts, setDesserts] = useState<Dessert[]>([])

  const fetchDesserts = async () => {
    try {
      const response = await fetch('../data.json')
      if (!response.ok){
        throw new Error('Failed to fetch desserts')
      }
      const data: Dessert[] = await response.json()
      setDesserts(data)
      console.log(data[0].price)
    } catch(error) {
      console.error("Error fetching desserts", error)
    }
  }

  useEffect(() => {
    fetchDesserts()
  }, [])

  const mapDessertToCardProps = (dessert: Dessert) => {
    const { name, category, price, image } = dessert;
    return { name, category, price, image };
  }

  return (
    <>
      <header>
        <h1>Desserts</h1>
      </header>
      <main>
        <section>
          {desserts.map((dessert, index) => (
            <DessertCard key={index} {...mapDessertToCardProps(dessert)}/>
          ))}
        </section>
        <section>
          <Cart/>
        </section>
      </main>
    </>
  )
}

export default App
