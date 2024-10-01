import {
  ReactNode,
  useEffect,
  useRef,
  MouseEvent,
  useState,
  useContext,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingAnimation from './LoadingAnimation'
import { ModalContext } from '../wrappers/ModalWrapper'

export default function Modal({
  open = false,
  closeModal,
  children,
}: {
  open: boolean
  closeModal: () => void
  children?: ReactNode
}) {
  const scrollPosition = useRef(0)
  const [scrollTop, setScrollTop] = useState(0)

  const { modalLoading } = useContext(ModalContext)

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

    if (open) {
      disableScroll()
    } else {
      enableScroll()
    }

    // Cleanup when the modal is closed
    return () => {
      enableScroll()
    }
  }, [open])

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeModal()
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`fixed w-full h-full backdrop-blur-md top-0 left-0 md:py-12 z-30 overflow-y-auto bg-wrench-neutral-4/95 md:bg-wrench-neutral-4/0`}
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="md:bg-wrench-neutral-4/95 md:border border-wrench-neutral-3 md:rounded-3xl mx-auto w-full md:w-[560px] h-auto relative"
            onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Stop the click event from propagating to the parent div */}
            {modalLoading && (
              <motion.div
                className="absolute w-full h-full bg-wrench-neutral-white/20 z-30 flex flex-col items-center justify-center md:rounded-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingAnimation className="" />
              </motion.div>
            )}
            <div className="relative m-12">
              <button
                className="material-symbols-rounded block absolute right-0 t-0"
                onClick={closeModal}
              >
                <span className="text-3xl text-wrench-neutral-white">
                  close
                </span>
              </button>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
