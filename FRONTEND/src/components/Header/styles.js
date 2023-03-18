import { styled, Box } from "@mui/material"


export const HeaderContainer = styled(Box)({
    width: "100%",
    height: "224px",

    display: "flex",
    justifyContent: "center",
    padding: "40px 50px",

    background: "linear-gradient(90.23deg, #05EDE3 0.02%, #645FFB 99.63%)",

    cursor: "pointer"
});

export const HeaderContentContainer = styled(Box)({
    width: "100%",
    maxWidth: "1500px",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"


});

export const HeaderProfileContainer = styled(Box)({
    display:"flex",
    alignItems: "center",
 
});

export const HeaderProfileContent = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 10
});