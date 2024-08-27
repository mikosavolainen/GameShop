import '../App.css'
export default function Input({className, label, width, icon, size, type}:{className?: string, size: "small-white" | "normal-white" | "small-dark" | "normal-dark", type: "text" | "password", label?: string, icon: "search", width: number}){
    let string = ""
    switch (size){
        case "small-white":
            string = "bg-wrench-neutral-white rounded-full border border-wrench-neutral-3 text-wrench-neutral-dark text-16 p-1 pl-10 focus:border-wrench-neutral-2 outline-none"
            break
        case "normal-white":
            string = "bg-wrench-neutral-white rounded-full border border-wrench-neutral-3 text-wrench-neutral-dark text-20 p-2 pl-10 focus:border-wrench-neutral-2 outline-none"
            break
        case "small-dark":
            string = "bg-wrench-neutral-4 rounded-full border border-wrench-neutral-3 text-wrench-neutral-white text-16 p-1 pl-10 focus:border-wrench-neutral-2 outline-none"
            break
        case "normal-dark":
            string = "bg-wrench-neutral-4 rounded-full border border-wrench-neutral-3 text-wrench-neutral-white text-20 p-2 pl-10 focus:border-wrench-neutral-2 outline-none"
            break
    }
    return(
        <>
        <div>
        {
            label && <label className='m-0'>{label}</label>
        }
            <div className={`${className} relative`}>
            <span className="text-wrench-neutral-3 material-icons block absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs">{icon}</span>
            <input type={`${type}`} className={`${string}`} placeholder="Input placeholder" size={width}/>
            </div>
        </div>
        </>
    )      
}