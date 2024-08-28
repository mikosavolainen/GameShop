import "../App.css";
import test_image_wrench from "../assets/test_image_wrench.png"
import Label from "./Label"
export default function GameDisplay({size, game_name, categories, description}:{size: "wide" | "small" | "large", game_name: string, categories: string[], description: string}){
    let width = 0
    let image_width = 0
    switch (size){
        case "wide":
            width = 1520
            image_width = 352
            break
        case "small":
            image_width = 352
            width = 352
            break
        case "large":
            image_width = 704
            width = 704
            break
    }
    return(
        <div className={`max-w-[${width}px]`}>
        <img className="rounded-3xl" src={test_image_wrench} width={image_width}/>
        <p className="text-wrench-neutral-white text-2xl py-2">{game_name}</p>
        <Label categories={categories} />
        <p className="text-wrench-neutral-white text-left py-2 text-base">{description} <a href="#" className="text-wrench-accent-gold hover:text-wrench-accent-gold">Read more...</a></p>
        </div>
    )
}