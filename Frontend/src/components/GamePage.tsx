import { useEffect } from "react";
import { useParams } from "wouter";
import test_image_wrench from "../assets/test_image_wrench.png"
import star_icon from "../assets/Star icon.svg"
import star_icon_golden from "../assets/Star icon golden.svg"
import star_half_icon from "../assets/Star Half Icon.svg"
import Label from "./Label";
import Button from "./Button";

export default function GamePage() {
  const params = useParams();
  useEffect(() => {
    async function fetch() { // function to fetch game information
      console.log(params.id)
    }
    fetch()
  }, [])
  return(
    <div className="content-layout-margin mb-16 md:mb-0 md:mt-16 overflow-hidden">
      <div className="flex gap-8 mt-16">
        <div className="w-[64%]">
          <img className="rounded-3xl" src={test_image_wrench} alt="Game image"/>
          <div className="w-full overflow-hidden mt-4 whitespace-nowrap">
            <button className="inline-block mr-3"><img className="rounded-xl w-36" src={test_image_wrench} alt="Game image"/></button>
            <button className="inline-block mr-3"><img className="rounded-xl w-36" src={test_image_wrench} alt="Game image"/></button>
            <button className="inline-block mr-3"><img className="rounded-xl w-36" src={test_image_wrench} alt="Game image"/></button>
            <button className="inline-block mr-3"><img className="rounded-xl w-36" src={test_image_wrench} alt="Game image"/></button>
            <button className="inline-block mr-3"><img className="rounded-xl w-36" src={test_image_wrench} alt="Game image"/></button>
            <button className="inline-block mr-3"><img className="rounded-xl w-36" src={test_image_wrench} alt="Game image"/></button>
            <button className="inline-block mr-3"><img className="rounded-xl w-36" src={test_image_wrench} alt="Game image"/></button>
            <button className="inline-block mr-3"><img className="rounded-xl w-36" src={test_image_wrench} alt="Game image"/></button>
            <button className="inline-block mr-3"><img className="rounded-xl w-36" src={test_image_wrench} alt="Game image"/></button>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-semibold mb-4">Game name</h1>
          <div className="mb-4">
            <Label category="something" />
            <Label category="something" />
            <Label category="something" />
          </div>
          <div className="flex gap-3 mb-4">
            <span>3.5/5.0</span>
            <div className="flex">
              <img src={star_icon_golden} />
              <img src={star_icon_golden} />
              <img src={star_icon_golden} />
              <img src={star_half_icon} />
              <img src={star_icon} />
            </div>
          </div>
          <Button type="button" size="big" style="purple" text="Add to cart" icon="shopping_cart" className="mb-4" />
          <div className="mb-4 text-lg">
            <span style={{fontFamily: `"Trispace", sans-serif`}} className="line-through text-wrench-neutral-2 mr-4">98.20 eur.</span>
            <span style={{fontFamily: `"Trispace", sans-serif`}}>123.45 eur.</span>
          </div>
          <span>Also something about VAT here like if we are going to pay taxes</span>
        </div>
      </div>
    </div>
  )
}