import { useEffect, useState } from "react";
import { useParams } from "wouter";
import test_image_wrench from "../../assets/test_image_wrench.png"
import Label from "../Label";
import Button from "../Button";
import { Interweave } from "interweave";
import Reviews from "./Reviews";
import RatingStars from "./RatingStars";

const images = [
  { src: test_image_wrench, alt: 'Test alt' },
  { src: test_image_wrench, alt: 'Test alt' },
  { src: test_image_wrench, alt: 'Test alt' },
  { src: test_image_wrench, alt: 'Test alt' },
  { src: test_image_wrench, alt: 'Test alt' },
  { src: test_image_wrench, alt: 'Test alt' },
  { src: test_image_wrench, alt: 'Test alt' },
  { src: test_image_wrench, alt: 'Test alt' },
  { src: test_image_wrench, alt: 'Test alt' },
  { src: test_image_wrench, alt: 'Test alt' },
  { src: test_image_wrench, alt: 'Test alt' },
  { src: test_image_wrench, alt: 'Test alt' },
]

export default function GamePage() {
  const [chosenImage, setChosenImage] = useState(0)
  const params = useParams();
  useEffect(() => {
    async function fetch() { // function to fetch game information
      console.log(params.id)
    }
    fetch()
  }, [])
  return(
    <div className="content-layout-margin mb-16 md:mb-0 md:mt-16 overflow-hidden">
      <div className="flex flex-col xl:flex-row gap-8 mt-16">
        <div className="xl:w-[64%]">
          <img className="rounded-3xl" src={images[chosenImage].src} alt="Game image"/>
          <div className="w-full overflow-hidden mt-4 whitespace-nowrap">
            {images.map((image, index) => <button className={`inline-block mr-3 rounded-2xl ${chosenImage === index && "border-wrench-purple-1 border-2 p-0.5"}`} key={"image-button-"+index} onClick={() => setChosenImage(index)}><img className="rounded-xl w-36" src={image.src} alt="Game image"/></button>)}
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-semibold mb-4">Game name</h1>
          <div className="mb-4">
            <Label category="something" />
            <Label category="something" />
            <Label category="something" />
          </div>
          <div className="flex align-middle mb-4"><span className="mt-1 mr-1.5">4.2/5.0</span><RatingStars rating={4.2} /></div>
          <Button type="button" size="big" style="purple" text="Add to cart" icon="shopping_cart" className="mb-4" />
          <div className="mb-4 text-lg">
            <span style={{fontFamily: `"Trispace", sans-serif`}} className="line-through text-wrench-neutral-2 mr-4">98.20 &euro;</span>
            <span style={{fontFamily: `"Trispace", sans-serif`}}>123.45 &euro;</span>
          </div>
          <span>Also something about VAT here like if we are going to pay taxes</span>
        </div>
      </div>
      <div>
        <h2 className="text-2xl mt-6 mb-2 font-semibold">About this game</h2>
        <Interweave content="This string contains <b>HTML</b> and will safely be rendered!" />
      </div>
      <div>
        <h2 className="text-2xl mt-6 mb-2 font-semibold">Reviews</h2>
        <Reviews />
      </div>
    </div>
  )
}