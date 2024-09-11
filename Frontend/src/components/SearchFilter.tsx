import { useState } from "react"
import Input from "./Input"
import Checkbox from "./Checkbox"
import Button from "./Button"
export default function SearchFilter(){
    const [sortSwitch, setSortSwitch] = useState(true)
    const [selectedSorting, setSelectedSorting] = useState(true)
    return (
        <div className="mt-4">
        <div className="bg-wrench-neutral-dark border border-wrench-neutral-3 rounded-2xl p-3">
            <button className="px-3 h-[20px] align-middle" onClick={() => setSelectedSorting(true)}>
            <span className={`${selectedSorting == true ? `text-wrench-neutral-white` : `text-wrench-neutral-2`} material-icons cursor-pointer`}>
                view_agenda
            </span>
            </button >
            <button className="pr-3 h-[20px] align-middle" onClick={() => setSelectedSorting(false)}>
            <span className={`${selectedSorting == false ? `text-wrench-neutral-white` : `text-wrench-neutral-2`} material-icons cursor-pointer`}>
                grid_view
            </span>
            </button >

            <button onClick={() => setSortSwitch(!sortSwitch)} className="pr-3 h-[20px] align-middle">
            {sortSwitch && (
            <span className="text-wrench-neutral-white material-icons cursor-pointer">
                arrow_downward
            </span>
            )}
            {sortSwitch == false && (
            <span className="text-wrench-neutral-white material-icons cursor-pointer">
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
        <div className="border border-wrench-neutral-3 rounded-2xl mt-4">
            <p className="px-6 mt-4"><span className="pr-2 align-middle w-[22px] h-[22px] text-wrench-neutral-white material-icons pointer-events-none">filter_alt</span>Filters</p>
            <p className="px-6 mt-4">Categories</p>
            <div className="flex py-3 mr-4">
            <Input outerClassName="pl-6 pr-3" type="text" style="dark" size="small" icon="search" placeholder="placeholder"/>
            <Button type="button" icon="restart_alt" text="Reset"/>
            </div>
            <Checkbox label="Action" id="0" className="px-6 py-2" required={false}/>
            <Checkbox label="Adventure" id="1" className="px-6 py-2" required={false}/>
            <Checkbox label="RPG" id="2" className="px-6 py-2" required={false}/>
            <Checkbox label="Simulation" id="3" className="px-6 py-2" required={false}/>
            <Checkbox label="Strategy" id="4" className="px-6 py-2" required={false}/>

            <p className="px-6 mt-4">Price</p>
            <Checkbox label="On sale" id="10" className="px-6 my-2" required={false}/>

            <p className="px-6 mt-4">Developers</p>
            <div className="flex py-3 mr-4">
            <Input outerClassName="pl-6 pr-3" type="text" style="dark" size="small" icon="search" placeholder="placeholder"/>
            <Button type="button" icon="restart_alt" text="Reset"/>
            </div>
            <Checkbox label="A developer studio" id="5" className="px-6 py-2" required={false}/>
            <Checkbox label="A studio test" id="6" className="px-6 py-2" required={false}/>
            <Checkbox label="Basically, a developer name" id="7" className="px-6 py-2" required={false}/>
            <Checkbox label="Developer name" id="8" className="px-6 py-2" required={false}/>
            <Checkbox label="Studio developer, developer" id="9" className="px-6 py-2" required={false}/>
        </div>
        </div>
    )
}