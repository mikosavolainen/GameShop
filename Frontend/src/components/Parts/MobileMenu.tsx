import { Link } from "wouter";
import Button from "../Button";
import { AuthenticationModalContext } from "../../wrappers/AuthenticationModalWrapper";
import { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import default_pfp from "../../assets/default_pfp.jpg"
import { AuthContext } from "../../wrappers/AuthWrapper";
import { signOutHelper } from "../../lib/AuthFunctions";

export default function MobileMenu({opened}: {opened: boolean}) {
  const { setModalOpen, setModalPage } = useContext(AuthenticationModalContext)
  const { user, setUser } = useContext(AuthContext)
  const scrollPosition = useRef(0)
  const [scrollTop, setScrollTop] = useState(0)

  const handleScroll = () => {
    setScrollTop(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const disableScroll = () => {
      // Save the current scroll position
      scrollPosition.current = scrollTop

      // Set body to fixed position at the current scroll position
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPosition.current}px`
      document.body.style.width = '100%'
    }

    const enableScroll = () => {
      // Re-enable scroll and reset the body's position
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''

      // Restore the scroll position
      window.scrollTo(0, scrollPosition.current)
    }

    if (opened) {
      disableScroll()
    } else {
      enableScroll()
    }

    // Cleanup when the modal is closed
    return () => {
      enableScroll()
    }
  }, [opened])

  return(
    <>
      <AnimatePresence>
        {opened && (
          <motion.div className="bg-wrench-neutral-dark h-full w-full fixed top-0 left-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
            <div className="h-[calc(100vh-64px)]">
              <Link href={user ? "/user/"+user.username : "#"} className="bg-wrench-neutral-4 border border-wrench-neutral-3 rounded-3xl m-8 block p-6">
                <img alt="Default profile picture" src={default_pfp} className="size-16 rounded-full mb-6" />
                <div className="flex justify-between mb-4">
                  <div>
                    <h2 className="text-2xl">{user ? user.username : "Anonymous"}</h2>
                    <span className="text-wrench-neutral-2">Something under the username</span>
                  </div>
                </div>
                {user ? (
                  <Button type="button" icon="logout" text="Sign out" style="neutral" onClick={() => {signOutHelper(setUser)}} />
                ) : (
                  <Button type="button" icon="login" text="Sign in" style="purple" onClick={() => {setModalOpen(true);setModalPage("signIn")}} />
                )}
                
              </Link>
              <Link href="/" className="px-8 block">Settings</Link>
              <div className="mx-8 border-b border-b-wrench-neutral-3 mt-4"></div>
              <Link href="/" className="px-8 block mt-4">Support</Link>
              <Link href="/" className="px-8 block mt-4">Legal</Link>
              <Link href="/" className="px-8 block mt-4">Other</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}