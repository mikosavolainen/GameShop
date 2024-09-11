import "../App.css";
import test_image_wrench from "../assets/test_image_wrench.png"
import Label from "./Label"
import Button from "./Button"
import { Link } from "wouter"

export default function GameDisplay({classname, discount, price, size, gameName, categories, description}:{classname?: string, discount?: number | null, price: number, size: "small" | "large", gameName: string, categories: (string | undefined)[], description: string}){
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
    }
    if (displayedDescription != description){
        displayedDescription += "..."
    }
    if (displayedName != gameName){
        displayedName += "..."
    }
    return(
        <Link href="/test">
        <div className={`${grids} ${classname}`}>
        <img className="rounded-3xl" src={test_image_wrench} alt="Game"/>
            <div className="flex flex-col">
            <h4 className="text-wrench-neutral-white text-xl font-semibold my-2">{displayedName}</h4>
            <div>
              { categories.map((category) => <Label category={category as string} key={(Math.random() + 1).toString(36).substring(7)} />)}
            </div>
            <p className="text-wrench-neutral-white text-left mt-2 text-base">{displayedDescription}</p>
            {size == "large" && (
                <div className="flex flex-auto items-end">
                  <Button href="/test" className="mr-1" type="link" style="purple" icon="visibility" text="See more"/>
                  <Button className="mr-4" type="link" style="purple" icon="add" text="Add to cart"/>
                  <span className={`${discount ? "line-through text-wrench-neutral-2 pr-2" : "text-wrench-neutral-white"} text-left text-base py-1`} style={{fontFamily: `"Trispace", sans-serif`}}>{price} €</span>
                  {discount && <span className="text-wrench-neutral-white text-left text-base py-1" style={{fontFamily: `"Trispace", sans-serif`}}>{discount} €</span>}
                </div>
            )}
            {size == "small" && (
              <>
                <div className="flex flex-auto items-end mb-2">
                  <span className={`${discount ? "line-through text-wrench-neutral-2 pr-2" : "text-wrench-neutral-white"} text-left text-base py-1`} style={{fontFamily: `"Trispace", sans-serif`}}>{price} €</span>
                  {discount && <span className="text-wrench-neutral-white text-left text-base py-1" style={{fontFamily: `"Trispace", sans-serif`}}>{discount} €</span>}
                </div>
                <div className="flex flex-auto items-end">
                  <Button className="mr-1" type="link" style="purple" icon="visibility" text="See more"/>
                  <Button className="mr-4" type="link" style="purple" icon="add" text="Add to cart"/>
                </div>
              </>
            )}
            </div>
        </div>
        </Link>
    )
}