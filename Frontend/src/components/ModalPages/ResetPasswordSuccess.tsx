import { useContext } from "react";
import { ModalContext } from "../../wrappers/ModalWrapper";
import Button from "../Button";

export default function ResetPasswordSuccess() {
  const { setModalPage } = useContext(ModalContext)
  return(
    <>
      <h2 className="text-2xl mb-4">Your password has been reset!</h2>
      <p>You can now login.</p>
      <Button type="button" icon="login" size="big" style="neutral" className="block w-full mt-4" text="Sign in" onClick={() => setModalPage("signIn")} />
    </>
  )
}