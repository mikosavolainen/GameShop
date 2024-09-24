import { useState } from "react"
import Input from "./Input"
import Search from "./Search"
import Checkbox from "./Checkbox"
import Button from "./Button"
import GameDisplay from "./GameDisplay"
import { useSearch } from "wouter"
export default function SearchFilter(){
    const [sortSwitch, setSortSwitch] = useState(true)
    const [selectedSorting, setSelectedSorting] = useState("grid")
    const searchString = useSearch()
    return (
        <>
        <div className="lg:flex">
            <div className="lg:w-[383px]">
            <Search />
            <div className="bg-wrench-neutral-dark border border-wrench-neutral-3 rounded-2xl p-3 mt-4">
                <button className="px-3 h-[20px] align-middle" onClick={() => setSelectedSorting("wide")}>
                <span className={`${selectedSorting == "wide" ? `text-wrench-neutral-white` : `text-wrench-neutral-2`} material-symbols-rounded cursor-pointer`}>
                    view_agenda
                </span>
                </button >
                <button className="pr-3 h-[20px] align-middle" onClick={() => setSelectedSorting("grid")}>
                <span className={`${selectedSorting == "grid" ? `text-wrench-neutral-white` : `text-wrench-neutral-2`} material-symbols-rounded cursor-pointer`}>
                    grid_view
                </span>
                </button >

                <button onClick={() => setSortSwitch(!sortSwitch)} className="pr-3 h-[20px] align-middle">
                {sortSwitch && (
                <span className="text-wrench-neutral-white material-symbols-rounded cursor-pointer">
                    arrow_downward
                </span>
                )}
                {sortSwitch == false && (
                <span className="text-wrench-neutral-white material-symbols-rounded cursor-pointer">
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
            <div className="border border-wrench-neutral-3 rounded-2xl mt-4 pb-6">
                <p className="px-6 mt-4"><span className="pr-2 align-middle w-[22px] h-[22px] text-wrench-neutral-white material-symbols-rounded pointer-events-none">filter_alt</span>Filters</p>
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
            <div className="mr-10 ml-10 w-[70%]">
            {searchString.substring(2) !== "" ? <p className="font-bold text-4xl">300 results for {searchString.substring(2)}</p> : <p className="font-bold text-4xl">Showing all {searchString.substring(2)}</p>}
            <div className="flex my-4">
                <button>&lt;</button>
                <button className="mx-4">1</button>
                <button className="underline">200</button>
                <button className="mx-4">312</button>
                <button>&gt;</button>
            </div>
            <div className={`${selectedSorting == "wide" ? `` : `grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4`}`}>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size={selectedSorting == "wide" ? `wide` : `small`} categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size={selectedSorting == "wide" ? `wide` : `small`} categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size={selectedSorting == "wide" ? `wide` : `small`} categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size={selectedSorting == "wide" ? `wide` : `small`} categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size={selectedSorting == "wide" ? `wide` : `small`} categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size={selectedSorting == "wide" ? `wide` : `small`} categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size={selectedSorting == "wide" ? `wide` : `small`} categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size={selectedSorting == "wide" ? `wide` : `small`} categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size={selectedSorting == "wide" ? `wide` : `small`} categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size={selectedSorting == "wide" ? `wide` : `small`} categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size={selectedSorting == "wide" ? `wide` : `small`} categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size={selectedSorting == "wide" ? `wide` : `small`} categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size={selectedSorting == "wide" ? `wide` : `small`} categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size={selectedSorting == "wide" ? `wide` : `small`} categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size={selectedSorting == "wide" ? `wide` : `small`} categories={["Cool"]}/>
            </div>
            <div className="flex my-4">
                <button>&lt;</button>
                <button className="mx-4">1</button>
                <button className="underline">200</button>
                <button className="mx-4">312</button>
                <button>&gt;</button>
            </div>
            </div>
        </div>
        </>
    )
}