import "../App.css";
import test_image_wrench from "../assets/test_image_wrench.png"
import Label from "./label"
export default function Game_display({size, game_name, categories, description}:{size: "small" | "medium" | "large", game_name: string, categories: string[], description: string}){
    let width = 0
    switch (size){
        case "small":
            width = 352
            break
        case "medium":
            width = 352
            break
        case "large":
            width = 704
            break
    }
    return(
        <div className={`max-w-[${width}px]`}>
        <img className="rounded-3xl" src={test_image_wrench}/>
        <p className="text-wrench-neutral-white text-2xl py-2">{game_name}</p>
        <Label categories={categories} />
        <p className="text-wrench-neutral-white text-left py-2 text-base">{description} <a href="#" className="text-wrench-accent-gold hover:text-wrench-accent-gold">Read more...</a></p>
        </div>
    )
}