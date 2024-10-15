import { useEffect, useState } from "react"
import Footer from "./Parts/Footer"
import axios from "axios"
import GameDisplay from "./GameDisplay"
import test_image_wrench from "../assets/test_image_wrench.png"
import test_image_wrench_2 from "../assets/test_image_wrench_2.png"
import Button from "./Button"

const Checkout = () => {
  const [checkout, setCheckout] = useState<string[]>(JSON.parse(localStorage.getItem("checkout") as string) || [])
  const [games, setGames] = useState<{ name: string, price: number, desc: string, category: [], _id: string }[]>([])
  useEffect(() => {
    setGames([])
    const fetch = async (id: string) => {
      const apiUrl = import.meta.env.VITE_SERVER_BASE_API_URL;
      const {data} = await axios.get(`${apiUrl}/get-game-by-id`, { params: {id} });
      setGames(prev => [...prev, data])
    }
    checkout.map(item => fetch(item))
  }, [checkout])
  const buy = () => {
    const fetch = async (id: string) => {
      const apiUrl = import.meta.env.VITE_SERVER_BASE_API_URL;
      await axios.post(`${apiUrl}/buy-game`, {id, token: localStorage.getItem("token")});
    }
    checkout.map(item => {console.log(item);fetch(item)})
    setCheckout([])
    localStorage.setItem("checkout", "[]")
  }
  return (
    <div className="content-layout-margin mb-16 md:mb-0 md:mt-16 pt-16">
      <div>
        <h1 className='text-5xl text-wrench-neutral-white mt-12 font-bold'>Checkout</h1>
      </div>
      <div className="my-12 flex gap-8 flex-col">
        {games.map(item => (
            <div>
              <GameDisplay price={item.price} size="wide" gameName={item.name} id={item._id} description={item.desc} categories={item.category} images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]} />
              <Button icon="close" text="Remove this item" type="button" className="inline-block mt-6" onClick={() => setCheckout(prev => {
                const newVersion = prev.filter(thing => thing !== item._id)
                localStorage.setItem("checkout", JSON.stringify(newVersion))
                return newVersion
                })} />
            </div>
          ))}
      </div>
      <div>
        <Button type="button" style="purple" size="big" text="Buy" icon="payments" onClick={buy} />
      </div>
      <Footer />
    </div>
  )
}

export default Checkout