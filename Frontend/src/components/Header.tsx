import { Link, useRoute } from "wouter";
import Button from "./Button";
import { AuthenticationModalContext } from "../wrappers/AuthenticationModalWrapper";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "wouter";
import Modal from "./Modal";
import AuthForms from "./ModalPages/AuthForms";
import { AuthContext } from "../wrappers/AuthWrapper";
import { signOutHelper } from "../lib/AuthFunctions";
import default_pfp from "../assets/default_pfp.jpg"

export default function Header() {
  const [, setLocation] = useLocation()
  const { modalOpen, setModalOpen, setModalPage } = useContext(AuthenticationModalContext)
  const { user, setUser } = useContext(AuthContext)
  const [dropdown, setDropdown] = useState<boolean>(false)

  const [setNewPasswordRouteMatch] = useRoute("/reset-password");

  useEffect(() => {
    if(setNewPasswordRouteMatch){
      setModalPage("setNewPassword")
      setModalOpen(true)
      setLocation("/")
    }
  }, [setNewPasswordRouteMatch])

  return(
    <>
      <Modal open={modalOpen} closeModal={() => {
        setModalOpen(false);
        setTimeout(() => setModalPage("signIn"), 1000) // timeout so that the page changes after the animation
        }}>
        <AuthForms />
      </Modal>
      <div className="hidden md:flex items-center w-full h-16 z-20 fixed left-0 right-0 top-0 bg-wrench-neutral-dark/85 backdrop-blur-3xl content-layout-padding">
        <div className="text-2xl font-semibold block">
          <Link href="/">wrench</Link>
        </div>
        <div className="flex-1"></div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-6 text-lg">
          <Link href="/" className="hover:text-wrench-purple-1">Home</Link>
          <Link href="/search" className="hover:text-wrench-purple-1">Search</Link>
          <Link href="/test" className="hover:text-wrench-purple-1">Download</Link>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* <Button type="button" text="Sign Out" icon="logout" style="purple" size="big" onClick={() => signOutHelper(setUser)} /> */}
              <Link href="/" className="hover:text-wrench-purple-1 block material-icons text-xl">shopping_basket</Link>
              <Link href="/" className="hover:text-wrench-purple-1 block material-icons text-xl">notifications</Link>
              <div className="relative">
                <button onClick={() => alert("h")}>
                  <img alt="Default profile picture" src={default_pfp} className="size-10 rounded-full" />
                </button>
                { dropdown && (
                  <div className="bg-wrench-neutral-dark border border-wrench-neutral-3 rounded-2xl w-64 h-32 absolute right-0">

                  </div>
                ) }
              </div>
            </>
          ) : (
            <>
              <Button type="button" text="Sign In" icon="login" style="purple" size="big" onClick={() => setModalOpen(true)} />
            </>
          )}
        </div>
      </div>
    </>
  )
}