import {
  SignInPageContainer,
  SignInLogoContainer,
  SignInContentContainer,
} from "./styles";
import { ReactComponent as LogoDinDin } from "../../assets/logo.svg";
import SignInHeroSection from "../../components/SignInHeroSection";
import SignInLoginSection from "../../components/SignInLoginSection";

export default function SignIn() {
  return (
    <SignInPageContainer>
      <SignInLogoContainer>
        <LogoDinDin />
      </SignInLogoContainer>
      <SignInContentContainer>
        <SignInHeroSection/>
        <SignInLoginSection/>
      </SignInContentContainer>
    </SignInPageContainer>
  );
}
