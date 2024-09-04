import { Link } from "wouter";
import Button from "./Button";
import { AuthenticationModalContext } from "../wrappers/AuthenticationModalWrapper";
import { useContext, useEffect } from "react";
import Modal from "./Modal";
import Input from "./Input";

export default function Header() {
  const { modalOpen, setModalOpen } = useContext(AuthenticationModalContext)
  useEffect(() => {
    if(!open) {
      
    }
  }, [open])
  return(
    <>
      <Modal open={modalOpen} closeModal={() => setModalOpen(false)}>
        <h2 className="text-2xl">Sign Up</h2>
        <div>
          <Input type='text' style='light' size='big' icon='search' label='Search' placeholder='Start your search here' />
          <Input type='text' style='light' size='big' icon='search' label='Search' placeholder='Start your search here' />
          <Input type='text' style='light' size='big' icon='search' label='Search' placeholder='Start your search here' />
          <Input type='text' style='light' size='big' icon='search' label='Search' placeholder='Start your search here' />
          <Input type='text' style='light' size='big' icon='search' label='Search' placeholder='Start your search here' />
          <Input type='text' style='light' size='big' icon='search' label='Search' placeholder='Start your search here' />
          <Input type='text' style='light' size='big' icon='search' label='Search' placeholder='Start your search here' />
          <Input type='text' style='light' size='big' icon='search' label='Search' placeholder='Start your search here' />
          <Input type='text' style='light' size='big' icon='search' label='Search' placeholder='Start your search here' />
          <Input type='text' style='light' size='big' icon='search' label='Search' placeholder='Start your search here' />
          <Input type='text' style='light' size='big' icon='search' label='Search' placeholder='Start your search here' />
        </div>
      </Modal>
      <div className="flex items-center w-full h-16 z-20 sticky top-0 bg-wrench-neutral-dark/50 backdrop-blur-md content-layout-padding">
        <div className="text-2xl font-semibold block">
          <Link href="/">wrench</Link>
        </div>
        <div className="flex-1"></div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-6 text-lg">
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