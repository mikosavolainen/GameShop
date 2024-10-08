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
    const [allResults, setAllResults] = useState(0)
    const [, setLocation] = useLocation()
    const [searchValue, setSearchValue] = useState("")
    const [end, setEnd] = useState("")
    const [checkboxes, setCheckboxes] = useState([false])
    const [sortSwitch, setSortSwitch] = useState(true)
    const [selectedSorting, setSelectedSorting] = useState("grid")
    const searchString = useSearch()
    const [cat, setCat] = useState<string[]>([])
    const [dev, setDev] = useState<string[]>([])
    const [res, setRes] = useState([])
    const [page, setPage] = useState(1)

        useEffect(() => {
        const categories: string[] = []
        const developers: string[] = []
        const fetch = async () => {
          const apiUrl = import.meta.env.VITE_SERVER_BASE_API_URL; // Ensure this environment variable is correctly set
          const { data } = await axios.get(`${apiUrl}/get-all-games`, {params: {limit: 20000, page:1}}); // idk why post is used on server side instead of get but ok
          data.map((r: { category: [], author: string }) => {
              developers.push(r.author)
              r.category.map((v: string ) => categories.push(v))
          })
        const uniqueCategories = [...new Set(categories)]
        const uniqueDevelopers = [...new Set(developers)]
        console.log(uniqueCategories)
          setCat(uniqueCategories)
          setDev(uniqueDevelopers)
        }
    
        fetch()
      }, [])
    useEffect(() => {
        const fetch = async () => {
          const apiUrl = import.meta.env.VITE_SERVER_BASE_API_URL; // Ensure this environment variable is correctly set
          const { data } = await axios.get(`${apiUrl}/search-game?${searchString}&limit=10&page=${page}`); // idk why post is used on server side instead of get but ok
          setRes(data)
        }
        fetch()
      }, [searchString, page])
    useEffect(() => {
    const fetch = async () => {
        const apiUrl = import.meta.env.VITE_SERVER_BASE_API_URL; // Ensure this environment variable is correctly set
        const { data } = await axios.get(`${apiUrl}/search-game?${searchString}&limit=10000000&page=1`); // idk why post is used on server side instead of get but ok
        setAllResults(data.length)
    }

    fetch()
    }, [searchString, page])
      const handleCheckboxCheck = (id: number, name?: string, dev?: boolean) => {
        const checkbox = checkboxes
        checkbox[id] = !checkbox[id]
        setCheckboxes(checkbox)
        let endpoint = ""
        if(!dev && checkboxes[id]){
            endpoint = `&category=${name}`
            setEnd(end+endpoint)
        }
        else if(!dev && !checkboxes[id]){
            endpoint = `&category=${name}`
            setEnd(end.replace(endpoint, ""))
        }
        else if(dev && checkboxes[id]){
            endpoint = `&author=${name}`
            setEnd(end+endpoint)
        }
        else if(dev && !checkboxes[id]){
            endpoint = `&author=${name}`
            setEnd(end.replace(endpoint, ""))
        }
      }
      const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchValue(event.target.value)
    }
    function search(value: string){
        setLocation(`/search?text=${value}${end}`)
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
            <Button size="big" style="purple" type="submit" icon="search" text="search" onClick={() => search(searchValue)}/>
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
                    { cat.map((r, index) => (
                        <Checkbox label={r} id={r.toString()} className="px-6 py-2" required={false} onChange={() => handleCheckboxCheck(index, r.toString())}/>
                )) }
                </div>

                <p className="px-6 mt-4">Price</p>
                <Checkbox label="On sale" id="11" className="px-6 my-2" required={false} onChange={() => handleCheckboxCheck(cat.length)}/>

                <p className="px-6 mt-4">Developers</p>
                <div className="flex py-3 mr-4">
                <Input outerClassName="pl-6 pr-3" type="text" style="dark" size="small" icon="search" placeholder="placeholder"/>
                <Button type="button" icon="restart_alt" text="Reset"/>
                </div>
                <div className="scrollbar overflow-y-scroll max-h-60 mr-4">
                { dev.map((r, index) => (
                        <Checkbox label={r} id={r.toString()} className="px-6 py-2" required={false} onChange={() => handleCheckboxCheck(index+cat.length, r.toString(), true)}/>
                )) }
                </div>
            </div>
            </div>
            <div className="mr-10 ml-10 w-[70%]">
            {searchString.substring(2) !== "" ? <p className="font-bold text-4xl">{allResults} results</p> : <p className="font-bold text-4xl">Showing all {searchString.substring(2)}</p>}
            {allResults > 10 && (
                <div className="flex my-4">
                    <button onClick={function thing(){setPage(page - 1)}}>&lt;</button>
                    <button onClick={function thing(){setPage(1)}} className="mx-4">1</button>
                    <button className="underline">{page}</button>
                    <button onClick={function thing(){setPage(Math.round(allResults / 10))}} className="mx-4">{(allResults / 10).toFixed()}</button>
                    <button onClick={function thing(){setPage(page + 1)}}>&gt;</button>
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
            {allResults > 10 && (
                <div className="flex my-4">
                    <button onClick={function thing(){setPage(page - 1)}}>&lt;</button>
                    <button onClick={function thing(){setPage(1)}} className="mx-4">1</button>
                    <button className="underline">{page}</button>
                    <button onClick={function thing(){setPage(Math.round(allResults/10))}} className="mx-4">{(allResults / 10).toFixed()}</button>
                    <button onClick={function thing(){setPage(page + 1)}}>&gt;</button>
                </div>
            )}
            </div>
        </div>
        </>
    )
}