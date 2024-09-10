import { Link, useRoute } from "wouter";
import Button from "./Button";
import { AuthenticationModalContext } from "../wrappers/AuthenticationModalWrapper";
import { useContext, useEffect } from "react";
import { useLocation } from "wouter";
import Modal from "./Modal";
import AuthForms from "./ModalPages/AuthForms";

export default function Header() {
  const [, setLocation] = useLocation()
  const { modalOpen, setModalOpen, setModalPage } = useContext(AuthenticationModalContext)

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
          <Link href="/" className="hover:text-wrench-purple-1 block material-icons text-xl">shopping_basket</Link>
          <Link href="/" className="hover:text-wrench-purple-1 block material-icons text-xl">notifications</Link>
          <Button type="button" text="Sign In" icon="login" style="purple" size="big" onClick={() => setModalOpen(true)} />
        </div>
      </div>
    </>
  )
}