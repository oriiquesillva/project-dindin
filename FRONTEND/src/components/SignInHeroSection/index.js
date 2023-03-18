import { SignInHeroSectionContainer } from "./styles";
import { Typography } from "@mui/material";
import MainButton from "../MainButton";
import { useNavigate } from "react-router-dom"

export default function SignInHeroSection() {
  const navigate = useNavigate()
  return (
    <SignInHeroSectionContainer>
      <Typography sx={{color: "#FFFFFF"}} variant="title1">
        Controle suas finanças, sem planilha chata.
      </Typography>
      <Typography sx={{color: "#FFFFFF"}} variant="title3">
        Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem
        tudo num único lugar e em um clique de distância.
      </Typography>
      <MainButton onClick={() => navigate("/cadastro")} type="submit" width="284px" height="52px">Cadastre-se</MainButton>
    </SignInHeroSectionContainer>
  );
}
