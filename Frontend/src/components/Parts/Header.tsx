import { Link, useRoute, useSearch } from "wouter";
import Button from "../Button";
import { ModalContext } from "../../wrappers/ModalWrapper";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "wouter";
import Modal from "../Modal";
import ModalPages from "../ModalPages/ModalPages";
import { AuthContext } from "../../wrappers/AuthWrapper";
import { signOutHelper } from "../../lib/AuthFunctions";
import default_pfp from "../../assets/default_pfp.jpg"
import { AnimatePresence, motion } from "framer-motion"
import { useDetectClickOutside } from "react-detect-click-outside";

export default function Header() {
  const [, setLocation] = useLocation()
  const { modalOpen, setModalOpen, setModalPage } = useContext(ModalContext)
  const { user, setUser } = useContext(AuthContext)

  const [dropdown, setDropdown] = useState<boolean>(false)
  const [notificationsDropdown, setNotificationsDropdown] = useState<boolean>(false)
  const outsideRef = useDetectClickOutside({ onTriggered: () => setDropdown(false) });
  const outsideNotificationsRef = useDetectClickOutside({ onTriggered: () => setNotificationsDropdown(false) });

  const [setNewPasswordRouteMatch] = useRoute("/reset-password");
  const searchString = useSearch()

  useEffect(() => {
    if(setNewPasswordRouteMatch && searchString){
      setModalPage("resetPassword")
      setModalOpen(true)
      setLocation("/?"+searchString)
    }
  }, [setNewPasswordRouteMatch])

  return(
    <>
      <Modal open={modalOpen} closeModal={() => {
        setModalOpen(false);
        // setTimeout(() => setModalPage("signIn"), 1000) // timeout so that the page changes after the animation
        }}>
        <ModalPages />
      </Modal>
      <div className="hidden md:flex items-center w-full h-16 z-20 fixed left-0 right-0 top-0 bg-wrench-neutral-dark/85 backdrop-blur-3xl content-layout-padding">
        <div className="text-2xl font-semibold block">
          <Link href="/">wrench</Link>
        </div>
        <div className="flex-1"></div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-6 text-lg">
          <Link href="/" className="hover:text-wrench-purple-1">Home</Link>
          <Link href="/search" className="hover:text-wrench-purple-1">Search</Link>
          <Link href="/download" className="hover:text-wrench-purple-1">Download</Link>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/checkout" className="hover:text-wrench-purple-1 block material-symbols-rounded text-xl">shopping_basket</Link>
              <div className="relative" ref={outsideNotificationsRef}>
                <button onClick={() => setNotificationsDropdown(prev => !prev)} className="hover:text-wrench-purple-1 block material-symbols-rounded text-xl">notifications</button>
                <AnimatePresence>
                  { notificationsDropdown && (
                    <motion.div
                    initial={{ opacity: 0, y: -10 }} // Starts hidden and above the dropdown area
                    animate={{ opacity: 1, y: 0 }}   // Animates to full opacity and its original position
                    exit={{ opacity: 0, y: -10 }}     // Fades and slides back up when exiting
                    transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
                    onClick={() => setDropdown(false)}
                    className="bg-wrench-neutral-dark border border-wrench-neutral-3 rounded-2xl absolute top-12 right-0 text-right overflow-hidden py-1">
                      <h4 className="text-lg">Notifications</h4>
                    </motion.div>
                  ) }
                </AnimatePresence>
              </div>
              <div className="relative" ref={outsideRef}>
                <button onClick={() => setDropdown(prev => !prev)} className="flex gap-3 group">
                  <div className="text-right">
                    <span className="block group-hover:text-wrench-purple-1">{user.username}</span>
                    <span className="block text-xs group-hover:text-wrench-purple-1">something under</span>
                  </div>
                  <img alt="Default profile picture" src={default_pfp} className="size-8 rounded-full mt-1" />
                </button>
                <AnimatePresence>
                  { dropdown && (
                    <motion.div
                    initial={{ opacity: 0, y: -10 }} // Starts hidden and above the dropdown area
                    animate={{ opacity: 1, y: 0 }}   // Animates to full opacity and its original position
                    exit={{ opacity: 0, y: -10 }}     // Fades and slides back up when exiting
                    transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
                    onClick={() => setDropdown(false)}
                    className="bg-wrench-neutral-dark border border-wrench-neutral-3 rounded-2xl absolute top-12 right-0 text-right overflow-hidden py-1">
                      <Link href={`/user/${user.username}`} className="block py-2.5 pr-6 pl-12 whitespace-nowrap w-full hover:text-wrench-purple-1">My Profile</Link>
                      <Link href={`/settings`} className="block py-2.5 pr-6 pl-12 whitespace-nowrap w-full hover:text-wrench-purple-1">Settings</Link>
                      <button onClick={() => signOutHelper(setUser)} className="block py-2.5 pr-6 pl-12 m-0 whitespace-nowrap w-full text-right hover:text-wrench-purple-1">Sign Out</button>
                    </motion.div>
                  ) }
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <Button type="button" text="Sign In" icon="login" style="purple" size="big" onClick={() => {setModalOpen(true); setModalPage("signIn")}} />
            </>
          )}
        </div>
      </div>
    </>
  )
}