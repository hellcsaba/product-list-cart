import { useEffect, useState } from 'react'
import './App.scss'
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
    <article className='app-container'>
      <header className='app-header'>
        <h1 className='app-header__title'>Desserts</h1>
      </header>
      <main className='app-main'>
        <section className='app-main__desserts'>
          {desserts.map((dessert, index) => (
            <DessertCard key={index} {...mapDessertToCardProps(dessert)}/>
          ))}
        </section>
        <section className='app-main__cart'>
          <Cart/>
        </section>
      </main>
    </article>
  )
}

export default App
