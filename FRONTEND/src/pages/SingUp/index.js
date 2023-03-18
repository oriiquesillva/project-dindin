import {
  SignUpPageContainer,
  SignUpLogoContainer,
  SignUpContentContainer,
} from "./styles";
import { ReactComponent as LogoDinDin } from "../../assets/logo.svg";
import SignUpForm from "../../components/SingUpForm";


export default function SignIn() {
  return (
    <SignUpPageContainer>
      <SignUpLogoContainer>
        <LogoDinDin />
      </SignUpLogoContainer>
      <SignUpContentContainer>
        <SignUpForm/>
      </SignUpContentContainer>
    </SignUpPageContainer>
  );
}
