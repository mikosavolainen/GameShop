import { useContext, useEffect } from "react"
import { AuthContext } from "../wrappers/AuthWrapper";
import { useParams } from "wouter"
import default_pfp from "../assets/default_pfp.jpg"
import Button from "./Button";
import GameDisplay from "./GameDisplay";
export default function UserPageContent(){
    const params = useParams();
    useEffect(() => {
      async function fetch() { // 100% not copy pasted from GamePage.tsx
        console.log(params.user)
      }
      fetch()
    }, [])
    const { user, } = useContext(AuthContext) //this is for checking if user is logged in meaning if not logged in user cannot see the stff to change things.
    function Profile(){
        return(
            <>
            <div className="bg-wrench-neutral-dark border border-wrench-neutral-3 rounded-3xl p-6">
                <img alt="Default profile picture" src={default_pfp} className="size-56 rounded-full" />
                <div>
                <p className="font-medium text-5xl mt-2">{params.user}</p>
                <p>User description but its long af but its long af but its long af but its long af but its long af but its long af but its long af but its long af but its long af but its long af but its long af but its long af but its long af but its long af but its long af but its long af but its long af but its long af but its long af but its long af but its long af but its long af but its long af </p>
                <p className="text-wrench-neutral-2 mb-2">Joined user join date</p>
                <p>Games:600 Reviews:600</p>
                {params.user == user?.username && ( //Data privacy guys can fix this
                    <>
                    <Button className="mt-6" type="button" icon="edit" text="Edit profile"/>
                    </>
                )}
                </div>
            </div>
            </>
        )
    }
    function Library(){
        return(
            <>
            <div className="grid sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]} review={`${user?.username == params.user ? `send`:`none`}`}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]} review={`${user?.username == params.user ? `edit`:`none`}`}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>
                <GameDisplay classname="pb-5" gameName="gameName" price={40} description="Test" size="small" categories={["Cool"]}/>

            </div>
            </>
        )
    }
    return(
        <>
        <div className="lg:flex gap-5">
            <div className="w-2/3">
                <Profile />
            </div>
                <Library />
        </div>
        </>
    )   
}