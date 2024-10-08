import "../App.css";
import Label from "./Label"
import Button from "./Button"
import { Link } from "wouter"
import { ModalContext } from "../wrappers/ModalWrapper";
import { useContext, useState } from "react";

export default function GameDisplay({classname, discount, price, size, gameName, categories, description, review, images, id}:{review?: "none" | "send" | "edit", classname?: string, discount?: number | null, price: number, size: "small" | "large" | "wide", gameName: string, categories: (string | undefined)[], description: string, images: string[], id: string}){
    const { setModalOpen, setModalPage } = useContext(ModalContext)
    const [srcIndex, setSrcIndex] = useState<number>(0)
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
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const elementHeight = event.currentTarget.offsetWidth;
      const x = event.nativeEvent.offsetX;
    
      // Calculate the part based on mouse position (dividing into 5 equal parts)
      const part = Math.floor((x / elementHeight) * 5);
    
      // Set hover part to 0-4 depending on the mouse's vertical position
      setSrcIndex(part);
    };

    return(
      <>
        <Link className={`group ${grids} ${classname}`} href={"/game/"+id}>
          <div className="relative">
            <img className={`rounded-3xl ${size !== "large" && "transition-all duration-150 group-hover:mt-[-4px] group-hover:mb-[4px]"} ${size == "wide" ? "mr-6" : ""}`} src={images[srcIndex]} alt="Game" width={`${size == "wide" ? "362": ""}`} onMouseMove={handleMouseMove} onMouseLeave={() => setSrcIndex(0)} />
            <div className="hidden group-hover:flex group-hover:gap-1 absolute left-1/2 -translate-x-1/2 bottom-2">
              { Array.from({ length: 5 }).map((_, i) =>(
                  <svg key={i} height="8" width="8" xmlns="http://www.w3.org/2000/svg">
                    <circle r="3.6" cx="4" cy="4" className={srcIndex === i ? "fill-wrench-neutral-white/60" : "fill-wrench-neutral-white/20"} />
                  </svg>
                )) }
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="text-wrench-neutral-white text-2xl font-semibold mt-4 mb-4 transition-all duration-150 group-hover:text-wrench-purple-1">{displayedName}</h4>
            <div>
              { categories.map((category) => <Label category={category as string} key={(Math.random() + 1).toString(36).substring(7)} />)}
            </div>
            <p className="text-wrench-neutral-white text-left mt-4 text-base">{displayedDescription}</p>
            {size == "large" && (
                <div className="mt-4 lg:mt-auto mb-4">
                  <Button href="/game/temporaryid" className="mr-1" type="link" style="purple" icon="visibility" text="See more"/>
                  {review == "send" && (
                    <Button type="button" style="coral" icon="send" text="Leave a review"></Button>
                  )}
                  {review == "edit" && (
                    <Button type="button" icon="edit" text="Edit review"></Button>
                  )}
                  <div className="inline-block ml-3">
                    <span className="mr-3">Price:</span>
                    <span className={`${discount ? "line-through text-wrench-neutral-2 pr-2" : "text-wrench-neutral-white"} text-left text-base pt-4`} style={{fontFamily: `"Trispace", sans-serif`}}>{price} €</span>
                    {discount && <span className="text-wrench-neutral-white text-left text-base pt-4" style={{fontFamily: `"Trispace", sans-serif`}}>{discount} €</span>}
                  </div>
                </div>
            )}
            {size !== "large" && (
              <>
                <div className="mt-4" onClick={(e) => e.preventDefault()}>
                  <Button href="/game/temporaryid" className="mr-1" type="link" style="purple" icon="visibility" text="See more"/>
                  {review == "send" && (
                    <Button onClick={() => {setModalOpen(true); setModalPage("review/"+id)}}type="button" style="coral" icon="send" text="Leave a review"></Button>
                  )}
                  {review == "edit" && (
                    <Button onClick={() => {setModalOpen(true); setModalPage("review/"+id)}} type="button" icon="edit" text="Edit review"></Button>
                  )}
                  <div className="inline-block ml-3">
                    <span className="mr-3">Price:</span>
                    <span className={`${discount ? "line-through text-wrench-neutral-2 pr-2" : "text-wrench-neutral-white"} text-left text-base pt-4`} style={{fontFamily: `"Trispace", sans-serif`}}>{price} €</span>
                    {discount && <span className="text-wrench-neutral-white text-left text-base pt-4" style={{fontFamily: `"Trispace", sans-serif`}}>{discount} €</span>}
                  </div>
                </div>
              </>
            )}
          </div>
        </Link>
      </>
    )
}