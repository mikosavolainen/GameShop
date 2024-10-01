import { useContext } from "react";
import Button from "../Button";
import { AuthenticationModalContext } from "../../wrappers/AuthenticationModalWrapper";

export default function PasswordResetRequestSuccess() {
  const { setModalPage } = useContext(AuthenticationModalContext)
  return(
    <>
      <h2 className="text-2xl mb-4">Reset link has been sent!</h2>
      <p>Please check your e-mail inbox.</p>
      <Button type="button" icon="login" size="big" style="neutral" className="block w-full mt-4" text="Sign in" onClick={() => setModalPage("signIn")} />
    </>
  )
}