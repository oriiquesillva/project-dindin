import { styled, Box } from "@mui/material";

export const TableContainer = styled(Box)({
  minHeight: "500px",
  width: "100%",
  minWidth: "800px",

  cursor: "pointer",

});

export const TableHead = styled(Box)({
  width: "100%",
  height: "58px",

  display: "flex",
  alignItems: "center",
  justifyContent:"space-between",

  backgroundColor: "#FAFAFA",
  boxShadow: "0px 2px 11px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",

  padding:"0 24px",

});

export const TableBody = styled(Box)({
    width:"100%",

    display: "flex",
    flexDirection:"column",
    
});

export const TableColumnSmall = styled(Box)({
    width: "10%",
    textAlign:"center",

    
});

export const TableColumnMiddle = styled(Box)({
    width: "12%",
    textAlign:"center"
});

export const TableColumnBig = styled(Box)({
    width: "25%",
    textAlign:"center"
});

export const TableRow = styled(Box)({
    height:"56px",

    marginTop: "8px",
    
    display:"flex",
    alignItems:"center",
    justifyContent: "space-between",

    borderBottom: "1px solid #E0E0E0",

    padding:"0 24px",

    position: "relative"
});

export const TableIcons = styled(Box)({
    
});


