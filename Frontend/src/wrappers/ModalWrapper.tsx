import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import useScrollbarSize from "react-scrollbar-size"

export const ModalContext = createContext<{
  modalLoading: boolean,
  setModalLoading: Dispatch<SetStateAction<boolean>>,
  modalOpen: boolean,
  setModalOpen: Dispatch<SetStateAction<boolean>>,
  modalPage: string,
  setModalPage: Dispatch<SetStateAction<string>>,
  scrollbarCompensation: number,
  setScrollbarCompensation: Dispatch<SetStateAction<number>>
}>({
  modalLoading: false,
  setModalLoading: () => {},
  modalOpen: false,
  setModalOpen: () => {},
  modalPage: "",
  setModalPage: () => {},
  scrollbarCompensation: 0,
  setScrollbarCompensation: () => {}
})

export default function ModalWrapper({children}: {children: ReactNode}) {
  const [scrollbarCompensation, setScrollbarCompensation] = useState<number>(0)
  const { width } = useScrollbarSize();
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalPage, setModalPage] = useState<string>("signIn")
  useEffect(() => {
    if(modalOpen)
      setScrollbarCompensation(width)
    else
      setScrollbarCompensation(0)
  }, [modalOpen, setScrollbarCompensation, width])

  return (
    <ModalContext.Provider value={{
      modalLoading,
      setModalLoading,
      modalOpen,
      setModalOpen,
      modalPage,
      setModalPage,
      scrollbarCompensation,
      setScrollbarCompensation
    }}>
      {children}
    </ModalContext.Provider>
  )
}