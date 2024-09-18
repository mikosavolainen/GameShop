import { useContext, useEffect } from "react"
import { AuthContext } from "../wrappers/AuthWrapper";
import { useParams } from "wouter"
import default_pfp from "../assets/default_pfp.jpg"
import Button from "./Button";
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
            <div>
                <img alt="Default profile picture" src={default_pfp} className="size-56 rounded-full mt-1" />
                <div className="ml-2">
                <p className="font-medium text-5xl mt-2">{params.user}</p>
                <p>User description</p>
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
    return(
        <>
            <Profile />
        </>
    )   
}