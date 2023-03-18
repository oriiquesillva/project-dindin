import {styled, Box, InputLabel, OutlinedInput} from "@mui/material";

export const SignUpContainer = styled(Box)({
    width: "513px",

    marginTop:"120px",
    marginBottom: "80px",

    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
 
    backgroundColor: "#FFFFFF"

});

export const SignUpContentContainer = styled(Box)({
    width:"450px",

    display:"flex",
    flexDirection:"column",
    alignItems:"center",

    backgroundColor: "#FFFFFF"

});

export const CustomInputArea = styled(Box)({
    Height: "80px",
    display: "flex",
    flexDirection: "column",
  });
  
  export const CustomInputLabel = styled(InputLabel)({
    fontFamily: "Rubik, sans-serif",
    fontSize: "18px",
    fontWeight: "400",
    color: "#484848",

    marginBottom:"8px",

    display: "inline",
  });
  
  export const CustomOutlinedInput = styled(OutlinedInput)({
    width: "449px",
    height: "63px",
  
    "& ::placeholder": {
      color: "#667085",
      fontFamily: "Rubik, sans-serif",
      fontWeight: "400",
      fontSize: "16px",
    },
  });



