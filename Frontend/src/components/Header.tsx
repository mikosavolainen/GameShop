import { Link } from "wouter";
import Button from "./Button";
import { AuthenticationModalContext } from "../wrappers/AuthenticationModalWrapper";
import { useContext } from "react";
import Modal from "./Modal";
import Input from "./Input";

export default function Header() {
  const { modalOpen, setModalOpen } = useContext(AuthenticationModalContext)
  return(
    <>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-2xl">Sign Up</h2>
        <div>
          <Input type='text' variation='normal-white' icon='search' label='Search' placeholder='Start your search here' />
        </div>
      </Modal>
      <div className="flex items-center w-full h-16 z-20">
        <div className="text-2xl font-semibold flex-1 block">
          <Link href="/">wrench</Link>
        </div>
        <div className="flex items-center flex-1 space-x-6 text-lg">
          <Link href="/" className="hover:text-wrench-purple-1">Home</Link>
          <Link href="/" className="hover:text-wrench-purple-1">News</Link>
          <Link href="/" className="hover:text-wrench-purple-1">Download</Link>
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