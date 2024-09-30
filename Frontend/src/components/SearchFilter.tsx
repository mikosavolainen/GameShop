import { useState, useEffect } from "react"
import axios from "axios"
import Input from "./Input"
import { useLocation } from "wouter";
import Checkbox from "./Checkbox"
import Button from "./Button"
import GameDisplay from "./GameDisplay"
import { useSearch } from "wouter"
import image1 from "../assets/test_image_wrench.png"
import image2 from "../assets/test_image_wrench_2.png"
export default function SearchFilter(){
    const [, setLocation] = useLocation()
    const [searchValue, setSearchValue] = useState("")
    const [checkboxes, setCheckboxes] = useState([false, false, false, false, false, false, false, false, false, false])
    const [sortSwitch, setSortSwitch] = useState(true)
    const [selectedSorting, setSelectedSorting] = useState("grid")
    const searchString = useSearch()
    const [res, setRes] = useState([])
    useEffect(() => {
        const fetch = async () => {
          const apiUrl = import.meta.env.VITE_SERVER_BASE_API_URL; // Ensure this environment variable is correctly set
          const { data } = await axios.get(`${apiUrl}/search-game?text=${searchString.substring(2)}`); // idk why post is used on server side instead of get but ok
          console.log(data)
          setRes(data)
        }
    
        fetch()
      }, [searchString])
      const handleCheckboxCheck = (id: number) => {
        const checkbox = checkboxes
        checkbox[id] = !checkbox[id]
        console.log(checkbox)
        setCheckboxes(checkbox)
      }
      const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchValue(event.target.value)
    }
    function redirect(value: string){
        setLocation("/search?q="+value)
        event?.preventDefault()
    }
    return (
        <>
        <div className="lg:flex">
            <div className="lg:w-[383px]">
            <form>
          <div className={`w-full flex`}>
            <Input outerClassName="grow" /*blur={focusInputChange} focus={focusInputChange}*/ type='text' style='light' size='big' icon='search' label='Search' placeholder='Start your search here' onChange={handleInputChange}/>
            <div className="content-end ml-1">
            <Button size="big" style="purple" type="submit" icon="search" text="search" onClick={() => redirect(searchValue)}/>
            </div>
            </div>
        </form>
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
                <div className="scrollbar overflow-y-scroll max-h-60 mr-4">
                    <Checkbox label="Shooter" id="0" className="px-6 py-2" required={false} onChange={() => handleCheckboxCheck(0)}/>
                    <Checkbox label="Simulation" id="1" className="px-6 py-2" required={false} onChange={() => handleCheckboxCheck(1)}/>
                    <Checkbox label="Strategy" id="2" className="px-6 py-2" required={false} onChange={() => handleCheckboxCheck(2)}/>
                    <Checkbox label="Sci-fi" id="3" className="px-6 py-2" required={false} onChange={() => handleCheckboxCheck(3)}/>
                    <Checkbox label="Adventure" id="4" className="px-6 py-2" required={false} onChange={() => handleCheckboxCheck(4)}/>
                    <Checkbox label="Puzzle" id="5" className="px-6 py-2" required={false} onChange={() => handleCheckboxCheck(5)}/>
                    <Checkbox label="Action" id="6" className="px-6 py-2" required={false} onChange={() => handleCheckboxCheck(6)}/>
                    <Checkbox label="RPG" id="7" className="px-6 py-2" required={false} onChange={() => handleCheckboxCheck(7)}/>
                    <Checkbox label="Fantasy" id="8" className="px-6 py-2" required={false} onChange={() => handleCheckboxCheck(8)}/>
                    <Checkbox label="Stealth" id="9" className="px-6 py-2" required={false} onChange={() => handleCheckboxCheck(9)}/>
                    <Checkbox label="Multiplayer" id="10" className="px-6 py-2" required={false} onChange={() => handleCheckboxCheck(10)}/>
                </div>

                <p className="px-6 mt-4">Price</p>
                <Checkbox label="On sale" id="11" className="px-6 my-2" required={false}/>

                <p className="px-6 mt-4">Developers</p>
                <div className="flex py-3 mr-4">
                <Input outerClassName="pl-6 pr-3" type="text" style="dark" size="small" icon="search" placeholder="placeholder"/>
                <Button type="button" icon="restart_alt" text="Reset"/>
                </div>
                <div className="scrollbar overflow-y-scroll max-h-60 mr-4">
                <Checkbox label="A developer studio" id="12" className="px-6 py-2" required={false}/>
                <Checkbox label="A studio test" id="13" className="px-6 py-2" required={false}/>
                <Checkbox label="Basically, a developer name" id="14" className="px-6 py-2" required={false}/>
                <Checkbox label="Developer name" id="15" className="px-6 py-2" required={false}/>
                </div>
            </div>
            </div>
            <div className="mr-10 ml-10 w-[70%]">
            {searchString.substring(2) !== "" ? <p className="font-bold text-4xl">{res.length} results for {searchString.substring(2)}</p> : <p className="font-bold text-4xl">Showing all {searchString.substring(2)}</p>}
            {res.length > 20 && (
                <div className="flex my-4">
                    <button>&lt;</button>
                    <button className="mx-4">1</button>
                    <button className="underline">200</button>
                    <button className="mx-4">312</button>
                    <button>&gt;</button>
                </div>
            )}
            <div className={`${selectedSorting == "wide" ? `` : `grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8`}`}>
            { res.map((r: { name: string, price: number, desc: string, category: [], _id: string }) => (
                <GameDisplay
                    classname="pb-5"
                    gameName={r.name}
                    price={r.price}
                    description={r.desc}
                    size={selectedSorting == "wide" ? `wide` : `small`}
                    categories={r.category}
                    images={[image1, image2, image1, image1, image1]}
                    id={r._id}
                />
            )) }
            </div>
            {res.length > 20 && (
                <div className="flex my-4">
                    <button>&lt;</button>
                    <button className="mx-4">1</button>
                    <button className="underline">200</button>
                    <button className="mx-4">312</button>
                    <button>&gt;</button>
                </div>
            )}
            </div>
        </div>
        </>
    )
}