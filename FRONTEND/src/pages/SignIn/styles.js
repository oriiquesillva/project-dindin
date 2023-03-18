import { Box, styled } from "@mui/material";
import bg from "../../assets/bg.svg";

export const SignInPageContainer = styled(Box)({
  height: "100vh",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  backgroundImage: `url(${bg})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",

  position: "relative",
});

export const SignInLogoContainer = styled(Box)({
  height: "40px",

  position: "absolute",
  left: "50px",
  top: "40px",
});

export const SignInContentContainer = styled(Box)({
  display:"flex",
  alignItems:"center",
  justifyContent:"center",

  gap:"90px",
  
  marginTop:"100px",
  marginBottom: "50px"
});
