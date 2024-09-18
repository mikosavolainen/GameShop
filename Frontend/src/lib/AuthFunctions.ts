import { Dispatch, SetStateAction } from "react";

export function signOutHelper(setUser: Dispatch<SetStateAction<{username: string} | null>>) {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  setUser(null)
}

export function signInHelper(setUser: Dispatch<SetStateAction<{username: string} | null>>, token: string, username: string){
  localStorage.setItem("token", token)
  localStorage.setItem("username", username)
  setUser({username: username})
}