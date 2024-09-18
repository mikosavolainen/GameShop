import { useContext } from "react";
import Button from "../Button";
import { AuthenticationModalContext } from "../../wrappers/AuthenticationModalWrapper";

export default function PasswordResetSuccess() {
  const { setModalPage } = useContext(AuthenticationModalContext)
  return(
    <>
      <h2 className="text-2xl mb-4">Reset link has been sent!</h2>
      <p>Please check your e-mail inbox.</p>
      <Button type="button" icon="add" size="big" style="neutral" className="block w-full mt-4" text="Sign ip" onClick={() => setModalPage("signIn")} />
    </>
  )
}