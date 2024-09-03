import { ReactNode, useEffect, useRef, MouseEvent } from "react";
import { motion } from 'framer-motion';

export default function Modal({ open = false, closeModal, children }: { open: boolean, closeModal: () => void, children?: ReactNode }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock the background scroll when the modal is open
    if (open) {
      document.body.style.overflow = "hidden";
            if (modalRef.current) {
        modalRef.current.style.overflow = "auto";
      }
    } else {
      document.body.style.overflow = "auto";
      if (modalRef.current) {
        modalRef.current.style.overflow = "hidden";
      }
    }

    // Cleanup when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <motion.div ref={modalRef} className={`fixed w-full h-full backdrop-blur-md top-0 left-0 py-12 z-30 ${!open && "hidden"}`} onClick={closeModal}
    initial={{ opacity: 0 }}
    animate={{ opacity: open ? 1 : 0 }}
    >
      <motion.div className="bg-wrench-neutral-4 border border-wrench-neutral-3 rounded-3xl mx-auto w-1/3 p-12" onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}> {/* Stop the click event from propagating to the parent div */}
        <div className="relative">
          <button className="material-icons block absolute right-0 t-0" onClick={closeModal}><span className="text-3xl text-wrench-neutral-white">close</span></button>
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}
