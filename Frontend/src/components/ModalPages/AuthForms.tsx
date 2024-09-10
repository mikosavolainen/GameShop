import { useContext } from "react";
import { AuthenticationModalContext } from "../../wrappers/AuthenticationModalWrapper";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import PasswordReset from "./PasswordReset";
import PasswordResetSuccess from "./PasswordResetSuccess";

export default function AuthForms() {
  const { modalPage } = useContext(AuthenticationModalContext)
  switch(modalPage) {
    case "signIn":
      return <LoginForm />
    case "signUp":
      return <SignUpForm />
    case "passwordReset":
      return <PasswordReset />
    case "passwordResetSuccess":
      return <PasswordResetSuccess />
    default:
      return <></>
  }
}
