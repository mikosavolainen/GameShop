import { Link } from "wouter";
import Button from "./Button";
import { AuthenticationModalContext } from "../wrappers/AuthenticationModalWrapper";
import { /*FormEvent,*/ useContext, /*useEffect*/ } from "react";
import Modal from "./Modal";
import AuthForms from "./AuthForms";

export default function Header() {
  const { modalOpen, setModalOpen } = useContext(AuthenticationModalContext)
  // useEffect(() => {
  //   if(!open) {
      
  //   }
  // }, [open])
  return(
    <>
      <Modal open={modalOpen} closeModal={() => setModalOpen(false)}>
        <AuthForms />
      </Modal>
      <div className="hidden md:flex items-center w-full h-16 z-20 fixed left-0 right-0 top-0 bg-wrench-neutral-dark/85 backdrop-blur-3xl content-layout-padding">
        <div className="text-2xl font-semibold block">
          <Link href="/">wrench</Link>
        </div>
        <div className="flex-1"></div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-6 text-lg">
          <Link href="/" className="hover:text-wrench-purple-1">Home</Link>
          <Link href="/" className="hover:text-wrench-purple-1">News</Link>
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