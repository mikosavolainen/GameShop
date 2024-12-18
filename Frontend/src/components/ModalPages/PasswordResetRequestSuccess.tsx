import { useContext } from "react";
import Button from "../Button";
import { ModalContext } from "../../wrappers/ModalWrapper";

export default function PasswordResetRequestSuccess() {
  const { setModalPage } = useContext(ModalContext)
  return(
    <>
      <h2 className="text-2xl mb-4">Reset link has been sent!</h2>
      <p>Please check your e-mail inbox.</p>
      <Button type="button" icon="login" size="big" style="neutral" className="block w-full mt-4" text="Sign in" onClick={() => setModalPage("signIn")} />
    </>
  )
}