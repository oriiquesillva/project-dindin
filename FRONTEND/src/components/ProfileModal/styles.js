import { styled, Box, InputLabel, OutlinedInput } from "@mui/material";


export const PageBackdrop = styled(Box)({
    width: "100vw",
    height: "100vh",

    display:"flex",
    alignItems: "center",
    justifyContent: "center",

    background: "rgba(61, 61, 61, 0.48)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",

    position: "absolute",

});

export const ModalContainer = styled(Box)({
    width:"480px",
    minHeight: "600px",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#FFFFFF",

    borderRadius: "20px",

    padding:"40px",

    position: "relative"
});

export const ModalTitle = styled(Box)({
    width: "100%",

    display:"flex",
    alignItems:"start",
    
    marginTop: "20px",
    marginBottom: "30px"
});

export const ModalClose = styled(Box)({
   width: "24px",
   height: "24px",

   position: "absolute",
   top:"20px",
   right: "48px",

   cursor: "pointer"

});

export const CustomInputArea = styled(Box)({
    height: "104px",
    width: "400px",

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
    width: "100%",
    height: "63px",
  
    "& ::placeholder": {
      color: "#667085",
      fontFamily: "Rubik, sans-serif",
      fontWeight: "400",
      fontSize: "16px",
    },
  });

