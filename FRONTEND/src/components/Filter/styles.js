import { styled, Box, Button } from "@mui/material";

export const ContainerFilter = styled(Box)({
  width: "100%",

  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",

  marginBottom: "25px",

});

export const ContainerFilterContent = styled(Box)({
  width: "100%",
  height: "280px",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",

  backgroundColor: "#FFFFFF",
  boxShadow: "0px 2px 11px rgba(0,0,0,0.1)",

  borderRadius: "10px",
  padding: "32px 32px 24px 32px",

  marginTop: "25px"
});

export const FilterContent = styled(Box)({
  height:"150px",
  
  display: "flex",
  flexDirection: "column",
  flexWrap:"wrap",

  margin:"20px 0 16px 0",


});

export const ButtonContainer= styled(Box)({
  width: "100%",

  display: "flex",

  gap:"10px"

})

export const FilterButton = styled(Button)({
  width: "90px",
  height: "30px",

  display: "flex",
  alignItems: "center",
  textAlign: "center",

  fontFamily: "Lato, sans-serif",
  fontWeight: 700,
  fontSize: "12px",

  color: "#000000",
  backgroundColor: "#FAFAFA",

  boxShadow: "0px 2px 11px rgba(0, 0, 0, 0.1)",

  borderRadius: "10px",

  gap: "5px",
});

export const ClearFilterButton = styled(Button)({
  width: "150px",
  height: "40px",

  display: "flex",
  alignItems: "center",
  textAlign: "center",

  fontFamily: "Lato, sans-serif",
  fontWeight: 700,
  fontSize: "12px",

  color: "#000000",
  backgroundColor: "#FAFAFA",

  boxShadow: "0px 2px 11px rgba(0, 0, 0, 0.1)",

  borderRadius: "10px",

})

export const ApplyFilterButton = styled(Button)({
  width: "150px",
  height: "40px",

  display: "flex",
  alignItems: "center",
  textAlign: "center",

  fontFamily: "Lato, sans-serif",
  fontWeight: 700,
  fontSize: "12px",

  borderRadius: "10px",

  color: "#FFFFFF",
  backgroundColor: "#7978D9",
  "&:hover": {
    backgroundColor: "#7978D9",
    color: "#F8F8F9"
  },

  boxShadow: "0px 2px 11px rgba(0, 0, 0, 0.1)",

})
