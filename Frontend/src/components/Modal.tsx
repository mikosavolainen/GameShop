import { ReactNode } from "react";

export default function Modal({ open = false, onClose, children }: { open: boolean, onClose: () => void, children?: ReactNode }) {
  return (
    <div className={`fixed w-full h-full backdrop-blur-md top-0 left-0 z-30 ${!open && "hidden"}`}>
      <div className="bg-wrench-neutral-4 border border-wrench-neutral-3 rounded-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 p-12">
        <div className="relative">
          <button className="material-icons block absolute right-0 t-0" onClick={onClose}><span className="text-3xl text-wrench-neutral-white">close</span></button>
          {children}
        </div>
      </div>
    </div>
    )
}
