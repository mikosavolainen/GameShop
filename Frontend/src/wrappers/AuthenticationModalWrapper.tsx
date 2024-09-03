import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"

export const AuthenticationModalContext = createContext<{
  modalOpen: boolean,
  setModalOpen: Dispatch<SetStateAction<boolean>>
}>({
  modalOpen: false,
  setModalOpen: () => {}
})

export default function AuthenticationModalWrapper({children}: {children: ReactNode}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <AuthenticationModalContext.Provider value={{
      modalOpen,
      setModalOpen
    }}>
      {children}
    </AuthenticationModalContext.Provider>
  )
}