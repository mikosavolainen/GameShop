import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import useScrollbarSize from "react-scrollbar-size"

export const AuthenticationModalContext = createContext<{
  modalOpen: boolean,
  setModalOpen: Dispatch<SetStateAction<boolean>>,
  scrollbarCompensation: number,
  setScrollbarCompensation: Dispatch<SetStateAction<number>>
}>({
  modalOpen: false,
  setModalOpen: () => {},
  scrollbarCompensation: 0,
  setScrollbarCompensation: () => {}
})

export default function AuthenticationModalWrapper({children}: {children: ReactNode}) {
  const [scrollbarCompensation, setScrollbarCompensation] = useState<number>(0)
  const { width } = useScrollbarSize();
  const [modalOpen, setModalOpen] = useState<boolean>(false)
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
      scrollbarCompensation,
      setScrollbarCompensation
    }}>
      {children}
    </AuthenticationModalContext.Provider>
  )
}