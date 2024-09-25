import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"

export default function MobileNotifications({opened, setOpened}: {opened: boolean, setOpened: Dispatch<SetStateAction<boolean>>}) {
/*   const { setModalOpen, setModalPage } = useContext(AuthenticationModalContext)
  const { user, setUser } = useContext(AuthContext) */
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
              <h2 className="mx-8 mt-8 mb-8 text-xl font-semibold">Notifications</h2>
              <div className="mx-8 flex flex-col gap-8">
                <div>
                  Notification 1
                </div>
                <div>
                  Notification 2
                </div>
                <div>
                  Notification 3
                </div>
                <div>
                  Notification 4
                </div>
                <div>
                  Notification 5
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}