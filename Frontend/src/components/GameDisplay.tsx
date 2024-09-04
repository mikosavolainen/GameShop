import "../App.css";
import test_image_wrench from "../assets/test_image_wrench.png"
import Label from "./Label"
import Button from "./Button"

export default function GameDisplay({classname, discount, price, size, game_name, categories, description}:{classname?: string, discount?: number, price: number, size: "small" | "large", game_name: string, categories: string[], description: string}){
    let grids = ""
    let displayedDescription = description
    let displayedName = game_name
    let image_width = 10000
    switch (size){
        case "small":
            displayedName = displayedName.substring(0, 30)
            displayedDescription = description.substring(0, 45)
            image_width = 380
            break
        case "large":
            grids = "xl:grid xl:grid-cols-2 xl:gap-3"
            break
    }
    if (displayedDescription != description){
        displayedDescription += "..."
    }
    if (displayedName != game_name){
        displayedName += "..."
    }
    return(
        <div className={`${grids} ${classname}`}>
        <img className="rounded-3xl" src={test_image_wrench} width={image_width} alt="Game"/>
            <div className="flex flex-col">
            <p className="text-wrench-neutral-white text-2xl py-2">{displayedName}</p>
            <Label categories={categories} />
            <p className="text-wrench-neutral-white text-left pt-2 text-base">{displayedDescription}</p>
            {size == "large" &&(
                <div className="flex flex-auto items-end">
                <Button className="mr-1" type="link" style="purple" icon="visibility" text="See more"/>
                <Button className="mr-4" type="link" style="purple" icon="add" text="Add to cart"/>
                {discount && (
                    <p className="text-wrench-neutral-2 text-left text-base py-1 pr-4 line-through" id="price">{price} €</p>
                )}
                {discount && (
                    <p className="text-wrench-neutral-white text-left text-base py-1" id="price">{discount} €</p>
                )}
                {discount == null && (
                    <p className="text-wrench-neutral-white text-left text-base py-1" id="price">{price} €</p>
                )}
                </div>
            )}
            {size == "small" &&(
                <div className="flex flex-auto items-end">
                {discount && (
                    <p className="text-wrench-neutral-2 text-left text-base py-1 pr-4 line-through" id="price">{price} €</p>
                )}
                {discount && (
                    <p className="text-wrench-neutral-white text-left text-base py-1" id="price">{discount} €</p>
                )}
                {discount == null && (
                    <p className="text-wrench-neutral-white text-left text-base py-1" id="price">{price} €</p>
                )}
                </div>
            )}
            {size == "small" &&(
                <div className="flex flex-auto items-end">
                <Button className="mr-1" type="link" style="purple" icon="visibility" text="See more"/>
                <Button className="mr-4" type="link" style="purple" icon="add" text="Add to cart"/>
                </div>
            )}
            </div>
        </div>
    )
}