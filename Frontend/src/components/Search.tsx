import Input from "./Input"
import { useLocation } from "wouter";
import { useState } from "react"
import Button from "./Button";

export default function Search({inLanding}:{inLanding?:boolean}){
    const [, setLocation] = useLocation()
    // const [searchBlock, setSearchBlock] = useState(false)
    // const [inputFocus, setInputFocus] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    // const focusInputChange: React.FocusEventHandler<HTMLInputElement> = (event) => {
    //     if(event.type == "focus"){
    //         setInputFocus(true)
    //     }
    //     else{
    //         setTimeout(function() {
    //             setInputFocus(false)
    //         }, 200);
    //     }
    // }
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchValue(event.target.value)
            // setSearchBlock(true)
        // else{
        //     setSearchBlock(false)
        // }
    }
    function redirect(value: string){
        setLocation("/search?q="+value)
        if(!inLanding){
            event?.preventDefault()
        }
    }
    return(
        <>
        <form>
          <div className={`w-full ${inLanding && "xl:w-1/2"} flex`}>
            <Input outerClassName="grow" /*blur={focusInputChange} focus={focusInputChange}*/ type='text' style='light' size='big' icon='search' label='Search' placeholder='Start your search here' onChange={handleInputChange}/>
            <div className="content-end ml-1">
            <Button size="big" style="purple" type="submit" icon="search" text="search" onClick={() => redirect(searchValue)}/>
            </div>
            </div>
        </form>
        {/* {searchBlock && inputFocus && inLanding && (
            <div className="absolute text-wrench-neutral-dark bg-wrench-neutral-white w-1/2 p-2 rounded-2xl">
                <button onClick={() => redirect("test")} className="p-1 my-1 min-w-full border border-wrench-neutral-dark hover:border-wrench-neutral-2 rounded-xl">
                    test
                </button>
                <button onClick={() => redirect("test")} className="p-1 my-1 min-w-full border border-wrench-neutral-dark hover:border-wrench-neutral-2 rounded-xl">
                    test
                </button>
            </div>
        )} */}
        </>
    )
}