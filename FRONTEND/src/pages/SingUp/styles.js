import { Box, styled } from "@mui/material";
import bg from "../../assets/bg.svg";

export const SignUpPageContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  backgroundImage: `url(${bg})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",

  position: "relative",
});

export const SignUpLogoContainer = styled(Box)({
  height: "40px",

  position: "absolute",
  left: "50px",
  top: "40px",

});

export const SignUpContentContainer = styled(Box)({

  display:"flex",
  alignItems:"center",
  justifyContent:"center"
});
