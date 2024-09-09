import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import useScrollbarSize from "react-scrollbar-size"

export const AuthenticationModalContext = createContext<{
  modalOpen: boolean,
  setModalOpen: Dispatch<SetStateAction<boolean>>,
  modalPage: string,
  setModalPage: Dispatch<SetStateAction<string>>,
  scrollbarCompensation: number,
  setScrollbarCompensation: Dispatch<SetStateAction<number>>
}>({
  modalOpen: false,
  setModalOpen: () => {},
  modalPage: "",
  setModalPage: () => {},
  scrollbarCompensation: 0,
  setScrollbarCompensation: () => {}
})

export default function AuthenticationModalWrapper({children}: {children: ReactNode}) {
  const [scrollbarCompensation, setScrollbarCompensation] = useState<number>(0)
  const { width } = useScrollbarSize();
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalPage, setModalPage] = useState<string>("signIn")
  useEffect(() => {
    if(modalOpen)
      setScrollbarCompensation(width)
    else
      setScrollbarCompensation(0)
  }, [modalOpen, setScrollbarCompensation])

  return (
    <AuthenticationModalContext.Provider value={{
      modalOpen,
      setModalOpen,
      modalPage,
      setModalPage,
      scrollbarCompensation,
      setScrollbarCompensation
    }}>
      {children}
    </AuthenticationModalContext.Provider>
  )
}