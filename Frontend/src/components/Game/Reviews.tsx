import { Link } from "wouter"
import default_pfp from "../../assets/default_pfp.jpg"
import RatingStars from "./RatingStars"
import { Interweave } from "interweave"
import Button from "../Button"

export default function Reviews() {
  return(
    <>
      <select className="text-wrench-neutal-white bg-wrench-neutral-dark">
        <option>Sort by rating (low to high)</option>
        <option>Sort by rating (high to low)</option>
        <option>Sort by date (new to old)</option>
        <option>Sort by rating (old to new)</option>
      </select>
      <div className="grid grid-cols-2 gap-12 my-6">
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
      </div>
      <div className="flex items-center my-12">
        <Button className="mx-auto" type="button" style="neutral" size="small" text="Load more" icon="keyboard_arrow_down" />
      </div>
    </>
  )
}

function Review() {
  return(
    <div>
      <Link href="/user/test" className="flex gap-2 mb-1.5">
        <img alt="" src={default_pfp} className="size-10 rounded-full" />
        <div className="grow">
          <span className="block">Username</span>
          <span className="block text-wrench-neutral-2 text-sm">December 23 2024</span>
        </div>
        <div>
          <div className="flex align-middle"><span className="mt-1 mr-1.5">4.2/5.0</span><RatingStars rating={4.2} /></div>
        </div>
      </Link>
      <Interweave noHtml content="This is a test review test testsetsefdgdfa asg qdgadsrcaesgas er asegf, edfgsdfg asdgsdfgag." />
    </div>
  )
}