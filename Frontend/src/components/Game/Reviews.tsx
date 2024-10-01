import { Link } from "wouter"
import default_pfp from "../../assets/default_pfp.jpg"
import RatingStars from "./RatingStars"
import { Interweave } from "interweave"
import Button from "../Button"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Reviews({gameId}: {gameId: string}) {
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    async function fetch() { // function to fetch game information
      const apiUrl = import.meta.env.VITE_SERVER_BASE_API_URL; // Ensure this environment variable is correctly set
      const { data } = await axios.get(`${apiUrl}/get-reviews`, { params: { id: gameId } }); // idk why post is used on server side instead of get but ok
      setReviews(data)
      console.log(data)
    }
    fetch()
  }, [])
  return(
    <>
      <select className="text-wrench-neutal-white bg-wrench-neutral-dark">
        <option>Sort by rating (low to high)</option>
        <option>Sort by rating (high to low)</option>
        <option>Sort by date (new to old)</option>
        <option>Sort by rating (old to new)</option>
      </select>
      <div className="grid grid-cols-2 gap-12 my-6">
        { reviews.map((review: any) => <Review username={review.writer[0].username as string} date={review.date} rating={review.rating} content={review.desc} />) }
      </div>
      <div className="flex items-center my-12">
        <Button className="mx-auto" type="button" style="neutral" size="small" text="Load more" icon="keyboard_arrow_down" /* onClick={() => fetchMoreReviews()} */ />
      </div>
    </>
  )
}

function Review({username, date, rating, content}: {username: string, date: Date, rating: number, content: string}) {
  return(
    <div>
      <Link href="/user/test" className="flex gap-2 mb-1.5">
        <img alt="" src={default_pfp} className="size-10 rounded-full" />
        <div className="grow">
          <span className="block">{username}</span>
          <span className="block text-wrench-neutral-2 text-sm">{date.toString()}</span>
        </div>
        <div>
          <div className="flex align-middle"><span className="mt-1 mr-1.5">{rating}/5</span><RatingStars rating={rating} /></div>
        </div>
      </Link>
      <Interweave noHtml content={content} />
    </div>
  )
}