import '../App.css'
export default function Input({type}:{type: "small-white" | "normal-white" | "small-dark" | "normal-dark"}){
    let string = "";
    switch (type){
        case "small-white":
            string = "bg-wrench-neutral-white rounded-full border border-wrench-neutral-3 text-wrench-neutral-2 text-16 p-1"
            break
        case "normal-white":
            string = "bg-wrench-neutral-white rounded-full border border-wrench-neutral-3 text-wrench-neutral-2 text-20 p-2"
            break
        case "small-dark":
            string = "bg-wrench-neutral-4 rounded-full border border-wrench-neutral-3 text-wrench-neutral-2 text-16 p-1"
            break
        case "normal-dark":
            string = "bg-wrench-neutral-4 rounded-full border border-wrench-neutral-3 text-wrench-neutral-2 text-20 p-2"
            break
    }
    return(
        <>
        <input className={`${string}`} placeholder="Input placeholder"></input>
        </>
    )      
}