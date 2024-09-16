import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

export const AuthContext = createContext<{user: { username: string } | null, setUser: Dispatch<SetStateAction<{username: string} | null>>}>({ user: null, setUser: () => null })

export default function AuthWrapper({children}: {children: ReactNode}) {
  const [user, setUser] = useState<{ username: string } | null>(null)
  useEffect(() => {
    const username = localStorage.getItem("username") as string
    const result = username ? { username } : null
    setUser(result)
  }, [])
  return(
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}