import {styled, Box} from "@mui/material";

export const ChipContainer = styled(Box)({
    width: "90px",
    height: "24px",

    display: "flex",
    alignItems:"center",
    justifyContent: "space-between",
    

    backgroundColor: "#FAFAFA",
    boxShadow:"0px 2px 11px rgba(0,0,0,0.1)",

    borderRadius:"10px",

    padding:"0 10px",
    margin:"10px 10px 10px 0",

    cursor: "pointer"
});
