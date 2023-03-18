import { styled , Box, Button } from "@mui/material";

export const DeleteConfirmContainer = styled(Box)({
    width: "180px",
    height: "80px",

    display:"flex",
    flexDirection: "column",
    alignItems:"center",
    justifyContent: "center",

    backgroundColor: "#E4F2FD",
    borderRadius: "4px",

    position: "absolute",
    top:"60px",
    right: "52px",

    zIndex: "1"

}); 

export const DeleteConfirmButtonContainer = styled(Box)({
    width: "100%",

    marginTop: "8px",

    display: "flex",

    gap:"6px",

    padding: "0 16px"
});

export const ConfirmButton = styled(Button)({
    width:"37px",
    height:"30px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#3A9FF1",
    
    borderRadius: "4px",

    fontFamily: "Rubik",
    fontWeight: 500,
    fontSize: "14px",
    
    color: "#FFFFFF"
});

export const CancelButton = styled(Button)({
    width:"37px",
    height:"30px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FF576B",
    
    borderRadius: "4px",

    fontFamily: "Rubik",
    fontWeight: 500,
    fontSize: "14px",
    
    color: "#FFFFFF"
});