import { ReactNode, useEffect, useRef, MouseEvent } from "react";
import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ open = false, closeModal, children }: { open: boolean, closeModal: () => void, children?: ReactNode }) {
  const modalRef = useRef<HTMLDivElement>(null);
  // const scrollPosition = useRef<number>(0);

  useEffect(() => {
    // Function to prevent scrolling
    const preventScroll = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    if (open) {
      // Add event listeners to prevent scroll
      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });
      document.addEventListener('keydown', preventScroll, { passive: false }); // Optional: to prevent scroll via keyboard (e.g., arrow keys)

      // Optionally, save and reset scroll position if needed
      // scrollPosition.current = window.scrollY;

    } else {
      // Remove event listeners to enable scroll
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('keydown', preventScroll);
    }

    // Cleanup on component unmount or when `open` changes
    return () => {
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('keydown', preventScroll);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div ref={modalRef} className={`fixed w-full h-full backdrop-blur-md top-0 left-0 md:py-12 z-30`} onClick={closeModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >
          <motion.div className="bg-wrench-neutral-4 border border-wrench-neutral-3 rounded-3xl mx-auto w-full md:w-[560px] p-12" onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}> {/* Stop the click event from propagating to the parent div */}
            <div className="relative">
              <button className="material-icons block absolute right-0 t-0" onClick={closeModal}><span className="text-3xl text-wrench-neutral-white">close</span></button>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
