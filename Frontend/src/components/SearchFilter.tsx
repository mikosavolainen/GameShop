import Input from "./Input"
import { useState } from "react"
// import GameDisplay from "./GameDisplay"
export default function SearchFilter(){
    const [sortSwitch, setSortSwitch] = useState(true)
    const [selectedSorting, setSelectedSorting] = useState(true)
    return (
        <div className="pt-16">
            <div>
            <Input type='text' style='light' size='big' icon='search' label='Search' placeholder='Start your search here'/>
                <div className="bg-wrench-neutral-dark border border-wrench-neutral-3 rounded-2xl mt-4 p-3">
                    <button className="px-3 h-[20px] align-middle" onClick={() => setSelectedSorting(true)}>
                    <span className={`${selectedSorting == true ? `text-wrench-neutral-white` : `text-wrench-neutral-2`} material-icons pointer-events-none`}>
                        view_agenda
                    </span>
                    </button >
                    <button className="pr-3 h-[20px] align-middle" onClick={() => setSelectedSorting(false)}>
                    <span className={`${selectedSorting == false ? `text-wrench-neutral-white` : `text-wrench-neutral-2`} material-icons pointer-events-none`}>
                        grid_view
                    </span>
                    </button >

                    <button onClick={() => setSortSwitch(!sortSwitch)} className="pr-3 h-[20px] align-middle">
                    {sortSwitch && (
                    <span className="text-wrench-neutral-white material-icons pointer-events-none">
                        arrow_downward
                    </span>
                    )}
                    {sortSwitch == false && (
                    <span className="text-wrench-neutral-white material-icons pointer-events-none">
                        arrow_upward
                    </span>
                    )}
                    </button>

                    <select className="text-wrench-neutal-white bg-wrench-neutral-dark">
                        <option>Sort by popularity</option>
                        <option>Sort by rating</option>
                        <option>Sort by release date</option>
                    </select>
                </div>
            </div>
        </div>
    )
}