import GameDisplay from './GameDisplay'
import test_image_wrench from "../assets/test_image_wrench.png"
import test_image_wrench_2 from "../assets/test_image_wrench_2.png"
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Popular() {
  const [res, setRes] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const apiUrl = import.meta.env.VITE_SERVER_BASE_API_URL; // Ensure this environment variable is correctly set
      const { data } = await axios.post(`${apiUrl}/get-all-games`); // idk why post is used on server side instead of get but ok
      console.log(data)
      setRes(data)
    }

    fetch()
  }, [])
  return (
    <>
      <h2 className="text-xl font-semibold mt-12 mb-4">Popular</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        { res.map((r: any) => (
          <GameDisplay
            classname="pb-5"
            gameName={r.name}
            price={r.price}
            description={r.desc}
            size="small"
            categories={r.category}
            images={[test_image_wrench, test_image_wrench_2, test_image_wrench, test_image_wrench, test_image_wrench]}
          />
        )) }
      </div>
    </>
  )
}
