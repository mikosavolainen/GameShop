import "../App.css";
import test_image_wrench from "../assets/test_image_wrench.png"
import Label from "./Label"
import Button from "./Button"

export default function GameDisplay({discount, price, size, game_name, categories, description}:{discount?: number, price: number, size: "small" | "large", game_name: string, categories: string[], description: string}){
    let image_width = 0
    let grids = ""
    let displayedDescription = description
    let displayedName = game_name
    switch (size){
        case "small":
            displayedName = displayedName.substring(0, 30)
            displayedDescription = description.substring(0, 45)
            image_width = 352
            break
        case "large":
            image_width = 748
            grids = "grid grid-cols-2"
            break
    }
    if (displayedDescription != description){
        displayedDescription += "..."
    }
    if (displayedName != game_name){
        displayedName += "..."
    }
    return(
        <div className={`${grids}`}>
        <img className="rounded-3xl" src={test_image_wrench} width={image_width}/>
            <div className="flex flex-col">
            <p className="text-wrench-neutral-white text-2xl py-2">{displayedName}</p>
            <Label categories={categories} />
            <p className="text-wrench-neutral-white text-left pt-2 text-base">{displayedDescription}</p>
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
            </div>
        </div>
    )
}