import { Link } from "wouter";
import Button from "./Button";
import { AuthenticationModalContext } from "../wrappers/AuthenticationModalWrapper";
import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion"

export default function MobileMenu({opened}: {opened: boolean}) {
  const { setModalOpen, setModalPage } = useContext(AuthenticationModalContext)
  return(
    <>
      <AnimatePresence>
        {opened && (
          <motion.div className="bg-wrench-neutral-dark h-full w-full fixed top-0 left-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
            <div className="h-[calc(100vh-64px)]">
              <Link href="/" className="bg-wrench-neutral-4 border border-wrench-neutral-3 rounded-3xl m-8 block p-6">
                <div className="size-20 rounded-full bg-wrench-neutral-2 mb-8"></div>
                <div className="flex justify-between mb-4">
                  <div>
                    <h2 className="text-2xl">Anonymous</h2>
                    {/* <span className="text-wrench-neutral-2">Something under the username</span> */}
                  </div>
                  {/* <button className="material-icons">logout</button> */}
                </div>
                <Button type="button" icon="login" text="Sign in" style="purple" onClick={() => {setModalOpen(true);setModalPage("signIn")}} />
              </Link>
              <Link href="/" className="px-8 block">Settings</Link>
              <div className="mx-8 border-b border-b-wrench-neutral-3 mt-4"></div>
              <Link href="/" className="px-8 block mt-4">Support</Link>
              <Link href="/" className="px-8 block mt-4">Leagal</Link>
              <Link href="/" className="px-8 block mt-4">Other</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}