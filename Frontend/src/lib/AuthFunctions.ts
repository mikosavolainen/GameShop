import { Dispatch, SetStateAction } from "react";
import { jwtDecode } from "jwt-decode";

export function signOutHelper(setUser: Dispatch<SetStateAction<{username: string} | null>>) {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  setUser(null)
}

export function signInHelper(setUser: Dispatch<SetStateAction<{username: string} | null>>, token: string){
  localStorage.setItem("token", token)

  // Decode the JWT token to get the payload
  const decodedToken: { username: string } = jwtDecode(token);

  localStorage.setItem("username", decodedToken.username)

  setUser({username: decodedToken.username})
}