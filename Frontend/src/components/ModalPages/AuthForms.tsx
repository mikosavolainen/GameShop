import { useContext } from "react";
import { AuthenticationModalContext } from "../../wrappers/AuthenticationModalWrapper";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import PasswordResetRequest from "./PasswordResetRequest";
import PasswordResetRequestSuccess from "./PasswordResetRequestSuccess";
import SetNewPasswordForm from "./SetNewPasswordForm";
import ReviewForm from "./ReviewForm";

export default function AuthForms() {
  const { modalPage } = useContext(AuthenticationModalContext)
  switch(modalPage) {
    case "signIn":
      return <LoginForm />
    case "signUp":
      return <SignUpForm />
    case "passwordResetRequest":
      return <PasswordResetRequest />
    case "passwordResetRequestSuccess":
      return <PasswordResetRequestSuccess />
    case "setNewPassword":
      return <SetNewPasswordForm />
    case "review":
      return <ReviewForm />
    default:
      return <></>
  }
}
