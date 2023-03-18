import { Button, styled } from "@mui/material";

export const MainButton = styled(Button)({
   
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    fontFamily: "Rubik, sans-serif",
    fontWeight: "700",
    fontSize: "14px",


    backgroundColor: "#7978D9",
    color: "#F8F8F9",
    border: "1px solid #7978D9",
    "&:hover": {
      backgroundColor: "#7978D9",
      color: "#F8F8F9",
    },
  });

