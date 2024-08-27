import '../App.css'
export default function Input({placeholder, className, label, width, icon, size_color, type, onChange}:{placeholder: string,
                                                                                                        className?: string,
                                                                                                        label?: string,
                                                                                                        width: number,
                                                                                                        icon: "search" | "key" | "person" | "mail",
                                                                                                        size_color: "small-white" | "normal-white" | "small-dark" | "normal-dark",
                                                                                                        type: "text" | "password",
                                                                                                        onChange?: React.ChangeEventHandler<HTMLInputElement> }){
    let string = ""
    switch (size_color){
        case "small-white":
            string = "bg-wrench-neutral-white rounded-full border border-wrench-neutral-3 text-wrench-neutral-dark text-base p-1 pl-10 focus:border-wrench-neutral-2 outline-none"
            break
        case "normal-white":
            string = "bg-wrench-neutral-white rounded-full border border-wrench-neutral-3 text-wrench-neutral-dark text-xl p-2 pl-10 focus:border-wrench-neutral-2 outline-none"
            break
        case "small-dark":
            string = "bg-wrench-neutral-4 rounded-full border border-wrench-neutral-3 text-wrench-neutral-white text-base p-1 pl-10 focus:border-wrench-neutral-2 outline-none"
            break
        case "normal-dark":
            string = "bg-wrench-neutral-4 rounded-full border border-wrench-neutral-3 text-wrench-neutral-white text-xl p-2 pl-10 focus:border-wrench-neutral-2 outline-none"
            break
    }
    return(
        <>
        <div>
        {
            label && <label className='text-base block m-0 mt-1 mb-1 text-wrench-neutral-white'>{label}</label>
        }
            <div className={`${className} relative`}>
            <span className="text-wrench-neutral-3 material-icons block absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">{icon}</span>
            <input onChange={onChange} type={`${type}`} className={`${string}`} placeholder={`${placeholder}`} size={width}/>
            </div>
        </div>
        </>
    )      
}