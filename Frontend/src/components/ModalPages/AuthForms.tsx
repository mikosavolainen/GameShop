import { useContext } from "react";
import { AuthenticationModalContext } from "../../wrappers/AuthenticationModalWrapper";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import PasswordReset from "./PasswordReset";
import PasswordResetSuccess from "./PasswordResetSuccess";
import SetNewPasswordForm from "./SetNewPasswordForm";
import ReviewForm from "./ReviewForm";

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
    case "setNewPassword":
      return <SetNewPasswordForm />
    case "review":
      return <ReviewForm />
    default:
      return <></>
  }
}
