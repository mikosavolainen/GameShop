import Input from "./Input"
// import GameDisplay from "./GameDisplay"
export default function SearchFilter(){
    return (
        <div className="pt-16">
            <div>
            <Input type='text' style='light' size='small' icon='search' label='Search' placeholder='Start your search here'/>
                <div className="bg-wrench-neutral-dark border border-wrench-neutral-3 rounded-2xl mt-6 p-3">
                    <button className="h-[20px] align-middle">
                    <span className="text-wrench-neutral-white material-icons pointer-events-none">
                        arrow_downward
                    </span>
                    </button>
                    <select className="text-wrench-neutal-white bg-wrench-neutral-dark pl-2">
                        <option>Sort by popularity</option>
                        <option>Sort by rating</option>
                        <option>Sort by release date</option>
                    </select>
                </div>
            </div>
        </div>
    )
}