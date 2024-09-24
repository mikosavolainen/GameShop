import "../App.css";
import test_image_wrench from "../assets/test_image_wrench.png"
import Label from "./Label"
import Button from "./Button"
import { Link } from "wouter"
import { AuthenticationModalContext } from "../wrappers/AuthenticationModalWrapper";
import { useContext } from "react";

export default function GameDisplay({classname, discount, price, size, gameName, categories, description, review}:{review?: "none" | "send" | "edit", classname?: string, discount?: number | null, price: number, size: "small" | "large" | "wide", gameName: string, categories: (string | undefined)[], description: string}){
    const { setModalOpen, setModalPage } = useContext(AuthenticationModalContext)
    let grids = ""
    let displayedDescription = description
    let displayedName = gameName
    switch (size){
        case "small":
            displayedName = displayedName.substring(0, 30)
            displayedDescription = description.substring(0, 60)
            break
        case "large":
            grids = "grid lg:grid-cols-2 lg:gap-6"
            break
        case "wide":
            grids = "md:flex"
            break;
    }
    if (displayedDescription != description){
        displayedDescription += "..."
    }
    if (displayedName != gameName){
        displayedName += "..."
    }
    return(
      <>
        <Link className={`group ${grids} ${classname}`} href="/game/jtemporaryid">
          <img className={`rounded-3xl ${size !== "large" && "transition-all duration-150 group-hover:mt-[-4px] group-hover:mb-[4px] "} ${size == "wide" ? "mr-6" : ""}`} src={test_image_wrench} alt="Game" width={`${size == "wide" ? "362": ""}`}/>
          <div className="flex flex-col">
            <h4 className="text-wrench-neutral-white text-xl font-semibold mt-3 mb-3 transition-all duration-150 group-hover:text-wrench-purple-1">{displayedName}</h4>
            <div>
              { categories.map((category) => <Label category={category as string} key={(Math.random() + 1).toString(36).substring(7)} />)}
            </div>
            <p className="text-wrench-neutral-white text-left mt-3 text-base">{displayedDescription}</p>
            {size == "large" && (
                <div className="flex flex-auto items-end">
                  <Button href="/game/temporaryid" className="mr-1" type="link" style="purple" icon="visibility" text="See more"/>
                  {review == "send" && (
                    <Button type="button" style="coral" icon="send" text="Leave a review"></Button>
                  )}
                  {review == "edit" && (
                    <Button type="button" icon="edit" text="Edit review"></Button>
                  )}
                  {/* <Button href="/game?id=temporaryid" className="mr-4" type="link" style="purple" icon="add" text="Add to cart"/>         I think this is unnecessary*/} 
                  <span className={`${discount ? "line-through text-wrench-neutral-2 pr-2" : "text-wrench-neutral-white"} text-left text-base pt-3`} style={{fontFamily: `"Trispace", sans-serif`}}>{price} €</span>
                  {discount && <span className="text-wrench-neutral-white text-left text-base pt-3" style={{fontFamily: `"Trispace", sans-serif`}}>{discount} €</span>}
                </div>
            )}
            {size !== "large" && (
              <>
                <div className="flex flex-auto items-end mb-3">
                  <span className={`${discount ? "line-through text-wrench-neutral-2 pr-2" : "text-wrench-neutral-white"} text-left text-base pt-3`} style={{fontFamily: `"Trispace", sans-serif`}}>{price} €</span>
                  {discount && <span className="text-wrench-neutral-white text-left text-base pt-3" style={{fontFamily: `"Trispace", sans-serif`}}>{discount} €</span>}
                </div>
                <div className="flex flex-auto items-end" onClick={(e) => e.preventDefault()}>
                  <Button href="/game/temporaryid" className="mr-1" type="link" style="purple" icon="visibility" text="See more"/>
                  {review == "send" && (
                    <Button onClick={() => {setModalOpen(true); setModalPage("review")}}type="button" style="coral" icon="send" text="Leave a review"></Button>
                  )}
                  {review == "edit" && (
                    <Button onClick={() => {setModalOpen(true); setModalPage("review")}} type="button" icon="edit" text="Edit review"></Button>
                  )}
                  {/* <Button href="/game?id=temporaryid" className="mr-4" type="link" style="purple" icon="add" text="Add to cart"/> */}
                </div>
              </>
            )}
          </div>
        </Link>
      </>
    )
}